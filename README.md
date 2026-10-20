# Casinopoly · South Africa

Base del nuovo Casinopoly, destinato a sostituire `https://casinopoly.io/` con un
sito focalizzato sul Sudafrica. Il sito esistente non viene modificato da questo
progetto. Stack: Next.js App Router, TypeScript, Tailwind CSS, componenti shadcn/ui
e MDX. Nessun database, CMS o autenticazione.

## Avvio e verifica

Richiede Node.js 24 e npm. Il lockfile è incluso per build riproducibili.

```sh
npm ci
cp .env.example .env.local
npm run dev
```

`npm run dev` serve le pagine Next.js. Per provare anche `/go/*` nel runtime
Cloudflare Pages:

```sh
npm run check
npm run build:functions
npm run preview
```

L'export statico viene scritto in `out/`. `npm start` serve una build già creata
con Wrangler. Non usare `next start` per un export statico.

## Struttura

```text
app/                         Pagine, metadata, sitemap e robots
components/                  Shell, template editoriali e CTA affiliate
components/ui/               Componenti shadcn/ui mantenuti nel repository
data/casinos.ts               Dati strutturati degli operatori
types/casino.ts               Modello Casino
content/reviews/*.mdx         Testi delle recensioni
content/guides/*.mdx          Testi delle guide
lib/content.ts               Registry editoriale e import MDX espliciti
lib/affiliate.ts             Verifica delle destinazioni affiliate
lib/affiliate-handler.ts     Logica redirect indipendente dal runtime
functions/go/[casino].ts     Pages Function per /go/:casino
public/_routes.json          Esegue Functions solo su /go/*
tests/affiliate.test.ts      Test delle regole affiliate e del wrapper Pages
```

MDX è compilato in build: nessun accesso al filesystem o esecuzione di MDX remoto
nel runtime Cloudflare. Le pagine sono Server Components salvo necessità futura
di interazioni client. Aggiungere una dipendenza solo per un bisogno concreto.

## Operatori e recensioni

Il catalogo è inizialmente vuoto. Non ci sono operatori, bonus o rating fittizi.

1. Aggiungere un record in `data/casinos.ts`, iniziando con `status: "draft"` e
   `affiliate.enabled: false`.
2. Verificare identità, licenza locale, prodotti autorizzati, disponibilità ZAR e
   metodi di pagamento; registrare fonte e data in `licence`.
3. Scrivere la recensione in `content/reviews/<slug>.mdx`, partendo da
   `_template.mdx`. Slug operatore e recensione devono coincidere.
4. Aggiungere l'import MDX e l'entry a `reviewEntries` in `lib/content.ts`.
5. Alla **prima** recensione pubblicabile, rinominare la cartella
   `app/reviews/_draft-route` in `app/reviews/[slug]`. Next.js static export richiede
   almeno un parametro effettivo per una route dinamica. In seguito basta
   aggiornare il registry.
6. Impostare lo stato pubblicato solo dopo le verifiche. Il gate automatico
   controlla la completezza del record, non certifica la sua liceità.

Le informazioni variabili degli operatori appartengono a TypeScript; MDX contiene
analisi e spiegazioni. Title, description e data aggiornamento editoriale sono nel
registry, non duplicati in frontmatter. Pubblicare una guida richiede un file MDX
e un'importazione nel registry `guides`.

