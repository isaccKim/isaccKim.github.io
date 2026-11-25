(() => {
  const root = document.documentElement;

  /* ---------- Theme toggle ---------- */
  const toggle = document.getElementById('themeToggle');
  const isDark = () =>
    root.dataset.theme === 'dark' ||
    (!root.dataset.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  toggle?.addEventListener('click', () => {
    const next = isDark() ? 'light' : 'dark';
    root.dataset.theme = next;
    try { localStorage.setItem('theme', next); } catch (e) {}
  });

  /* ---------- Nav border on scroll + active section ---------- */
  const nav = document.getElementById('nav');
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 8);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const links = [...document.querySelectorAll('.nav-links a')];
  const sections = links.map(a => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  if ('IntersectionObserver' in window) {
    const spy = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          links.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + e.target.id));
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    sections.forEach(s => spy.observe(s));

    /* ---------- Reveal on scroll ---------- */
    const rev = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); rev.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -6% 0px' });
    document.querySelectorAll('.reveal').forEach(el => rev.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('in'));
  }

  /* ---------- Publication filters ---------- */
  const filters = document.querySelectorAll('.filter');
  const items = document.querySelectorAll('.pub, .mini-pubs li');
  filters.forEach(btn => btn.addEventListener('click', () => {
    const f = btn.dataset.filter;
    filters.forEach(b => { b.classList.toggle('active', b === btn); b.setAttribute('aria-selected', b === btn); });
    items.forEach(it => {
      const show = f === 'all' || (it.dataset.tags || '').split(' ').includes(f);
      it.classList.toggle('hide', !show);
      if (show) it.classList.add('in');
    });
  }));

  /* ---------- BibTeX toggle + copy ---------- */
  document.querySelectorAll('.bib-toggle').forEach(btn => btn.addEventListener('click', () => {
    const bib = btn.closest('.pub-body').querySelector('.bib');
    const open = bib.hidden;
    bib.hidden = !open;
    btn.setAttribute('aria-expanded', open);
  }));
  document.querySelectorAll('.copy').forEach(btn => btn.addEventListener('click', async () => {
    const text = btn.parentElement.querySelector('pre').innerText;
    try { await navigator.clipboard.writeText(text); btn.textContent = 'Copied!'; }
    catch (e) { btn.textContent = 'Select & copy'; }
    setTimeout(() => (btn.textContent = 'Copy'), 1500);
  }));

  /* ---------- "et al." expand ---------- */
  document.querySelectorAll('.et-al').forEach(btn => btn.addEventListener('click', () => {
    const more = btn.parentElement.querySelector('.more-authors');
    if (more) more.hidden = false;
    btn.remove();
  }));

  /* ---------- Figure lightbox ---------- */
  const lb = document.getElementById('lightbox');
  const lbImg = lb.querySelector('img');
  const lbCap = lb.querySelector('.lb-caption');
  document.querySelectorAll('.pub-fig').forEach(fig => fig.addEventListener('click', () => {
    lbImg.src = fig.dataset.full;
    lbImg.alt = fig.querySelector('img').alt;
    lbCap.textContent = fig.dataset.caption || '';
    if (typeof lb.showModal === 'function') lb.showModal();
    else window.open(fig.dataset.full, '_blank');
  }));
  lb.querySelector('.lb-close').addEventListener('click', () => lb.close());
  lb.addEventListener('click', e => { if (e.target === lb) lb.close(); });
})();
