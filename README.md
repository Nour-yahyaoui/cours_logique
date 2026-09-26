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
- 🧩 **Extensible sans backend** — les matières et chapitres sont listés dans `data/db.json` ; ajouter un cours ne demande pas de toucher au code de la page d'accueil.
- 🤖 **Prompt réutilisable** — `prompt.md` contient un prompt prêt à l'emploi pour convertir un nouveau PDF de cours en chapitre CourHub, dans les mêmes conventions.
- ⚡ **Zéro dépendance lourde** — HTML + Tailwind (via CDN) + JavaScript vanilla. Pas de framework, pas d'étape de build.


**Nour Yahyaoui** — [github.com/nour-yahyaoui](https://github.com/nour-yahyaoui)
