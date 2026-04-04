// =========================
// FORM SUBMIT (INDEX PAGE)
// =========================
const leadForm = document.getElementById('leadForm');
const successModal = document.getElementById('successModal');
const closeModal = document.getElementById('closeModal');

if (leadForm) {
  leadForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(leadForm);
    const action = leadForm.getAttribute('action');

    try {
      const response = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        leadForm.reset();

        const selectedPlanText = document.getElementById('selectedPlanText');
        const selectedPlanWrap = document.getElementById('selectedPlanWrap');
        const selectedPlanInput = document.getElementById('selectedPlan');

        if (selectedPlanText) selectedPlanText.textContent = 'None';
        if (selectedPlanInput) selectedPlanInput.value = '';
        if (selectedPlanWrap) selectedPlanWrap.classList.add('hidden');

        if (successModal) {
          successModal.classList.remove('hidden');
        }
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  });
}

if (closeModal && successModal) {
  closeModal.addEventListener('click', function () {
    successModal.classList.add('hidden');
  });

  successModal.addEventListener('click', function (e) {
    if (e.target === successModal) {
      successModal.classList.add('hidden');
    }
  });
}

// =========================
// PLAN SELECT (INDEX PAGE)
// =========================
function selectPlan(plan) {
  const input = document.getElementById('selectedPlan');
  const text = document.getElementById('selectedPlanText');
  const wrap = document.getElementById('selectedPlanWrap');

  if (input) input.value = plan;
  if (text) text.textContent = plan;
  if (wrap) wrap.classList.remove('hidden');
}

window.selectPlan = selectPlan;

// =========================
// MOBILE MENU
// =========================
const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('navLinks');

if (toggle && nav) {
  toggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    toggle.classList.toggle('active');
  });

  document.querySelectorAll('#navLinks a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      toggle.classList.remove('active');
    });
  });
}

// =========================
// REVEAL ANIMATION
// =========================

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.15,
  rootMargin: '0px 0px -60px 0px'
});

revealElements.forEach((el) => revealObserver.observe(el));

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
      } else {
        afterMetrics.classList.add('active');
        afterVisual.classList.add('active');
        beforeMetrics.classList.remove('active');
        beforeVisual.classList.remove('active');
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

.faq-item[open] p {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(6px); }
  to { opacity: 1; transform: translateY(0); }
}

// =========================
// USER LOCATION
// =========================
async function getUserLocation() {
  try {
    const res = await fetch('https://ipapi.co/json/');
    const data = await res.json();

    const city = data.city;
    const country = data.country_name;
    const locationEl = document.getElementById('userLocation');

    if (locationEl && city && country) {
      locationEl.textContent = `${city}, ${country}`;
    }
  } catch (err) {
    console.log('Location fetch failed');
  }
}

getUserLocation();

// =========================
// APPLY FORM SUBMIT
// =========================
const applyForm = document.getElementById('applyForm');

