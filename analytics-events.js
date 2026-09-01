/**
 * HardKoro — GA4 event tracking
 * ─────────────────────────────────────────────────────────────────
 * Adds business-specific GA4 events on top of the existing consent-gated
 * gtag setup (see cookie-consent.js). Sends nothing if the visitor has not
 * accepted cookies — window.gtag simply won't exist yet, and every call
 * here is guarded, so declining consent stays fully respected.
 *
 * HOW TO TAG A NEW ELEMENT (no JS changes needed):
 *   Add data-hk-track="event_name" to any link/button, plus
 *   data-hk-<param>="value" for each parameter you want attached.
 *   Example:
 *     <a href="..." data-hk-track="cta_click"
 *        data-hk-label="upcoming_dates" data-hk-location="hero">
 *   → fires: gtag('event', 'cta_click', { label: 'upcoming_dates', location: 'hero' })
 *
 * Two things are handled as special cases because they're not simple
 * data-attributes on static markup:
 *   - the IT/EN language toggle (built dynamically by i18n.js)
 *   - sold-out ticket rows (rendered from the Google Sheet feed) —
 *     handled inline in index.html's renderEvents(), see hkTrackEvent calls there.
 */

(function () {

  // ── CORE: send a GA4 event if (and only if) analytics is loaded ──
  function hkTrackEvent(name, params) {
    if (typeof window.gtag === 'function') {
      window.gtag('event', name, params || {});
    }
  }
  // Expose for the inline scripts in index.html (sold-out impressions, etc.)
  window.hkTrackEvent = hkTrackEvent;

  // ── Turn data-hk-* attributes into event params ────────────────
  // data-hk-city="Milano" → { city: 'Milano' }
  function hkParamsFromDataset(el) {
    const params = {};
    Object.keys(el.dataset).forEach(function (key) {
      if (key.startsWith('hk') && key !== 'hkTrack') {
        var paramName = key.slice(2, 3).toLowerCase() + key.slice(3);
        params[paramName] = el.dataset[key];
      }
    });
    return params;
  }

  // ── Generic delegated click tracking for any data-hk-track element ──
  document.addEventListener('click', function (e) {
    var el = e.target.closest('[data-hk-track]');
    if (!el) return;
    hkTrackEvent(el.dataset.hkTrack, hkParamsFromDataset(el));
  });

  // ── Language toggle (IT / EN) — built dynamically by i18n.js ──
  document.addEventListener('click', function (e) {
    var btn = e.target.closest('.lang-toggle button[data-lang]');
    if (!btn) return;
    var lang = btn.dataset.lang;
    hkTrackEvent('language_toggle', { language: lang });
    if (typeof window.gtag === 'function') {
      window.gtag('set', 'user_properties', { ui_language: lang });
    }
  });

  // ── Set the language user property once on load, if GA is already on ──
  function initLanguageProperty() {
    if (typeof window.gtag !== 'function') return;
    var lang = (window.HK_LANG && window.HK_LANG.get) ? window.HK_LANG.get() : (localStorage.getItem('hk-lang') || 'it');
    window.gtag('set', 'user_properties', { ui_language: lang });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLanguageProperty);
  } else {
    initLanguageProperty();
  }

})();