Il Sudafrica distingue online casino e betting autorizzato: non considerare una
licenza offshore o l'accettazione di utenti sudafricani come autorizzazione locale.
Fonti iniziali: [NGB enforcement](https://www.ngb.org.za/industry-regulation/enforcement/)
e [operatori verificati](https://www.ngb.org.za/verified-operators/).

## Redirect affiliate e analytics

Per la prima fase su **Cloudflare Pages**, `/go/:casino` è una Pages Function
TypeScript. Un Route Handler Next.js dinamico non può essere eseguito da un
export statico; la logica è separata per poterla riutilizzare su un runtime Next.js
in futuro. Non servono OpenNext, un'app Workers separata o storage.

- Destinazione HTTPS configurata nel record, con hostname esatto in `allowedHosts`.
- Nessuna destinazione presa da query string; operatori non pubblicati o link
  disabilitati restituiscono 404.
- Redirect 302 con `Cache-Control: private, no-store` e `X-Robots-Tag: noindex`.
- Il componente `AffiliateLink` usa un normale anchor con `rel="sponsored nofollow"`
  per evitare prefetch Next.js. Prefetch riconosciuti restituiscono 204.
- HEAD non registra eventi. GET registra `affiliate_redirect` con `casino_slug`
  e `measurement: "redirect_request"`, senza IP, cookie o referrer nell'evento.
- I log non rappresentano click umani unici o conversioni; bot, retry, sampling e
  retention del provider ne limitano la precisione. Errori di logging non bloccano
  il redirect.

**GA4 e GTM non sono ancora attivati.** Prima del lancio: definire gli eventi e il
consenso applicabile, collegare un solo percorso di invio GA4 (per esempio GTM),
verificare click e deduplicazione con gli strumenti di debug e completare privacy
e contatti. Nessun ID o token di tracking viene inventato. Search Console supporta
il token HTML opzionale `GOOGLE_SITE_VERIFICATION`.

## GitHub e Cloudflare Pages

GitHub conserva codice e CI; Cloudflare Pages ospita il sito e pubblica le build.
Il workflow `.github/workflows/ci.yml` verifica TypeScript, test, export Next e
compilazione delle Functions su push a `main` e pull request.

Per collegare un nuovo progetto Pages al repository GitHub:

| Impostazione Pages | Valore |
| --- | --- |
| Framework preset | Next.js (Static HTML Export) |
| Production branch | `main` |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | cartella radice del repository |
| `NODE_VERSION` | `24` |
| `NEXT_PUBLIC_SITE_NAME` | `Casinopoly` |
| `NEXT_PUBLIC_SITE_URL` | `https://casinopoly.io` |
| `SITE_INDEXABLE` | `false` durante lo sviluppo |

La cartella `functions/` resta nella radice del repository: Pages la compila
insieme agli asset `out/`. Non caricare soltanto `out/` tramite drag-and-drop, che
non include il sorgente delle Functions.

La Git integration di Pages gestisce deploy e preview a ogni push senza copiare
token Cloudflare in GitHub Actions. Usare inizialmente il dominio di preview
`.pages.dev`; collegare `casinopoly.io` solo dopo la revisione della migrazione.
Il nome provvisorio del progetto Pages è `casinopoly`; può essere adattato in
`wrangler.jsonc` prima della creazione per evitare conflitti con il sito attuale.

Alternativa CLI, dopo aver autenticato l'account e selezionato il progetto corretto:

```sh
npm run deploy
```

## Indicizzazione e migrazione del sito esistente

`SITE_INDEXABLE=false` imposta noindex nelle pagine, blocca la scansione in
`robots.txt` e lascia la sitemap vuota. Noindex non è un controllo di accesso:
le preview pubbliche restano raggiungibili. Il dominio canonical è quello
configurato in build. Cambiare dominio o variabili richiede una nuova build.

Prima di sostituire il sito attuale:

- Inventariare URL esistenti, traffico organico, backlink e contenuti da mantenere.
- Adattare i contenuti al Sudafrica e definire redirect 301 verso pagine realmente
  equivalenti, evitando redirect indiscriminati alla home.
- Verificare operatori e offerte, completare privacy/contatti e collegare analytics.
- Verificare canonical, schema, internal link e sitemap con il dominio finale.
- Configurare `SITE_INDEXABLE=true` solo nella build di produzione pronta al lancio;
  mantenere `false` nelle preview. Il codice rifiuta domini locali o di esempio
  quando l'indicizzazione è richiesta.
- Collegare il dominio al nuovo progetto Pages, controllare DNS/HTTPS e aggiungere
  la sitemap in Search Console mantenendo la proprietà esistente dove applicabile.

L'attuale fase prepara la base tecnica e la preview; non effettua il cambio DNS o
la sostituzione del sito pubblico.