if (applyForm) {
  applyForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = new FormData(applyForm);
    const action = applyForm.getAttribute('action');

    try {
      const response = await fetch(action, {
        method: 'POST',
        body: formData,
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        const isTurkishPage = window.location.pathname.startsWith('/tr/');
        window.location.href = isTurkishPage ? '/tr/success' : '/success';
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  });
}

// =========================
// APPLY PAGE PLAN SWITCHER
// =========================
// =========================
// APPLY PAGE PLAN SWITCHER
// =========================
const planNameEl = document.getElementById('planName');
const planPriceEl = document.getElementById('planPrice');
const planDescEl = document.getElementById('planDesc');
const planBadgeEl = document.getElementById('planBadge');
const planFeaturesEl = document.getElementById('planFeatures');
const selectedPlanInputEl = document.getElementById('selectedPlanInput');

if (planNameEl && planPriceEl && planDescEl && planBadgeEl && planFeaturesEl) {
  const params = new URLSearchParams(window.location.search);
  const selectedPlan = params.get('plan');
  const isTurkishPage = window.location.pathname.startsWith('/tr/');

  const plans = isTurkishPage
    ? {
        Hakimiyet: {
          name: 'Hakimiyet',
          price: '₺12.900 / ay',
          desc: 'Google’da 90 gün içinde ilk sayfa.<br>Garanti yok.',
          badge: 'Aramaların %30’unda görünürlük',
          features: [
            'Kapsamlı Rakip Analizi',
            'İki Haftada Bir Güncelleme',
            'Para İade Garantisi Yok',
            'Ana Arama Teriminde Sıralama',
            'Sınırlı Website Optimizasyonu',
            'Yüksek Kaliteli Backlinkler'
          ]
        },
        Zirve: {
          name: 'Zirve',
          price: '₺18.900 / ay',
          desc: 'Google’da 90 gün içinde ilk 3.<br>Garantili, aksi halde ödeme yok.',
          badge: 'Aramaların %75+’inde görünürlük',
          features: [
            'Kapsamlı Rakip Analizi',
            'İki Haftada Bir Güncelleme',
            'Para İade Garantisi',
            'Ana Arama Teriminde Sıralama',
            'Tam Website Optimizasyonu',
            'Yüksek Kaliteli Backlinkler'
          ]
        },
        Fetih: {
          name: 'Fetih',
          price: '₺44.900 / 3 ay',
          desc: 'Google’da 90 gün içinde ilk 3.<br>Garantili, aksi halde ödeme yok.',
          badge: 'Aramaların %75+’inde görünürlük',
          features: [
            'Kapsamlı Rakip Analizi',
            'İki Haftada Bir Güncelleme',
            'Para İade Garantisi',
            'Ana Arama Teriminde Sıralama',
            'Tam Website Optimizasyonu',
            'Yüksek Kaliteli Backlinkler'
          ]
        }
      }
    : {
        Growth: {
          name: 'Growth',
          price: '$400 / month',
          desc: 'First page on Google within 90 days.<br>No money-back guarantee.',
          badge: 'Visible on 30% of search results',
          features: [
            'Full Competitor Analysis',
            'Updates Every Two Weeks',
            'No Money-Back Guarantee',
            'Ranking for Main Search Term',
            'Limited Website Optimization',
            'High-Quality Backlinks'
          ]
        },
        Dominate: {
          name: 'Dominate',
          price: '$597 / month',
          desc: 'Top 3 on Google within 90 days.<br>Guaranteed or you don’t pay.',
          badge: 'Visible on 75%+ of search results',
          features: [
            'Full Competitor Analysis',
            'Updates Every Two Weeks',
            'Money-Back Guarantee',
            'Ranking for Main Search Term',
            'Full Website Optimization',
            'High-Quality Backlinks'
          ]
        },
        Conqueror: {
          name: 'Conqueror',
          price: '$1,499 / 3 months',
          desc: 'Top 3 on Google within 90 days.<br>Guaranteed or you don’t pay.',
          badge: 'Visible on 75%+ of search results',
          features: [
            'Full Competitor Analysis',
            'Updates Every Two Weeks',
            'Money-Back Guarantee',
            'Ranking for Main Search Term',
            'Full Website Optimization',
            'High-Quality Backlinks'
          ]
        }
      };

  const fallbackKey = isTurkishPage ? 'sefer' : 'Dominate';
  const selected = plans[selectedPlan] || plans[fallbackKey];

  planNameEl.textContent = selected.name;
  planPriceEl.textContent = selected.price;
  planDescEl.innerHTML = selected.desc;
  planBadgeEl.textContent = selected.badge;
  planFeaturesEl.innerHTML = selected.features.map(item => `<li>${item}</li>`).join('');

  if (selectedPlanInputEl) {
    selectedPlanInputEl.value = selected.name;
  }
}
// =========================
// SMART COUNTER (OLD → NEW)
// =========================
function animateCounter(el, newValue) {
  const isPercent = el.classList.contains('percent');

  const startValue = parseInt(el.textContent.replace('%', '')) || 0;
  const endValue = newValue;

  const duration = 800;
  const startTime = performance.now();

  function update(currentTime) {
    const progress = Math.min((currentTime - startTime) / duration, 1);

    // easeOutCubic (çok smooth)
    const eased = 1 - Math.pow(1 - progress, 3);

    const current = Math.round(
      startValue + (endValue - startValue) * eased
    );

    el.textContent = isPercent ? `${current}%` : current;

    if (progress < 1) {
      requestAnimationFrame(update);
    }
  }

  requestAnimationFrame(update);
}

function animateMetricsTransition(fromContainer, toContainer) {
  const fromCounters = fromContainer.querySelectorAll('.counter');
  const toCounters = toContainer.querySelectorAll('.counter');

  fromCounters.forEach((el, index) => {
    const targetEl = toCounters[index];
    const newValue = Number(targetEl.dataset.value);

    animateCounter(el, newValue);
  });
  
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
}
