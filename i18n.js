/**
 * HardKoro — i18n
 * ─────────────────────────────────────────────────────────────────
 * Browser-detected language (IT default), persisted in localStorage.
 * Toggle renders as "IT | EN" in the nav.
 *
 * How it works:
 *   1. Every translatable element gets  data-i18n="key"
 *   2. Elements whose *HTML* (not just text) needs translation
 *      use data-i18n-html="key"  (allows <br> etc.)
 *   3. Elements with translatable attributes use
 *      data-i18n-attr="attr:key"  e.g. data-i18n-attr="aria-label:nav.home"
 *   4. On load: detect language → apply strings → render toggle
 *   5. On toggle: flip lang → persist → reapply strings
 */

(function () {

  // ── TRANSLATIONS ────────────────────────────────────────────────
  const STRINGS = {

    it: {
      /* ── NAV ── */
      'nav.upcoming':    'Prossime date',
      'nav.menu-label':  'Apri menu',
      'nav.singbuilding': 'Per le Aziende',

      /* ── FOOTER (shared) ── */
      'footer.tagline':  'Nessuna prova.<br>Nessun pubblico.<br>Chi c\'è, è lì per cantare.<br>Ti presenti. Il Maestro ti guida. Tu canti.',
      'footer.upcoming': 'Prossime date',
      'footer.privacy':  'Privacy policy',
      'footer.rights':   '© HardKoro — Tutti i diritti riservati.',

      /* ── PRIVACY PAGE ── */
      'privacy.back':    '← Torna alla home',
      'privacy.title':   'Privacy policy',
      'privacy.updated': 'Ultimo aggiornamento: maggio 2025',
      'privacy.intro':   'HardKoro rispetta la tua privacy. Questa pagina spiega quali dati raccogliamo, perché e come puoi esercitare i tuoi diritti.',
      'privacy.s1.title': '1. Titolare del trattamento',
      'privacy.s1.body':  'Il titolare del trattamento è HardKoro (hello@hardkoro.com). Per qualsiasi domanda relativa alla privacy puoi scriverci a questo indirizzo.',
      'privacy.s2.title': '2. Dati che raccogliamo',
      'privacy.s2.body':  'Raccogliamo dati solo se hai acconsentito all\'uso dei cookie analitici. In quel caso, Google Analytics raccoglie informazioni anonime sull\'utilizzo del sito: pagine visitate, provenienza del traffico, tipo di dispositivo e durata della visita. Non raccogliamo nomi, indirizzi email o altri dati personali identificabili a meno che tu non ci contatti direttamente.',
      'privacy.s3.title': '3. Finalità del trattamento',
      'privacy.s3.body':  'Utilizziamo i dati analitici esclusivamente per migliorare il sito e capire come le persone lo trovano. Non vendiamo né cediamo dati a terzi per finalità commerciali.',
      'privacy.s4.title': '4. Base giuridica',
      'privacy.s4.body':  'Il trattamento dei dati analitici avviene sulla base del tuo consenso esplicito (art. 6, par. 1, lett. a del GDPR), espresso tramite il banner cookie. Puoi revocare il consenso in qualsiasi momento tramite il pulsante qui sotto.',
      'privacy.s5.title': '5. Cookie',
      'privacy.s5.body':  'Utilizziamo Google Analytics (cookie analitici di terze parti) solo se hai dato il consenso. Non utilizziamo cookie di profilazione o pubblicitari. La tua scelta viene memorizzata nel tuo browser e puoi cambiarla in qualsiasi momento tramite il pulsante qui sotto.',
      'privacy.s6.title': '6. Conservazione dei dati',
      'privacy.s6.body':  'I dati raccolti da Google Analytics vengono conservati per 14 mesi, dopodiché vengono eliminati automaticamente. I dati aggregati e anonimi possono essere conservati a tempo indeterminato.',
      'privacy.s7.title': '7. I tuoi diritti',
      'privacy.s7.body':  'Hai il diritto di accedere ai tuoi dati, richiederne la cancellazione, opporti al trattamento e presentare reclamo all\'Autorità Garante per la protezione dei dati personali (Garante Privacy). Per esercitare questi diritti scrivici a hello@hardkoro.com.',
      'privacy.s8.title': '8. Modifiche a questa policy',
      'privacy.s8.body':  'Potremmo aggiornare questa privacy policy di tanto in tanto. Le modifiche saranno pubblicate su questa pagina con la data di aggiornamento.',
      'privacy.reset.label': 'Hai cambiato idea sui cookie?',
      'privacy.reset.btn':   'Modifica le tue preferenze',

      /* ─────────── INDEX ─────────── */
      'index.hero.headline':   'Nessuna prova.<br>Nessun pubblico.<br>Chi c\'è, è lì per cantare.',
      'index.hero.cta':        'Prossime date →',
      'index.s2.title':        'Ti presenti.<br>Il Maestro ti guida.<br>Tu canti.',
      'index.s2.body':         'HardKoro trasforma una sala piena di sconosciuti in un coro polifonico. Nessuna selezione, nessun impegno fisso. Insegniamo ogni canzone da zero, quindi non serve grande esperienza, basta essere un minimo intonati. Se siamo in tanti suona meglio, porta un amico (o due o cinque).',
      'index.s3.title':        'Vieni a cantare',
      'index.s3.col-date':     'Data',
      'index.s3.col-place':    'Città &amp; Venue',
      'index.s4.title':        'HardKoro in action',
      'index.s4.yt':           'Guarda tutti i video su YouTube ↗',
      'events.loading':        'Caricamento date…',
      'events.empty':          'Ci stiamo scaldando la voce.<br>Nuove date in arrivo.',
      'events.error':          'Impossibile caricare le date. Riprova più tardi.',
      'events.social.title':   'Seguici. Ti diciamo noi quando si canta.',
      'events.social.sub':     '',

      /* ─────────── ABOUT ─────────── */
      'about.hero':            'Polifonia in formato pop-up.',
      'about.mission1':        'HardKoro nasce da un\'idea semplice: il canto polifonico non è un privilegio riservato a chi ha studiato musica. È per tutti — per chi canta sotto la doccia, per chi non ha mai aperto uno spartito.',
      'about.mission2':        'Con repertori superpop, ogni appuntamento è un esperimento sociale: esporsi e provare brividi a fianco di sconosciuti. Non ci sono prove, non c\'è pubblico, nessuno che ti giudica. Solo centinaia di voci che diventano una cosa sola.',
      'about.science.title':   'Perché funziona',
      'about.science.intro':   'Lo dicono le neuroscienze. Il canto collettivo migliora il benessere, e aumenta la fiducia, in sè e negli altri.',
      'about.card1.title':     'Il cuore sincronizza',
      'about.card1.body':      'Quando canti in gruppo, la frequenza cardiaca di chi canta tende ad allinearsi. Non è metafora — è fisiologia. Il ritmo condiviso crea coerenza biologica tra le persone presenti.',
      'about.card2.title':     'Le endorfine salgono',
      'about.card2.body':      'Il canto attiva il sistema delle endorfine — gli stessi neurotrasmettitori che entrano in gioco durante l\'esercizio fisico. Il gruppo amplifica l\'effetto: cantare insieme rilascia più endorfine che cantare da soli.',
      'about.card3.title':     'La soglia sociale si abbassa',
      'about.card3.body':      'Bastano 60 minuti di canto collettivo con estranei per generare un senso di connessione e appartenenza paragonabile a mesi di frequentazione. È uno dei modi più rapidi che conosciamo per creare legame sociale.',
      'about.card4.title':     'Il cortisolo scende',
      'about.card4.body':      'Cantare riduce i livelli di cortisolo — il principale marcatore biologico dello stress. L\'effetto è misurabile già dopo una singola sessione, indipendentemente dall\'esperienza musicale del partecipante.',
      'about.card5.title':     'Il respiro si regola',
      'about.card5.body':      'Cantare impone un ritmo respiratorio più lento e profondo. In gruppo, tutti respirano insieme — e questo ha un effetto diretto sul sistema nervoso autonomo, portando a uno stato di calma attiva.',
      'about.card6.title':     'La memoria a lungo termine si attiva',
      'about.card6.body':      'Il cervello elabora la musica in modo diverso dal linguaggio, coinvolgendo aree legate alla memoria emotiva e procedurale. Imparare una canzone insieme è un\'esperienza che resta.',
      'about.cta.headline':    'Adesso tocca a te.',
      'about.cta.sub':         'Non servono cantori esperti, basta essere un minimo intonati.',
      'about.cta.btn':         'Prossime date →',

      /* ─────────── SINGBUILDING ─────────── */
      'sb.hero.headline':      'Porta vibrazioni positive al lavoro con SingBuilding®',
      'sb.hero.sub':           'Nessuna prova, nessuna esperienza richiesta.',
      'sb.storia.headline':    'Il canto collettivo è il più antico strumento di coesione che l\'umanità conosca.',
      'sb.storia.body':        'Da milioni di anni, gli esseri umani usano il canto per sintonizzarsi, creare fiducia e abbattere le gerarchie. Prima dei meeting, prima delle slide, prima del team building con la corda — c\'era la voce. La scienza moderna non ha fatto altro che confermare ciò che i nostri antenati sapevano istintivamente.',
      'sb.storia.quote':       '"Un mega-meccanismo per creare legami: perché cantare insieme ci fa bene."',
      'sb.card.end.title':     'Endorfine',
      'sb.card.end.body':      'rilasciate durante il canto collettivo, riducendo lo stress e migliorando l\'umore già dopo 60 minuti',
      'sb.card.oss.title':     'Ossitocina',
      'sb.card.oss.body':      'l\'ormone del legame, prodotto quando le voci si armonizzano insieme — identico a quello che crea fiducia tra colleghi',
      'sb.card.bar.title':     'Barriere',
      'sb.card.bar.body':      'tra le persone — le gerarchie si dissolvono quando tutti cantano all\'unisono, CEO e stagista compresi',
      'sb.benefits.title':     'Cosa porta al tuo team',
      'sb.b1.title':           'Connessione reale',
      'sb.b1.body':            'In 60 minuti di canto insieme, il senso di appartenenza generato è paragonabile a mesi di frequentazione. Non si tratta di attività costruite a tavolino — si tratta di un meccanismo biologico che funziona su chiunque, indipendentemente dal ruolo o dall\'anzianità.',
      'sb.b2.title':           'Energia e presenza dopo l\'evento',
      'sb.b2.body':            'Il canto attiva il sistema delle endorfine e abbassa il cortisolo — il principale marcatore di stress. I partecipanti tornano al lavoro con un livello di energia e leggerezza misurabile. Non è motivazione da palco: è fisiologia.',
      'sb.b3.title':           'Un ricordo condiviso che dura',
      'sb.b3.body':            'Il cervello elabora la musica in modo diverso dal linguaggio: coinvolge la memoria emotiva e procedurale. Una canzone imparata insieme diventa un ancoraggio — qualcosa a cui tornare, qualcosa che unisce anche dopo che l\'evento è finito.',
      'sb.numeri.events':      'Eventi realizzati',
      'sb.numeri.people':      'Persone fatte cantare',
      'sb.numeri.songs':       'Brani diversi',
      'sb.testimonial':        'Ero scettico. Due ore dopo ero completamente convertito. Tutto il team stava sorridendo. È stato il momento più umano che avevamo condiviso in anni.',
      'sb.testimonial.source': 'Partecipante, evento SingBuilding — Milano',
      'sb.contesti.title':     'Si adatta a ogni contesto',
      'sb.ctx1':               'Festa aziendale',
      'sb.ctx2':               'Offsite',
      'sb.ctx3':               'Conferenze &amp; convention',
      'sb.ctx4':               'Kick-off di inizio anno',
      'sb.ctx5':               'Onboarding',
      'sb.ctx6':               'Retreats',
      'sb.ctx7':               'Fiere ed eventi pubblici',
      'sb.clienti.label':      'Si sono fidati di noi',
      'sb.contact.headline':   'Dacci il LA.',
      'sb.contact.sub':        'Ci piacerebbe progettare un\'esperienza SingBuilding per il tuo team.',
      'sb.contact.btn':        'Parliamoci →',

      /* ── COOKIE BANNER ── */
      'cookie.body':    'Utilizziamo cookie analitici (Google Analytics) per capire come le persone usano il sito. Nessun dato personale identificabile.',
      'cookie.accept':  'Accetta',
      'cookie.decline': 'Rifiuta',
      'cookie.policy':  'Privacy policy',

      /* ─────────── CONTACT ─────────── */
      'contact.headline':      'Fatti sentire',
      'contact.opt1.title':    'Collaborazioni &amp; SingBuilding',
      'contact.opt1.sub':      'Vuoi portare HardKoro al tuo team o collaborare con noi?',
      'contact.opt1.btn':      'Parliamoci →',
      'contact.opt2.title':    'Richieste media',
      'contact.opt2.sub':      'Press kit, interviste, materiali fotografici.',
      'contact.opt2.btn':      'Contattaci →',
    },

    en: {
      /* ── NAV ── */
      'nav.upcoming':    'Upcoming dates',
      'nav.menu-label':  'Open menu',
      'nav.singbuilding': 'For Businesses',

      /* ── FOOTER (shared) ── */
      'footer.tagline':  'No rehearsal.<br>No audience.<br>Everyone here is here to sing.<br>You show up. The Maestro leads. You sing.',
      'footer.upcoming': 'Upcoming dates',
      'footer.privacy':  'Privacy policy',
      'footer.rights':   '© HardKoro — All rights reserved.',

      /* ── PRIVACY PAGE ── */
      'privacy.back':    '← Back to home',
      'privacy.title':   'Privacy policy',
      'privacy.updated': 'Last updated: May 2025',
      'privacy.intro':   'HardKoro respects your privacy. This page explains what data we collect, why, and how you can exercise your rights.',
      'privacy.s1.title': '1. Data controller',
      'privacy.s1.body':  'The data controller is HardKoro (hello@hardkoro.com). For any privacy-related question you can write to us at this address.',
      'privacy.s2.title': '2. Data we collect',
      'privacy.s2.body':  'We only collect data if you have consented to the use of analytics cookies. In that case, Google Analytics collects anonymous information about site usage: pages visited, traffic source, device type, and visit duration. We do not collect names, email addresses, or other personally identifiable data unless you contact us directly.',
      'privacy.s3.title': '3. Purpose of processing',
      'privacy.s3.body':  'We use analytics data exclusively to improve the site and understand how people find it. We do not sell or share data with third parties for commercial purposes.',
      'privacy.s4.title': '4. Legal basis',
      'privacy.s4.body':  'Processing of analytics data is based on your explicit consent (Art. 6(1)(a) GDPR), given via the cookie banner. You can withdraw consent at any time using the button below.',
      'privacy.s5.title': '5. Cookies',
      'privacy.s5.body':  'We use Google Analytics (third-party analytics cookies) only if you have given consent. We do not use profiling or advertising cookies. Your choice is stored in your browser and can be changed at any time using the button below.',
      'privacy.s6.title': '6. Data retention',
      'privacy.s6.body':  'Data collected by Google Analytics is retained for 14 months, after which it is automatically deleted. Aggregated and anonymous data may be retained indefinitely.',
      'privacy.s7.title': '7. Your rights',
      'privacy.s7.body':  'You have the right to access your data, request its deletion, object to processing, and lodge a complaint with the Italian Data Protection Authority (Garante Privacy). To exercise these rights, write to us at hello@hardkoro.com.',
      'privacy.s8.title': '8. Changes to this policy',
      'privacy.s8.body':  'We may update this privacy policy from time to time. Changes will be published on this page with the updated date.',
      'privacy.reset.label': 'Changed your mind about cookies?',
      'privacy.reset.btn':   'Update your preferences',

      /* ─────────── INDEX ─────────── */
      'index.hero.headline':   'No rehearsal.<br>No audience.<br>Everyone here is here to sing.',
      'index.hero.cta':        'Upcoming dates →',
      'index.s2.title':        'No rehearsal.<br>No audience.<br>Everyone here is here to sing.',
      'index.s2.body':         'HardKoro turns a room full of strangers into a spontaneous choir. No auditions, no fixed commitment. We teach every song from scratch — no experience needed. Come as you are (maybe with a friend, or five).',
      'index.s3.title':        'Come and sing',
      'index.s3.col-date':     'Date',
      'index.s3.col-place':    'City &amp; Venue',
      'index.s4.title':        'HardKoro in action',
      'index.s4.yt':           'Watch all videos on YouTube ↗',
      'events.loading':        'Loading dates…',
      'events.empty':          'We\'re warming up.<br>New dates coming soon.',
      'events.error':          'Could not load dates. Please try again later.',
      'events.social.title':   'Follow us. We\'ll let you know when it\'s time to sing.',
      'events.social.sub':     '',

      /* ─────────── ABOUT ─────────── */
      'about.hero':            'Singing together, no strings attached.',
      'about.mission1':        'HardKoro was born from a simple idea: collective singing should not be a privilege reserved for those who studied music. It\'s for everyone — for the person who sings out of tune in the shower, for someone who\'s never read a score, for anyone who wants to share something real with strangers.',
      'about.mission2':        'Every session is a social experiment. A room, a guide, a song to learn together. No rehearsals, no audience, no judgement. Just the voice — yours, everyone else\'s, and the moment they become one.',
      'about.science.title':   'Why it works',
      'about.science.intro':   'We don\'t just say this because participants feel it — research confirms it too. Singing together isn\'t just enjoyable: it\'s deeply useful.',
      'about.card1.title':     'Hearts synchronise',
      'about.card1.body':      'When you sing in a group, heart rates tend to align. This isn\'t metaphor — it\'s physiology. Shared rhythm creates biological coherence between people.',
      'about.card2.title':     'Endorphins rise',
      'about.card2.body':      'Singing activates the endorphin system — the same neurotransmitters triggered by physical exercise. The group amplifies the effect: singing together releases more endorphins than singing alone.',
      'about.card3.title':     'Social barriers lower',
      'about.card3.body':      'Just 60 minutes of collective singing with strangers generates a sense of connection and belonging comparable to months of acquaintance. It\'s one of the fastest ways we know to create social bonds.',
      'about.card4.title':     'Cortisol drops',
      'about.card4.body':      'Singing reduces cortisol levels — the primary biological marker of stress. The effect is measurable after a single session, regardless of the participant\'s musical background.',
      'about.card5.title':     'Breathing regulates',
      'about.card5.body':      'Singing imposes a slower, deeper breathing rhythm. In a group, everyone breathes together — which has a direct effect on the autonomic nervous system, producing a state of active calm.',
      'about.card6.title':     'Long-term memory activates',
      'about.card6.body':      'The brain processes music differently from language, engaging areas linked to emotional and procedural memory. Learning a song together is an experience that stays with you.',
      'about.cta.headline':    'Now it\'s your turn.',
      'about.cta.sub':         'No experience required. Just show up.',
      'about.cta.btn':         'See upcoming dates →',

      /* ─────────── SINGBUILDING ─────────── */
      'sb.hero.headline':      'SingBuilding turns your organisation into a spontaneous, unstoppable choir.',
      'sb.hero.sub':           'No rehearsals, no experience required.',
      'sb.storia.headline':    'Collective singing is the oldest cohesion tool humanity has ever known.',
      'sb.storia.body':        'For millions of years, humans have used song to synchronise, build trust, and break down hierarchies. Before meetings, before slides, before ropes courses — there was the voice. Modern science has simply confirmed what our ancestors knew instinctively.',
      'sb.storia.quote':       '"A mega-mechanism for social bonding: why singing together is good for us."',
      'sb.card.end.title':     'Endorphins',
      'sb.card.end.body':      'released during collective singing, reducing stress and lifting mood within 60 minutes',
      'sb.card.oss.title':     'Oxytocin',
      'sb.card.oss.body':      'the bonding hormone, produced when voices harmonise together — identical to what builds trust between colleagues',
      'sb.card.bar.title':     'Barriers',
      'sb.card.bar.body':      'between people dissolve when everyone sings in unison — CEO and intern alike',
      'sb.benefits.title':     'What it brings to your team',
      'sb.b1.title':           'Real connection',
      'sb.b1.body':            'In 60 minutes of singing together, the sense of belonging generated is comparable to months of acquaintance. This isn\'t a manufactured team exercise — it\'s a biological mechanism that works for anyone, regardless of role or seniority.',
      'sb.b2.title':           'Energy and presence after the event',
      'sb.b2.body':            'Singing activates the endorphin system and lowers cortisol — the primary stress marker. Participants return to work with a measurable lift in energy and lightness. This isn\'t stage motivation: it\'s physiology.',
      'sb.b3.title':           'A shared memory that lasts',
      'sb.b3.body':            'The brain processes music differently from language — it engages emotional and procedural memory. A song learned together becomes an anchor: something to return to, something that connects people long after the event ends.',
      'sb.numeri.events':      'Events delivered',
      'sb.numeri.people':      'People made to sing',
      'sb.numeri.songs':       'Different songs',
      'sb.testimonial':        'I was sceptical. Two hours later I was completely converted. The whole team was smiling. It was the most human moment we\'d shared in years.',
      'sb.testimonial.source': 'Participant, SingBuilding event — Milan',
      'sb.contesti.title':     'Works in every context',
      'sb.ctx1':               'Company party',
      'sb.ctx2':               'Offsite',
      'sb.ctx3':               'Conferences &amp; conventions',
      'sb.ctx4':               'Year-kick-off',
      'sb.ctx5':               'Onboarding',
      'sb.ctx6':               'Retreats',
      'sb.ctx7':               'Trade shows &amp; public events',
      'sb.clienti.label':      'They trusted us',
      'sb.contact.headline':   'Give us the note.',
      'sb.contact.sub':        'We\'d love to design a SingBuilding experience for your team.',
      'sb.contact.btn':        'Let\'s talk →',

      /* ── COOKIE BANNER ── */
      'cookie.body':    'We use analytics cookies (Google Analytics) to understand how people use the site. No personally identifiable data.',
      'cookie.accept':  'Accept',
      'cookie.decline': 'Decline',
      'cookie.policy':  'Privacy policy',

      /* ─────────── CONTACT ─────────── */
      'contact.headline':      'Make yourself heard',
      'contact.opt1.title':    'Collaborations &amp; SingBuilding',
      'contact.opt1.sub':      'Want to bring HardKoro to your team or collaborate with us?',
      'contact.opt1.btn':      'Let\'s talk →',
      'contact.opt2.title':    'Media enquiries',
      'contact.opt2.sub':      'Press kit, interviews, photo materials.',
      'contact.opt2.btn':      'Get in touch →',
    }
  };

  // ── DETECT LANGUAGE ────────────────────────────────────────────
  function detectLang() {
    const stored = localStorage.getItem('hk-lang');
    if (stored === 'en' || stored === 'it') return stored;
    const browser = (navigator.language || navigator.userLanguage || 'it').toLowerCase();
    return browser.startsWith('en') ? 'en' : 'it';
  }

  // ── APPLY TRANSLATIONS ─────────────────────────────────────────
  function applyLang(lang) {
    const dict = STRINGS[lang] || STRINGS.it;
    document.documentElement.lang = lang;

    // Text content
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (dict[key] !== undefined) el.textContent = dict[key];
    });

    // Inner HTML (allows <br> tags etc.)
    document.querySelectorAll('[data-i18n-html]').forEach(el => {
      const key = el.dataset.i18nHtml;
      if (dict[key] !== undefined) el.innerHTML = dict[key];
    });

    // Attributes  e.g. data-i18n-attr="aria-label:nav.home"
    document.querySelectorAll('[data-i18n-attr]').forEach(el => {
      const [attr, key] = el.dataset.i18nAttr.split(':');
      if (dict[key] !== undefined) el.setAttribute(attr, dict[key]);
    });

    // Update toggle button state
    document.querySelectorAll('.lang-toggle').forEach(toggle => {
      toggle.querySelectorAll('button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
        btn.setAttribute('aria-pressed', btn.dataset.lang === lang);
      });
    });

    // Persist
    localStorage.setItem('hk-lang', lang);
  }

  // ── BUILD TOGGLE HTML ──────────────────────────────────────────
  function buildToggle() {
    const div = document.createElement('div');
    div.className = 'lang-toggle';
    div.setAttribute('aria-label', 'Language / Lingua');
    div.innerHTML = `
      <button data-lang="it" aria-pressed="false">IT</button>
      <span class="lang-sep">|</span>
      <button data-lang="en" aria-pressed="false">EN</button>`;
    div.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => applyLang(btn.dataset.lang));
    });
    return div;
  }

  // ── INJECT TOGGLE INTO NAV ─────────────────────────────────────
  function injectToggles() {
    // Desktop: after .nav-cta inside .nav-right
    const navRight = document.querySelector('.nav-right');
    const hamburger = document.querySelector('.nav-hamburger');
    if (navRight && hamburger) {
      navRight.insertBefore(buildToggle(), hamburger);
    }

    // Mobile drawer: after the .nav-cta link
    const drawer = document.getElementById('mobileMenu');
    if (drawer) {
      drawer.appendChild(buildToggle());
    }
  }

  // ── INIT ───────────────────────────────────────────────────────
  function init() {
    injectToggles();
    applyLang(detectLang());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose for events script to call when re-rendering dates
  window.HK_LANG = {
    get: () => localStorage.getItem('hk-lang') || 'it',
    strings: STRINGS,
  };

})();
