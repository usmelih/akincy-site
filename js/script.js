// =========================
// FORM SUBMIT
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
// PLAN SELECT
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
const revealElements = document.querySelectorAll('.reveal');
let hasScrolled = false;

window.addEventListener('scroll', () => {
  hasScrolled = true;
});

const revealObserver = new IntersectionObserver((entries) => {
  if (!hasScrolled) return;

  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    } else {
      entry.target.classList.remove('visible');
    }
  });
}, {
  threshold: 0.25,
  rootMargin: '0px 0px -80px 0px'
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
// FAQ ACCORDION (ONE OPEN AT A TIME)
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
// USER IP LINK
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
// APPLY FORM
// =========================

const params = new URLSearchParams(window.location.search);
const plan = params.get("plan");

if (plan) {
  document.getElementById("planName").innerText = plan;

  if (plan === "Growth") {
    document.getElementById("planPrice").innerText = "$400 / month";
  }

  if (plan === "Dominate") {
    document.getElementById("planPrice").innerText = "$597 / month";
  }

  if (plan === "Conqueror") {
    document.getElementById("planPrice").innerText = "$1,499 / 3 months";
  }
}


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
        window.location.href = './thank-you.html';
      } else {
        alert('Something went wrong. Please try again.');
      }
    } catch (error) {
      alert('Something went wrong. Please try again.');
    }
  });
}
