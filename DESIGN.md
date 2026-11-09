---
name: Quietroot
description: A city lot of numbered raised beds where every finished activity plants something.
colors:
  safety-orange: "#f26b21"
  on-orange: "#1a1a1a"
  kale: "#5f9a55"
  kale-ink: "#93c788"
  timber: "#b8875a"
  timber-dark: "#8a6440"
  soil: "#3b3226"
  asphalt: "#24272a"
  asphalt-deep: "#1c1e21"
  slab: "#2c3034"
  slab-raised: "#363b40"
  line: "#4a5056"
  line-soft: "#383d42"
  chalk: "#f1efe8"
  chalk-muted: "#bebfb8"
  chalk-faint: "#a3a6a0"
  bar: "#1b1d20"
  concrete: "#e7e5df"
  concrete-deep: "#dcd9d1"
  concrete-slab: "#f4f3ef"
  concrete-ink: "#22252a"
  concrete-line: "#b3afa5"
  concrete-orange: "#e8611a"
  concrete-kale-ink: "#2f6a2b"
typography:
  display:
    fontFamily: "Big Shoulders Stencil Display, Arial Narrow, sans-serif"
    fontSize: "2.25rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.02em"
  headline:
    fontFamily: "Big Shoulders Stencil Display, Arial Narrow, sans-serif"
    fontSize: "1.7rem"
    fontWeight: 800
    lineHeight: 1.05
    letterSpacing: "0.02em"
  numeral:
    fontFamily: "Big Shoulders Stencil Display, Arial Narrow, sans-serif"
    fontSize: "3.6rem"
    fontWeight: 800
    lineHeight: 1
    letterSpacing: "0.04em"
  sign-title:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1.4rem"
    fontWeight: 700
    lineHeight: 1.2
  title:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1.05rem"
    fontWeight: 700
    lineHeight: 1.5
  body:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "Big Shoulders Stencil Display, Arial Narrow, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 800
    letterSpacing: "0.08em"
  small:
    fontFamily: "Atkinson Hyperlegible, system-ui, sans-serif"
    fontSize: "0.84rem"
    fontWeight: 700
    lineHeight: 1.4
rounded:
  hairline: "2px"
  bed: "3px"
  r: "4px"
  lot: "6px"
spacing:
  xs: "6px"
  sm: "8px"
  md: "10px"
  lg: "14px"
  xl: "16px"
  section: "26px"
components:
  button-go:
    backgroundColor: "{colors.safety-orange}"
    textColor: "{colors.on-orange}"
    rounded: "{rounded.r}"
    padding: "0 20px"
    height: "50px"
  button-default:
    backgroundColor: "{colors.slab-raised}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.r}"
    padding: "0 20px"
    height: "50px"
  button-link:
    textColor: "{colors.chalk-muted}"
    padding: "0 8px"
    height: "44px"
  input:
    backgroundColor: "{colors.asphalt-deep}"
    textColor: "{colors.chalk}"
    rounded: "{rounded.r}"
    padding: "0 14px"
    height: "50px"
  card:
    backgroundColor: "{colors.slab}"
    rounded: "{rounded.r}"
    padding: "16px"
  plot-sign:
    backgroundColor: "{colors.chalk}"
    textColor: "{colors.asphalt}"
    rounded: "{rounded.r}"
    padding: "16px"
  bed:
    backgroundColor: "{colors.timber}"
    rounded: "{rounded.bed}"
    padding: "6px"
  step-tag:
    backgroundColor: "{colors.safety-orange}"
    textColor: "{colors.on-orange}"
    typography: "{typography.label}"
    rounded: "{rounded.hairline}"
    padding: "2px 8px"
  tab:
    backgroundColor: "{colors.bar}"
    textColor: "{colors.chalk-muted}"
    padding: "9px 4px 11px"
---

# Design System: Quietroot

## Overview

**Creative North Star: "Community Garden Plots"**

Quietroot is a city lot of numbered raised beds seen at night or on a sunny afternoon: asphalt ground, painted timber frames, chalk lettering, kale growing in dark soil. Each kind of activity has its own bed, and each finished activity plants something in it. The interface is that lot and the municipal signage around it; nothing floats, glows or blurs.

