/* ============ CourHub — app.js ============
   Petite couche localStorage : thème clair/sombre + suivi de progression
   par section, par chapitre. Aucun backend, tout vit dans le navigateur. */
(function () {
  const THEME_KEY = 'courhub:theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    try { localStorage.setItem(THEME_KEY, theme); } catch (e) {}
  }

  function initTheme() {
    let saved = 'light';
    try { saved = localStorage.getItem(THEME_KEY) || 'light'; } catch (e) {}
    applyTheme(saved);
    document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
      btn.addEventListener('click', () => {
        const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
      });
    });
  }

  function progressKey(chapterId) { return 'courhub:progress:' + chapterId; }

  function getProgress(chapterId) {
    try { return JSON.parse(localStorage.getItem(progressKey(chapterId))) || {}; }
    catch (e) { return {}; }
  }

  function saveProgress(chapterId, data) {
    try { localStorage.setItem(progressKey(chapterId), JSON.stringify(data)); } catch (e) {}
  }

  function toggleSection(chapterId, sectionId) {
    const data = getProgress(chapterId);
    if (data[sectionId] && data[sectionId].done) {
      delete data[sectionId];
    } else {
      data[sectionId] = { done: true, ts: Date.now() };
    }
    saveProgress(chapterId, data);
    return data;
  }

  function computeStats(data, totalSections) {
    const doneEntries = Object.values(data).filter((v) => v && v.done);
    const done = doneEntries.length;
    const pct = totalSections ? Math.round((done / totalSections) * 100) : 0;
    const todayStr = new Date().toDateString();
    let today = 0;
    doneEntries.forEach((v) => { if (new Date(v.ts).toDateString() === todayStr) today++; });
    return { done, total: totalSections, pct, today, before: done - today };
  }

  // Reads every chapter's progress declared in a db.json-like structure,
  // used by the dashboard (index.html) to show overall stats.
  function computeOverallStats(chapters) {
    let done = 0, total = 0;
    chapters.forEach((ch) => {
      const data = getProgress(ch.id);
      total += (ch.sections || []).length;
      done += Object.values(data).filter((v) => v && v.done).length;
    });
    const pct = total ? Math.round((done / total) * 100) : 0;
    return { done, total, pct };
  }

  function initReader(chapterId, sectionIds) {
    const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

    function refreshAll() {
      const data = getProgress(chapterId);
      sections.forEach((sec) => {
        const isDone = !!(data[sec.id] && data[sec.id].done);
        sec.classList.toggle('is-done', isDone);
        const btn = sec.querySelector(':scope > .section-check');
        if (btn) btn.classList.toggle('is-done', isDone);
      });
      const stats = computeStats(data, sectionIds.length);
      document.querySelectorAll('[data-progress-fill]').forEach((el) => { el.style.width = stats.pct + '%'; });
      document.querySelectorAll('[data-progress-pct]').forEach((el) => { el.textContent = stats.pct + '%'; });
      document.querySelectorAll('[data-progress-count]').forEach((el) => { el.textContent = stats.done + '/' + stats.total; });
      document.querySelectorAll('[data-progress-today]').forEach((el) => { el.textContent = String(stats.today); });
      document.querySelectorAll('[data-progress-before]').forEach((el) => { el.textContent = String(stats.before); });
    }

    sections.forEach((sec) => {
      sec.classList.add('course-section');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'section-check';
      btn.setAttribute('aria-label', 'Marquer cette section comme terminée');
      btn.innerHTML = '<span class="check-icon">✓</span><span>Terminé</span>';
      sec.insertBefore(btn, sec.firstChild);
      btn.addEventListener('click', () => {
        toggleSection(chapterId, sec.id);
        refreshAll();
      });
    });

    refreshAll();
    initTheme();
  }

  // ============ Paginator ============
  // Turns a long single-page course into a "one section per screen" reader,
  // entirely client-side: no extra HTML files, just show/hide + history API.
  // pageIds: ordered list of element ids representing "pages" (a cover/hero
  // id first, then one id per course section). articleId/footerId are the
  // wrapper shown only while browsing sections, and the block revealed only
  // on the last page, respectively — both optional.
  function initPaginator(chapterId, pageIds, opts) {
    opts = opts || {};
    const coverId = pageIds[0];
    const lastId = pageIds[pageIds.length - 1];
    const article = opts.articleId ? document.getElementById(opts.articleId) : null;
    const footer = opts.footerId ? document.getElementById(opts.footerId) : null;
    const pageKey = 'courhub:page:' + chapterId;
    const navLinks = Array.from(document.querySelectorAll('.navlink'));

    function titleFor(id) {
      const link = navLinks.find((a) => a.getAttribute('href') === '#' + id);
      return link ? link.textContent.trim() : (id === coverId ? 'Accueil' : id);
    }

    function currentFromLocation() {
      const hashId = (location.hash || '').replace('#', '');
      if (pageIds.includes(hashId)) return hashId;
      let saved = null;
      try { saved = localStorage.getItem(pageKey); } catch (e) {}
      if (saved && pageIds.includes(saved)) return saved;
      return coverId;
    }

    function render(id, pushHistory) {
      pageIds.forEach((pid) => {
        const el = document.getElementById(pid);
        if (el) el.style.display = pid === id ? '' : 'none';
      });
      if (article) article.style.display = id === coverId ? 'none' : '';
      if (footer) footer.style.display = id === lastId ? '' : 'none';

      navLinks.forEach((a) => a.removeAttribute('data-active'));
      const activeLink = navLinks.find((a) => a.getAttribute('href') === '#' + id);
      if (activeLink) activeLink.setAttribute('data-active', 'true');

      const idx = pageIds.indexOf(id); // coverId counts as "0", first section as "1"
      const total = pageIds.length - 1;
      document.querySelectorAll('[data-page-index]').forEach((el) => { el.textContent = String(idx); });
      document.querySelectorAll('[data-page-total]').forEach((el) => { el.textContent = String(total); });

      document.querySelectorAll('[data-page-prev]').forEach((btn) => {
        const prevId = pageIds[idx - 1];
        btn.disabled = idx <= 0;
        btn.classList.toggle('opacity-30', idx <= 0);
        btn.classList.toggle('pointer-events-none', idx <= 0);
        const label = btn.querySelector('[data-page-nav-label]');
        if (label) label.textContent = prevId ? titleFor(prevId) : '';
      });
      document.querySelectorAll('[data-page-next]').forEach((btn) => {
        const nextId = pageIds[idx + 1];
        btn.disabled = idx >= pageIds.length - 1;
        btn.classList.toggle('opacity-30', idx >= pageIds.length - 1);
        btn.classList.toggle('pointer-events-none', idx >= pageIds.length - 1);
        const label = btn.querySelector('[data-page-nav-label]');
        if (label) label.textContent = nextId ? titleFor(nextId) : '';
      });

      try { localStorage.setItem(pageKey, id); } catch (e) {}
      if (pushHistory) {
        history.pushState({ courhubPage: id }, '', '#' + id);
      } else {
        history.replaceState({ courhubPage: id }, '', '#' + id);
      }
      window.scrollTo(0, 0);
    }

    function goTo(id) {
      if (!pageIds.includes(id)) return;
      render(id, true);
    }

    function step(delta) {
      const idx = pageIds.indexOf(currentFromLocation());
      const next = pageIds[Math.min(pageIds.length - 1, Math.max(0, idx + delta))];
      goTo(next);
    }

    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute('href').slice(1);
      if (pageIds.includes(id)) { e.preventDefault(); goTo(id); }
    });

    document.querySelectorAll('[data-page-prev]').forEach((btn) => btn.addEventListener('click', () => step(-1)));
    document.querySelectorAll('[data-page-next]').forEach((btn) => btn.addEventListener('click', () => step(1)));

    document.addEventListener('keydown', (e) => {
      const tag = (e.target && e.target.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    });

    window.addEventListener('popstate', () => { render(currentFromLocation(), false); });

    render(currentFromLocation(), false);
  }

  window.Courhub = {
    initTheme,
    initReader,
    initPaginator,
    progress: { getProgress, saveProgress, toggleSection, computeStats, computeOverallStats, progressKey },
  };
})();
