# Brand Guidelines — Hinterland Web
*Extracted from hinterlandweb.com — May 2026*

---

## Typography

- **Primary font:** Raleway (Google Fonts)
- **Weights loaded:** 300, 400, 500, 600, 700
- **Fallback:** sans-serif
- **Body font:** Raleway, sans-serif (applied globally via `body`)

---

## Color Palette

### Named tokens (Tailwind config)

| Token | Hex | RGB | Usage |
|-------|-----|-----|-------|
| `primary` | `#42B3E8` | rgb(66 179 232) | CTAs, links, highlights, icons |
| `secondary` | `#143144` | rgb(20 49 68) | Dark navy — backgrounds, text on light |
| `tertiary` | `#D8E5CF` | rgb(216 229 207) | Sage green — backgrounds, text on dark |

### Theme tokens (CSS custom properties)

#### Light mode (`:root`)
| Variable | Value | Resolved hex |
|----------|-------|--------------|
| `--color-bg` | 216 229 207 | `#D8E5CF` (sage green) |
| `--color-border` | 216 229 207 | `#D8E5CF` |
| `--color-box` | 216 229 207 | `#D8E5CF` |
| `--box-border` | 20 49 68 | `#143144` |
| `--box-sd` | 20 49 68 / .5 | `rgba(20,49,68,0.5)` |
| `--heading-1` | 20 49 68 | `#143144` |
| `--heading-2` | 20 49 68 | `#143144` |
| `--heading-3` | 20 49 68 | `#143144` |

#### Dark mode (`.dark`)
| Variable | Value | Resolved hex |
|----------|-------|--------------|
| `--color-bg` | 20 49 68 | `#143144` (dark navy) |
| `--color-box` | 17 24 39 | `#111827` (gray-950) |
| `--box-border` | 243 244 246 / .1 | `rgba(243,244,246,0.1)` |
| `--box-sd` | transparent | — |
| `--heading-1` | 216 229 207 | `#D8E5CF` (sage green) |
| `--heading-2` | 216 229 207 | `#D8E5CF` |
| `--heading-3` | 209 213 219 | `#D1D5DB` (gray-300) |

### Supporting colors (used sparingly)
| Color | Hex | Where used |
|-------|-----|------------|
| Deep navy | `#172554` | Button hover fill overlay |
| Dark secondary | `#111827` | Dark mode box background (gray-950) |
| White | `#FFFFFF` | Dark mode text, light mode backgrounds |

---

## Blob & Glow System

The blobs are CSS `div` elements — absolutely positioned, blurred, semi-transparent — not SVGs. They create the ambient glow effect throughout the site.

### Blob recipes

**Hero — top-left green glow**
```
bg-green-400 blur-xl opacity-60 rounded-3xl
```
Color: `#4ADE80` (green-400)

**Hero — bottom-right blue glow**
```
bg-primary blur-xl opacity-80 rounded-3xl
```
Color: `#42B3E8`

**Feature section — diagonal gradient blob**
```
bg-gradient-to-tr from-primary to-green-400 blur-2xl opacity-40 rounded-full
```
Gradient: `#42B3E8` → `#4ADE80`

**Section accent — warm accent glow (used in 2 places)**
```
bg-gradient-to-br from-primary to-orange-400 blur-3xl opacity-50
```
Gradient: `#42B3E8` → `#FB923C`

**Card corner accent**
```
bg-primary/10 rounded-full
```
Color: `#42B3E8` at 10% opacity

### Blob design rules
- Always `absolute` positioned, never in document flow
- Always blurred (`blur-xl`, `blur-2xl`, or `blur-3xl`)
- Always reduced opacity (40–80%)
- Shapes: `rounded-full` or `rounded-3xl`
- Keep to 2–3 blobs per section maximum — less is more

---

## Gradients

### Brand text gradient (logo, hero headline)
```css
background: linear-gradient(to bottom right, #4338CA 20%, #42B3E8 30%, #16A34A);
/* Tailwind: bg-gradient-to-br from-indigo-600 from-20% via-primary via-30% to-green-600 */
```
Used for: logo text, key section headings with `bg-clip-text text-transparent`

### Modal / card background gradient
```css
background: linear-gradient(to bottom right, #D8E5CF 60%, #42B3E8);
/* Tailwind: bg-gradient-to-br from-tertiary from-60% to-primary */
```

### Section fade gradient
```css
background: linear-gradient(to top left, var(--color-box));
/* Tailwind: bg-gradient-to-tl from-box-bg */
```

---

## Buttons

### Primary CTA
- Background: `bg-primary` (`#42B3E8`)
- Border: transparent (default) → `#172554` on hover
- Hover effect: `after:bg-[#172554]` ripple fill scales from center
- Shape: `rounded-full`
- Text: white

### Ghost / secondary
- Border: `border-box-border`
- Background: transparent → `bg-tertiary` on hover (dark mode)
- Shape: `rounded-full`

---

## Theme Summary

| | Light | Dark |
|--|-------|------|
| Page background | `#D8E5CF` sage green | `#143144` dark navy |
| Card/box background | `#D8E5CF` | `#111827` gray-950 |
| All headings | `#143144` dark navy | `#D8E5CF` sage green |
| Body text | `#374151` gray-700 | `#D1D5DB` gray-300 |
| Accent / CTA | `#42B3E8` primary blue | `#42B3E8` primary blue |
| Borders | `#143144` | rgba(243,244,246,0.1) |

The colors invert between modes — what's the background in light becomes the heading color in dark, and vice versa. Primary blue (`#42B3E8`) stays constant in both modes.
