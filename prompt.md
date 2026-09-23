# Prompt — convertir un nouveau PDF en chapitre CourHub

Colle ce prompt (avec le PDF en pièce jointe) à chaque fois que tu veux ajouter
un nouveau chapitre ou une nouvelle matière à CourHub.

---

Tu es un développeur web avec 10 ans d'expérience, spécialisé en HTML et
TailwindCSS, et dans la transformation de supports de cours en cours web.

Voici un PDF de cours. Transforme-le en une page HTML statique qui suit
**exactement** les conventions déjà utilisées dans le projet CourHub
(`logique_formelle/index-1.html` est la page de référence à imiter — même
structure, mêmes classes, même ambiance visuelle « papier / encre / or »).

## Ce que je te donne
- Le PDF du cours.
- (Si je les connais) : le nom de la matière, le numéro/titre du chapitre,
  l'établissement, l'enseignant·e, l'année universitaire, le code Google
  Classroom.

## Ce que tu dois produire

1. **Une page HTML** dans un dossier au nom de la matière (slug en
   minuscules, underscores — ex. `logique_formelle/`), nommée
   `index-N.html` où `N` est le numéro du chapitre.
   - Reprend la structure de la page de référence : bandeau mobile,
     sidebar avec plan du chapitre + progression + toggle de thème, héros,
     sections numérotées `<section id="sec-N" class="course-section mb-16 scroll-mt-24">`,
     pied de page avec les infos du cours.
   - Découpe le contenu du PDF en sections logiques, une par grande idée —
     pas une par diapositive.
   - Reformule et clarifie plutôt que copier tel quel ; ajoute des exemples
     complémentaires quand une notion est difficile.
   - Représente les schémas, formules et notations mathématiques dans des
     blocs clairs (`<div class="formula">…</div>`, tableaux, `<sup>`/`<sub>`,
     symboles Unicode ⇒ ⇔ ∧ ∨ ¬ ∀ ∃ ⊢, etc.) plutôt qu'en images.
   - Repère les **2 ou 3 points les plus difficiles** du chapitre et ajoute
     juste après, un widget `<details class="ai-question">` avec une
     question qu'un étudiant se poserait probablement, suivie de sa réponse.
   - Inclut `<link rel="stylesheet" href="../assets/theme.css">` et, en bas
     de page, `<script src="../assets/app.js"></script>` puis
     `Courhub.initReader('<id-unique-du-chapitre>', [ /* liste des id de sections */ ])`.
   - La page se lit **une section à la fois** (comme un diaporama), pas en
     scroll continu. Pour ça : donne à la balise `<header>` (le écran
     d'accueil du chapitre) l'`id="accueil"`, à `<article>` l'
     `id="reader-article"`, à `<footer>` l'`id="page-footer"` ; ajoute
     dans `<article>`, juste avant la première section, un petit indicateur
     `Section <span data-page-index></span> / <span data-page-total></span>`,
     et juste après la dernière section, deux boutons
     `<button data-page-prev>` / `<button data-page-next>` (avec un
     `<span data-page-nav-label>` à l'intérieur pour le titre de la section
     voisine). Termine par
     `Courhub.initPaginator('<id-unique-du-chapitre>', ['accueil', ...idsDesSections], { articleId: 'reader-article', footerId: 'page-footer' })`.

2. **Une entrée dans `data/db.json`** : ajoute le chapitre dans la matière
   correspondante (crée la matière si elle n'existe pas encore), avec son
   `id`, son `title`, son `path`, et la liste de ses `sections` (`id` +
   `title`) — cette liste doit correspondre exactement aux `id` des
   `<section>` de la page HTML, dans le même ordre.

3. Un aperçu en 2-3 lignes de comment tu as découpé le chapitre, pour que
   je puisse vérifier avant de committer.

## Si des informations manquent

Le PDF ne donne pas toujours tout. Si tu ne trouves pas dans le document
l'une de ces informations, **demande-les moi avant de commencer** plutôt
que d'inventer :
- Nom de la matière et numéro/titre du chapitre.
- Établissement, niveau (ex. Licence 1 Info), année universitaire.
- Nom de l'enseignant·e et son contact (email, code Classroom…).
- Le chapitre s'ajoute à une matière déjà existante dans `db.json`, ou
  c'est une toute nouvelle matière ?

## Contraintes techniques (ne pas casser)

- Site 100% statique, pensé pour GitHub Pages — pas de backend, pas de
  build step.
- Toute la progression (sections lues/terminées, thème choisi) vit dans
  `localStorage`, via `assets/app.js` — ne réinvente pas ce mécanisme,
  réutilise `Courhub.initReader(...)` et `Courhub.initTheme()`.
- TailwindCSS via CDN (`cdn.tailwindcss.com`), pas de compilation.
- Toujours en français.
