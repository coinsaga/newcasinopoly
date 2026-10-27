# Casinopoly: design della preview

## Direzione visiva

La homepage segue il mockup utente: hero navy, CTA oro, logo locale e composizione
compatta orientata al confronto. Manrope è locale; il layout è responsive.
L'illustrazione v2 riunisce mascotte, anello oro, chip con picche e due dadi.
L'asset è `public/brand/casinopoly-hero-v2.webp`; la provenienza è documentata in
[hero-v2-asset.md](hero-v2-asset.md).

## Homepage

1. Header e navigazione dell'edizione sudafricana.
2. Hero navy e CTA oro verso il confronto.
3. Striscia informativa sovrapposta al margine inferiore del hero.
4. Confronto con filtri e quattro operatori dimostrativi.
5. Footer compatto con affiliazione, 18+, privacy e responsible gambling.

Le lunghe sezioni guida, pagamenti e FAQ non fanno parte di questa homepage.
Le route delle guide e gli altri contenuti editoriali restano disponibili.

## Dati dimostrativi della home

`data/comparison-preview.ts` è separato da `data/casinos.ts` e dal registry
editoriale. I dati illustrativi non descrivono operatori reali.

| Esempio | Punteggio editoriale demo | Reader rating demo |
| --- | --- | --- |
| Demo Operator A | 9.4 / 10 | 4.7 / 5 |
| Demo Operator B | 9.2 / 10 | 4.6 / 5 |
| Demo Operator C | 8.9 / 10 | 4.4 / 5 |
| Demo Operator D | 8.7 / 10 | 4.3 / 5 |

“DEMO PREVIEW” e i richiami nelle schede/pannelli dichiarano i placeholder:
nomi, voti, licenze, depositi, caratteristiche e pagamenti. Nessuna recensione
utente o attività di test è stata inventata. Filtri e ordinamento agiscono sulla
lista demo; il bookmark rimane nella memoria del componente senza persistenza.
Le CTA aprono pannelli inline, senza pagine casino o link affiliate. Questi esempi
non entrano in sitemap, catalogo pubblicato o schema Review/AggregateRating.

## Template recensioni: 22 ottobre 2026

`/reviews/yesplay` è il primo template autorizzato, con dati reali in bozza,
testo MDX e fonti primarie datate; è distinto dagli operatori demo della home.
Hero operatore, dati essenziali, indice sezioni, pagamenti, offerte e sidebar
compongono un layout riutilizzabile, renderizzato come Server Component.
Gli import MDX sono statici; importi, pagamenti e fonti provengono dai dati locali.
Il logo locale YesPlay è `/operators/yesplay.webp`, 205 × 88 px.
Su mobile la scheda offerta precede l'articolo; su desktop occupa la colonna
destra. L'indice resta disponibile durante lo scroll, la tabella pagamenti
scorre nel proprio contenitore e le FAQ usano elementi HTML nativi.

Il 4.3/5 è il punteggio attribuito alla vecchia review Casinopoly: non è una nuova
valutazione. La bozza ha noindex, nessun link affiliate e solo BreadcrumbList;
Article è riservato alle recensioni pubblicate, senza Review/AggregateRating.
`reviewPages` ammette bozze solo in `designPreview`; `reviews` richiede entrambi
lo stato editoriale pubblicato e un operatore che superi il gate di pubblicazione.
Dettagli e limiti delle fonti: [yesplay-review-sources.md](yesplay-review-sources.md).

## Indicizzazione e lancio

`SITE_INDEXABLE=false` produce noindex, blocco robots e sitemap vuota.
`designPreview` impedisce una build indicizzabile finché la preview è attiva.
Prima del lancio sostituire/rimuovere i demo, verificare le recensioni e aggiornare
CTA/disclosure. Rimuovere il gate insieme alla preview, poi controllare canonical,
robots, sitemap e metadata. `/go/` resta separato dalla UI dimostrativa.

Le affermazioni su licenze, prodotti, pagamenti e offerte richiedono fonti primarie
aggiornate e date. ZAR o licenze offshore non dimostrano l'autorizzazione locale.
Fonti iniziali: [NGB enforcement](https://www.ngb.org.za/industry-regulation/enforcement/)
e [NGB operatori verificati](https://www.ngb.org.za/verified-operators/).
