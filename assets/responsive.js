/* =====================================================================
   Amigos — mobile navigation
   ---------------------------------------------------------------------
   Progressive enhancement over the exported navigation bars. Every page
   ships the same lockup — logo, a <nav> of site links, a donate button,
   and on the shop an extra cart control. Below 840px the pages' own
   breakpoint collapsed that lockup into a ~430px-tall stack inside a
   sticky bar. This turns it back into one row plus a disclosure panel.

   Two things shape the implementation:

   1. The pages are rendered by support.js, which compiles the <x-dc>
      markup into React, so every element in the bar is owned by React's
      reconciler. Moving one out of its parent makes the next render
      throw NotFoundError on removeChild and blanks the page. Nothing
      here moves, removes or reparents an existing node — it appends one
      button of its own, sets a few attributes, and lets
      assets/responsive.css do the rearranging.

   2. The bar is not always a <header>: the homepage also has a second,
      scroll-revealed bar inside a plain <div>. So the anchor is the
      <nav>'s own parent row, which is the one element every variant has
      in common.
   ===================================================================== */
(function () {
  'use strict';

  var BP = 840; // must match the breakpoint in responsive.css

  function ready(fn) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', fn);
    } else {
      fn();
    }
  }

  /* React mounts after DOMContentLoaded, so the bars may not exist yet.
     Poll a few frames rather than racing the first render. */
  function whenSettled(fn) {
    var tries = 0;
    (function poll() {
      if (document.querySelector('nav a') || tries > 60) return fn();
      tries++;
      requestAnimationFrame(poll);
    })();
  }

  /* Every site bar is a <nav> of at least two links sitting directly in
     a row alongside the logo — either <header> itself or the grid the
     canvas emitted for it. Footer and breadcrumb navs fail this test. */
  function bars() {
    var found = [];
    var navs = document.querySelectorAll('nav');
    for (var i = 0; i < navs.length; i++) {
      var nav = navs[i];
      var row = nav.parentElement;
      if (!row) continue;
      if (nav.querySelectorAll(':scope > a').length < 2) continue;
      if (row.tagName !== 'HEADER' && !row.hasAttribute('data-split')) continue;
      if (row.closest('footer')) continue;
      if (!row.querySelector('img')) continue; // the logo lockup
      found.push({ nav: nav, row: row });
    }
    return found;
  }

  /* The hero bars sit on green or video and use the inverse logo with
     white links, so the panel has to be dark to match. */
  function isInverse(row, link) {
    if (row.querySelector('img[src*="inverse"]')) return true;
    var m = /rgba?\(([\d.]+),\s*([\d.]+),\s*([\d.]+)/.exec(getComputedStyle(link).color);
    if (!m) return false;
    return (0.299 * +m[1] + 0.587 * +m[2] + 0.114 * +m[3]) / 255 > 0.6;
  }

  function enhance(bar, index) {
    var nav = bar.nav, row = bar.row;

    /* The panel is positioned against the row, so the row must be a
       containing block. sticky/relative already are; static is not. */
    if (getComputedStyle(row).position === 'static') {
      row.style.position = 'relative';
    }

    nav.id = nav.id || 'am-nav-' + index;
    var inverse = isInverse(row, nav.querySelector('a'));

    var toggle = document.createElement('button');
    toggle.type = 'button';
    toggle.className = 'am-navtoggle';
    toggle.setAttribute('aria-controls', nav.id);
    toggle.appendChild(document.createElement('span'));

    function isOpen() { return row.getAttribute('data-am-open') === 'true'; }

    function setOpen(open) {
      row.setAttribute('data-am-open', open ? 'true' : 'false');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Menü bezárása' : 'Menü megnyitása');
      if (open) {
        var first = nav.querySelector('a');
        if (first) first.focus({ preventScroll: true });
      }
    }

    toggle.addEventListener('click', function () { setOpen(!isOpen()); });

    /* In-page anchors do not navigate, so close on any activation. */
    nav.addEventListener('click', function (e) {
      if (isOpen() && e.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen()) { setOpen(false); toggle.focus(); }
    });

    document.addEventListener('click', function (e) {
      if (isOpen() && !row.contains(e.target)) setOpen(false);
    });

    /* Appending a brand-new node is safe — React only reconciles the
       children it created — but a re-mount of the row would still drop
       it, so put everything back if that happens. */
    function attach() {
      if (toggle.parentNode !== row) row.appendChild(toggle);
      nav.setAttribute('data-am-nav-list', '');
      row.setAttribute('data-am-navbar', 'ready');
      if (inverse) row.setAttribute('data-am-tone', 'inverse');
      if (!row.hasAttribute('data-am-open')) setOpen(false);
    }
    attach();

    new MutationObserver(function () {
      if (row.isConnected) attach();
    }).observe(row, { childList: true });

    return function sync() {
      /* Going back to desktop must not strand a hidden nav. */
      if (window.innerWidth > BP && isOpen()) setOpen(false);
    };
  }

  ready(function () {
    whenSettled(function () {
      var syncers = bars().map(enhance);
      if (!syncers.length) return;

      var t;
      window.addEventListener('resize', function () {
        clearTimeout(t);
        t = setTimeout(function () {
          for (var i = 0; i < syncers.length; i++) syncers[i]();
        }, 120);
      });
    });
  });
})();
