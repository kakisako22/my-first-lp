document.addEventListener('DOMContentLoaded', () => {
  /* ---------- Loader ---------- */
  const loader = document.getElementById('loader');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => loader.classList.add('is-hidden'), 300);
    });
  }

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

  if (sections.length) {
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
  }

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
    '.concept__text, .concept__stats, .menu-card, .access__map, .access__info, .contact__form'
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

  /* ---------- Contact form validation ---------- */
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
    const fields = {
      name: {
        input: document.getElementById('contact-name'),
        error: document.getElementById('error-name'),
        required: 'お名前を入力してください',
      },
      email: {
        input: document.getElementById('contact-email'),
        error: document.getElementById('error-email'),
        required: 'メールアドレスを入力してください',
      },
      message: {
        input: document.getElementById('contact-message'),
        error: document.getElementById('error-message'),
        required: 'お問い合わせ内容を入力してください',
      },
    };

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const setError = (field, message) => {
      field.input.closest('.form-group').classList.toggle('has-error', Boolean(message));
      field.error.textContent = message;
    };

    const validateField = (key) => {
      const field = fields[key];
      const value = field.input.value.trim();

      if (!value) {
        setError(field, field.required);
        return false;
      }
      if (key === 'email' && !emailPattern.test(value)) {
        setError(field, 'メールアドレスの形式が正しくありません');
        return false;
      }
      setError(field, '');
      return true;
    };

    Object.keys(fields).forEach((key) => {
      fields[key].input.addEventListener('blur', () => validateField(key));
    });

    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const isValid = Object.keys(fields)
        .map((key) => validateField(key))
        .every(Boolean);

      if (!isValid) return;

      alert('送信しました');
      contactForm.reset();
      Object.keys(fields).forEach((key) => setError(fields[key], ''));
    });
  }

  /* ---------- Back-to-top button ---------- */
  const toTop = document.getElementById('toTop');
  if (toTop) {
    window.addEventListener('scroll', () => {
      toTop.classList.toggle('is-visible', window.scrollY > window.innerHeight * 0.8);
    });
  }
});
