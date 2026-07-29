document.documentElement.classList.add('js');

// =========================
// FOOTER YEAR
// =========================
document.querySelectorAll('.js-year').forEach((el) => {
  el.textContent = new Date().getFullYear();
});

// =========================
// MOBILE MENU
// =========================
const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('navLinks');

if (toggle && nav) {
  toggle.setAttribute('aria-expanded', 'false');

  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    toggle.classList.toggle('active');
    toggle.setAttribute('aria-expanded', nav.classList.contains('active') ? 'true' : 'false');
  });

  document.querySelectorAll('#navLinks a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      toggle.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// =========================
// REVEAL ANIMATION
// =========================
const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, {
    threshold: 0.08,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach((el) => revealObserver.observe(el));
}

// =========================
// SMART COUNTER
// =========================
function animateCounter(el, startValue, endValue) {
  const isPercent = el.classList.contains('percent');
  const duration = 800;
  const startTime = performance.now();

  el.classList.add('counting');

  function update(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const current = Math.round(startValue + (endValue - startValue) * eased);

    el.textContent = isPercent ? `${current}%` : `${current}`;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.classList.remove('counting');
    }
  }

  requestAnimationFrame(update);
}

function animateMetricsTransition(fromContainer, toContainer) {
  if (!fromContainer || !toContainer) return;

  // Görünen (yeni) paneldeki sayaçları, gizlenen panelin değerlerinden
  // başlatıp kendi hedef değerlerine doğru say — eski kod bunu gizlenen
  // panelde çalıştırdığı için animasyon hiç görünmüyordu.
  const fromCounters = fromContainer.querySelectorAll('.counter');
  const toCounters = toContainer.querySelectorAll('.counter');

  toCounters.forEach((el, index) => {
    const sourceEl = fromCounters[index];
    const endValue = Number(el.dataset.value);
    if (Number.isNaN(endValue)) return;

    let startValue = sourceEl ? Number(sourceEl.dataset.value) : 0;
    if (Number.isNaN(startValue)) startValue = 0;

    // Stagger gecikmesi sırasında hedef değer görünmesin
    const isPercent = el.classList.contains('percent');
    el.textContent = isPercent ? `${startValue}%` : `${startValue}`;

    setTimeout(() => animateCounter(el, startValue, endValue), index * 90);
  });
}

// =========================
// BEFORE / AFTER TOGGLE
// =========================
const diffTabs = document.querySelectorAll('.diff-tab');
const beforeMetrics = document.getElementById('beforeMetrics');
const afterMetrics = document.getElementById('afterMetrics');
const beforeVisual = document.getElementById('beforeVisual');
const afterVisual = document.getElementById('afterVisual');

if (diffTabs.length && beforeMetrics && afterMetrics && beforeVisual && afterVisual) {
  diffTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const view = tab.dataset.view;

      diffTabs.forEach((t) => t.classList.remove('active'));
      tab.classList.add('active');

      if (view === 'before') {
        beforeMetrics.classList.add('active');
        beforeVisual.classList.add('active');
        afterMetrics.classList.remove('active');
        afterVisual.classList.remove('active');

        animateMetricsTransition(afterMetrics, beforeMetrics);
      } else {
        afterMetrics.classList.add('active');
        afterVisual.classList.add('active');
        beforeMetrics.classList.remove('active');
        beforeVisual.classList.remove('active');

        animateMetricsTransition(beforeMetrics, afterMetrics);
      }
    });
  });
}

// =========================
// ACTIVE NAV LINK
// =========================
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('#navLinks a');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120;

    if (window.scrollY >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove('active');

    const href = link.getAttribute('href');
    if (href === '#' + current) {
      link.classList.add('active');
    }
  });
});

// =========================
// NAV SCROLL EFFECT
// =========================
const siteNav = document.querySelector('.nav');

function handleNavScroll() {
  if (!siteNav) return;

  if (window.scrollY > 20) {
    siteNav.classList.add('scrolled');
  } else {
    siteNav.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavScroll);
handleNavScroll();

// =========================
// PROCESS STEP LINE ANIMATION
// =========================
const processSteps = document.querySelectorAll('.process-step');

if (processSteps.length > 0) {
  const stepObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible-step');
      } else {
        entry.target.classList.remove('visible-step');
      }
    });
  }, {
    threshold: 0.45
  });

  processSteps.forEach((step) => stepObserver.observe(step));
}

// =========================
// FAQ ACCORDION
// =========================
const faqs = document.querySelectorAll('.faq-item');

