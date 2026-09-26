# CourHub

Site 100% statique (HTML + Tailwind CDN + JS vanilla, aucun framework, aucun
build step). Toute la progression et le thème sont stockés dans
`localStorage` du navigateur — pas de backend.

**Dépôt** : [github.com/nour-yahyaoui/cours_logique](https://github.com/nour-yahyaoui/cours_logique)
**Auteur** : [github.com/nour-yahyaoui](https://github.com/nour-yahyaoui)

## Structure

```
.
├── index.html                        ← page d'accueil (liste des matières/chapitres)
├── data/
│   └── db.json                       ← matières / chapitres / sections
├── assets/
│   ├── app.js                        ← thème + suivi de progression + pagination (partagé)
│   └── theme.css                     ← styles clair/sombre + progression
├── logique_formelle/
│   └── index-1.html                  ← Logiques formelles, chapitre 1
├── technologies_multimedias/
│   └── index-1.html                  ← Technologies Multimédias, chapitre 1
├── prompt.md                         ← prompt à réutiliser pour convertir un futur PDF en chapitre
├── .gitattributes                    ← force des fins de ligne LF cohérentes
└── .nojekyll                         ← désactive le traitement Jekyll de GitHub Pages
```

Tous les liens (`assets/theme.css`, `data/db.json`, `logique_formelle/index-1.html`,
`../assets/app.js`, etc.) sont **relatifs**, donc le site fonctionne aussi bien
à la racine d'un domaine (`username.github.io`) que dans un sous-dossier de
projet (`username.github.io/courhub`) — aucune modification de chemin n'est
nécessaire selon l'endroit où tu déploies.

## Déployer sur GitHub Pages

1. Crée un dépôt GitHub (public, ou privé avec un plan payant — Pages
   nécessite un dépôt public sur le plan gratuit).
2. Mets **le contenu de ce dossier directement à la racine du dépôt**
   (pas dans un sous-dossier `courhub/` à l'intérieur du dépôt), puis commit
   et push sur la branche `main`.
3. Dans le dépôt : **Settings → Pages**.
4. Sous « Build and deployment » → Source : **Deploy from a branch**.
5. Branche : `main`, dossier : `/ (root)`. Enregistre.
6. Après une minute ou deux, le site est en ligne à
   `https://<ton-nom-utilisateur>.github.io/<nom-du-depot>/`.

Aucune Action GitHub, aucun build, aucune variable d'environnement à
configurer — Pages sert les fichiers tels quels.

## Tester en local avant de pousser

Ouvrir `index.html` directement (`file://`) ne fonctionne **pas** pour le
`fetch('data/db.json')` (restriction CORS des navigateurs sur les fichiers
locaux). Utilise un petit serveur local :

```bash
python3 -m http.server 8000
# puis ouvre http://localhost:8000
```

## Ajouter un nouveau chapitre / une nouvelle matière

Voir `prompt.md` — c'est le prompt à recoller avec un nouveau PDF de cours
pour générer une page qui suit les mêmes conventions et l'entrée `db.json`
correspondante.
