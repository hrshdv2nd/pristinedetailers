# Pristine Detailers — Next.js Implementation

A premium mobile car detailing website built with Next.js, TypeScript, and Tailwind CSS. This is a fully responsive, modern implementation of the Pristine Detailers design.

## Project Structure

```
pristinedetailers/
├── app/
│   ├── layout.tsx          # Root layout with metadata and fonts
│   ├── page.tsx            # Home page entry point
│   └── globals.css         # Global styles and Tailwind directives
├── components/
│   ├── pages/
│   │   └── home.tsx        # Complete home page with all sections
│   └── shared/
│       ├── nav.tsx         # Navigation component
│       ├── footer.tsx      # Footer component
│       ├── placeholder.tsx # Image placeholder with striped pattern
│       ├── blob-image.tsx  # Organic blob mask shapes
│       └── atoms.tsx       # Small reusable components (Arrow, Eyebrow, Stat)
├── styles/
│   └── globals.css         # Global CSS and Tailwind setup
├── public/
│   ├── logo-flag.png       # Brand logo
│   ├── images/             # Gallery and asset images
│   └── index.html          # Static HTML file
├── package.json            # Dependencies and scripts
├── next.config.ts          # Next.js configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── tsconfig.json           # TypeScript configuration
└── postcss.config.js       # PostCSS configuration
```

## Features Implemented

### ✅ Complete Design System
- **Custom Design Tokens**: Pristine Detailers brand colors (gold navy #C89B37, dark ink #0A0A0A, etc.)
- **Typography**: Bricolage Grotesque (display), Inter Tight (sans), JetBrains Mono (mono)
- **Spacing & Sizing**: Tailored breakpoints and spacing scales
- **Shadows & Radii**: Consistent elevation system and border radius tokens

### ✅ All Page Sections
1. **Hero Section** — Compelling headline with CTA buttons and stat cards
2. **Marquee Strip** — Animated brand carousel of car models
3. **Services Preview** — 4 service cards with blob images and pricing
4. **Flagship Section** — Ceramic coating highlight with pricing tiers
5. **Melbourne Section** — Service area map with suburb tags
6. **PPF Section** — Paint Protection Film with interactive pricing
7. **Membership Teaser** — Subscription benefits showcase
8. **Gallery Section** — Multi-column portfolio layout
9. **Testimonials Section** — Customer reviews with avatars
10. **FAQ Section** — Expandable Q&A with smooth animations
11. **CTA Section** — Final call-to-action

### ✅ Interactive Components
- Sticky navigation with active states
- Expandable FAQ with state management
- Hover animations on service cards
- Animated marquee strip
- Responsive layout that scales from mobile to 4K

### ✅ Modern Architecture
- Server Components & Client Components properly separated
- TypeScript for type safety
- Tailwind CSS for styling
- Next.js 15+ with App Router
- Optimized fonts and assets

## Getting Started

### Prerequisites
- Node.js 18+ (or 20+)
- npm or yarn

### Installation

1. **Navigate to project directory**:
   ```bash
   cd pristinedetailers
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. **Open in browser**:
   - Navigate to `http://localhost:3000`
   - The page will hot-reload as you make changes

### Build & Deploy

**Production build**:
```bash
npm run build
npm start
```

**Lint code**:
```bash
npm run lint
```

## Design Token Reference

### Colors
- **Primary**: `--pd-navy: #C89B37` (gold accent)
- **Dark**: `--pd-ink: #0A0A0A` (text)
- **Secondary**: `--pd-ink-2: #3A3A38`, `--pd-ink-3: #7A7A76`
- **Backgrounds**: `--pd-bg: #F4F4F2`, `--pd-bg-2: #EBEAE5`
- **Borders**: `--pd-line: #E1DFD8`

### Typography
- **Display Font**: 'Bricolage Grotesque' (headings, large text)
- **Body Font**: 'Inter Tight' (paragraphs, body text)
- **Mono Font**: 'JetBrains Mono' (labels, code, eyebrows)

### Spacing
- Container max-width: `1320px`
- Standard padding: `32px`
- Standard gap: `20px` to `80px`

### Border Radius
- Small: `6px` (buttons, inputs)
- Medium: `12px` (cards)
- Large: `20px` (sections)
- Pill: `999px` (badges, full-width)

## Component Usage Examples

### Using the Home Page
```tsx
import { Home } from '@/components/pages/home';

export default function Page() {
  return <Home />;
}
```

### Using Shared Components
```tsx
import { Nav } from '@/components/shared/nav';
import { BlobImage } from '@/components/shared/blob-image';
import { Placeholder } from '@/components/shared/placeholder';

// In your component
<Nav active="home" />
<BlobImage variant="b" size={440} rotate={-4}>
  <Placeholder label="HERO IMAGE" tone="dark" />
</BlobImage>
```

## Customization

### Change Brand Colors
Edit `tailwind.config.ts` and update the color tokens in the `theme.extend.colors` section.

### Add New Pages
1. Create new file in `components/pages/`
2. Add route in `app/` directory
3. Import shared components as needed

### Modify Fonts
Update the font import URLs in `app/layout.tsx` and the CSS variable references.

## Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Responsive mobile (iOS Safari, Chrome Mobile)

## Performance Optimizations
- Image optimization ready (Next.js Image component can be used)
- CSS-in-JS for inline styles (minimal bundle impact)
- No unnecessary libraries—pure React & Next.js
- Markdown and component documentation built-in

## Deployment

### Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Docker
```dockerfile
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

### Traditional Hosting
```bash
npm run build
# Copy `.next` and `public` folders to server
npm start
```

## File Descriptions

| File | Purpose |
|------|---------|
| `app/layout.tsx` | Root layout, metadata, font imports |
| `app/page.tsx` | Home page route |
| `components/pages/home.tsx` | Full homepage with 11 sections |
| `components/shared/nav.tsx` | Sticky navigation bar |
| `components/shared/footer.tsx` | Footer with links |
| `components/shared/blob-image.tsx` | Organic blob mask SVG component |
| `components/shared/placeholder.tsx` | Striped image placeholder |
| `components/shared/atoms.tsx` | Arrow, Eyebrow, Stat components |
| `styles/globals.css` | Tailwind directives & global styles |
| `tailwind.config.ts` | Design tokens and Tailwind config |
| `next.config.ts` | Next.js configuration |

## Technologies Used

- **Framework**: Next.js 15
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS 3.4
- **Fonts**: Google Fonts (Bricolage Grotesque, Inter Tight, JetBrains Mono)
- **Runtime**: Node.js 18+
- **Package Manager**: npm

## Troubleshooting

### Port 3000 already in use
```bash
npm run dev -- -p 3001
```

### TypeScript errors
```bash
npx tsc --noEmit
```

### Build fails
```bash
rm -rf .next node_modules
npm install
npm run build
```

## Future Enhancements

- [ ] Add image optimization with Next.js Image
- [ ] Implement dynamic routing for services
- [ ] Add booking form with validation
- [ ] Integrate CMS for content management
- [ ] Add analytics tracking
- [ ] Implement dark mode toggle
- [ ] Add email notifications
- [ ] Mobile app version

## License

All design assets and code © 2026 Pristine Detailers. Not for commercial use without permission.

---

**Questions or issues?** Check the Next.js docs at https://nextjs.org/docs
