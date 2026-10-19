/* RICH public-site measurement. No form values or private URLs. */
(function () {
  'use strict';
  var MID = 'G-6803W9WCWX';
  if (!/^(www\.richcamps\.com|2027\.richcamps\.com)$/.test(location.hostname) ||
      /^\/family(?:-test)?(?:\/|$)/.test(location.pathname) || window.richTrackingInstalled) return;
  window.richTrackingInstalled = true;
  var last = Object.create(null);
  function allowed() {
    return !window['ga-disable-' + MID] && navigator.globalPrivacyControl !== true && navigator.doNotTrack !== '1';
  }
  function context() {
    var path = location.pathname;
    var match = path.match(/\/(beijing|shanghai)-s([1-4])\.html$/);
    return {camp_year: '2027', site_section: location.hostname === '2027.richcamps.com' ? 'itinerary' : 'main',
      page_language: path.indexOf('/zh/') === 0 ? 'zh' : 'en',
      camp: /beijing/.test(path) ? 'beijing' : /shanghai/.test(path) ? 'shanghai' : 'general',
      camp_session: match && location.hostname === '2027.richcamps.com' ? (match[1] === 'beijing' ? 'BJ' : 'SH') + match[2] : 'unspecified',
      page_location: location.origin + path, page_referrer: safeReferrer()};
  }
  function safeReferrer() {
    try { var u = new URL(document.referrer); return /(^|\.)richcamps\.com$/.test(u.hostname) ? u.origin + (/^\/family/.test(u.pathname) ? '/family/' : u.pathname) : u.origin + '/'; }
    catch (_) { return ''; }
  }
  function send(name, placement) {
    if (!allowed() || typeof window.gtag !== 'function') return;
    var key = name + ':' + placement, now = Date.now();
    if (last[key] && now - last[key] < 1500) return;
    last[key] = now;
    window.gtag('event', name, Object.assign(context(), {send_to: MID, contact_placement: placement, transport_type: 'beacon'}));
  }
  function placement(el) {
    if (el.closest('#contact-options,#rich-contact')) return 'contact_panel';
    if (el.closest('footer,.site-footer')) return 'footer';
    if (el.closest('header,nav')) return 'navigation';
    return 'page';
  }
  // Capture before existing handlers toggle the QR panel. Do not intercept links.
  document.addEventListener('click', function (event) {
    var el = event.target.closest && event.target.closest('a,button,[data-open-wechat],[data-wechat-choice],[data-copy-wechat]');
    if (!el) return;
    var where = placement(el), href = el.getAttribute('href') || '';
    if (/^https:\/\/(wa\.me|api\.whatsapp\.com|web\.whatsapp\.com)(\/|$)/i.test(href)) send('rich_contact_whatsapp', where);
    else if (/^mailto:/i.test(href)) send('rich_contact_email', where);
    else if (/^(?:https:\/\/www\.richcamps\.com)?\/application-form\.php(?:[?#]|$)/i.test(href)) send('rich_application_pdf_download', where);
    else if (el.hasAttribute('data-copy-wechat')) send('rich_contact_wechat_copy', where);
    else if (el.hasAttribute('data-open-wechat') || (el.hasAttribute('data-wechat-choice') && el.getAttribute('aria-expanded') !== 'true')) send('rich_contact_wechat_qr', where);
  }, true);
  // A short-lived context bridges public browsing to the isolated application server.
  // No Google script is installed in the family workspace. No identity is fabricated.
  function rememberContext() {
    if (!allowed() || typeof window.gtag !== 'function') return;
    window.gtag('get', MID, 'client_id', function (cid) {
      if (!/^\d{1,20}\.\d{1,20}$/.test(String(cid))) return;
      window.gtag('get', MID, 'session_id', function (sid) {
        if (!/^\d{1,16}$/.test(String(sid)) || !allowed()) return;
        var value = encodeURIComponent(JSON.stringify({c:String(cid), s:String(sid), t:Math.floor(Date.now()/1000)}));
        document.cookie = 'rich_ga_context=' + value + '; Domain=richcamps.com; Path=/; Max-Age=1800; SameSite=Lax; Secure';
      });
    });
  }
  rememberContext();
  window.addEventListener('pageshow', rememberContext);
  document.addEventListener('visibilitychange', function () { if (!document.hidden) rememberContext(); });
})();
