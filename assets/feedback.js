/* =====================================================================
   Amigos — design review comments
   ---------------------------------------------------------------------
   A review toolbar for the client, modelled on Netlify's deploy-preview
   Drawer but with no login: a dark bar at the bottom centre with
   Comment, Screenshot, a list of your comments, and Hide.

   - Comment: click anywhere, a pin drops there and the composer opens
     beside it. "Az egész oldalhoz" leaves a note on the page as a whole.
   - Screenshot: drag a rectangle; the browser's tab capture takes one
     frame, cropped to the rectangle, and attaches it to the note.
   - List: the notes sent from this browser, across pages. A note can
     be deleted from its bubble or from the list; that also deletes the
     Netlify submission, through netlify/functions/review-delete.mjs,
     matched by the random ref sent with it.

   Notes go to Netlify Forms as "design-feedback" (declared statically in
   feedback-form.html, which is how the deploy detects it; fields not
   declared there are dropped) with enough context to find the spot
   again: page, deploy host, viewport, the nearest heading, an element
   path and the click point.

   Only reviewers load this — see the loader at the end of
   assets/responsive.js (?review switches it on, ?review=off off).

   Everything lives in one shadow root appended to <body>, outside
   React's #dc-root: the page's styles can't reach in, and React never
   sees a node it doesn't own. The only touch on the page itself is a
   class on <html> for the crosshair cursor while placing a pin.
   ===================================================================== */
