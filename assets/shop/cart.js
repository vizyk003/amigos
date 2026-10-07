/* Adománybolt — shared cart for the shop grid, the product pages and the
   checkout.

   The cart lives in localStorage so it follows the visitor between pages.
   Pages provide the markup (header [data-cart-open] / [data-cart-count],
   the [data-cart] drawer); this file only binds it. All clicks are
   delegated from document, because the dc runtime renders <x-dc> content
   after this script has loaded.

   Add-to-cart buttons:
     <button data-add data-slug="…">Kosárba</button>
       adds the product at its minimum donation. A product with sizes
       (product.variants) cannot be added without one, so the button sends
       the visitor to the product page instead.
     Inside a [data-buy] container, an [data-amount] input supplies the
     donation (never below the minimum) and a checked
     input[data-variant] supplies the size. Messages go to [data-buy-note].
     data-open-cart on the button opens the drawer after adding.

   ---------------------------------------------------------------------
   WooCommerce
   ---------------------------------------------------------------------
   Every line carries the WooCommerce product ID (products.js), the
   quantity and the donation amount. The checkout button
   ([data-checkout]) then works in one of two modes:

     demo         (the static prototype) → Penztar.dc.html, which mirrors
                  WooCommerce's checkout fields.
     woocommerce  (the same markup inside a WordPress theme) → the cart is
                  pushed into the WooCommerce session and the visitor lands
                  on the real checkout (/penztar/).

   The mode is "woocommerce" when WooCommerce's own scripts are on the page
   (wc_add_to_cart_params / woocommerce_params), or when
   window.AMIGOS_SHOP = { mode: 'woocommerce', checkoutUrl: '…' } says so.

   The handoff uses the classic ?wc-ajax=add_to_cart endpoint, not the
   Store API's cart/add-item: the products are Name Your Price products,
   and the Store API rejects them ("enter a valid, positive number") while
   the classic endpoint accepts the amount as `nyp` (verified on amigos.hu
   2026-10-07). The WooCommerce cart is emptied first through the Store
   API, so this cart stays the single source of truth. */
