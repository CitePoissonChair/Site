# Configuration Netlify pour CPC React

## Commandes principales

### Développement local
```bash
npm run dev
```
Lance le serveur de développement sur `http://localhost:5173`

### Build pour production
```bash
npm run build
```
Compile le projet React en fichiers statiques dans le dossier `dist/`

### Preview du build local
```bash
npm run preview
```
Teste le build de production localement

---

## Configuration Netlify

### 1. **Build Command**
```
npm run build
```

### 2. **Publish Directory**
```
dist
```

### 3. **Node.js Version**
Recommandé : Node.js 18 LTS ou supérieur

---

## Fichier _redirects

Le fichier `public/_redirects` est **crucial** pour React Router. Il redirige toutes les URLs vers `index.html` pour que React Router puisse gérer le routage côté client.

```
/*    /index.html   200
```

Ce fichier est automatiquement copié dans le dossier `dist/` au moment du build.

---

## Structure du projet

```
.
├── src/
│   ├── pages/          # Pages React
│   ├── components/     # Composants réutilisables
│   ├── styles/         # Fichiers CSS
│   ├── App.tsx         # Composant principal avec routing
│   └── main.tsx        # Point d'entrée
├── public/
│   ├── images/         # Images du site
│   ├── fonts/          # Polices personnalisées
│   ├── prestationscontenu/  # Images des prestations
│   └── _redirects      # Configuration Netlify
├── package.json        # Dépendances et scripts
└── vite.config.ts      # Configuration Vite
```

---

## Routes disponibles

- `/` — Accueil
- `/prestations` — Page prestations
- `/buddy-1` — Projet Buddy System n°1
- `/projet/station-soleil-bleu` — Projet Station Soleil Bleu
- `/photos` — Galerie photos (placeholder)
- `/captations` — Captations (placeholder)
- `/clips` — Clips (placeholder)

---

## Troubleshooting

### ❌ Erreur 404 sur les routes autres que `/`
**Solution:** Vérifier que le fichier `public/_redirects` existe et contient la bonne règle.

### ❌ Assets manquants (images, fonts)
**Solution:** Vérifier que les dossiers `images/`, `fonts/`, et `prestationscontenu/` existent dans `public/`

### ❌ Port 5173 déjà utilisé
**Solution:** Utiliser un port différent :
```bash
npm run dev -- --port 3000
```

---

## Déploiement

1. Push le code sur GitHub
2. Connecte ton repo sur Netlify
3. Configure les paramètres de build comme indiqué ci-dessus
4. Déploie !

Le site sera automatiquement reconstruit à chaque push.
