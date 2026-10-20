# Contesto permanente del progetto

Queste linee guida valgono per il progetto in questa cartella. Le successive
istruzioni esplicite dell'utente possono aggiornarle. Collaborare in italiano;
scrivere i contenuti pubblici del sito in inglese naturale per il Sudafrica.

## Obiettivo e metodo

- Nuovo sito di affiliazione rivolto esclusivamente al mercato sudafricano.
- Catalogo contenuto, circa 10–20 operatori; gestione semplice tramite file locali.
- Ragionare come senior developer Next.js, technical SEO specialist e affiliate
  SEO strategist. Costruire il sito passo dopo passo, evitando overengineering.
- Nome e dominio confermati: Casinopoly, https://casinopoly.io/. Il nuovo sito
  sostituirà quello esistente; il riferimento a coinsaga.com era un errore
  esplicitamente corretto dall'utente e non va utilizzato.
- L'utente ha autorizzato il primo passo di implementazione. Procedere per fasi;
  identità visiva definitiva ed elenco operatori sono ancora da definire.

## Priorità, nell'ordine indicato dall'utente

1. Performance.
2. SEO.
3. Conversion rate.
4. Semplicità del codice.
5. Riutilizzabilità dei componenti.
6. Facilità di aggiornamento dei 10–20 operatori.
7. Tracking preciso dei click affiliate.
8. Ottima UX mobile.

## Stack richiesto

- Next.js con App Router e TypeScript.
- Tailwind CSS e shadcn/ui, usando solo i componenti necessari.
- MDX per recensioni, guide e altri contenuti editoriali.
- React Server Components come impostazione predefinita; Client Components solo
  per interazioni o API browser effettivamente necessarie.
- GitHub per repository e CI/CD; Cloudflare Pages per pubblicazione e hosting.
- Cloudflare Pages come hosting richiesto; Cloudflare per DNS, CDN e protezione.
- Google Analytics 4, Google Search Console e Google Tag Manager.
- URL `/go/[casino]` per redirect e tracking affiliate. Requisito iniziale: Route
  Handler Next.js; adattamento della prima fase Pages descritto sotto.

Non introdurre per ora database, Supabase, CMS o autenticazione. Prima di proporre
altri servizi o infrastrutture, valutare file TypeScript, MDX e funzioni native di
Next.js. Motivare eventuali eccezioni con un bisogno concreto.

## Dati e contenuti

- `/data/casinos.ts`: fonte centrale dei dati strutturati e tipizzati degli operatori.
- `/content/reviews/*.mdx`: recensioni editoriali.
- `/content/guides/*.mdx`: guide editoriali.
- Separare il testo editoriale dai dati strutturati; usare uno slug stabile per
  collegarli. Evitare di duplicare bonus, importi e altri dati variabili nei testi.
- Componenti modulari e riutilizzabili per liste, schede, confronti e CTA.
- Preferire pagine generate in build quando possibile, senza confondere la
  prerenderizzazione delle pagine con l'export statico dell'intera applicazione.

## Adattamento da Casinopoly

Il sito esistente dell'utente è https://casinopoly.io/. Potranno essere riutilizzati,
adattati e riscritti contenuti informativi, recensioni e guide su richiesta.

Ogni contenuto recuperato deve essere verificato e adattato per:

- Utenti del Sudafrica e inglese naturale adatto al pubblico locale.
- ZAR / rand, comprese le reali condizioni locali di bonus e soglie monetarie.
- Metodi di pagamento effettivamente disponibili per ciascun operatore nel paese.
- Normativa, categoria di prodotto e licenze applicabili in Sudafrica.
- Responsible gambling e risorse di assistenza locali verificate.
- Keyword e search intent sudafricani, con valore editoriale originale.

Non limitarsi a traduzioni o sostituzioni di valuta. Non assumere che un operatore,
una promozione, una licenza estera o un metodo di pagamento presente su Casinopoly
sia adatto o legalmente disponibile per utenti sudafricani. Non inventare test,
esperienze dirette, recensioni utenti, rating o fatti commerciali.

