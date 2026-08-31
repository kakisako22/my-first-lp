document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('is-hidden'), 300);
  });

  /* ---------- Header background on scroll ---------- */
  const header = document.getElementById('header');
  const toggleHeader = () => {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  toggleHeader();
  window.addEventListener('scroll', toggleHeader);

  /* ---------- Mobile hamburger menu ---------- */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  const closeNav = () => {
    nav.classList.remove('is-open');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
  };

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    hamburger.classList.toggle('is-open', isOpen);
    hamburger.setAttribute('aria-expanded', String(isOpen));
  });

  /* ---------- Smooth scroll for all in-page nav links ---------- */
  const headerHeight = () => header.offsetHeight;

  document.querySelectorAll('[data-nav]').forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;

      const target = document.querySelector(href);
      if (!target) return;

      event.preventDefault();
      closeNav();

      const targetY = target.getBoundingClientRect().top + window.scrollY - (headerHeight() - 1);

      window.scrollTo({
        top: Math.max(targetY, 0),
        behavior: 'smooth',
      });
    });
  });

  /* ---------- Active nav link on scroll ---------- */
  const sections = document.querySelectorAll('main section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const setActiveLink = () => {
    let currentId = '';
    const scrollPos = window.scrollY + headerHeight() + 40;

    sections.forEach((section) => {
      if (scrollPos >= section.offsetTop) {
        currentId = section.id;
      }
    });

    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${currentId}`);
    });
  };
  setActiveLink();
  window.addEventListener('scroll', setActiveLink);

  /* ---------- Menu tabs (Coffee / Sweets) ---------- */
  const tabs = document.querySelectorAll('.menu__tab');
  const panels = document.querySelectorAll('[data-panel]');

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach((t) => {
        t.classList.toggle('is-active', t === tab);
        t.setAttribute('aria-selected', String(t === tab));
      });

      panels.forEach((panel) => {
        panel.hidden = panel.dataset.panel !== target;
      });
    });
  });

  /* ---------- Scroll reveal animation ---------- */
  const revealTargets = document.querySelectorAll(
    '.concept__text, .concept__stats, .menu-card, .access__map, .access__info'
  );
  revealTargets.forEach((el) => el.setAttribute('data-reveal', ''));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );
  revealTargets.forEach((el) => revealObserver.observe(el));

  /* ---------- Back-to-top button ---------- */
  const toTop = document.getElementById('toTop');
  window.addEventListener('scroll', () => {
    toTop.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.8);
  });
});
