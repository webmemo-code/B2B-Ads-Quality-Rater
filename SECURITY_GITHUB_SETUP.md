# 🔒 GitHub Security Setup - Kritische Hinweise

## ⚠️ KRITISCH: Vor dem ersten Push

### 1. API-Keys und Secrets NIEMALS hochladen

**Diese Dateien enthalten echte API-Keys und dürfen NICHT auf GitHub:**

```bash
❌ backend/.env                    # Enthält echten GEMINI_API_KEY!
❌ frontend/.env.local             # Kann sensible URLs enthalten
❌ *.log Dateien                   # Können sensible Daten in Logs haben
❌ venv/, node_modules/            # Dependencies (zu groß)
```

**Diese Dateien sind sicher für GitHub:**

```bash
✅ backend/.env.example            # Nur Platzhalter-Werte
✅ frontend/.env.local.example     # Nur Beispielwerte
✅ .gitignore                      # Schützt sensible Dateien
```

---

## 📋 Setup-Checkliste

### ✅ Bereits erledigt:

1. ✅ **Umfassende .gitignore erstellt**
   - Schützt `.env` Dateien
   - Ignoriert `venv/`, `node_modules/`, `.next/`
   - Filtert Log-Dateien und temporäre Dateien
   - Blockiert IDE-Konfigurationen

2. ✅ **Git Repository initialisiert**
   ```bash
   git init
   ```

3. ✅ **.env.example Dateien aktualisiert**
   - Enthalten nur Platzhalter-Werte
   - Keine echten API-Keys
   - Dokumentieren alle benötigten Variablen

4. ✅ **Dry-Run Test erfolgreich**
   - Keine sensiblen Dateien werden hinzugefügt
   - 77 Dateien bereit für Commit

---

## 🚀 GitHub Upload - Schritt für Schritt

### Schritt 1: Finale Prüfung

```bash
# Prüfe, ob .env Dateien NICHT im Staging sind
git status

# Stelle sicher, dass diese Dateien IGNORED werden:
git check-ignore backend/.env frontend/.env.local
# Output sollte sein:
# backend/.env
# frontend/.env.local
```

### Schritt 2: Ersten Commit erstellen

```bash
# Stage alle Dateien (sensible Dateien sind bereits ignoriert)
git add .

# Commit mit aussagekräftiger Message
git commit -m "Initial commit: LinkedIn B2B Ads Quality Rater

- Multi-agent system with CrewAI
- Gemini 2.5 Flash Vision integration
- Next.js 16 chat interface with real-time streaming
- LinkedIn B2B best practices implemented
- File upload support for ad images
- Concrete text suggestions with multiple options
- Target audience and campaign goal inputs"
```

### Schritt 3: GitHub Repository erstellen

**Option A: Via GitHub Website**
1. Gehe zu https://github.com/new
2. Repository Name: `ads-quality-rater`
3. Beschreibung: "KI-basierter LinkedIn B2B Ad Quality Analyzer mit CrewAI und Gemini Vision"
4. Wähle **Private** (empfohlen für Business-Projekte)
5. **NICHT** "Initialize with README" auswählen (haben wir schon)
6. Klicke "Create repository"

**Option B: Via GitHub CLI**
```bash
gh repo create ads-quality-rater --private --source=. --remote=origin
```

### Schritt 4: Remote hinzufügen und pushen

```bash
# Remote URL hinzufügen (ersetze YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/ads-quality-rater.git

# Oder mit SSH:
# git remote add origin git@github.com:YOUR_USERNAME/ads-quality-rater.git

# Branch umbenennen zu main (falls nötig)
git branch -M main

# Ersten Push
git push -u origin main
```

---

## 🔐 Secrets Management auf GitHub

### GitHub Secrets einrichten (für CI/CD später)

Falls du GitHub Actions nutzen möchtest:

1. Gehe zu deinem Repository auf GitHub
2. Settings → Secrets and variables → Actions
3. Klicke "New repository secret"
4. Füge hinzu:
   - Name: `GEMINI_API_KEY`
   - Value: Dein echter Gemini API Key

**Dann in GitHub Actions Workflow:**
```yaml
env:
  GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
```

---

## 🛡️ Was passiert, wenn ein Secret versehentlich gepusht wurde?

**SOFORT handeln:**

```bash
# 1. Key sofort invalidieren (in Google AI Studio)
# 2. Neuen Key erstellen
# 3. History bereinigen mit BFG Repo Cleaner oder git-filter-branch
# 4. Force-Push (nur wenn niemand sonst den Code hat!)
```

