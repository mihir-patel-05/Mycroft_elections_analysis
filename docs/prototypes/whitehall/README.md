# Mycroft Whitehall prototype: analyst workspace

A new UI prototype for Whitehall's first public release (Jan 15, 2027, post-election mode). It replaces nothing in `CODE/`. Every figure is invented and the prototype says so on every screen; candidates are shown by party and role, never by name.

**Canvas:** [Mycroft Whitehall Prototype](https://claude.ai/artifact/BpiRmn8W1R7f2ChcCv8Sjb). It is private until shared from the page's Share menu.

The canvas has two pages:

- **Prototype:** the playable app (light), the replay in dark, four phone frames (the result, election night, the race page in dark, a place profile) and the design-system board.
- **Screens and parts:** each screen on its own, plus the two shared parts (the single-race night timeline and the source line with its report form).

Press Play on the first artboard to use it. The tab strip moves between tools, the find box jumps to a sample race, place or tool, and the theme button switches light and dark for all of them.

## Design direction

Whitehall is drawn as professional analyst software: a dense tool surface built for working with the numbers, not for reading an article. (The first version of this prototype was an editorial "register" look; it was replaced on Nov 26 because it read like a news site.)

- **Shell.** A compact app bar (product name, a find box for races, counties, districts and tools, the election cycle, the record's "as of" time, certification status, theme), a tab strip of tools, and a status bar along the bottom showing each feed's freshness.
- **Panes, not pages.** Every section is a ruled pane with a title bar and its own actions (sort, export, switch view). Corners are near-square; there are no shadows, cards or hero headlines. Titles are functional ("Election-night replay", "Count status · 470 races").
- **Density.** 13.5px interface text, 12.5px tables with 28px sticky headers and row hover, 30px controls. At phone width, controls grow back to touch size.
- **Monospaced figures.** Every number, margin, price and time is set in JetBrains Mono so columns align; the interface is Inter.
- **One accent, one meaning.** A highlighter yellow marks selection only: the scrubber position, the selected row or place, the active tab, a pressed toggle.
- **Party colour is data only.** Blue and orange-red appear in party marks, bars and the swing scale. The marks also differ in shape (square, circle) and in lightness. Margins and swings are set in ink.
- **States are patterns, not traffic lights.** Solid means certified or called. An outline means unchanged. Hatching means not counted, not called or not stored. A dashed outline means unknown or "No public polling". A dotted outline means provisional or stale.
- **Charts** are stepped lines that hold until the next stored snapshot, with gaps left as gaps. Market prices are unjoined hourly marks, never a line. Maps are tile maps (one equal square per state or county).

It shares no tokens, typefaces, shell or screen layouts with `../analyst-workbench/` (IBM Plex, indigo accent, left sidebar, white cards on grey) or `../dashboard-mockups/`.

## Screens

| # | Screen | Canvas file | Features | What it shows |
|---|---|---|---|---|
| 1 | The result (home) | `Home.dc.html` | F-09, F-13 | House and Senate result, the status of all 470 races (certified, unchanged, still counting), the 7 races still counting, certification by state with deadlines, and doors to the replay, compare, places, scorecard and data. No countdown |
| 2 | Election night replay | `Replay.dc.html`, `Timeline.dc.html` | F-10, F-15 | Play, step and scrub from 6:00 PM ET on Nov 3 to the last call on Nov 12. Drives the Senate or House tile map, seat counts, the call log and Kalshi prices together. A feed gap is shown as a gap. "One race" shows votes, share counted and market price on one timeline with the call marked |
| 3 | Compare elections | `Swing.dc.html` | F-11, #147, F-15 | Pick any two elections from 2018 to 2026 (President, Senate, House) and see the swing for every county or district: tile map, sortable table with population, filters (density, income, education), scatter, and every election for the selected place. Flags comparisons across different offices, district lines that changed (2022), excluded unopposed races and "Boundaries changed; not comparable" |
| 3b | Place profile | `Place.dc.html` | F-11, #147, F-15 | One page per county (Bucks) and per congressional district (PA-01): a two-election comparison (swing, margin, votes, turnout), all ten elections from 2018 to 2026 as a chart and table, demographics and population by year against the state, and which district a county is in (or which counties make up a district). Earlier district lines are kept apart |
| 4 | Signal scorecard | `Scorecard.dc.html` | F-12, F-15 | Brier score ("lower is better"), races called right, average error, coverage of 470 beside each score, the 6:00 PM ET cut-off, a same-races comparison, biggest misses, calibration, provisional and certified labels, and a "not scored" row for ratings |
| 5 | Race page | `Race.dc.html` | F-13, F-05, F-10, F-11 | Certified result with the state's source and date, what changed from the last unofficial count, the night timeline with its own scrubber, county swing, signals at the cut-off ("No public polling"), and sources |
| 6 | Data | `Data.dc.html` | F-03 | Nine datasets (now including results for 2018 to 2024 by county and people and population by county and district) with source, licence, credit line, coverage, export time, CSV and Parquet; one dataset on its last good export; one listed but not offered, with the reason; the header rows every file carries |
| 7 | Trust flow | `SourceLine.dc.html`, inside `Race.dc.html` | F-05 | "Report an error" opens from any source line with no account. A published correction shows "Corrected Nov 21" beside the number, the old value struck through, the note and the figure's history |
| 8 | Special elections | `Specials.dc.html` | F-14 | Each special against its 2024 presidential baseline, the running overperformance index with its formula and coverage, "No baseline" and uncontested rows. Shown as it would look in April 2027 |
| — | Design system | `System.dc.html` | — | Colour tokens for both themes, type scale, source line, status chips, party marks, margin format, scrubber, seat bar, table |
| — | App shell | `Main.dc.html` | F-09 | App bar with find box and context, tab strip, feed status bar |
| — | Phone and dark frames | `PhoneHome`, `PhoneReplay`, `PhoneRace`, `PhonePlace`, `DarkReplay` | F-09 | The same app at 390px and in the dark theme |

Not designed: privacy, terms and attributions pages (plain text pages), the admin side of corrections and certification, F-60, and everything deferred (accounts, notebooks, saved workspaces, AI chat).

## Comparing elections (added Nov 26)

The product now compares any two elections from 2018 to 2026 down to the county, with demographics and population for every county and congressional district. Three rules shape the design:

- **Counties are the steady unit.** County lines did not move in the period (except Connecticut), so counties carry comparisons across all five elections.
- **Districts are compared only on the same lines.** Where lines changed between two elections, the district view says "District lines changed; not comparable" and offers the county view. A district's earlier-lines results are listed but kept apart.
- **Different offices are allowed and labelled.** Comparing a presidential result with a House result shows a "Different offices" chip, because part of the swing is the candidates.

This goes beyond the current spec inputs: F-11 fixes the baseline at 2024, comparison mode (#147) is P3, and #137 loads only what the swing explorer needs. Those need updating before `/speckit-specify`.

## Tokens

All tokens and component styles are in [`source/whitehall.css`](source/whitehall.css).

| Token | Light | Dark | Use |
|---|---|---|---|
| `--paper` | `#F7F8F7` | `#0F1213` | Page |
| `--paper-2` | `#ECEEEC` | `#191D1E` | Sunk bands, code |
| `--ink` | `#121517` | `#ECEEE8` | Text, rules, solid chips |
| `--ink-2` | `#3A4043` | `#C4C9C3` | Secondary text |
| `--ink-3` | `#596063` | `#9BA29C` | Captions, source lines |
| `--hair` | `#C6CAC3` | `#353B3C` | Hairlines |
| `--mark` | `#FFD84A` | `#FFD84A` | The highlighter (text on it is `#121517`) |
| `--dem` | `#1F56B3` | `#4F7FDB` | Party mark and bars (square) |
| `--rep` | `#DC6428` | `#F4A070` | Party mark and bars (circle) |
| `--oth` | `#7B8087` | `#8D9399` | Other parties (diamond) |
| `--d1` to `--d3`, `--zero`, `--r1` to `--r3` | see file | see file | The swing scale, the same steps on both sides |

Measured contrast: body text about 17:1 (light) and 16.1:1 (dark); the lightest caption colour 5.4:1 or better on the page and band backgrounds; text inside party-coloured tiles 4.8:1 or better.

**Type:** Inter for the interface and JetBrains Mono for every figure, code and time. Corners are 2 to 3px.

## Files

- `source/`: the canvas sources (`*.dc.html`, `whitehall.css`, `canvas.json`). They use the canvas's template format (`{{holes}}`, `<sc-for>`, `<sc-if>`, `<dc-import>` and a `renderVals()` class), so they don't open on their own. They are the reference for markup, spacing and interaction state.
- No static HTML exports or screenshots were generated.
