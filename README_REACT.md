# 🎨 Cité Poisson-Chair - Site React

Ce projet est une migration du site HTML/CSS original vers **React** avec **Vite** et **React Router**.

## 📋 Contenu du site

- **Accueil** (`/`) — Navigation latérale avec présentation du collectif et couvertures de projets
- **Prestations** (`/prestations`) — Page avec vidéo hero et carrousels horizontaux (Photos, Lives, Clips)
- **Buddy System n°1** (`/buddy-1`) — Projet avec description et galerie d'images
- **Station Soleil Bleu** (`/projet/station-soleil-bleu`) — Projet clip avec description et images
- **Photos, Captations, Clips** — Pages placeholder à remplir

---

## 🚀 Démarrage rapide

### Installation des dépendances
```bash
npm install
```

### Lancer en développement
```bash
npm run dev
```
Accède à `http://localhost:5173`

### Build pour production
```bash
npm run build
```
Génère le dossier `dist/` prêt pour Netlify

### Preview du build
```bash
npm run preview
```

---

## 📁 Structure du projet

```
src/
├── pages/
│   ├── Home.tsx                    # Accueil
│   ├── Prestations.tsx             # Page prestations
│   ├── BuddySystem1.tsx            # Projet Buddy System n°1
│   ├── StationSoleilBleu.tsx       # Projet Station Soleil Bleu
│   ├── Photos.tsx                  # Placeholder
│   ├── Captations.tsx              # Placeholder
│   └── Clips.tsx                   # Placeholder
│
├── components/
│   ├── Sidebar.tsx                 # Navigation latérale (accueil)
│   ├── Logo.tsx                    # Logo CPC fixe (prestations)
│   ├── VideoHero.tsx               # Section vidéo YouTube
│   ├── ImageCarousel.tsx           # Carrousel horizontal
│   └── CoverImage.tsx              # Image couverture cliquable
│
├── styles/
│   ├── global.css                  # Styles globaux + polices
│   ├── Home.css                    # Styles accueil
│   ├── Prestations.css             # Styles prestations
│   └── ProjectPage.css             # Styles pages projets
│
├── App.tsx                         # Routing principal
└── main.tsx                        # Point d'entrée
```

---

## 🎯 Fonctionnalités principales

### ✅ Implémentées
- Navigation par React Router (client-side)
- Responsive design (mobile & desktop)
- Polices personnalisées (Yatra One, Harmattan, Bangers)
- Carrousels avec scroll wheel → scroll horizontal
- Fond sombre (rgb(15,15,15)) avec texte blanc
- Images couvertures cliquables
- Vidéo YouTube hero section

### 📝 À faire (placeholder)
- Remplir les pages Photos, Captations, Clips
- Ajouter du contenu aux descriptions des projets
- Potentiellement intégrer des vraies vidéos YouTube

---

## 🔧 Technologies utilisées

- **React 19** — Framework UI
- **Vite 8** — Build tool ultra-rapide
- **React Router 7** — Routing côté client
- **TypeScript** — Type safety
- **CSS3** — Styling moderne

---

## 🌐 Déploiement sur Netlify

### Configuration requise

**Build command:**
```
npm run build
```

**Publish directory:**
```
dist
```

**Fichier `_redirects`:** ✅ Déjà créé dans `public/`

Voir `NETLIFY_SETUP.md` pour plus de détails.

---

## 📦 Dépendances

```json
{
  "react": "^19.2.5",
  "react-dom": "^19.2.5",
  "react-router-dom": "^7.14.2"
}
```

---

## 🐛 Troubleshooting

### Images ne s'affichent pas
- Vérifier que les fichiers existent dans `public/images/`, `public/fonts/`, `public/prestationscontenu/`
- Vérifier les chemins dans les composants (doivent commencer par `/`)

### Routes renvoyant 404 en production
- Vérifier que `public/_redirects` existe
- Vérifier la configuration Netlify (publish directory = `dist`)

### Port 5173 déjà utilisé
```bash
npm run dev -- --port 3000
```

---

## 📞 Contact

Cité Poisson-Chair — Collectif artistique basé à Lyon

---

**Dernier update:** 2026-04-22
