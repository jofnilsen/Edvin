# Edvin – mating og vekst

A small, self-contained family dashboard. The public page is `index.html`.
It has no third-party JavaScript, fonts, trackers, API calls or Google Sheet connection.

## One source for every statistic

Only the JSON inside `<script id="edvin-data" type="application/json">` contains measured data.
The `calculations` script contains pure functions and `interface` renders those results.
Do not reintroduce hardcoded totals, averages, labels or SVG measurement positions.
Ticks, gridlines, bars, weight points and cumulative points all use the SAME y transform.
Measured-volume axes start at zero and grow automatically; the weight axis uses a labelled zoomed range.
The cumulative curve uses real local clock minutes on a fixed 00:00–next 00:00 x axis and a step path.
Both graph and raw-data date controls update the same selected-day state.

## Meaning of the data

- Store full ISO timestamps with the correct Europe/Oslo offset. Do not assume +02 all year.
- `ml: null` means unknown (for example direct breastfeeding), NOT zero. Preserve breastfeeding notes.
- Separately logged times count as separate events. Add-ons at the same time are combined.
- `status: partial` is an unfinished/incomplete diary, `complete` requires confirmation, and `review` is unresolved legacy data.
- Unreviewed days are preserved in raw history but excluded from numeric charts and current summaries. An individually checked entry can have `verified: true` and be used in day/night summaries.
- Day is 06:00–before 22:00. The night associated with a selected date is previous 22:00–before 06:00.
- Interval means use adjacent registered starts in the SAME day/night episode. They are not sleep estimates. Counts of intervals are shown.
- The histogram uses the selected 1/3/7-calendar-day window, ending on the selected date. It never defaults to lifetime averages.
- Counts of wet/stool diapers are only recorded observations. Blank or unrecorded stool status is not proof of no stool.
- `through` is the latest recorded event; `publishedAt` is the code/data update time. They must remain separate.

## Update checklist – run for EVERY change

1. Read current index.html and the current Google Sheet before editing. Match new events against existing entries; never duplicate overlapping photos.
2. Preserve original quantities and uncertainty. Do not infer offered volume, vomit, extra milk, diapers, dates or times from unclear handwriting.
3. Update raw JSON, not chart pixels or summary text. Keep the private Google Sheet in sync through its connector; this website does not read it.
4. Reconcile the selected-day total, NAN/milk split, measured count, wet/stool count and final cumulative value.
5. Review day/night boundaries, n-observations, interval rules and window selection. Check both sides of midnight.
6. Run `node prepare.cjs`. It updates the publication timestamp, derives latest event time and runs the tests. The tests use a frozen baseline PLUS validation of current live data, so ordinary new meals do not require changing expected baseline results.
7. Open index.html in a browser; verify narrow and wide layouts, y tick/mark alignment, cumulative step curve, 00:00–00:00 axis, tap values and date navigation from BOTH areas.
8. Commit to main without overwriting other recent changes. Read back the resulting file/commit and check Pages deployment status before reporting it live. A committed update is not proof of completed deployment.
9. Report unresolved source-data issues plainly; do not report the checklist as complete if a check failed.

`node tests.cjs` runs the tests without changing timestamps. No npm install needed.

## Audit from 26 September 2026

The previous page used unrelated hardcoded heights and y tick labels, stale means, a fixed cumulative maximum with a different plotting height, and a diagonal line rather than steps. All have been replaced by calculated rendering.

**Legacy data were inconsistent before this review:**
- Stored 24 September rows add to 90 ml, while the old headline said approximately 300 ml. The original photograph contains both 23 and 24 September, suggesting a date-transfer error.
- Stored 25 September rows add to 435 ml, not the previously stated 465–475 ml. Some rows differ from the original photographs. They are deliberately NOT silently repaired by guessing.
- These two days now have `status: review`. Original transferred rows are preserved for reconciliation; their daily bars/curves are withheld until checked. Only the clearly legible 25 September 23:00, 50 ml entry is individually verified for the following-night calculation.
- 26 September through 21:15: 680 measured ml, consisting of 640 ml NAN and 40 ml expressed breastmilk, in 12 recorded events; direct breastfeeding is additional and unquantified.
- Day: 11 measured feeds, 590 ml, 53.636... ml/feed; 10 intervals averaging 90 minutes. Previous night: 50 and 90 ml; 70 ml/feed and one 270-minute interval.
- Five wet diapers are recorded in the Sheet. The earlier page accidentally displayed the same ambiguous 16:30/18:30 diaper twice. The duplicate is removed; the Sheet's 18:30 time is retained with an explicit ambiguity note.

Do not make public/private repository or sharing changes without the parents' request. `noindex` is a search-engine request, NOT access control. This is a family diary, not medical advice.
