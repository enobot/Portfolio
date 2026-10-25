let depth = 0;
let scrollY = 0;

export function lockPageScroll() {
  depth += 1;
  if (depth === 1) {
    const html = document.documentElement;
    const body = document.body;
    scrollY = window.scrollY || html.scrollTop || 0;
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    body.style.overflow = "hidden";
    body.style.position = "fixed";
    body.style.top = `-${scrollY}px`;
    body.style.left = "0";
    body.style.right = "0";
    body.style.width = "100%";
  }

  let released = false;
  return function unlockPageScroll() {
    if (released) return;
    released = true;
    depth = Math.max(0, depth - 1);
    if (depth > 0) return;
    const html = document.documentElement;
    const body = document.body;
    html.style.overflow = "";
    html.style.overscrollBehavior = "";
    body.style.overflow = "";
    body.style.position = "";
    body.style.top = "";
    body.style.left = "";
    body.style.right = "";
    body.style.width = "";
    window.scrollTo(0, scrollY);
  };
}