Density is low and deliberate. A single 560px column carries one screen at a time, with one filled orange action and everything else a quiet tap away. Surfaces are flat slabs separated by 1px hairlines or dashed chain-link borders; depth comes from material (timber around soil, chalk sign on asphalt), not from shadow. The world explicitly refuses soft rounded wellness cards, gradient heroes and glowing dark glass.

A sunny-concrete light variant mirrors every role, and a high-contrast mode flattens both to pure black or white with full-strength lines. Theme, contrast, motion and text size are user-controlled, so every rule here must survive all four.

**Key Characteristics:**
- Asphalt ground, slab surfaces, chalk text; sunny-concrete mirror in light mode.
- Safety orange is the action colour: one filled orange control per screen.
- Kale is growth and done-ness; timber and soil are the bed material.
- Stencil display face for headings, plot numerals, timers and field labels; Atkinson Hyperlegible for everything read.
- Small 2-6px corners, 1px hairlines, dashed borders for zones, no glows, no glass.

## Colors

A dark municipal palette of asphalt neutrals and chalk, with two working pigments (safety orange, kale) and the warm material pair of timber and soil.

### Primary
- **Safety Orange** (safety-orange): the single next action. Fills the one go/primary button per screen, the "Up next" tag on Today, and the outline of the suggested bed. Also used as stroke-only state: focus ring, current tab indicator, selected piece in games, today's day in the week strip, input focus border, caret and text selection. Text on it is always On-Orange near-black, never white. Light mode shifts it to Concrete Orange.

### Secondary
- **Kale** (kale): growth and completion. Filled check marks, done days, progress meters, on switches, selected choices, the quiet-mode orb and the toast icon block.
- **Kale Ink** (kale-ink): kale as a foreground colour: links, pressed icon buttons, and step and add-grid icons. Light mode uses Concrete Kale Ink.

### Tertiary
- **Painted Timber** (timber) and **Dark Timber** (timber-dark): bed frames, game boards, sort bins, and the 3px frame around unwind tiles and canvases. Dark Timber is the plot numeral colour on the chalk sign (light theme swaps it to Timber on the dark sign).
- **Soil** (soil): the planting bed inside every timber frame and every board cell.

### Neutral
- **Asphalt** (asphalt): page ground. **Asphalt Deep** (asphalt-deep): lot ground, inputs, game trays.
- **Slab** (slab) and **Raised Slab** (slab-raised): cards, list rows, settings groups; raised slab for default buttons, chips and mini controls.
- **Line** (line) and **Soft Line** (line-soft): 1px borders and hairline dividers; Line also draws the dashed lot and tray borders.
- **Chalk** (chalk), **Muted Chalk** (chalk-muted), **Faint Chalk** (chalk-faint): primary text, secondary text, placeholders and empty check rings.
- **Bar** (bar): tab bar ground.
- **Sunny Concrete** set (concrete, concrete-deep, concrete-slab, concrete-ink, concrete-line): the light variant's ground, deep ground, surface, text and line. The variant is a full mirror; the light theme also redefines soil, kale and the accent hues for contrast.

The check-in mood swatches (calm, content, restless, drained, anxious, low, overwhelmed, stuck) are a data palette defined with the moods in game.js; they appear only as mood dots and mood bars, never as interface chrome.

### Named Rules
**The One Orange Rule.** Each screen has exactly one filled orange control: the next action. Every other button is a raised slab, an outline on the sign, or a plain-text link. Orange may also appear as a 2-3px stroke for focus, the current tab and the current selection, never as a second fill.

**The Kale Means Grown Rule.** Kale fills only things that are done, on or growing. It is never a call to action.

## Typography

**Display Font:** Big Shoulders Stencil Display, weight 800 (with Arial Narrow)
**Body Font:** Atkinson Hyperlegible, 400 and 700 (with system-ui)

**Character:** Painted-on stencil lettering for the lot's signage, paired with a face designed for low-vision legibility for anything a person actually reads.