(function () {
  // The dc helmet can evaluate a head script twice. A second copy would
  // hold its own in-memory cart and double every click, so only the first
  // one runs.
  if (window.AmigosCart) return;
  var KEY = 'amigos-cart-v2';
  var ROUND_KEY = 'amigos-cart-round';
  var cart = load();

  function products() { return window.AMIGOS_PRODUCTS || []; }
  function find(slug) { return products().filter(function (p) { return p.slug === slug; })[0]; }
  function variantOf(p, label) { return (p.variants || []).filter(function (v) { return v.label === label; })[0]; }
  function fmtNum(v) { return String(Math.round(v)).replace(/\B(?=(\d{3})+(?!\d))/g, ' '); }
  function fmt(v) { return fmtNum(v) + ' Ft'; }

  function load() {
    try { var v = JSON.parse(localStorage.getItem(KEY) || '[]'); return Array.isArray(v) ? v : []; }
    catch (e) { return []; }
  }
  function save() { try { localStorage.setItem(KEY, JSON.stringify(cart)); } catch (e) {} }
  function roundUp() { try { return localStorage.getItem(ROUND_KEY) === '1'; } catch (e) { return false; } }
  function setRoundUp(on) { try { localStorage.setItem(ROUND_KEY, on ? '1' : '0'); } catch (e) {} }

  // Quantity already in the cart for one WooCommerce product, across all
  // donation amounts — WooCommerce's stock limit is per product.
  function qtyOf(wcId) { return cart.reduce(function (s, l) { return s + (l.wcId === wcId ? l.qty : 0); }, 0); }

  function add(slug, price, variantLabel) {
    var p = find(slug);
    if (!p) return { ok: false, error: 'Ez a termék már nem elérhető.' };
    var v = null;
    if (p.variants) {
      v = variantOf(p, variantLabel);
      if (!v) return { ok: false, error: 'Válassz méretet.', needsVariant: true };
    }
    var wcId = v ? v.wcId : p.wcId;
    var max = v ? v.max : p.max;
    if (max && qtyOf(wcId) >= max) return { ok: false, error: 'Ebből most nincs több készleten.' };
    price = Math.max(p.price, Math.round(+price || 0));
    var variant = v ? v.label : null;
    var line = cart.filter(function (l) { return l.slug === slug && l.variant === variant && l.price === price; })[0];
    if (line) line.qty++;
    else cart.push({ slug: slug, wcId: wcId, name: p.name, variant: variant, price: price, min: p.price, max: max, qty: 1 });
    save(); render();
    return { ok: true };
  }

  function totals() {
    var count = cart.reduce(function (s, l) { return s + l.qty; }, 0);
    var items = cart.reduce(function (s, l) { return s + l.qty * l.price; }, 0);
    var extra = window.AMIGOS_SHOP_EXTRAS && window.AMIGOS_SHOP_EXTRAS.roundUp;
    var round = roundUp() && count && extra ? extra.amount : 0;
    // Shipping is free on the live store: Foxpost / Packeta parcel point.
    return { count: count, items: items, round: round, shipping: 0, total: items + round };
  }

  function setOpen(on) {
    var root = document.querySelector('[data-cart]');
    if (!root) return;
    var scrim = root.querySelector('[data-cart-scrim]');
    var panel = root.querySelector('[data-cart-panel]');
    root.style.pointerEvents = on ? 'auto' : 'none';
    root.setAttribute('aria-hidden', String(!on));
    if (scrim) scrim.style.opacity = on ? '1' : '0';
    if (panel) panel.style.transform = on ? 'translateX(0)' : 'translateX(100%)';
  }

  function lineMeta(l) {
    var bits = [];
    if (l.variant) bits.push('Méret: ' + l.variant);
    if (l.price > l.min) bits.push('Adomány: ' + fmt(l.price) + '/db');
    return bits.join(' · ');
  }

  // Product thumbnail for a cart line, linked to its product page.
  function thumb(l, w) {
    var p = find(l.slug);
    var a = document.createElement('a');
    a.href = 'Termek.dc.html?p=' + encodeURIComponent(l.slug);
    a.setAttribute('aria-hidden', 'true');
    a.tabIndex = -1;
    a.style.cssText = 'display:block;width:' + w + 'px;aspect-ratio:3/4;border-radius:var(--radius-md);overflow:hidden;background:var(--am-green-100);flex:none;';
    if (p && p.img) {
      var img = document.createElement('img');
      img.src = p.img; img.alt = ''; img.loading = 'lazy';
      img.style.cssText = 'width:100%;height:100%;object-fit:cover;display:block;';
      a.appendChild(img);
    }
    return a;
  }

  function render() {
    var t = totals();
    document.querySelectorAll('[data-cart-count]').forEach(function (el) { el.textContent = String(t.count); });
    document.querySelectorAll('[data-round]').forEach(function (el) { el.checked = roundUp(); });
    var totalEl = document.querySelector('[data-cart-total]');
    if (totalEl) totalEl.textContent = fmt(t.total);
    var shipEl = document.querySelector('[data-cart-ship]');
    if (shipEl) shipEl.textContent = 'Ingyenes kiszállítás Foxpost vagy Packeta pontra';
    document.querySelectorAll('[data-checkout]').forEach(function (el) {
      el.style.opacity = t.count ? '' : '0.45';
      el.style.pointerEvents = t.count ? '' : 'none';
      el.setAttribute('aria-disabled', String(!t.count));
    });
    var box = document.querySelector('[data-cart-items]');
    if (!box) return;
    box.textContent = '';
    if (!cart.length) {
      var empty = document.createElement('p');
      empty.textContent = 'Még üres. Minden vásárlás a heti kórházi programokat fedezi.';
      empty.style.cssText = 'margin:24px 0;font-size:15px;line-height:1.6;color:var(--amigos-ink-3);';
      box.appendChild(empty);
      return;
    }
    cart.forEach(function (l) {
      var row = document.createElement('div');
      row.style.cssText = 'display:grid;grid-template-columns:64px minmax(0,1fr) auto;gap:14px;align-items:center;padding:16px 0;border-bottom:1px solid var(--amigos-line);';
      var left = document.createElement('span');
      left.style.cssText = 'display:flex;flex-direction:column;gap:6px;min-width:0;';
      var nm = document.createElement('a');
      nm.href = 'Termek.dc.html?p=' + encodeURIComponent(l.slug);
      nm.textContent = l.name;
      nm.style.cssText = 'font-family:var(--font-display);font-weight:600;font-size:17px;letter-spacing:-0.02em;color:var(--amigos-ink);text-decoration:none;';
      left.appendChild(nm);
      var meta = lineMeta(l);
      if (meta) {
        var m = document.createElement('span');
        m.textContent = meta;
        m.style.cssText = 'font-size:13px;color:var(--amigos-ink-3);';
        left.appendChild(m);
      }
      var qty = document.createElement('span');
      qty.style.cssText = 'display:flex;align-items:center;gap:10px;font-size:15px;color:var(--amigos-ink-2);';
      function mk(label, aria, fn, disabled) {
        var b = document.createElement('button');
        b.type = 'button'; b.textContent = label; b.setAttribute('aria-label', aria);
        b.disabled = !!disabled;
        b.style.cssText = 'width:30px;height:30px;border-radius:50%;border:2px solid var(--amigos-green);background:transparent;color:var(--amigos-green);font:inherit;font-size:15px;line-height:1;cursor:pointer;' + (disabled ? 'opacity:0.35;cursor:not-allowed;' : '');
        b.onclick = fn; return b;
      }
      qty.appendChild(mk('−', 'Kevesebb', function () {
        l.qty--; if (l.qty <= 0) cart = cart.filter(function (x) { return x !== l; });
        save(); render();
      }));
      var n = document.createElement('span'); n.textContent = String(l.qty); n.style.fontVariantNumeric = 'tabular-nums';
      qty.appendChild(n);
      var full = l.max && qtyOf(l.wcId) >= l.max;
      qty.appendChild(mk('+', full ? 'Nincs több készleten' : 'Több', function () { l.qty++; save(); render(); }, full));
      left.appendChild(qty);
      var price = document.createElement('span');
      price.textContent = fmt(l.qty * l.price);
      price.style.cssText = 'font-variant-numeric:tabular-nums;font-weight:600;white-space:nowrap;';
      row.appendChild(thumb(l, 64)); row.appendChild(left); row.appendChild(price);
      box.appendChild(row);
    });
  }

  function flash(btn, text, ok) {
    if (btn._amLabel == null) btn._amLabel = btn.textContent;
    clearTimeout(btn._amT);
    btn.textContent = text;
    if (ok) btn.setAttribute('data-added', '');
    btn._amT = setTimeout(function () { btn.textContent = btn._amLabel; btn.removeAttribute('data-added'); }, 1400);
  }

  /* --- WooCommerce handoff ------------------------------------------ */
  function wooConfig() {
    var cfg = window.AMIGOS_SHOP || {};
    var wc = window.wc_add_to_cart_params || window.woocommerce_params;
    if (cfg.mode === 'demo') return null;
    if (cfg.mode !== 'woocommerce' && !wc) return null;
    var base = (cfg.base || '').replace(/\/$/, '');
    return {
      ajax: (wc && wc.wc_ajax_url ? wc.wc_ajax_url : base + '/?wc-ajax=%%endpoint%%').replace('%%endpoint%%', 'add_to_cart'),
      store: base + '/wp-json/wc/store/v1',
      checkoutUrl: cfg.checkoutUrl || base + '/penztar/'
    };
  }

  function wooHandoff(cfg) {
    var extra = window.AMIGOS_SHOP_EXTRAS && window.AMIGOS_SHOP_EXTRAS.roundUp;
    var lines = cart.map(function (l) { return { id: l.wcId, qty: l.qty, nyp: l.price, name: l.name }; });
    if (roundUp() && extra && lines.length) lines.push({ id: extra.wcId, qty: 1, nyp: extra.amount, name: extra.name });
    var opts = { credentials: 'same-origin' };
    // 1. Empty the WooCommerce cart (Store API needs its nonce from a GET).
    return fetch(cfg.store + '/cart', opts).then(function (r) {
      var nonce = r.headers.get('Nonce') || r.headers.get('X-WC-Store-API-Nonce') || '';
      return fetch(cfg.store + '/cart/items', { method: 'DELETE', credentials: 'same-origin', headers: { Nonce: nonce } });
    }).then(function () {
      // 2. Add each line, one at a time, so WooCommerce's stock checks see
      //    the running total. The amount goes in as Name Your Price `nyp`.
      return lines.reduce(function (chain, l) {
        return chain.then(function () {
          var body = new URLSearchParams({ product_id: String(l.id), quantity: String(l.qty), nyp: String(l.nyp) });
          return fetch(cfg.ajax, { method: 'POST', credentials: 'same-origin', body: body }).then(function (r) { return r.json(); }).then(function (res) {
            if (!res || res.error) throw new Error(l.name);
          });
        });
      }, Promise.resolve());
    }).then(function () { location.href = cfg.checkoutUrl; });
  }

  function checkout(btn) {
    if (!cart.length) return;
    var cfg = wooConfig();
    if (!cfg) { location.href = btn.getAttribute('href') || 'Penztar.dc.html'; return; }
    var label = btn.textContent;
    btn.textContent = 'Átirányítás a pénztárba…';
    btn.style.pointerEvents = 'none';
    var note = document.querySelector('[data-cart-error]');
    if (note) note.textContent = '';
    wooHandoff(cfg).catch(function (err) {
      btn.textContent = label;
      btn.style.pointerEvents = '';
      if (note) note.textContent = 'Nem sikerült kosárba tenni: ' + (err && err.message ? err.message : 'ismeretlen hiba') + '. Lehet, hogy elfogyott — módosítsd a kosarat, és próbáld újra.';
    });
  }

  /* --- Events -------------------------------------------------------- */
  document.addEventListener('click', function (e) {
    var t = e.target;
    if (t.closest('[data-cart-open]')) { setOpen(true); return; }
    if (t.closest('[data-cart-close]') || t.closest('[data-cart-scrim]')) { setOpen(false); return; }
    var co = t.closest('[data-checkout]');
    if (co) { e.preventDefault(); checkout(co); return; }
    var btn = t.closest('[data-add]');
    if (!btn) return;
    e.preventDefault();
    var slug = btn.getAttribute('data-slug');
    var scope = btn.closest('[data-buy]');
    var input = scope && scope.querySelector('[data-amount]');
    var picked = scope && scope.querySelector('input[data-variant]:checked');
    var note = scope && scope.querySelector('[data-buy-note]');
    var res = add(slug, input ? +input.value.replace(/\D/g, '') : 0, picked ? picked.value : null);
    if (res.ok) {
      flash(btn, 'Kosárban ✓', true);
      if (note) { note.textContent = ''; }
      if (btn.hasAttribute('data-open-cart')) setOpen(true);
    } else if (res.needsVariant && !scope) {
      // From the grid: sizes are chosen on the product page.
      location.href = 'Termek.dc.html?p=' + encodeURIComponent(slug) + '#meret';
    } else if (note) {
      note.textContent = res.error;
      note.style.color = 'var(--am-error)';
    } else {
      flash(btn, res.error, false);
    }
  });
  document.addEventListener('change', function (e) {
    var r = e.target.closest('[data-round]');
    if (r) { setRoundUp(r.checked); render(); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
  window.addEventListener('storage', function (e) { if (e.key === KEY || e.key === ROUND_KEY) { cart = load(); render(); } });

  // On WooCommerce's order-received page the order exists, so this cart
  // has done its job.
  if (document.body && document.body.classList.contains('woocommerce-order-received')) { cart = []; save(); setRoundUp(false); }

  // The page's dc component calls AmigosCart.mounted() from
  // componentDidMount. Touching the header count or the drawer before that
  // races the runtime's own render (React then fails on nodes it no longer
  // owns), so nothing is drawn until the page says so.
  var isMounted = false;
  function mounted() { isMounted = true; render(); }
  var draw = render;
  render = function () { if (isMounted) draw(); };

  window.AmigosCart = {
    add: add,
    open: function () { setOpen(true); },
    render: function () { render(); },
    mounted: mounted,
    lines: function () { return cart.slice(); },
    totals: totals,
    lineMeta: lineMeta,
    thumb: thumb,
    clear: function () { cart = []; save(); setRoundUp(false); render(); },
    fmt: fmt,
    fmtNum: fmtNum
  };
  if (window.__amigosMounted) mounted();
})();
