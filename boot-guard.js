/* v1.4.0 · guardián de arranque: si la app no logra pintarse (JS que no cargó, error antes de React,
   archivo viejo de otra versión, pantalla vacía) se muestra un aviso con «Reintentar», que borra el
   service worker y las cachés y recarga. No depende de React ni del JS principal. */
(function () {
  var shown = false, blank = 0, stuck = 0;
  function hard() {
    try { sessionStorage.setItem('lml.hardReload', String(Date.now())); } catch (e) {}
    var done = false; function go() { if (!done) { done = true; location.reload(); } }
    setTimeout(go, 2500);
    var jobs = [];
    try { if (navigator.serviceWorker && navigator.serviceWorker.getRegistrations) jobs.push(navigator.serviceWorker.getRegistrations().then(function (rs) { return Promise.all(rs.map(function (r) { return r.unregister(); })); })); } catch (e) {}
    try { if (window.caches) jobs.push(caches.keys().then(function (ks) { return Promise.all(ks.map(function (k) { return caches.delete(k); })); })); } catch (e) {}
    Promise.all(jobs).then(go, go);
  }
  function fail(reason) {
    if (shown) return; shown = true;
    try { console.error('[arranque] pantalla de rescate: ' + reason); } catch (e) {}
    var d = document.createElement('div'); d.id = 'boot-fail'; d.setAttribute('role', 'alert'); d.setAttribute('data-reason', reason);
    d.style.cssText = 'position:fixed;inset:0;z-index:2147483647;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:14px;padding:24px;background:#ECE8E5;color:#1E2440;font:16px/1.4 system-ui,-apple-system,Roboto,sans-serif;text-align:center;user-select:none;-webkit-user-select:none';
    d.innerHTML = '<strong style="font-size:20px">LML no pudo abrir</strong><span style="max-width:320px;color:#5E6580">Algo falló al cargar la app. Tus datos están a salvo. Toca «Reintentar»; si sigue igual, cierra la pestaña y vuelve a abrir el enlace.</span><button type="button" data-testid="boot-retry" style="margin-top:6px;padding:12px 28px;border:0;border-radius:999px;background:#2F3C69;color:#fff;font:600 16px system-ui,sans-serif">Reintentar</button>';
    d.querySelector('button').onclick = function () { this.disabled = true; this.textContent = 'Reintentando…'; hard(); };
    (document.body || document.documentElement).appendChild(d);
  }
  window.__lmlBootFail = fail; window.__lmlHardReload = hard;
  // el JS principal (o una hoja de estilos) no cargó
  window.addEventListener('error', function (e) {
    var t = e && e.target;
    if (t && (t.tagName === 'SCRIPT' || (t.tagName === 'LINK' && t.rel === 'stylesheet')) && !window.__lmlBooted) setTimeout(function () { if (!window.__lmlBooted) fail('asset'); }, 1500);
  }, true);
  // vigilancia: con la página visible, 3 revisiones seguidas sin nada que leer en #root (o el logo de
  // arranque / la intro clavados) = pantalla en blanco
  function check() {
    if (shown || document.visibilityState !== 'visible') return;
    var root = document.getElementById('root');
    var txt = root ? (root.innerText || '').replace(/\s+/g, '') : '';
    var media = root && root.querySelector('img,svg,canvas,video,input,button');
    blank = !txt && !media ? blank + 1 : 0;
    var cover = document.getElementById('boot') || document.querySelector('#root > .intro:not(.leaving)');
    stuck = cover ? stuck + 1 : 0;
    if (blank >= 3) fail('blank'); else if (stuck >= 8) fail(document.getElementById('boot') ? 'boot' : 'intro');
  }
  setTimeout(function () { check(); setInterval(check, 2000); }, 5000);
})();
