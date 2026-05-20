/**
 * HardKoro — Cookie Consent
 * ─────────────────────────────────────────────────────────────────
 * • Shows a banner on first visit (no stored choice yet)
 * • Accept → loads Google Analytics, stores 'accepted'
 * • Decline → stores 'declined', GA never loads
 * • On subsequent visits, reads the stored choice immediately
 * • Exposes window.HK_CONSENT.reset() for the privacy page
 *
 * Depends on: i18n.js (loaded after this script, but strings are
 * read lazily so order doesn't matter as long as both are on the page)
 */

(function () {

  const GA_ID        = 'G-65VYTE51LP';
  const STORAGE_KEY  = 'hk-cookie-consent';   // 'accepted' | 'declined' | absent

  // ── STRINGS (inline fallback — i18n.js overrides via data-i18n) ─
  const COPY = {
    it: {
      body:    'Utilizziamo cookie analitici (Google Analytics) per capire come le persone usano il sito. Nessun dato personale identificabile.',
      accept:  'Accetta',
      decline: 'Rifiuta',
      policy:  'Privacy policy',
    },
    en: {
      body:    'We use analytics cookies (Google Analytics) to understand how people use the site. No personally identifiable data.',
      accept:  'Accept',
      decline: 'Decline',
      policy:  'Privacy policy',
    },
  };

  function getLang() {
    return (localStorage.getItem('hk-lang') || 'it') === 'en' ? 'en' : 'it';
  }

  // ── LOAD GOOGLE ANALYTICS ──────────────────────────────────────
  function loadGA() {
    if (document.getElementById('hk-ga-script')) return; // already loaded
    const s = document.createElement('script');
    s.id    = 'hk-ga-script';
    s.async = true;
    s.src   = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
    document.head.appendChild(s);

    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', GA_ID, { anonymize_ip: true });
  }

  // ── BUILD BANNER ───────────────────────────────────────────────
  function buildBanner() {
    const lang = getLang();
    const c    = COPY[lang] || COPY.it;

    const banner = document.createElement('div');
    banner.id = 'hk-cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', lang === 'en' ? 'Cookie consent' : 'Consenso cookie');

    banner.innerHTML = `
      <p class="hk-cb-body" data-i18n="cookie.body">${c.body}</p>
      <div class="hk-cb-actions">
        <a href="privacy.html" class="hk-cb-policy" data-i18n="cookie.policy">${c.policy}</a>
        <div class="hk-cb-btns">
          <button id="hk-cb-decline" data-i18n="cookie.decline">${c.decline}</button>
          <button id="hk-cb-accept"  data-i18n="cookie.accept">${c.accept}</button>
        </div>
      </div>`;

    return banner;
  }

  // ── INJECT STYLES ──────────────────────────────────────────────
  function injectStyles() {
    if (document.getElementById('hk-cb-style')) return;
    const style = document.createElement('style');
    style.id = 'hk-cb-style';
    style.textContent = `
      #hk-cookie-banner {
        position: fixed;
        bottom: 0; left: 0; right: 0;
        z-index: 9999;
        background: #262626;
        color: #fff;
        padding: 1rem 1.5rem;
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        box-shadow: 0 -2px 16px rgba(0,0,0,0.25);
        font-family: 'DM Sans', sans-serif;
        font-size: 0.82rem;
        line-height: 1.55;
        transform: translateY(100%);
        transition: transform 0.35s cubic-bezier(.4,0,.2,1);
      }
      #hk-cookie-banner.hk-cb-visible {
        transform: translateY(0);
      }
      .hk-cb-body {
        color: rgba(255,255,255,0.75);
        margin: 0;
      }
      .hk-cb-actions {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 0.6rem;
      }
      .hk-cb-policy {
        font-size: 0.75rem;
        color: rgba(255,255,255,0.4);
        text-decoration: underline;
        text-underline-offset: 2px;
        letter-spacing: 0.03em;
        white-space: nowrap;
        transition: color 0.2s;
      }
      .hk-cb-policy:hover { color: rgba(255,255,255,0.75); }
      .hk-cb-btns {
        display: flex;
        gap: 0.5rem;
        flex-shrink: 0;
      }
      #hk-cb-decline,
      #hk-cb-accept {
        font-family: 'DM Sans', sans-serif;
        font-size: 0.72rem;
        font-weight: 500;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        border-radius: 2px;
        padding: 0.45rem 1rem;
        cursor: pointer;
        transition: background 0.2s, color 0.2s, border-color 0.2s;
        white-space: nowrap;
      }
      #hk-cb-decline {
        background: transparent;
        color: rgba(255,255,255,0.55);
        border: 1px solid rgba(255,255,255,0.2);
      }
      #hk-cb-decline:hover {
        color: #fff;
        border-color: rgba(255,255,255,0.55);
      }
      #hk-cb-accept {
        background: #0000ff;
        color: #fff;
        border: 1px solid transparent;
      }
      #hk-cb-accept:hover { background: #0000cc; }

      @media (min-width: 640px) {
        #hk-cookie-banner {
          flex-direction: row;
          align-items: center;
          gap: 1.5rem;
          padding: 1rem 2.5rem;
        }
        .hk-cb-body { flex: 1; }
        .hk-cb-actions { flex-shrink: 0; flex-wrap: nowrap; }
      }
      @media (min-width: 900px) {
        #hk-cookie-banner { padding: 1rem 4rem; }
      }
    `;
    document.head.appendChild(style);
  }

  // ── DISMISS BANNER ─────────────────────────────────────────────
  function dismiss(banner) {
    banner.classList.remove('hk-cb-visible');
    banner.addEventListener('transitionend', () => banner.remove(), { once: true });
  }

  // ── SHOW BANNER ────────────────────────────────────────────────
  function showBanner() {
    injectStyles();
    const banner = buildBanner();
    document.body.appendChild(banner);

    // Trigger slide-up on next frame
    requestAnimationFrame(() => {
      requestAnimationFrame(() => banner.classList.add('hk-cb-visible'));
    });

    document.getElementById('hk-cb-accept').addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEY, 'accepted');
      loadGA();
      dismiss(banner);
    });

    document.getElementById('hk-cb-decline').addEventListener('click', () => {
      localStorage.setItem(STORAGE_KEY, 'declined');
      dismiss(banner);
    });

    // Re-apply i18n strings if i18n.js has already run
    if (window.HK_LANG) {
      const lang = window.HK_LANG.get();
      const dict = window.HK_LANG.strings[lang];
      if (dict) {
        banner.querySelectorAll('[data-i18n]').forEach(el => {
          const key = el.dataset.i18n;
          if (dict[key] !== undefined) el.textContent = dict[key];
        });
      }
    }
  }

  // ── INIT ───────────────────────────────────────────────────────
  function init() {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (stored === 'accepted') {
      loadGA();
      return;
    }

    if (stored === 'declined') {
      return; // respect previous choice, no banner, no GA
    }

    // No stored choice — show banner after a short delay
    // (avoids flash during page paint)
    setTimeout(showBanner, 800);
  }

  // ── PUBLIC API (for privacy page reset link) ───────────────────
  window.HK_CONSENT = {
    reset: function () {
      localStorage.removeItem(STORAGE_KEY);
      // Remove any existing GA script so the state is truly clean
      const existing = document.getElementById('hk-ga-script');
      if (existing) existing.remove();
      showBanner();
    },
    getState: function () {
      return localStorage.getItem(STORAGE_KEY) || 'unset';
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
