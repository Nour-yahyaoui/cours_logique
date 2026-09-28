<div align="center">

# ⊢ CourHub

**Des PDF de cours transformés en pages web lisibles, avec suivi de progression — 100% statique, aucun compte, aucun serveur.**

[Voir le site](https://nour-yahyaoui.github.io/cours_logique/) · [Dépôt](https://github.com/nour-yahyaoui/cours_logique) · [Auteur](https://github.com/nour-yahyaoui)

</div>

---

## Qu'est-ce que c'est

CourHub prend des supports de cours en PDF (diapositives, notes) et les
transforme en pages web propres et lisibles, chapitre par chapitre. Chaque
chapitre se lit comme un diaporama — une section à la fois, avec navigation
Précédent/Suivant — et garde en mémoire (dans le navigateur, via
`localStorage`) ce que tu as déjà terminé, pour que tu puisses reprendre
exactement là où tu t'es arrêté.

Aucun compte à créer, aucune base de données, aucun serveur à héberger :
tout est stocké chez toi, dans ton navigateur.

## Fonctionnalités

- 📖 **Lecture par section** — un chapitre se parcourt une section à la fois (comme un diaporama), pas en scroll continu.
- ✅ **Suivi de progression** — chaque section peut être marquée comme terminée ; la progression (par chapitre et globale) est visible sur la page d'accueil.
- 🌓 **Thème clair / sombre** — au choix, mémorisé d'une visite à l'autre.
- 📊 **Suivi dans le temps** — un petit compteur distingue ce que tu as terminé aujourd'hui de ce que tu avais déjà fait avant.
- 🧪 **Section TPs** — chaque matière peut avoir des travaux pratiques (`"tps"` dans `db.json`), avec questions, réponses sauvegardées dans le navigateur et corrections dépliables.
- 🧩 **Extensible sans backend** — les matières et chapitres sont listés dans `data/db.json` ; ajouter un cours ne demande pas de toucher au code de la page d'accueil.
- 🤖 **Prompt réutilisable** — `prompt.md` contient un prompt prêt à l'emploi pour convertir un nouveau PDF de cours en chapitre CourHub, dans les mêmes conventions.
- ⚡ **Zéro dépendance lourde** — HTML + Tailwind (via CDN) + JavaScript vanilla. Pas de framework, pas d'étape de build.

## Cours disponibles

| Matière | Cours | TPs |
|---|---|---|
| Logiques formelles | Chapitre 1 — Introduction à la logique | — |
| Technologies Multimédias | Chapitre 1 — Théorie et traitement des signaux | TP 1 — Prise en main de MATLAB et représentation des signaux |

## Structure du dépôt

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
│   ├── index-1.html                  ← Technologies Multimédias, chapitre 1
│   └── tp-1.html                     ← Technologies Multimédias, TP 1 (MATLAB)
├── prompt.md                         ← prompt à réutiliser pour convertir un futur PDF en chapitre
├── .gitattributes                    ← force des fins de ligne LF cohérentes
└── .nojekyll                         ← désactive le traitement Jekyll de GitHub Pages
```

Tous les liens (`assets/theme.css`, `data/db.json`, `logique_formelle/index-1.html`,
`../assets/app.js`, etc.) sont **relatifs**, donc le site fonctionne aussi bien
à la racine d'un domaine (`username.github.io`) que dans un sous-dossier de
projet (`username.github.io/nom-du-depot`) — aucune modification de chemin
n'est nécessaire selon l'endroit où tu déploies.

## Tester en local

Ouvrir `index.html` directement (`file://`) ne fonctionne **pas** pour le
`fetch('data/db.json')` (restriction CORS des navigateurs sur les fichiers
locaux). Utilise un petit serveur local :

```bash
python3 -m http.server 8000
# puis ouvre http://localhost:8000
```

## Déployer sur GitHub Pages

1. Crée un dépôt GitHub (public, ou privé avec un plan payant — Pages
   nécessite un dépôt public sur le plan gratuit).
2. Mets **le contenu de ce dossier directement à la racine du dépôt**
   (pas dans un sous-dossier interne), puis commit et push sur `main`.
3. Dans le dépôt : **Settings → Pages**.
4. Sous « Build and deployment » → Source : **Deploy from a branch**.
5. Branche : `main`, dossier : `/ (root)`. Enregistre.
6. Après une minute ou deux, le site est en ligne à
   `https://<ton-nom-utilisateur>.github.io/<nom-du-depot>/`.

Aucune Action GitHub, aucun build, aucune variable d'environnement à
configurer — Pages sert les fichiers tels quels.

## Ajouter un nouveau chapitre / une nouvelle matière

Voir [`prompt.md`](./prompt.md) — c'est le prompt à recoller (avec un nouveau
PDF de cours en pièce jointe) pour générer une page qui suit les mêmes
conventions, plus l'entrée `db.json` correspondante. Le prompt demande
lui-même les informations manquantes (matière, enseignant, établissement…)
avant de générer quoi que ce soit.

## Stack technique

- **HTML5** — une page par chapitre, contenu structuré en sections.
- **[Tailwind CSS](https://tailwindcss.com/)** via CDN — pas de build, pas de config à compiler.
- **JavaScript vanilla** — thème, progression et pagination dans `assets/app.js`, partagé par toutes les pages.
- **`localStorage`** — seule "base de données" du site ; rien ne quitte le navigateur.

## Licence

Aucune licence définie pour l'instant — tous droits réservés par défaut.
Si tu veux que d'autres puissent réutiliser ou forker ce projet, ajoute un
fichier `LICENSE` (MIT est un bon choix par défaut pour ce type de projet).

## Auteur

**Nour Yahyaoui** — [github.com/nour-yahyaoui](https://github.com/nour-yahyaoui)
