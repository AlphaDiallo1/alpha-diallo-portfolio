# Alpha portfolio redesign

This update adapts the supplied 3D creator design to Alpha Diallo's existing software-engineering portfolio. It preserves the coding journey, all 12 skills and levels, project descriptions, technology lists, live/GitHub URLs, email, and LinkedIn profile.

## Design

- Kanit typography, near-black background, metallic headings, and gradient contact buttons.
- Alpha's supplied GLB head, enlarged and positioned slightly above the hero's lower controls so the chin stays visible while it floats and rotates. Holding and moving the head rotates it horizontally and vertically. There are no visible instructions, captions, buttons, or focus ring. Keyboard users can focus the head, rotate with arrow keys, and reset with Home.
- Two scroll-linked rows of actual project previews.
- Scroll-revealed introduction and the four supplied decorative 3D assets, saved locally.
- Five numbered skill groups in the white section, replacing the sample creator's services.
- Three project cards that stack on sufficiently tall desktop screens. Mobile, short screens, and reduced-motion settings use readable, non-sticky cards.
- Contact form that creates an email draft. It does not send or store messages; the visitor reviews and sends through their email application.

## Editing content

- `lib/portfolio-data.ts`: project data, links, and skills.
- `app/page.tsx`: biography, section content, contact information.
- `app/globals.css`: responsive styling.
- `components/portfolio-motion.tsx`: animation and contact interactions.
- `components/hero-head.tsx`, `components/head-scene.tsx`, and `app/hero-head.css`: accessible avatar controls, lighting, and responsive placement.
- `public/models/alpha-face-avatar.glb`: Alpha's supplied `3d+face+avatar.glb`, preserved without changing its geometry or textures. Its bounds determine the centered rotation pivot and display scale.
- The supplied GLB contains one textured head mesh and one standard material. It does not contain a separate hologram model, alternate scene, or animation.
- `lib/alpha-head-model.ts` and `public/models/alpha-head.glb`: the earlier procedural reconstruction, retained as source history but no longer loaded by the hero.

## Run

Use the existing pnpm package manager and lockfile:

```sh
pnpm install
pnpm dev
```

Development uses `.next-dev`; production builds use `.next`.

```sh
pnpm build
pnpm start
```

To regenerate the earlier procedural reconstruction (not the active hero asset), use Node.js 22.18+ or 24+ (for native TypeScript stripping):

```sh
node scripts/export-avatar.mjs
```

The production build checks TypeScript. A missing Three.js type dependency and the existing sidebar's mismatched mobile-hook import were also fixed. Avatar rendering pauses offscreen; reduced-motion preferences disable the floating animation and rotation easing.

## Decorative asset sources

The original URLs were supplied in the design brief, under `https://shrug-person-78902957.figma.site/_components/v2/ebb2b8f25d8e24d5f0a5ca8af4c950de81aa2fd7/`:

- `moon_icon.11395d36.png` → `public/images/moon.png`
- `lego_icon-1.703bb594.png` → `public/images/lego.png`
- `p59_1.4659672e.png` → `public/images/orbit.png`
- `Group_134-1.2e04f3ce.png` → `public/images/chrome.png`

The project previews are the original local portfolio assets. Alpha supplied both the original avatar reference and the active GLB model.
