# Import status

All assets referenced by the 13 pages are present — **60 of 60 references resolve**.
The originally-missing brand imagery was added manually and verified (65 PNGs pass
chunk-CRC; `amigos-brandfilm.mp4` is structurally complete with `moov` ahead of
`mdat`, so it streams progressively).

## Still absent: 34 files under `uploads/`

None of these are referenced by any page, so nothing renders broken because of them.
They are working files from the design project — screenshots, pasted images, the
annual report PDF and two volunteer videos.

**Over the transfer ceiling (9 + 1).** `get_file` caps at 256 KiB of base64, i.e.
192 KiB of binary. `uploads/amigos-route-map-wireframe.png` landed at 191,497 bytes —
just under — which pins the limit exactly.

- `uploads/pasted-1789765199111-0.png` and 8 further `pasted-*.png`
- `uploads/Kozhasznusagi-beszamolo-2025-KATTINTHATO_compressed.pdf`

**Unreachable filenames — Unicode normalization (25).** The 23 `Képernyőfotó …`
screenshots plus `Legyél Te is Amigos Önkéntes!.mp4` and `Névtelen.mp4` are stored
server-side with NFD (decomposed) filenames — `K`, `e`, `U+0301 combining acute`, …
rather than precomposed `é` (`U+00E9`). Requests built from precomposed text return
HTTP 404, and percent-encoding the decomposed bytes does not help either. They are
also all far above the size ceiling.

If you want them, download them from the Claude Design project directly.

## Known issue in the page source

`Amigos Fooldal v2.dc.html` has a YouTube fallback for the hero video that is never
invoked: `mountYt()` is fully implemented (line ~342) and `YT_FALLBACK = 'Wr2K6diFiIA'`
declared (line ~339), but the error path calls `toYt()`, which only hides the video and
reveals the poster. Harmless now that `amigos-brandfilm.mp4` is in place, but the hero
would silently degrade to a static poster if that file ever went missing again.
