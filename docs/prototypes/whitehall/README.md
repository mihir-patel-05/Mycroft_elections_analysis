# Mycroft Whitehall prototype: analyst workspace

A new UI prototype for Whitehall's first public release (Jan 15, 2027, post-election mode). It replaces nothing in `CODE/`. Every figure is invented and the prototype says so on every screen; candidates are shown by party and role, never by name.

**Canvas:** [Mycroft Whitehall Prototype](https://claude.ai/artifact/BpiRmn8W1R7f2ChcCv8Sjb). It is private until shared from the page's Share menu.

The canvas has two pages:

- **Prototype:** the playable app (light), the replay in dark, four phone frames (the result, election night, the race page in dark, a place profile) and the design-system board.
- **Screens and parts:** each screen on its own, plus the three shared parts (the map, the single-race night timeline and the source line with its report form).

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
- **Charts** are stepped lines that hold until the next stored snapshot, with gaps left as gaps. Market prices are unjoined hourly marks, never a line.
- **Maps are one real map** (F-17): actual state, district and county shapes that pan and zoom, with the War Room map's seven layers and three geographies. The tile maps are gone. See "The map" below.

It shares no tokens, typefaces, shell or screen layouts with `../analyst-workbench/` (IBM Plex, indigo accent, left sidebar, white cards on grey) or `../dashboard-mockups/`.

## Screens

| # | Screen | Canvas file | Features | What it shows |
|---|---|---|---|---|
| 1 | The result (home) | `Home.dc.html` | F-09, F-13, F-17 | House and Senate result, the map (opens on Results, with Certification as an eighth layer), the status of all 470 races (certified, unchanged, still counting), the 7 races still counting, certification counts and deadlines, and doors to the replay, compare, places, scorecard and data. No countdown |
| 2 | Election night replay | `Replay.dc.html`, `Timeline.dc.html` | F-10, F-16, F-17, F-15 | Play, step and scrub from 6:00 PM ET on Nov 3 to the last call on Nov 12. Drives the map (every layer reads the moment shown), seat counts, the call log and Kalshi prices together. A feed gap is shown as a gap. "One race" shows votes, share counted and market price on one timeline with the call marked. **How the count came in** (F-16) is a pane on this screen: see below |
| 3 | Compare elections | `Swing.dc.html` | F-11, #147, F-17, F-15 | Pick any two elections from 2018 to 2026 (President, Senate, House) and see the swing for every county or district: the map (zoomed to the state, with Swing as its first layer and the selection shared with the table), sortable table with population, filters (density, income, education), scatter, and every election for the selected place. Flags comparisons across different offices, district lines that changed (2022), excluded unopposed races and "Boundaries changed; not comparable" |
| 3b | Place profile | `Place.dc.html` | F-11, #147, F-17, F-15 | One page per county (Bucks) and per congressional district (PA-01): the map zoomed to Pennsylvania with the place marked, a two-election comparison (swing, margin, votes, turnout), all ten elections from 2018 to 2026 as a chart and table, demographics and population by year against the state, and which district a county is in (or which counties make up a district). Earlier district lines are kept apart |
| 4 | Signal scorecard | `Scorecard.dc.html` | F-12, F-15 | Brier score ("lower is better"), races called right, average error, coverage of 470 beside each score, the 6:00 PM ET cut-off, a same-races comparison, biggest misses, calibration, provisional and certified labels, and a "not scored" row for ratings |
| 5 | Race page | `Race.dc.html` | F-13, F-05, F-10, F-11, F-17 | Certified result with the state's source and date, what changed from the last unofficial count, the night timeline with its own scrubber, county swing as a map (the district outlined and tagged NH-01) and a table, signals at the cut-off ("No public polling"), and sources |
| 6 | Data | `Data.dc.html` | F-03, F-07 | Nine datasets (now including results for 2018 to 2024 by county and people and population by county and district) with source, licence, credit line, coverage, export time, CSV and Parquet; one dataset on its last good export; one listed but not offered, with the reason; the header rows every file carries. **Versions, DOI and changelog** (F-07): see below |
| 7 | Trust flow | `SourceLine.dc.html`, inside `Race.dc.html` | F-05 | "Report an error" opens from any source line with no account. A published correction shows "Corrected Nov 21" beside the number, the old value struck through, the note and the figure's history |
| 8 | Special elections | `Specials.dc.html` | F-14 | Each special against its 2024 presidential baseline, the running overperformance index with its formula and coverage, "No baseline" and uncontested rows. Shown as it would look in April 2027 |
| — | Design system | `System.dc.html` | — | Colour tokens for both themes, type scale, source line, status chips, party marks, margin format, scrubber, seat bar, the map (a live one in each theme, its layer tabs, geography switch, zoom and jump buttons, marker, every fill and outline with its meaning, and the two scales), table |
| — | Map | `WhMap.dc.html` | F-17 | The one map every screen imports. Also an artboard of its own on the "Screens and parts" page |
| — | App shell | `Main.dc.html` | F-09 | App bar with find box and context, tab strip, feed status bar |
| — | Phone and dark frames | `PhoneHome`, `PhoneReplay`, `PhoneRace`, `PhonePlace`, `DarkReplay` | F-09 | The same app at 390px and in the dark theme |

Not designed: privacy, terms and attributions pages (plain text pages), the admin side of corrections and certification, F-60, and everything deferred (accounts, notebooks, saved workspaces, AI chat).

## The map (F-17, added Nov 26)

One component, `WhMap.dc.html`, is the map on the result page, the replay, compare, the place profile and the race page. It draws real shapes in Web Mercator: 50 states and DC, the 436 districts of the 119th Congress, 3,142 counties, and the neighbouring land for context.

**Moving around.** Drag to pan. Zoom with the + and − buttons, a double-click, a pinch, or Ctrl or ⌘ and scroll (a plain scroll moves the page and shows a hint). A reset button returns to the starting view, and 48, AK and HI jump to the lower 48, Alaska and Hawaii, which sit in their true positions. Arrow keys, + and − work when the map has focus.

**Layers.** The seven War Room layers, coloured by the same things as `CODE/src/features/war-room/` (`theater.ts`, `command/Theater.tsx`, `holderOverlay.ts`):

| Layer | Colours by | States | Districts | Counties |
|---|---|---|---|---|
| Results | Party of the winner or leader. Solid = called (or certified); party hatching = leading, not called; grey hatching = polls closed, no votes yet; dashed outline = polls open; plain = no Senate race | Senate | House | Not available |
| Market leader | Party of the Kalshi leader, in three steps by last traded price (90¢ or more, 75 to 90¢, under 75¢). Dashed outline = no market or no price. Labelled a price, never a forecast | Senate | House | Not available |
| Seat holder | Party holding the seat before Nov 3. A paler step = open seat (Senate) or open or vacant seat (House) | Senate | House | Not available |
| Flip watch | The result so far against the holder. Solid = flipped and called; party hatching = leader differs from the holder, not called; ink outline = held within 3 points; grey = held; dotted outline = redrawn district, not compared | Senate | House | Not available |
| Past results | Winner and margin in three steps (under 5, 5 to 15, 15+). President 2024 or 2020 for states and counties; 2024 House for districts, the only House election held on the lines drawn. Grey hatching = won unopposed; dashed = not reported (Alaska by county) | Yes | Yes | Yes |
| Census | One ACS measure, picked from a list, in five equal-count bins on a neutral scale. Dashed = no figure (Connecticut by county) | Yes | Yes | Yes |
| Tariff exposure | The 0 to 100 exposure score in five bands on the neutral scale. Dashed = not scored | Yes | Not available | Not available |

A layer that a geography can't show stays in the tab strip, hatched and disabled, and its tooltip says why. This matches the live map, where only Past results and Census colour counties and tariff exposure is by state. A screen can add one layer of its own: Certification on the result page, Swing on compare and the race page.

**What every layer carries.** A heading naming the chamber and source ("Senate · 35 races · civicAPI count and calls"), a legend, a source line with its "as of" time, and a readout of the selected place that repeats the tooltip as text. On district layers about 2026, the ten states that redrew their maps get a heavy dashed outline and a note that the shapes are 2024's. On county layers a note says the shapes are 2017's and that Connecticut is drawn with its former counties. Selecting a place rings it in the highlighter and tags it with its code (MI-SEN, NH-01) or name.

**Two things changed from the live map**, both to keep Whitehall's rules:

- Hatching means "leading, not called" on Results, as the owner asked. The live map hatches "leader differs from the seat holder" on Results and Market leader. In Whitehall hatching always means not counted, not called or not stored, so that comparison lives only on Flip watch.
- Flip watch uses the gaining party's colour, not amber, because the highlighter means selection only. It compares the result so far with the holder; the live map compares the market leader.

**Themes and phone.** Colours are read from the tokens on each draw, so the map follows the theme switch. The Census and tariff layers use five new neutral tokens, `--q1` to `--q5`, that run from pale to dark in the light theme and from dark to pale in the dark theme, so more ink always means more of the measure. At phone width the tab strip scrolls sideways, controls grow to 40px or more, the frame is 280px tall, one finger scrolls the page and two fingers move the map.

**No tiled basemap.** The map draws on a plain ground with the neighbouring land outlined. The live app uses MapLibre on CARTO's vector basemap. The canvas could not be opened in a signed-in browser from this session, so whether it lets an artboard start MapLibre's worker and fetch CARTO's tiles is unverified; the map was therefore built to need no library, no worker and no network. CARTO's plain raster tiles were tried as a lighter basemap and now return an "API key required" watermark, so they were dropped. CARTO's vector style and tiles still answer without a key (checked Nov 26), so the product build can keep the War Room's MapLibre map and basemap.

**Shapes.** States and counties are us-atlas (Census 2017, 1:10m); districts are `CODE/public/geo/cd119.topo.json`; neighbouring land is Natural Earth 1:50m. `tools/build-geo.js` simplifies and packs them into the strings at the top of `WhMap.dc.html` (about 430 KB).

## How the count came in (F-16, added Nov 26)

A pane on the replay screen, under the closest-races table. It follows the scrubber.

- **Share reported** is votes in the newest snapshot at or before the moment, divided by the final count: certified where the state has certified, otherwise the locked count, marked provisional. The feed's "percent reporting" is never used. The replay's closest-races table and the map's tooltips use the same share.
- **The table** has a row per state, or per county for New Hampshire or Arizona: a bar of the share reported at the moment, the time each place reached 50%, 90% and 99% with the time since its polls closed, the margin at the moment, the final margin, and the shift from 10% reported to final. A milestone's mark fills once the replay has passed it. Every column sorts.
- **The selected place** gets two stepped charts on one time axis each, share reported and margin, drawn dark up to the moment and light for the rest of the stored record.
- **Gaps stay gaps.** County rows show a stale chip between 1:15 and 2:00 AM, their lines stop and restart, and a milestone crossed inside the gap is given as a range. A count that went down (a county's correction) is noted on its row.
- **Shifts** are worded the same in both directions and claim no cause.

## Dataset versions, DOI and changelog (F-07, added Nov 26)

On the Data screen:

- Each dataset shows its version beside its status, a Version row (release date and how many numbers were revised since the version before), a DOI row, and a "Cite this dataset" line with a copy button. "All versions" opens every earlier version with its own DOI and files; a withdrawn version is marked, not removed.
- States designed: a DOI that is pending because the registrar did not answer, and no DOI for the series we may not redistribute.
- **Changelog** pane: the release date, how many numbers were revised and how many by certification and by correction, then a table of each revision (date, dataset and version, row and field, old value struck through, new value, change, reason, detail), filterable by reason, with a CSV export. Datasets with nothing revised are listed as such, so the changelog is never blank. Earlier releases are listed below it.
- DOIs in the prototype use the 10.5555 example prefix. Where they are registered is open question 23 (proposed: Zenodo).

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
| `--d1` to `--d3`, `--zero`, `--r1` to `--r3` | see file | see file | The swing scale, the same steps on both sides. Also the map's price and margin steps |
| `--q1` to `--q5` | `#E4E6E1` to `#33393B` | `#22272A` to `#C4C9C3` | The map's neutral scale (Census, tariff exposure) |

Measured contrast: body text about 17:1 (light) and 16.1:1 (dark); the lightest caption colour 5.4:1 or better on the page and band backgrounds; text inside party-coloured tiles 4.8:1 or better.

**Type:** Inter for the interface and JetBrains Mono for every figure, code and time. Corners are 2 to 3px.

## Files

- `source/`: the canvas sources (`*.dc.html`, `whitehall.css`, `canvas.json`). They use the canvas's template format (`{{holes}}`, `<sc-for>`, `<sc-if>`, `<dc-import>` and a `renderVals()` class), so they don't open on their own. They are the reference for markup, spacing and interaction state.
- `tools/build-geo.js`: builds the packed shapes in `WhMap.dc.html` from us-atlas, the repo's district file and Natural Earth.
- No static HTML exports or screenshots were generated.
