# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

Installable web app (PWA) published at https://tyrone5519-source.github.io/quietroot/. Planned next: an Android wrapper for the Google Play Store with the same design. Mobile web is the primary viewing context.

## Users

Adults with ADHD and autistic adults. Anyone else is welcome, but the product is designed around this group. Typical situations: unable to start a task they need to do, overwhelmed or overstimulated, needing structure for the day, or wanting a calm few minutes. Often on a phone, often one-handed, sometimes in a fragile state.

## Product Purpose

A quiet, shame-free companion that helps people start things, calm down, and structure their day. Every completed activity grows a plant in a personal garden. Success means a user reaches for Quietroot when stuck or overwhelmed, gets moving or settles within a few minutes, and comes back because it feels kind, not because it nags.

## Positioning

A garden that only grows: progress is never taken away, there are no streaks to break and no scores. It combines task-starting help (tiny steps, a 2-minute start, a companion), regulation tools (breathing, quiet mode, calming mini-games), daily structure (a visual step list), and gentle self-knowledge (check-ins and a weekly "what seems to help you" reflection) in one place, all private to the device.

## Operating Context

- Used in short bursts throughout the day, from home, work, school or on the move.
- Core flows: Focus (minutes, optional task, tiny steps, 2-minute start, companion, breaks), Breathe (Relax 4-6, Box, 4-7-8), Today (plan and tick off steps), Check-in (mood, then intensity, then advice and a suggested activity), Unwind games (Sort, Match, Fireflies, Sand), Quiet mode, weekly insights.
- The garden scene follows the device's real clock: sun, moon, stars and sky colours change through the day.
- Optional gentle reminders (plan the day, focus nudge, wind down), optional generated background music (5 tracks), optional sound effects.

## Capabilities and Constraints

- Plain HTML, CSS and JavaScript, no build step and no framework. Files: index.html, style.css, game.js, sw.js, manifest.webmanifest, icons.
- All data in the browser's localStorage on the device. Backup export/import as a file.
- Works offline after the first visit through a service worker.
- A single-file copy is published as a private Claude artifact for previews. Downloads, notifications and service workers do not work there.
- Undecided: Play Store packaging route (TWA or Capacitor) and exact release date.

## Brand Commitments

- Name: Quietroot. The project folder is still called "Calm Garden", which was an earlier working name that is already used by someone else and must not be reused.
- Always free, no ads.
- No account; data stays on the device; nothing is sent anywhere.
- Never punishing: no streaks to lose, no scores, nothing taken away.
- Not a medical treatment: always described as a calming and focus tool, never as therapy, treatment or a cure.
- Voice: warm, plain, adult and direct. Not childish, not clinical. Names feelings honestly ("Stuck", "Drained") and reassures without cheerleading ("That still counts").

## Evidence on Hand

- The live app and its source in this folder. A user-testing kit at ../testing-kit.md.
- No user testing has been done yet. There are no testimonials, user counts or outcomes; do not invent any.

## Product Principles

1. Lower the cost of starting: the first useful action should be one tap away, and smaller is always allowed.
2. Kindness over pressure: nothing punishes absence or slowness; copy never shames.
3. Calm by default, more on request: show one clear next thing, and keep everything else a tap away.
4. The user's data is theirs: private, local, exportable.
5. Respect the senses: sound, motion, brightness and contrast are always controllable.

## Accessibility & Inclusion

- Target WCAG 2.2 AA: 4.5:1 text contrast, visible focus, full keyboard and screen-reader operation, 44px touch targets.
- Neurodivergent users: low cognitive load (no more than about 4 choices at a decision point), predictable navigation, no flashing, no surprise sounds.
- Respect prefers-reduced-motion and offer in-app reduce motion, high contrast, light/dark and text size.
- Safety: when someone reports strong low or overwhelmed feelings, point gently to real support without diagnosing.
