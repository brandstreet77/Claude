(function () {
  'use strict';

  /* Footer year */
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Mobile nav toggle */
  var navToggle = document.getElementById('nav-toggle');
  var header = document.querySelector('.site-header');
  if (navToggle && header) {
    navToggle.addEventListener('click', function () {
      var isOpen = header.classList.toggle('nav-open');
      navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    document.querySelectorAll('.main-nav a').forEach(function (link) {
      link.addEventListener('click', function () {
        header.classList.remove('nav-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(function (item) {
    var btn = item.querySelector('.faq-question');
    btn.addEventListener('click', function () {
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove('open');
          openItem.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        }
      });
      item.classList.toggle('open', !isOpen);
      btn.setAttribute('aria-expanded', (!isOpen).toString());
    });
  });

  /* Scroll reveal */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in-view'); });
  }

  /* Back to top button */
  var backToTop = document.getElementById('back-to-top');
  if (backToTop) {
    window.addEventListener('scroll', function () {
      backToTop.classList.toggle('visible', window.scrollY > 500);
    });
  }

  /* Contact form validation */
  var form = document.getElementById('contact-form');
  if (form) {
    var statusEl = document.getElementById('form-status');

    var validators = {
      name: function (v) { return v.trim().length > 0 ? '' : 'Please enter your name.'; },
      email: function (v) {
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(v.trim()) ? '' : 'Please enter a valid email address.';
      },
      message: function (v) { return v.trim().length > 0 ? '' : 'Tell us a bit about what you need.'; }
    };

    function setFieldError(field, message) {
      var row = form.querySelector('[name="' + field + '"]').closest('.form-row');
      var errorEl = form.querySelector('[data-error-for="' + field + '"]');
      if (message) {
        row.classList.add('has-error');
        if (errorEl) errorEl.textContent = message;
      } else {
        row.classList.remove('has-error');
        if (errorEl) errorEl.textContent = '';
      }
    }

    function validateForm() {
      var valid = true;
      Object.keys(validators).forEach(function (field) {
        var input = form.querySelector('[name="' + field + '"]');
        var error = validators[field](input.value);
        setFieldError(field, error);
        if (error) valid = false;
      });
      return valid;
    }

    Object.keys(validators).forEach(function (field) {
      var input = form.querySelector('[name="' + field + '"]');
      if (input) {
        input.addEventListener('blur', function () {
          setFieldError(field, validators[field](input.value));
        });
        // Also clear the error as soon as the field becomes valid,
        // so fixing the last field before submitting doesn't leave a stale error.
        input.addEventListener('input', function () {
          if (input.closest('.form-row').classList.contains('has-error')) {
            setFieldError(field, validators[field](input.value));
          }
        });
      }
    });

    /*
     * This form is wired for Netlify Forms (data-netlify="true" in the HTML),
     * which requires zero backend code. If you're hosting elsewhere, point the
     * <form> at a different endpoint (e.g. Formspree) — see README.md.
     */
    form.addEventListener('submit', function (e) {
      if (!validateForm()) {
        e.preventDefault();
        statusEl.textContent = 'Please fix the errors above.';
        statusEl.className = 'form-note error';
      }
    });
  }
})();