**Besser: Verhindern mit Pre-Commit Hook:**

```bash
# In .git/hooks/pre-commit
#!/bin/sh
if grep -r "AIzaSy" backend/src/ frontend/; then
    echo "❌ FEHLER: Möglicher API-Key im Code gefunden!"
    exit 1
fi
```

---

## 📝 Lokales Setup für andere Entwickler

**Nach dem Klonen:**

```bash
# 1. Repository klonen
git clone https://github.com/YOUR_USERNAME/ads-quality-rater.git
cd ads-quality-rater

# 2. Backend Setup
cd backend
cp .env.example .env
# WICHTIG: .env bearbeiten und echten GEMINI_API_KEY einfügen!

python -m venv venv
source venv/bin/activate  # macOS/Linux
pip install -r requirements.txt
playwright install chromium

# 3. Frontend Setup
cd ../frontend
cp .env.local.example .env.local
npm install

# 4. Server starten (in separaten Terminals)
# Terminal 1:
cd backend && source venv/bin/activate && uvicorn src.api.main:app --reload --port 8000

# Terminal 2:
cd frontend && npm run dev
```

---

## 🔍 Regelmäßige Security-Checks

### 1. Vor jedem Commit:

```bash
# Prüfe, was committed wird
git status
git diff --cached

# Suche nach möglichen Secrets
git diff --cached | grep -i "api.*key\|secret\|password\|token"
```

### 2. Periodisch:

```bash
# Suche nach versehentlich getracten .env Dateien
git ls-files | grep ".env$"
# Output sollte leer sein!

# Falls etwas gefunden wird:
git rm --cached backend/.env
git commit -m "Remove accidentally tracked .env file"
```

---

## 📊 Aktuelle Dateien-Übersicht

### Wird hochgeladen (77 Dateien):
- ✅ Alle Python Source-Dateien (`backend/src/`)
- ✅ Alle TypeScript/React Dateien (`frontend/`)
- ✅ Konfigurationsdateien (`requirements.txt`, `package.json`)
- ✅ Dokumentation (`README.md`, `PRD.md`, `PLANNING.md`)
- ✅ `.env.example` Dateien (nur Platzhalter)
- ✅ Tests (`backend/tests/`)

### Wird NICHT hochgeladen (durch .gitignore):
- ❌ `backend/.env` (enthält echten API-Key)
- ❌ `frontend/.env.local`
- ❌ `backend/venv/` (72 MB Dependencies)
- ❌ `frontend/node_modules/` (ca. 500 MB)
- ❌ `frontend/.next/` (Build-Artefakte)
- ❌ `*.log` Dateien
- ❌ `.DS_Store`, `.vscode/`, `.idea/`
- ❌ `__pycache__/`, `*.pyc`

---

## ⚡ Quick Commands Cheat Sheet

```bash
# Status prüfen
git status

# Was würde committed werden?
git diff --cached

# Einzelne Datei aus Staging entfernen
git reset HEAD <file>

# .gitignore Test für spezifische Datei
git check-ignore -v backend/.env

# Alle ignorierten Dateien anzeigen
git status --ignored

# Repository Größe prüfen
du -sh .git
```

---

## 🎯 Nächste Schritte

1. ✅ **Finale Prüfung durchführen**
   ```bash
   git status
   git check-ignore backend/.env frontend/.env.local
   ```

2. ✅ **Ersten Commit erstellen**
   ```bash
   git add .
   git commit -m "Initial commit: LinkedIn B2B Ads Quality Rater"
   ```

3. ⏳ **GitHub Repository erstellen** (via Website oder CLI)

4. ⏳ **Remote hinzufügen und pushen**
   ```bash
   git remote add origin <YOUR_REPO_URL>
   git push -u origin main
   ```

5. ⏳ **Repository auf Private stellen** (empfohlen)

6. ⏳ **README.md auf GitHub prüfen** (Markdown-Rendering)

---

## 📞 Support

Bei Fragen zu Git/GitHub Security:
- GitHub Security Best Practices: https://docs.github.com/en/code-security
- API-Keys sicher speichern: https://docs.github.com/en/actions/security-guides/encrypted-secrets

---

**Status:** ✅ Bereit für GitHub Upload
**Letzte Prüfung:** 2025-11-05
**Sensible Dateien geschützt:** ✅
**77 Dateien bereit für Commit:** ✅
