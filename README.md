# Casinopoly · South Africa

Base del nuovo Casinopoly, destinato a sostituire `https://casinopoly.io/` con un
sito focalizzato sul Sudafrica. Il sito esistente non viene modificato da questo
progetto. Stack: Next.js App Router, TypeScript, Tailwind CSS, componenti shadcn/ui
e MDX. Nessun database, CMS o autenticazione.

Repository privato: [etanoox/casinopoly-south-africa](https://github.com/etanoox/casinopoly-south-africa).

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
types/review.ts               Dati, pagamenti, offerte e fonti della recensione
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
nel runtime Cloudflare. Le pagine e i contenuti editoriali sono Server Components;
il confronto usa JavaScript client per filtri, ordinamento, bookmark e pannelli.
Aggiungere una dipendenza solo per un bisogno concreto.

## Operatori e recensioni

Il catalogo pubblicato è inizialmente vuoto. La homepage mostra quattro
schede “Demo Operator A–D”, definite in `data/comparison-preview.ts` e separate da
`data/casinos.ts` e dal registry editoriale. I punteggi editoriali demo sono
9.4/9.2/8.9/8.7 su 10; i reader rating demo sono 4.7/4.6/4.4/4.3 su 5.
Nomi, voti, campi licenza, depositi ZAR, caratteristiche e pagamenti sono
placeholder esplicitamente dichiarati: non sono valutazioni di operatori reali
o recensioni raccolte dagli utenti. Nessuno schema Review/AggregateRating viene
generato da questi esempi.

Filtri per pagamento, deposito minimo e caratteristiche, chip di pagamento e
ordinamento agiscono sulla lista demo. Il bookmark vive nella memoria del
componente e non persiste tra ricaricamenti. “Explore operator” e “Read our review”
espandono pannelli dimostrativi inline: nessuna nuova pagina casino o recensione,
registrazione o collegamento affiliate viene aperto.

Il template recensioni autorizzato il 22 ottobre 2026 è visibile in
`/reviews/yesplay` e nell'indice `/reviews` durante `designPreview`. YesPlay è un
record reale in bozza, separato dai quattro esempi della homepage: dati e fonti
in `data/casinos.ts`, testo in `content/reviews/yesplay.mdx`, composizione server
in `components/reviews/`. Il precedente voto Casinopoly di 4.3/5 è attribuito alla
vecchia recensione, senza nuova valutazione o schema Review/AggregateRating.
La bozza resta noindex, esclusa dalla sitemap e priva di redirect affiliate.

Il nuovo design segue il mockup dell'utente: hero navy, CTA oro, mascotte v2 con
anello, chip e dadi, striscia informativa sovrapposta e footer compatto. Le lunghe
sezioni guida/FAQ sono rimosse dalla homepage; le route editoriali restano attive.
Logo e favicon sono locali in `public/brand/`; il nuovo hero trasparente è
`casinopoly-hero-v2.webp`. Manrope è self-hosted con licenza in `public/fonts/`.
La direzione grafica è documentata in `docs/design-review.md`, la provenienza del
nuovo hero in `docs/hero-v2-asset.md` e degli altri asset in `docs/brand-assets.md`.
La prima versione resta recuperabile nella cronologia Git.
La build blocca `SITE_INDEXABLE=true` finché `designPreview` è attivo in
`lib/site.ts`: rimuovere gli esempi e il blocco insieme al lancio effettivo.

1. Aggiungere un record in `data/casinos.ts`, iniziando con `status: "draft"` e
   `affiliate.enabled: false`.
2. Verificare identità, licenza locale, prodotti autorizzati, disponibilità ZAR e
   metodi di pagamento; registrare fonte e data in `licence`.
3. Scrivere la recensione in `content/reviews/<slug>.mdx`, partendo da
   `_template.mdx`. Slug operatore e recensione devono coincidere.
4. Compilare il profilo `review` del record con logo locale, dati strutturati e
   fonti datate; aggiungere import MDX e metadati a `reviewEntries` in
   `lib/content.ts`, inizialmente con `status: "draft"`.
5. La route esistente `app/reviews/[slug]/page.tsx` genera gli slug di
   `reviewPages`: recensioni pubblicate più bozze solo quando `designPreview` è
   attivo. Non sono necessarie rinomine di cartelle. `reviews` contiene invece
   soltanto entry editoriali pubblicate il cui operatore supera
   `getPublishedCasinos()`; alimenta l'indicizzazione e la sitemap.
6. Pubblicare sia il record operatore sia l'entry editoriale solo dopo le
   verifiche. Il gate controlla la completezza, non certifica la liceità. Prima
   di disattivare `designPreview`, mantenere almeno uno slug pubblicabile per
   l'export della route dinamica. L'attivazione affiliate resta una scelta separata.

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
Il nome del nuovo progetto Pages è `casinopoly-south-africa`; può essere adattato in
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
