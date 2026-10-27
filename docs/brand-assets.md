# Casinopoly brand assets

Original public assets retrieved from the user-owned Casinopoly website on
20 October 2026. Filenames are local and stable; the original files have not been
redrawn, recoloured or otherwise edited.

| Local asset | Original source | Dimensions | File size |
| --- | --- | --- | --- |
| `public/brand/casinopoly-logo.svg` | [Logo_Casinopoly.svg](https://casinopoly.io/wp-content/uploads/2025/12/Logo_Casinopoly.svg) | SVG viewBox `0 0 911 201` | 19,722 bytes |
| `public/brand/casinopoly-favicon.png` | [Casinopoly-favicon.png](https://casinopoly.io/wp-content/uploads/2025/12/Casinopoly-favicon.png) | 200 × 200, transparent | 14,590 bytes |
| `public/brand/casinopoly-mascot.webp` | [mascotte-bonus.webp](https://casinopoly.io/wp-content/uploads/2026/01/mascotte-bonus.webp) | 624 × 660, transparent | 60,680 bytes |
| `public/brand/casinopoly-hero.webp` | [banner_casinopoly.webp](https://casinopoly.io/wp-content/uploads/2025/12/banner_casinopoly.webp) | 1,000 × 710, transparent | 109,028 bytes |

## Use in the new site

Use the original SVG wordmark for brand identification and the standalone mascot
for the new hero. The mascot contains decorative chips and Bitcoin coins, with no
offer amount or written promotional claim.

The favicon is the original mascot badge referenced by the site's `rel="icon"`
and `rel="apple-touch-icon"` links. Its actual size is 200 × 200 despite the HTML
icon link declaring 192 × 192. The retrieved homepage did not reference a
separate vector mascot; its largest standalone mascot reference was the 624 ×
660 WebP above.

The old hero is kept as a source reference. It includes a baked-in dollar bonus,
crypto labels and calls to action, so it should not be displayed as an offer for
South African readers. Its presence in the repository does not verify any offer,
product or operator for South Africa.

The logo contains the following core colours:

- Navy: `#002648`, `#002C57`.
- Gold: `#E6A125`.
- Green: `#58C86A`.

The SVG was parsed as XML and checked for script tags, foreign objects, inline
load handlers and external image references; none were present. Preserve its
aspect ratio. Give decorative mascot artwork an empty `alt` and keep meaningful
page information in HTML.

These brand illustrations are reused at the user's request. They are not
distributed under the font licence below.

## Self-hosted typography

`public/fonts/manrope-latin-variable.woff2` is the official Google Fonts Manrope
Latin variable webfont. It covers normal weights **200–800** and is **24,836
bytes**. Its local companion licence is `public/fonts/Manrope-OFL.txt`.

Sources:

- [Official Google Fonts family repository](https://github.com/google/fonts/tree/main/ofl/manrope).
- [Official SIL Open Font License](https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/OFL.txt).
- [Official CSS family endpoint](https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap).
- [Downloaded Latin WOFF2](https://fonts.gstatic.com/s/manrope/v20/xn7gYHE41ni1AdIRggexSg.woff2).

Load through `next/font/local` or a local `@font-face` declaration with
`font-display: swap`. No runtime request to Google Fonts is needed. The Latin
subset is suitable for the current English copy; fallback fonts cover characters
outside that subset. Retain the OFL licence with the font.