faqs.forEach((item) => {
  item.addEventListener('toggle', () => {
    if (item.open) {
      faqs.forEach((other) => {
        if (other !== item) {
          other.open = false;
        }
      });
    }
  });
});

// =========================
// USER LOCATION
// =========================
async function getUserLocation() {
  const locationEl = document.getElementById('userLocation');
  const locationWrap = document.querySelector('.user-location');
  if (!locationEl) return;

  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();

    if (data.city && data.country_name) {
      locationEl.textContent = `${data.city}, ${data.country_name}`;
    } else if (locationWrap) {
      // API cevap verdi ama veri yok — "Loading..." asılı kalmasın
      locationWrap.style.display = 'none';
    }
  } catch (err) {
    if (locationWrap) {
      locationWrap.style.display = 'none';
    }
  }
}

getUserLocation();

// =========================
// LEAD FORM SUBMIT (FREE AUDIT)
// =========================
const applyForm = document.getElementById('applyForm');

if (applyForm) {
  applyForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(applyForm);
    const action = applyForm.getAttribute('action');
    const submitBtn = applyForm.querySelector('button[type="submit"]');
    const path = window.location.pathname;
    const lang = path.startsWith('/tr') ? 'tr' : path.startsWith('/de') ? 'de' : 'en';

    const t = {
      tr: {
        base: '/tr',
        sending: 'Gönderiliyor...',
        error: 'Bir şeyler ters gitti. Lütfen tekrar deneyin.',
        submit: 'Ücretsiz Analizimi Al →'
      },
      de: {
        base: '/de',
        sending: 'Wird gesendet...',
        error: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.',
        submit: 'Kostenlose Analyse anfordern →'
      },
      en: {
        base: '',
        sending: 'Sending...',
        error: 'Something went wrong. Please try again.',
        submit: 'Get My Free Audit →'
      }
    }[lang];

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = t.sending;
    }

    try {
      const response = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        window.location.href = t.base + '/success';
      } else {
        alert(t.error);
      }
    } catch (error) {
      alert(t.error);
    } finally {
      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = t.submit;
      }
    }
  });
}

// =========================
// NEWSLETTER SIGNUP (KIT / CONVERTKIT)
// =========================
const newsletterForm = document.getElementById('newsletterForm');

if (newsletterForm) {
  newsletterForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(newsletterForm);
    const action = newsletterForm.getAttribute('action');
    const submitBtn = newsletterForm.querySelector('button[type="submit"]');
    const statusEl = newsletterForm.querySelector('.newsletter-status');
    const emailInput = newsletterForm.querySelector('input[type="email"]');
    const path = window.location.pathname;
    const lang = path.startsWith('/tr') ? 'tr' : path.startsWith('/de') ? 'de' : 'en';

    const t = {
      tr: {
        subscribing: 'Gönderiliyor...',
        submit: 'Abone Ol',
        success: 'Neredeyse tamam — aboneliğinizi onaylamak için e-postanızı kontrol edin.',
        error: 'Bir şeyler ters gitti. Lütfen tekrar deneyin.'
      },
      de: {
        subscribing: 'Wird gesendet...',
        submit: 'Abonnieren',
        success: 'Fast geschafft — bitte bestätigen Sie Ihr Abo in Ihrem Postfach.',
        error: 'Etwas ist schiefgelaufen. Bitte versuchen Sie es erneut.'
      },
      en: {
        subscribing: 'Subscribing...',
        submit: 'Subscribe',
        success: 'Almost there — check your inbox to confirm your subscription.',
        error: 'Something went wrong. Please try again.'
      }
    }[lang];

    if (statusEl) {
      statusEl.textContent = '';
      statusEl.classList.remove('is-success', 'is-error');
    }

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = t.subscribing;
    }

    try {
      const response = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        if (statusEl) {
          statusEl.textContent = t.success;
          statusEl.classList.add('is-success');
        }
        newsletterForm.reset();
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = t.submit;
        }
        return;
      }

      if (statusEl) {
        statusEl.textContent = t.error;
        statusEl.classList.add('is-error');
      }
    } catch (error) {
      if (statusEl) {
        statusEl.textContent = t.error;
        statusEl.classList.add('is-error');
      }
    } finally {
      // On success the button is intentionally left disabled; only re-enable on error.
      const succeeded = statusEl && statusEl.classList.contains('is-success');
      if (submitBtn && !succeeded) {
        submitBtn.disabled = false;
        submitBtn.textContent = t.submit;
      }
      if (emailInput && !succeeded) {
        emailInput.focus();
      }
    }
  });
}

