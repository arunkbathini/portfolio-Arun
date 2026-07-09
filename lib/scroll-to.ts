/**
 * Next.js App Router's client-side scroll restoration races the browser's
 * native same-page hash-anchor scroll and resets it to the top. Handling
 * the scroll ourselves (and setting the hash via pushState, which the
 * router doesn't intercept) sidesteps that.
 */
export function scrollToHash(e: React.MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith("#")) return;
  const id = href.slice(1);
  const el = id ? document.getElementById(id) : null;
  if (!el) return;
  e.preventDefault();
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  history.pushState(null, "", href);
}