### Hierarchy
- **Display** (800, 2.25rem / 2rem under 400px, line-height 1, uppercase, 0.02em): h1, welcome title (2.6rem there).
- **Headline** (800, 1.7rem, 1.05, uppercase, 0.02em): screen titles in the top bar and h2 headings.
- **Numeral** (800, 3.6rem focus timer; 2.2rem sign plot numeral; 2rem stats; 1.15rem bed numbers; tabular figures): plot numbers, timers and counts.
- **Sign Title** (Atkinson 700, 1.4rem, 1.2, sentence case): the heading on the plot sign. The sign's heading is read, not painted, so it drops the stencil.
- **Title** (Atkinson 700, 1.05rem): h3 and card headings.
- **Body** (Atkinson 400, 1rem, 1.5): all running text; captions cap at 62ch.
- **Label** (stencil 800, 0.95rem, uppercase, 0.08em, muted): form field labels and game board labels; the Today "Up next" tag uses the same face at 0.85rem.
- **Small** (Atkinson 700, 0.78-0.84rem): tab labels, bed names, chip and stat captions.

### Named Rules
**The Painted Signage Rule.** The stencil face appears only on h1/h2 screen titles, plot and bed numerals, timers and stat numbers, field labels and the step tag. Anything longer than a short label, including the plot sign's heading, is Atkinson Hyperlegible.

**The Numeral, Not a Kicker, Rule.** Headings never carry a label or kicker line above them. Where a heading needs a marker, a stencil plot numeral (two digits, Dark Timber) sits beside it.

## Layout

A single centred column, max 560px, with 16px side gutters (respecting safe-area insets), 18px top padding and 132px bottom padding to clear the fixed tab bar. Every screen opens with a top bar (title, optional icon button or segmented control, min 50px) and a muted caption.

Rhythm runs on 6/8/10/14/16px gaps, with 26px above section headings. Grids are even: the lot is a 3x3 plot grid with 8px gaps; quiet links, add-step tiles, check-in levels and stats are 3-up; unwind tiles, moods and sort bins are 2-up.

At 960px and wider, the home screen widens to 1080px and becomes two columns (1.2fr / 0.8fr, 28px gap): the lot on the left, the plot sign, quiet links and unlock progress stacked on the right, so the next action never falls below the fold. Under 400px the display size and bed height step down.

## Elevation & Depth

The system is flat. Depth is material: timber frames hold soil, the chalk sign sits on asphalt, slabs are bordered by hairlines. The only shadows are on overlays that genuinely float above the page.

### Shadow Vocabulary
- **Toast lift** (`box-shadow: 0 8px 24px rgba(0,0,0,.3)`): the drop-down toast after planting.
- **Dialog lift** (`box-shadow: 0 12px 32px rgba(0,0,0,.35)`): confirmation dialogs over a 70% asphalt scrim.
- **Cell mark** (`box-shadow: inset 0 0 0 3px` safety orange): differing cells in the Match game.

### Named Rules
**The Asphalt Is Flat Rule.** No glows, no gradients, no glass or backdrop blur on interface surfaces. Shadow belongs only to toasts and dialogs. Gradients are allowed only inside illustration where they depict something real, such as the time-of-day sky.

## Shapes

Corners are small and practical: 2px for hairline elements (meters, tags, soil, board cells), 3px for beds and boards, 4px for every control and card, 6px for the lot frame. Circles are reserved for check rings, mood dots, the done badge and the switch thumb; the switch track is the only pill.

Borders carry structure. Solid 1px hairlines separate rows, links and settings; dashed borders (1px for banners and the focus summary row, 2px for the lot and game trays) mark zones like chain-link fencing; 3px Dark Timber frames hold pictures (unwind tiles, canvases). Selection and suggestion are drawn as 3px outlines offset 3px outside the shape.

## Components