## SEO e UX fin dall'inizio

- Progettare URL, metadata, canonical, sitemap, robots e internal linking insieme
  ai template delle pagine.
- Contenuti principali e link navigabili presenti nell'HTML iniziale.
- Schema markup coerente con i contenuti visibili e con i tipi effettivamente
  applicabili; nessuna promessa di rich result o rating inventato.
- Mobile come riferimento per layout, leggibilità, accessibilità, confronti e CTA.
- Ridurre JavaScript client, dipendenze, immagini pesanti e script non necessari.
- Esplicitare affiliazione, criteri editoriali e condizioni delle offerte.

## Redirect e misurazione

- Centralizzare le destinazioni affiliate nei dati degli operatori.
- `/go/[casino]` deve risolvere solo slug noti e destinazioni autorizzate; evitare
  open redirect e gestire operatori sconosciuti o disabilitati.
- Distinguere click su CTA, richieste al redirect e conversioni riportate dagli
  operatori. Definire una convenzione eventi prima dell'implementazione.
- Evitare doppi eventi GA4 tra GTM, codice client e Route Handler. Considerare
  prefetch, bot e cache quando si misura il traffico dei redirect.
- Dare priorità a redirect veloci anche quando il servizio analytics non risponde.
- Documentare i limiti della misurazione: non promettere tracking al 100%.
- Gestire consenso e privacy secondo requisiti applicabili verificati, senza
  introdurre automaticamente piattaforme o servizi aggiuntivi.

## Deployment della prima fase

Verifica tecnica del 20 ottobre 2026: la documentazione Cloudflare distingue
l'export statico Next.js su Pages dalle applicazioni con runtime server su Workers.
Un export statico non esegue un Route Handler a ogni richiesta per registrare un
click o produrre un redirect dinamico.

L'utente ha ribadito GitHub + Cloudflare Pages per la prima fase. Usare Next.js
`output: "export"` per le pagine e una Pages Function TypeScript in
`functions/go/[casino].ts` per lo stesso URL affiliate. La logica condivisa in
`lib/affiliate-handler.ts` mantiene semplice un futuro passaggio a Route Handler.
Non reintrodurre OpenNext o un'app Workers separata per questa fase. Limitare le
invocazioni Functions a `/go/*` tramite `public/_routes.json`.

Il sito attuale non deve essere sostituito automaticamente durante lo sviluppo:
pubblicare prima una preview separata. Prima del cambio dominio inventariare gli
URL esistenti, adattare i contenuti e progettare redirect 301 pertinenti. Mantenere
noindex nelle preview; abilitare l'indicizzazione solo nella produzione pronta.

Fonti tecniche da ricontrollare al momento dell'implementazione:

- https://developers.cloudflare.com/pages/framework-guides/nextjs/
- https://developers.cloudflare.com/pages/functions/routing/
- https://nextjs.org/docs/app/guides/static-exports

## Verifica delle informazioni locali

Verificare su fonti primarie aggiornate le affermazioni normative e commerciali
prima di usarle nei contenuti o per selezionare gli operatori. Distinguere online
casino, betting e i prodotti autorizzati dalla specifica licenza: accettare utenti
sudafricani o possedere una licenza offshore non dimostra la liceità locale.
La categoria commerciale usata da un sito non prova l'autorizzazione dei singoli
giochi. Tenere traccia della fonte e della data di verifica delle informazioni
che possono cambiare.

Verifica iniziale del 20 ottobre 2026: il National Gambling Board presenta
l'online gambling come vietato, con eccezione dell'online betting presso bookmaker
autorizzati in Sudafrica. Questa distinzione deve orientare selezione e contenuti;
ricontrollare le regole e l'autorizzazione dei singoli prodotti prima di formulare
affermazioni di liceità. Fonti ufficiali di partenza:

- https://www.ngb.org.za/industry-regulation/enforcement/
- https://www.ngb.org.za/faqs/
- https://www.ngb.org.za/verified-operators/
