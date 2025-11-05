# Ads Quality Rater - Frontend

Next.js 14 Frontend für den KI-basierten Quality Rater.

## Features

- 🎨 **Modern UI** mit Tailwind CSS
- ⚡ **Next.js 14** App Router
- 🎯 **TypeScript** für Type Safety
- 📊 **Interactive Charts** mit Recharts
- 🔄 **Real-time API** Integration
- 📱 **Responsive Design**

## Tech Stack

- **Framework:** Next.js 14
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **HTTP Client:** Axios
- **TypeScript:** 5.x

## Setup

### 1. Dependencies installieren

```bash
cd frontend
npm install
```

### 2. Environment-Variablen

```bash
cp .env.local.example .env.local
```

Editiere `.env.local`:
```bash
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### 3. Development Server starten

```bash
npm run dev
```

Frontend läuft auf: http://localhost:3000

## Komponenten-Übersicht

### UI-Komponenten (`components/ui/`)
- `Button` - Primary/Secondary/Outline Buttons
- `Card` - Container mit Header/Content
- `Input` - Text-Inputs mit Validation
- `Textarea` - Multi-line Text Inputs
- `Label` - Form Labels
- `Tabs` - Tab Navigation

### Feature-Komponenten (`components/`)
- `AnalysisForm` - Input-Formular für neue Analysen
- `ResultsView` - Haupt-Ergebnis-Anzeige
- `BrandComplianceTab` - Brand-Konformitäts-Details
- `CopywritingTab` - Copywriting-Analyse-Details
- `VisualTab` - Visuelle Analyse-Details

### Pages (`app/`)
- `page.tsx` - Homepage mit Form/Results-Toggle
- `layout.tsx` - Root Layout mit Fonts & Metadata

## Verwendung

1. **Analyse starten:**
   - Ad-URL eingeben
   - Landingpage-URL eingeben
   - Optional: Brand Guidelines als JSON
   - "Analyse starten" klicken

2. **Ergebnisse ansehen:**
   - Overall Score (groß angezeigt)
   - Score Breakdown (Visual, Copywriting, Brand)
   - Details in Tabs

3. **JSON Export:**
   - Download-Button im Results-Header
   - Vollständiger Report als JSON

## API-Integration

Der API-Client (`lib/api.ts`) kommuniziert mit dem Backend:

```typescript
import { apiClient } from "@/lib/api";

// Analyse starten
const response = await apiClient.analyzeAd({
  ad_url: "https://...",
  landing_page_url: "https://...",
  brand_guidelines: {...}
});
```

## Styling

Das Frontend nutzt das **flin-Design-System**:

```css
/* Farben */
--primary: #FF6B35  /* flin Orange */
--secondary: #004E89 /* flin Blau */
--accent: #F7B32B   /* flin Gelb */
```

### Score-Farbcodierung
- **Grün (≥ 80):** Sehr gut
- **Gelb (60-79):** Gut
- **Rot (< 60):** Verbesserungsbedarf

## Build & Deployment

### Production Build

```bash
npm run build
npm start
```

### Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Environment-Variablen in Vercel

Im Vercel Dashboard setzen:
- `NEXT_PUBLIC_API_URL` → Backend-URL (z.B. Cloud Run URL)

## Development

### Code-Style

```bash
# Linting
npm run lint

# Type-Checking
npx tsc --noEmit
```

### Komponente hinzufügen

1. Erstelle neue Datei in `components/`
2. Nutze TypeScript für Props
3. Importiere UI-Komponenten aus `@/components/ui`
4. Verwende Tailwind CSS für Styling

**Beispiel:**
```tsx
import { Card, CardHeader, CardTitle } from "@/components/ui/card";

interface MyComponentProps {
  title: string;
}

export default function MyComponent({ title }: MyComponentProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
    </Card>
  );
}
```

## Troubleshooting

### "Cannot find module '@/...'"

TypeScript-Paths in `tsconfig.json` prüfen:
```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

### API-Verbindung fehlgeschlagen

1. Backend läuft auf Port 8000?
   ```bash
   curl http://localhost:8000/health
   ```

2. CORS konfiguriert im Backend?
   ```python
   allow_origins=["http://localhost:3000"]
   ```

3. `.env.local` korrekt?
   ```bash
   NEXT_PUBLIC_API_URL=http://localhost:8000
   ```

## Performance

- **Initial Load:** < 2 Sekunden (Lighthouse Score ≥ 90)
- **Time to Interactive:** < 3 Sekunden
- **Bundle Size:** Optimiert durch Next.js Code Splitting

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT

---

**Status:** ✅ Frontend vollständig implementiert
**Nächster Schritt:** `npm install && npm run dev`