### Buttons
Square-shouldered and plain, like painted municipal fittings.
- **Shape:** 4px corners, 50px tall (44px small), 700 weight.
- **Go / Primary:** Safety Orange fill and border, On-Orange text. Hover lightens to #ff7d36. One per screen.
- **Default:** Raised Slab fill, 1px Line border, chalk text; hover darkens to Soft Line; presses down 1px.
- **On the sign:** non-go buttons become transparent with a currentColor border so they read as outlines on chalk.
- **Link:** no fill or border, Muted Chalk, underlined with 4px offset, 44px tall.
- **Focus:** 3px Safety Orange outline, 3px offset, on every focusable element.

### Segmented control and switch
- **Segmented:** a slab strip with a 1px Line border and Soft Line dividers; the pressed segment inverts to chalk on asphalt.
- **Switch:** 52x30 pill; on state fills Kale with a white thumb.

### Cards / Containers
- **Corner Style:** 4px.
- **Background:** Slab, with a 1px Soft Line border; 16px padding (12-14px for list rows).
- **Shadow Strategy:** none (see Elevation & Depth).
- **Grouped settings:** one slab per group, rows divided by Soft Line hairlines, 60px rows.

### Inputs / Fields
- **Style:** Asphalt Deep fill, 1px Line border, 4px corners, 50px tall; placeholder in Faint Chalk.
- **Label:** stencil field label above, muted.
- **Focus:** border turns Safety Orange (no glow).

### Navigation
- **Tab bar:** fixed bottom bar on Bar ground with a 1px top Line; five tabs, 23px icons over small 700 labels in Muted Chalk. The current tab turns Chalk and gains a 3px Safety Orange top bar. On wide screens tabs widen to 140px.

### The Lot (signature)
The home screen's plot map: a dashed-border frame on Asphalt Deep holding a skyline band (real-time sky, sun or moon, rooftops) above a 3x3 grid of beds. Each bed is a keyboard-reachable button: Timber frame, Soil inside with the activity's plants, a stencil bed number at top left in chalk, and the activity name below in dark ink. The suggested bed gets a 3px orange outline; the selected bed a chalk outline; a bed being swapped a dashed orange outline.

### The Plot Sign (signature)
A chalk sign under the lot: chalk fill with asphalt text (in light theme a fixed dark sign with chalk text), 4px corners, 16px padding. A two-digit stencil plot numeral in Dark Timber sits beside an Atkinson sentence-case heading, then one muted line, then the single orange action and, at most, one outlined alternative. A tapped bed shows its plant story as hairline-ruled rows. The crisis-support card on Check-in uses the same chalk sign treatment.

### Quiet Links
Three plain-text links (Breathe, Check in, Today) in an even 3-up row ruled by Soft Line hairlines above, below and between. Text is underlined with a Line-coloured underline that strengthens to Chalk on hover; a muted small line beneath.

### Step Rows
Today's list rows: slab, 60px minimum, a 22px icon in Kale Ink with no tinted chip behind it, the step text, and a circular check that fills Kale when done (text strikes through, turns muted). The next step gets a 2px orange border and a stencil "Up next" tag.

## Do's and Don'ts

### Do:
- **Do** keep exactly one filled Safety Orange control per screen, and use orange elsewhere only as a 2-3px stroke (focus, current tab, selection, suggested bed).
- **Do** put text on orange in On-Orange near-black.
- **Do** mark a heading with a stencil plot numeral beside it, in Dark Timber, when it needs a marker.
- **Do** draw icons in Kale Ink directly on the surface.
- **Do** use the chalk sign treatment for the next-action sign and the support card.
- **Do** separate rows and quiet links with 1px hairlines and fence zones with dashed Line borders.
- **Do** keep every touch target at least 44px and every focus ring 3px Safety Orange.
- **Do** define every new colour role in both the asphalt and sunny-concrete themes and check it in high contrast.

### Don't:
- **Don't** add a label, kicker or eyebrow line above a heading.
- **Don't** use the stencil face for paragraphs, sign headings, buttons or anything a person reads at length.
- **Don't** fill a second control in orange, or use orange for decoration.
- **Don't** set icons in tinted, rounded chips.
- **Don't** style quiet links as buttons or cards.
- **Don't** use glows, gradients, glass or backdrop blur on interface surfaces, or shadows outside toasts and dialogs.
- **Don't** round corners past 6px on rectangles or build soft pill-shaped cards.
