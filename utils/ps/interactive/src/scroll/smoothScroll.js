import smoothscroll from "smoothscroll-polyfill";

if (global.window) {
  smoothscroll.polyfill();
}

function smoothScroll(el) {
  if (!el) return;
  el.scrollIntoView({behavior: "smooth"});
}

function smoothScrollByHash(hash) {
  const el = hash && document.getElementById(hash.substr(1));
  smoothScroll(el);
}

function checkHashLickClick(e) {
  if (e.currentTarget.pathname === window.location.pathname) {
    e.preventDefault();
    smoothScrollByHash(e.currentTarget.hash);
    window.history.pushState({}, "", e.currentTarget.href);
  }
}

export {smoothScroll, checkHashLickClick, smoothScrollByHash};