(function () {
  'use strict';

  if (window.__amReview) return;
  window.__amReview = true;

  var FORM = 'design-feedback';
  var ENDPOINT = '/feedback-form.html';
  var DELETE_URL = '/api/review-delete';
  var NAME_KEY = 'am-review-name';
  var PINS_KEY = 'am-review-pins';
  var HIDDEN_KEY = 'am-review-hidden';
  var MAX_FILE = 8 * 1024 * 1024; // Netlify's per-request limit
  var COMPOSER_W = 340;

  function load(key, fallback) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; }
    catch (e) { return fallback; }
  }
  function save(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch (e) {}
  }

  function text(el) {
    return (el && (el.innerText || el.textContent) || '').replace(/\s+/g, ' ').trim();
  }
  function clip(s, n) { return s.length > n ? s.slice(0, n - 1) + '…' : s; }
  function when(t) {
    return new Date(t).toLocaleString('hu-HU', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  }

  /* A path that finds the element again on the same export: tags with
     nth-of-type, anchored at the nearest id (usually #dc-root). */
  function pathOf(el) {
    var parts = [];
    while (el && el.nodeType === 1 && el !== document.body) {
      if (el.id) { parts.unshift('#' + CSS.escape(el.id)); return parts.join(' > '); }
      var i = 1, s = el;
      while ((s = s.previousElementSibling)) if (s.tagName === el.tagName) i++;
      parts.unshift(el.tagName.toLowerCase() + ':nth-of-type(' + i + ')');
      el = el.parentElement;
    }
    parts.unshift('body');
    return parts.join(' > ');
  }

  /* What a person reading the email would call the spot: the closest
     heading above it, and a little of the element's own text. */
  function headingFor(el) {
    for (var n = el; n && n !== document.body; n = n.parentElement) {
      var h = n.matches('h1,h2,h3') ? n : n.querySelector('h1,h2,h3');
      if (h && text(h)) return clip(text(h), 80);
    }
    return '';
  }
  function describe(el) {
    var tag = el.tagName.toLowerCase();
    var label = el.getAttribute('alt') || el.getAttribute('aria-label') || text(el);
    return label ? tag + ' “' + clip(label, 80) + '”' : tag;
  }

  /* A spot on the page, anchored to the element under it so it follows
     the layout across breakpoints. x/y are page coordinates. */
  function spotAt(el, clientX, clientY, kind) {
    var r = el.getBoundingClientRect();
    return {
      kind: kind,
      selector: pathOf(el),
      heading: headingFor(el),
      label: describe(el),
      fx: r.width ? (clientX - r.left) / r.width : 0,
      fy: r.height ? (clientY - r.top) / r.height : 0,
      x: Math.round(clientX + scrollX),
      y: Math.round(clientY + scrollY)
    };
  }
  function spotName(s) {
    return s ? (s.heading ? s.heading + ' — ' : '') + s.label : 'Az egész oldal';
  }

  /* ---------------------------------------------------------------- UI */

  var INK = '#131D15';
  var CSS_TEXT = [
    ':host{all:initial;}',
    '*{box-sizing:border-box;font-family:var(--font-body,"Instrument Sans",system-ui,sans-serif);}',
    'button{font:inherit;cursor:pointer;color:inherit;}',
    'svg{width:18px;height:18px;flex:none;}',
    '[hidden]{display:none !important;}',
    ':focus-visible{outline:2px solid #F2B400;outline-offset:2px;}',

    /* toolbar */
    '.bar{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);display:flex;align-items:center;gap:2px;padding:6px;border-radius:999px;background:' + INK + ';color:#fff;box-shadow:0 8px 28px rgba(19,29,21,.32);}',
    '.tool{position:relative;display:flex;align-items:center;gap:8px;height:40px;padding:0 14px;border:0;border-radius:999px;background:transparent;font-size:14px;font-weight:600;line-height:1;white-space:nowrap;}',
    '.tool:hover{background:rgba(255,255,255,.12);}',
    '.tool[aria-pressed=true]{background:#F2B400;color:' + INK + ';}',
    '.tool.icon{width:40px;padding:0;justify-content:center;}',
    '.sep{width:1px;height:24px;margin:0 4px;background:rgba(255,255,255,.2);}',
    '.count{min-width:20px;height:20px;padding:0 6px;border-radius:999px;background:#F2B400;color:' + INK + ';font-size:12px;line-height:20px;text-align:center;}',
    '.mini{position:fixed;left:50%;bottom:16px;transform:translateX(-50%);display:flex;align-items:center;justify-content:center;width:44px;height:44px;border:0;border-radius:50%;background:' + INK + ';color:#fff;box-shadow:0 8px 28px rgba(19,29,21,.32);}',
    '.hint{position:fixed;left:50%;bottom:72px;transform:translateX(-50%);display:flex;flex-wrap:wrap;align-items:center;justify-content:center;gap:6px 12px;width:max-content;max-width:calc(100vw - 32px);padding:8px 8px 8px 16px;border-radius:12px;background:' + INK + ';color:#fff;font-size:14px;line-height:1.35;box-shadow:0 8px 28px rgba(19,29,21,.32);}',
    '.hint kbd{padding:1px 6px;border-radius:4px;background:rgba(255,255,255,.16);font:inherit;font-size:12px;}',
    '.chip{border:0;border-radius:999px;padding:6px 12px;background:#fff;color:' + INK + ';font-size:13px;font-weight:600;}',
    '@media (max-width:620px){.tool .lbl{display:none;}.tool{width:40px;padding:0;justify-content:center;}.tool .count{position:absolute;top:-4px;right:-4px;}}',

    /* placing */
    '.box{position:fixed;pointer-events:none;border:2px solid #F2B400;background:rgba(242,180,0,.10);border-radius:4px;}',
    '.veil{position:fixed;inset:0;cursor:crosshair;touch-action:none;background:rgba(19,29,21,.18);}',
    '.marquee{position:fixed;border:2px dashed #F2B400;background:rgba(242,180,0,.14);box-shadow:0 0 0 9999px rgba(19,29,21,.22);}',

    /* pins */
    '.pin{position:absolute;width:30px;height:30px;margin:-30px 0 0 0;padding:0;border:2px solid #fff;border-radius:50% 50% 50% 4px;background:#F2B400;color:' + INK + ';font-size:13px;font-weight:700;line-height:26px;text-align:center;box-shadow:0 2px 10px rgba(19,29,21,.35);}',
    '.pin.draft{background:' + INK + ';color:#fff;}',
    '.pin.on{outline:3px solid ' + INK + ';outline-offset:1px;}',
    '.bubble{position:absolute;width:260px;padding:12px 14px;border-radius:12px;background:#fff;color:' + INK + ';font-size:14px;line-height:1.45;white-space:pre-wrap;box-shadow:0 8px 28px rgba(19,29,21,.28);}',
    '.bubble .foot{display:flex;flex-wrap:wrap;align-items:center;gap:4px 12px;margin-top:8px;color:#51655D;font-size:12px;white-space:normal;}',
    '.bubble .foot .grow{flex:1;white-space:nowrap;}',
    '.link{border:0;padding:0;background:none;color:#51655D;font-size:12px;font-weight:600;text-decoration:underline;}',
    '.link.danger{color:#993166;}',

    /* composer */
    '.composer{position:absolute;width:' + COMPOSER_W + 'px;padding:14px;border-radius:12px;background:#fff;color:' + INK + ';font-size:14px;line-height:1.45;box-shadow:0 12px 40px rgba(19,29,21,.3);}',
    '.composer .where{margin:0 0 10px;color:#51655D;font-size:12px;overflow-wrap:anywhere;}',
    '.composer input[type=text],.composer textarea{display:block;width:100%;margin:0 0 10px;padding:9px 11px;border:1px solid #C9D6CD;border-radius:8px;background:#F7FBF8;color:' + INK + ';font-size:14px;}',
    '.composer textarea{min-height:96px;resize:vertical;}',
    '.composer .who{margin:0 0 10px;font-size:12px;color:#51655D;}',
    '.composer .who button{border:0;padding:0;background:none;color:#028436;text-decoration:underline;font-size:12px;}',
    '.shot{position:relative;margin:0 0 10px;}',
    '.shot img{display:block;max-width:100%;max-height:160px;border-radius:8px;border:1px solid #D7E3D9;}',
    '.shot button{position:absolute;top:6px;right:6px;width:24px;height:24px;padding:0;border:0;border-radius:50%;background:' + INK + ';color:#fff;line-height:24px;}',
    '.shot button svg{width:14px;height:14px;vertical-align:middle;}',
    '.actions{display:flex;align-items:center;gap:8px;}',
    '.actions .grow{flex:1;}',
    '.attach{display:flex;align-items:center;justify-content:center;width:36px;height:36px;border-radius:8px;color:#51655D;cursor:pointer;}',
    '.attach:hover{background:#EEF4F0;}',
    '.attach input{position:absolute;width:1px;height:1px;opacity:0;}',
    '.btn{border:0;border-radius:999px;padding:9px 16px;font-size:14px;font-weight:600;line-height:1.2;}',
    '.btn.primary{background:#007D37;color:#fff;}',
    '.btn.primary:hover{background:#05652C;}',
    '.btn.primary:disabled{opacity:.6;cursor:default;}',
    '.btn.ghost{background:transparent;color:' + INK + ';}',
    '.btn.ghost:hover{background:#EEF4F0;}',
    '.err{margin:0 0 10px;color:#993166;font-size:12px;}',
    '.trap{position:absolute;left:-9999px;}',
    '@media (max-width:520px){.composer{position:fixed;left:0 !important;right:0;top:auto !important;bottom:0;width:auto;border-radius:24px 24px 0 0;padding:20px 16px;}}',

    /* list */
    '.list{position:fixed;top:0;right:0;bottom:0;width:min(360px,100vw);display:flex;flex-direction:column;background:#fff;color:' + INK + ';box-shadow:-12px 0 40px rgba(19,29,21,.2);}',
    '.list header{display:flex;align-items:flex-start;gap:12px;padding:20px 16px 12px 20px;border-bottom:1px solid #D7E3D9;}',
    '.list h2{margin:0;font-size:17px;}',
    '.list header p{margin:4px 0 0;color:#51655D;font-size:12px;line-height:1.4;}',
    '.list header button{flex:none;margin-left:auto;display:flex;width:32px;height:32px;align-items:center;justify-content:center;border:0;border-radius:8px;background:none;}',
    '.list header button:hover{background:#EEF4F0;}',
    '.list ol{flex:1;overflow:auto;margin:0;padding:8px;list-style:none;}',
    '.list li a,.list li button.item{display:flex;gap:12px;width:100%;padding:12px;border:0;border-radius:12px;background:none;color:inherit;text-align:left;text-decoration:none;font-size:14px;line-height:1.4;}',
    '.list li a:hover,.list li button.item:hover{background:#F2F7F3;}',
    '.list li{display:flex;flex-wrap:wrap;align-items:flex-start;}',
    '.list li>a,.list li>button.item{flex:1;width:auto;min-width:0;}',
    '.list .trash{flex:none;display:flex;width:32px;height:32px;margin:8px 4px 0 0;align-items:center;justify-content:center;border:0;border-radius:8px;background:none;color:#51655D;}',
    '.list .trash:hover{background:#F2F7F3;color:#993166;}',
    '.list .confirm{flex:1 0 100%;display:flex;flex-wrap:wrap;align-items:center;gap:4px 12px;padding:0 12px 12px 48px;color:#51655D;font-size:12px;}',
    '.list .n{flex:none;width:24px;height:24px;border-radius:50% 50% 50% 4px;background:#F2B400;font-size:12px;font-weight:700;line-height:24px;text-align:center;}',
    '.list .n.gen{background:#D7EFDA;}',
    '.list .meta{display:block;margin-top:4px;color:#51655D;font-size:12px;}',
    '.list .empty{padding:24px 12px;color:#51655D;font-size:14px;}',
    '.list footer{padding:12px 16px 76px;border-top:1px solid #D7E3D9;}', // clears the toolbar
    '.list footer .btn{width:100%;background:' + INK + ';color:#fff;}',

    '.toast{position:fixed;left:50%;bottom:72px;transform:translateX(-50%);padding:10px 16px;border-radius:12px;background:#007D37;color:#fff;font-size:14px;box-shadow:0 8px 28px rgba(19,29,21,.3);}'
  ].join('');

  function icon(d) {
    return '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + '</svg>';
  }
  var I = {
    comment: icon('<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/>'),
    shot: icon('<path d="M4 8V5a1 1 0 0 1 1-1h3M16 4h3a1 1 0 0 1 1 1v3M20 16v3a1 1 0 0 1-1 1h-3M8 20H5a1 1 0 0 1-1-1v-3"/><circle cx="12" cy="12" r="3"/>'),
    list: icon('<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>'),
    hide: icon('<path d="m6 9 6 6 6-6"/>'),
    close: icon('<path d="M18 6 6 18M6 6l12 12"/>'),
    trash: icon('<path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6M10 11v5M14 11v5"/>'),
    clip: icon('<path d="m21.4 11.6-9.2 9.2a6 6 0 0 1-8.5-8.5l9.2-9.2a4 4 0 0 1 5.7 5.7l-9.2 9.2a2 2 0 0 1-2.8-2.8l8.5-8.5"/>')
  };

  var host = document.createElement('div');
  host.id = 'am-review';
  host.style.cssText = 'position:absolute;top:0;left:0;width:0;height:0;overflow:visible;z-index:2147483000;';
  var root = host.attachShadow({ mode: 'open' });
  root.innerHTML =
    '<style>' + CSS_TEXT + '</style>' +
    '<div class="pins"></div>' +
    '<div class="box" hidden></div>' +
    '<div class="veil" hidden><div class="marquee" hidden></div></div>' +
    '<div class="hint" role="status" hidden></div>' +
    '<form class="composer" role="dialog" aria-label="Megjegyzés" hidden>' +
      '<p class="where"></p>' +
      '<p class="trap"><label>Ne töltsd ki: <input name="bot-field" tabindex="-1" autocomplete="off"></label></p>' +
      '<p class="who" hidden>Küldő: <strong></strong> · <button type="button" data-rename>módosítás</button></p>' +
      '<input name="name" type="text" placeholder="A neved" autocomplete="name" aria-label="A neved">' +
      '<textarea name="comment" placeholder="Írd le, mit változtatnál, vagy mi tetszik…" aria-label="Megjegyzés" required></textarea>' +
      '<div class="shot" hidden><img alt="Csatolt képernyőkép"><button type="button" data-unshot aria-label="Kép eltávolítása">' + I.close + '</button></div>' +
      '<p class="err" role="alert" hidden></p>' +
      '<div class="actions">' +
        '<label class="attach" title="Kép csatolása">' + I.clip + '<input name="file" type="file" accept="image/*" aria-label="Kép csatolása"></label>' +
        '<span class="grow"></span>' +
        '<button class="btn ghost" type="button" data-cancel>Mégse</button>' +
        '<button class="btn primary" type="submit">Küldés</button>' +
      '</div>' +
    '</form>' +
    '<aside class="list" aria-label="Megjegyzéseid" hidden>' +
      '<header><div><h2>Megjegyzéseid</h2><p>Az ebből a böngészőből küldöttek. Mi minden megjegyzést megkapunk.</p></div>' +
      '<button type="button" data-close-list aria-label="Bezárás">' + I.close + '</button></header>' +
      '<ol></ol>' +
      '<footer><button class="btn" type="button" data-general>Megjegyzés az egész oldalhoz</button></footer>' +
    '</aside>' +
    '<div class="toast" role="status" hidden></div>' +
    '<div class="bar" role="toolbar" aria-label="Design-visszajelzés">' +
      '<button class="tool" type="button" data-tool="pin" aria-pressed="false" title="Megjegyzés (C)">' + I.comment + '<span class="lbl">Megjegyzés</span></button>' +
      '<button class="tool" type="button" data-tool="area" aria-pressed="false" title="Képernyőkép (S)">' + I.shot + '<span class="lbl">Képernyőkép</span></button>' +
      '<button class="tool" type="button" data-tool="list" aria-pressed="false" title="Megjegyzéseid">' + I.list + '<span class="lbl">Lista</span><span class="count" hidden></span></button>' +
      '<span class="sep"></span>' +
      '<button class="tool icon" type="button" data-hide title="Eszköztár elrejtése" aria-label="Eszköztár elrejtése">' + I.hide + '</button>' +
    '</div>' +
    '<button class="mini" type="button" title="Design-visszajelzés" aria-label="Design-visszajelzés megnyitása" hidden>' + I.comment + '</button>';

  var $ = function (s) { return root.querySelector(s); };
  var bar = $('.bar'), mini = $('.mini'), hint = $('.hint'), box = $('.box');
  var veil = $('.veil'), marquee = $('.marquee'), composer = $('.composer');
  var list = $('.list'), pinsEl = $('.pins'), toast = $('.toast'), errEl = $('.err');
  var shotWrap = $('.shot'), countEl = $('.count');
  var f = composer.elements;

  var mode = null;      // 'pin' | 'area' | null
  var spot = null;      // where the note being written points, or null for the whole page
  var shot = null;      // Blob attached to the note
  var openPin = null;   // id of the pin whose bubble is showing
  var confirmDel = null; // id of the note asking "Biztosan törlöd?"
  var deleting = null;   // id of the note being deleted

  var cursor = document.createElement('style');
  cursor.textContent = 'html.am-picking,html.am-picking *{cursor:crosshair !important;}';
  document.head.appendChild(cursor);

  function press(tool) {
    root.querySelectorAll('[data-tool]').forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-tool') === tool));
    });
  }

  function showHint(html) {
    hint.innerHTML = html;
    hint.hidden = !html;
  }

  /* ------------------------------------------------------- comment mode */

  function ours(e) { return e.target === host; }

  function onMove(e) {
    if (ours(e)) { box.hidden = true; return; }
    var r = e.target.getBoundingClientRect();
    box.hidden = false;
    box.style.cssText = 'left:' + r.left + 'px;top:' + r.top + 'px;width:' + r.width + 'px;height:' + r.height + 'px;';
  }

  /* Capture phase, so the click drops a pin instead of following a link
     or pressing a button on the page. */
  function onPick(e) {
    if (ours(e)) return;
    e.preventDefault();
    e.stopPropagation();
    var s = spotAt(e.target, e.clientX, e.clientY, 'pin');
    setMode(null);
    compose(s, null);
  }

  /* ---------------------------------------------------- screenshot mode */

  var drag = null;
  veil.addEventListener('pointerdown', function (e) {
    drag = { x: e.clientX, y: e.clientY };
    veil.setPointerCapture(e.pointerId);
    marquee.hidden = false;
    sizeMarquee(e);
  });
  veil.addEventListener('pointermove', function (e) { if (drag) sizeMarquee(e); });
  veil.addEventListener('pointerup', function (e) {
    if (!drag) return;
    var r = rectFrom(e);
    drag = null;
    marquee.hidden = true;
    if (r.w < 12 || r.h < 12) return; // a stray click, keep waiting for a drag
    setMode(null);

    // Anchor the note to whatever is under the rectangle's corner.
    host.style.visibility = 'hidden';
    var el = document.elementFromPoint(r.x + 2, r.y + 2) || document.body;
    host.style.visibility = '';
    var s = spotAt(el, r.x, r.y, 'area');
    s.area = Math.round(r.x + scrollX) + ',' + Math.round(r.y + scrollY) + ' ' + Math.round(r.w) + '×' + Math.round(r.h);
    s.x = Math.round(r.x + r.w + scrollX); // open the composer beside the rectangle, not over it

    showHint('Engedélyezd a képernyőképet a böngésző ablakában (<strong>ez a lap</strong>).');
    capture(r).then(function (blob) {
      showHint('');
      compose(s, blob);
      if (!blob) fail('Nem készült képernyőkép — csatolhatsz egyet a gemkapoccsal.');
    });
  });

  function rectFrom(e) {
    var x = Math.min(drag.x, e.clientX), y = Math.min(drag.y, e.clientY);
    return { x: x, y: y, w: Math.abs(e.clientX - drag.x), h: Math.abs(e.clientY - drag.y) };
  }
  function sizeMarquee(e) {
    var r = rectFrom(e);
    marquee.style.cssText = 'left:' + r.x + 'px;top:' + r.y + 'px;width:' + r.w + 'px;height:' + r.h + 'px;';
  }

  /* One frame of the tab via the Screen Capture API, cropped to the
     rectangle. Our own UI is hidden for the frame. If the reviewer shares
     a window or screen instead of the tab, the crop wouldn't line up,
     so the whole frame is kept. Resolves null when capture isn't
     available or is declined. */
  function capture(r) {
    var md = navigator.mediaDevices;
    if (!md || !md.getDisplayMedia) return Promise.resolve(null);
    var stream;
    return md.getDisplayMedia({
      video: { displaySurface: 'browser' },
      audio: false,
      preferCurrentTab: true,
      selfBrowserSurface: 'include'
    }).then(function (s) {
      stream = s;
      host.style.visibility = 'hidden';
      var v = document.createElement('video');
      v.muted = true;
      v.playsInline = true;
      v.srcObject = s;
      return v.play().then(function () {
        return new Promise(function (ok) { setTimeout(ok, 350); }); // let the sharing bar settle
      }).then(function () {
        var track = s.getVideoTracks()[0];
        var surface = track.getSettings && track.getSettings().displaySurface;
        var vw = v.videoWidth, vh = v.videoHeight;
        var c = document.createElement('canvas'), g = c.getContext('2d');
        if (surface === 'browser') {
          var sx = vw / innerWidth, sy = vh / innerHeight;
          c.width = Math.round(r.w * sx);
          c.height = Math.round(r.h * sy);
          g.drawImage(v, r.x * sx, r.y * sy, r.w * sx, r.h * sy, 0, 0, c.width, c.height);
        } else {
          c.width = vw;
          c.height = vh;
          g.drawImage(v, 0, 0);
        }
        return new Promise(function (ok) { c.toBlob(ok, 'image/png'); });
      });
    }).catch(function (err) {
      console.warn('[am-review] no screenshot:', err && err.name, err && err.message);
      return null;
    }).then(function (blob) {
      if (stream) stream.getTracks().forEach(function (t) { t.stop(); });
      host.style.visibility = '';
      return blob;
    });
  }

  /* --------------------------------------------------------------- modes */

  function setMode(m) {
    if (mode === 'pin') {
      document.documentElement.classList.remove('am-picking');
      document.removeEventListener('mousemove', onMove, true);
      document.removeEventListener('click', onPick, true);
      box.hidden = true;
    }
    if (mode === 'area') veil.hidden = true;
    mode = m;
    press(m);
    if (m) { closeComposer(); closeList(); closeBubble(); }

    if (m === 'pin') {
      document.documentElement.classList.add('am-picking');
      document.addEventListener('mousemove', onMove, true);
      document.addEventListener('click', onPick, true);
      showHint('Kattints oda, amihez megjegyzést írnál. <button class="chip" type="button" data-general>Az egész oldalhoz</button> <kbd>Esc</kbd>');
    } else if (m === 'area') {
      veil.hidden = false;
      showHint('Jelöld ki egérrel a területet. <kbd>Esc</kbd>');
    } else {
      showHint('');
    }
  }

  /* ------------------------------------------------------------ composer */

  function compose(s, blob) {
    spot = s;
    setShot(blob);
    errEl.hidden = true;
    $('.where').textContent = spotName(s);

    var name = load(NAME_KEY, '');
    f.name.value = name;
    f.name.hidden = !!name;
    $('.who').hidden = !name;
    $('.who strong').textContent = name;

    drawPins();
    composer.hidden = false;
    place(composer, s, COMPOSER_W);
    (name ? f.comment : f.name).focus({ preventScroll: true });
  }

  /* Beside the pin, flipped to the left near the right edge; on phones
     the composer is a bottom sheet (CSS). Page coordinates. */
  function place(el, s, w) {
    var x, y;
    if (s) { x = s.x + 22; y = s.y - 34; }
    else { x = scrollX + (innerWidth - w) / 2; y = scrollY + innerHeight * 0.25; }
    if (s && x + w > scrollX + innerWidth - 16) x = s.x - 22 - w;
    x = Math.max(scrollX + 16, Math.min(x, scrollX + innerWidth - w - 16));
    y = Math.max(scrollY + 16, y);
    el.style.left = x + 'px';
    el.style.top = y + 'px';
  }

  function closeComposer() {
    composer.hidden = true;
    composer.reset();
    spot = null;
    setShot(null);
    drawPins();
  }

  function setShot(blob) {
    shot = blob;
    var img = shotWrap.querySelector('img');
    if (img.src) URL.revokeObjectURL(img.src);
    img.removeAttribute('src');
    if (blob) img.src = URL.createObjectURL(blob);
    shotWrap.hidden = !blob;
  }

  function fail(msg) {
    errEl.textContent = msg;
    errEl.hidden = false;
  }

  f.file.addEventListener('change', function () {
    var file = f.file.files[0];
    if (!file) return;
    if (file.size > MAX_FILE) { f.file.value = ''; return fail('A kép legfeljebb 8 MB lehet.'); }
    errEl.hidden = true;
    setShot(file);
  });
  $('[data-unshot]').addEventListener('click', function () { setShot(null); f.file.value = ''; });
  $('[data-rename]').addEventListener('click', function () {
    $('.who').hidden = true;
    f.name.hidden = false;
    f.name.focus();
  });
  f.comment.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) composer.requestSubmit();
  });

  composer.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = f.name.value.trim(), comment = f.comment.value.trim();
    if (!name) { f.name.hidden = false; f.name.focus(); return fail('Írd be a neved, hogy tudjuk, kitől jött.'); }
    if (!comment) return f.comment.focus();
    if (shot && shot.size > MAX_FILE) return fail('A kép legfeljebb 8 MB lehet.');
    save(NAME_KEY, name);

    var ref = newRef();
    var data = new FormData();
    data.append('form-name', FORM);
    data.append('bot-field', f['bot-field'].value);
    data.append('name', name);
    data.append('comment', comment);
    data.append('page', document.title + ' (' + decodeURI(location.pathname) + ')');
    data.append('spot', spotName(spot));
    if (shot) data.append('screenshot', shot, shot.name || 'kepernyokep.png');
    data.append('url', location.href);
    data.append('host', location.host);
    data.append('viewport', innerWidth + '×' + innerHeight + ' @' + (devicePixelRatio || 1) + 'x');
    data.append('scroll', Math.round(scrollY) + ' / ' + document.documentElement.scrollHeight);
    data.append('selector', spot ? spot.selector : '');
    data.append('position', !spot ? '' : spot.area
      ? 'area ' + spot.area
      : 'page ' + spot.x + ',' + spot.y + ' · in element ' + Math.round(spot.fx * 100) + '%,' + Math.round(spot.fy * 100) + '%');
    data.append('browser', navigator.userAgent);
    data.append('ref', ref); // lets the reviewer delete this note later

    var send = composer.querySelector('[type=submit]');
    send.disabled = true;
    send.textContent = 'Küldés…';
    errEl.hidden = true;

    fetch(ENDPOINT, { method: 'POST', body: data })
      .then(function (res) {
        if (!res.ok) throw new Error(res.status);
        addPin(spot, comment, ref);
        closeComposer();
        say('Köszönjük, megkaptuk!');
      })
      .catch(function () {
        fail('Nem sikerült elküldeni. Próbáld újra egy kicsit később.');
      })
      .then(function () {
        send.disabled = false;
        send.textContent = 'Küldés';
      });
  });

  function say(msg) {
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(say.t);
    say.t = setTimeout(function () { toast.hidden = true; }, 3000);
  }

  /* ---------------------------------------------------------------- pins
     The reviewer's own notes, kept in this browser only, so they can see
     what they've already said. Each sits at the same relative point
     inside its element, so it follows the layout across breakpoints. */

  function allPins() { return load(PINS_KEY, []); }
  function pagePins() {
    return allPins().filter(function (p) { return p.page === location.pathname; });
  }

  function newRef() {
    var a = new Uint8Array(12);
    crypto.getRandomValues(a);
    return Array.prototype.map.call(a, function (b) { return ('0' + b.toString(16)).slice(-2); }).join('');
  }

  function addPin(s, comment, ref) {
    var pins = allPins();
    pins.push({
      id: Date.now().toString(36),
      ref: ref,
      page: location.pathname,
      title: document.title,
      selector: s ? s.selector : '',
      fx: s ? s.fx : 0,
      fy: s ? s.fy : 0,
      spot: spotName(s),
      comment: comment,
      at: Date.now()
    });
    save(PINS_KEY, pins);
    drawPins();
  }

  function pinXY(p) {
    if (!p.selector) return null;
    var el;
    try { el = document.querySelector(p.selector); } catch (e) {}
    if (!el) return null;
    var r = el.getBoundingClientRect();
    if (!r.width && !r.height) return null;
    return { x: r.left + scrollX + p.fx * r.width, y: r.top + scrollY + p.fy * r.height };
  }

  function drawPins() {
    pinsEl.textContent = '';
    var mine = pagePins();
    var n = 0;
    mine.forEach(function (p) {
      if (!p.selector) return;
      n++;
      var at = pinXY(p);
      if (!at) return;
      var dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'pin' + (openPin === p.id ? ' on' : '');
      dot.textContent = n;
      dot.setAttribute('aria-label', n + '. megjegyzésed: ' + p.comment);
      dot.style.left = at.x + 'px';
      dot.style.top = at.y + 'px';
      dot.addEventListener('click', function () {
        openPin = openPin === p.id ? null : p.id;
        drawPins();
      });
      pinsEl.appendChild(dot);
      if (openPin === p.id) {
        var b = document.createElement('div');
        b.className = 'bubble';
        b.textContent = p.comment;
        var foot = document.createElement('div');
        foot.className = 'foot';
        var t = document.createElement('span');
        t.className = 'grow';
        t.textContent = when(p.at);
        foot.appendChild(t);
        delControls(p, foot);
        b.appendChild(foot);
        pinsEl.appendChild(b);
        place(b, { x: at.x, y: at.y }, 260);
        b.style.top = (at.y + 8) + 'px'; // below the pin, so it never hides it
      }
    });
    if (spot && !spot.area) {
      var d = document.createElement('div');
      d.className = 'pin draft';
      d.textContent = n + 1;
      d.style.left = spot.x + 'px';
      d.style.top = spot.y + 'px';
      pinsEl.appendChild(d);
    }
    countEl.textContent = mine.length;
    countEl.hidden = !mine.length;
  }

  /* --------------------------------------------------------------- delete
     Ask once, inline (no browser dialog), then delete the Netlify
     submission and the local pin. A 404 means the submission is already
     gone, which is as good as deleted. Notes sent before refs existed
     have no ref and are only removed from this browser. */

  function delControls(p, into) {
    function link(label, cls, fn) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'link' + (cls ? ' ' + cls : '');
      b.textContent = label;
      b.addEventListener('click', function (e) { e.stopPropagation(); fn(); });
      into.appendChild(b);
    }
    if (deleting === p.id) {
      into.appendChild(document.createTextNode('Törlés…'));
    } else if (confirmDel === p.id) {
      into.appendChild(document.createTextNode('Biztosan törlöd?'));
      link('Törlés', 'danger', function () { removePin(p); });
      link('Mégse', '', function () { confirmDel = null; refresh(); });
    } else {
      link('Törlés', '', function () { confirmDel = p.id; refresh(); });
    }
  }

  function removePin(p) {
    deleting = p.id;
    refresh();
    var gone = !p.ref ? Promise.resolve() : fetch(DELETE_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ref: p.ref })
    }).then(function (res) {
      if (!res.ok && res.status !== 404) throw new Error(res.status);
    });
    gone.then(function () {
      save(PINS_KEY, allPins().filter(function (q) { return q.id !== p.id; }));
      if (openPin === p.id) openPin = null;
      say('Megjegyzés törölve.');
    }, function () {
      say('Nem sikerült törölni. Próbáld újra később.');
    }).then(function () {
      deleting = confirmDel = null;
      refresh();
    });
  }

  function refresh() {
    drawPins();
    if (!list.hidden) renderList();
  }

  function closeBubble() {
    if (openPin) { openPin = null; drawPins(); }
  }

  /* ---------------------------------------------------------------- list */

  function openList() {
    setMode(null);
    closeComposer();
    press('list');
    renderList();
    list.hidden = false;
    list.querySelector('[data-close-list]').focus();
  }

  function renderList() {
    var ol = list.querySelector('ol');
    ol.textContent = '';
    var pins = allPins().slice().reverse();
    if (!pins.length) {
      ol.innerHTML = '<li class="empty">Még nincs megjegyzésed. Nyomd meg a <strong>Megjegyzés</strong> gombot, és kattints az oldalra.</li>';
    }
    var numbers = {};
    pagePins().filter(function (p) { return p.selector; }).forEach(function (p, i) { numbers[p.id] = i + 1; });
    pins.forEach(function (p) {
      var here = p.page === location.pathname;
      var li = document.createElement('li');
      var item = document.createElement(here ? 'button' : 'a');
      if (here) { item.type = 'button'; item.className = 'item'; }
      else item.href = p.page + '#am-pin-' + p.id;
      var n = document.createElement('span');
      n.className = 'n' + (p.selector ? '' : ' gen');
      n.textContent = here && numbers[p.id] ? numbers[p.id] : '';
      var body = document.createElement('span');
      body.textContent = clip(p.comment, 160);
      var meta = document.createElement('span');
      meta.className = 'meta';
      meta.textContent = (here ? '' : (p.title || p.page) + ' · ') + clip(p.spot || '', 60) + ' · ' + when(p.at);
      body.appendChild(meta);
      item.appendChild(n);
      item.appendChild(body);
      if (here) item.addEventListener('click', function () { closeList(); focusPin(p.id); });
      li.appendChild(item);
      if (confirmDel === p.id || deleting === p.id) {
        var c = document.createElement('div');
        c.className = 'confirm';
        delControls(p, c);
        li.appendChild(c);
      } else {
        var trash = document.createElement('button');
        trash.type = 'button';
        trash.className = 'trash';
        trash.title = 'Törlés';
        trash.setAttribute('aria-label', 'Megjegyzés törlése');
        trash.innerHTML = I.trash;
        trash.addEventListener('click', function () { confirmDel = p.id; renderList(); });
        li.appendChild(trash);
      }
      ol.appendChild(li);
    });
  }

  function closeList() {
    list.hidden = true;
    if (!mode) press(null);
  }

  function focusPin(id) {
    var p = pagePins().filter(function (q) { return q.id === id; })[0];
    if (!p) return;
    var at = pinXY(p);
    if (at) scrollTo({ top: Math.max(0, at.y - innerHeight / 3), behavior: 'smooth' });
    openPin = id;
    drawPins();
  }

  /* ---------------------------------------------------------------- wire */

  root.querySelectorAll('[data-tool]').forEach(function (b) {
    b.addEventListener('click', function () {
      var t = b.getAttribute('data-tool');
      if (t === 'list') return list.hidden ? openList() : closeList();
      setMode(mode === t ? null : t);
    });
  });
  // The hint is rebuilt each time, so its "whole page" chip is delegated.
  root.addEventListener('click', function (e) {
    var g = e.target.closest && e.target.closest('[data-general]');
    if (!g) return;
    setMode(null);
    closeList();
    compose(null, null);
  });
  root.querySelector('[data-close-list]').addEventListener('click', closeList);
  root.querySelector('[data-cancel]').addEventListener('click', closeComposer);

  function setHidden(h) {
    if (h) { setMode(null); closeComposer(); closeList(); }
    bar.hidden = h;
    mini.hidden = !h;
    pinsEl.hidden = h;
    save(HIDDEN_KEY, h);
  }
  root.querySelector('[data-hide]').addEventListener('click', function () { setHidden(true); });
  mini.addEventListener('click', function () { setHidden(false); });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      if (mode) setMode(null);
      else if (!composer.hidden) closeComposer();
      else if (!list.hidden) closeList();
      else closeBubble();
      return;
    }
    // C / S like Netlify's shortcuts, but never while typing.
    var t = e.composedPath()[0];
    if (e.metaKey || e.ctrlKey || e.altKey || bar.hidden) return;
    if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
    if (e.key === 'c' || e.key === 'C') setMode(mode === 'pin' ? null : 'pin');
    else if (e.key === 's' || e.key === 'S') setMode(mode === 'area' ? null : 'area');
  });

  document.body.appendChild(host);
  setHidden(load(HIDDEN_KEY, false));

  // Arriving from the list on another page: open that pin.
  var m = /^#am-pin-(\w+)$/.exec(location.hash);

  /* React renders after load, images settle later and the hero animates
     in, so redraw the pins whenever the page's height, the window, or a
     page animation changes where things sit. */
  var t;
  function redraw() {
    clearTimeout(t);
    t = setTimeout(function () {
      drawPins();
      if (m) { focusPin(m[1]); m = null; }
    }, 200);
  }
  window.addEventListener('resize', redraw);
  document.addEventListener('animationend', redraw, true);
  document.addEventListener('transitionend', redraw, true);
  if (window.ResizeObserver) new ResizeObserver(redraw).observe(document.body);
  redraw();
})();
