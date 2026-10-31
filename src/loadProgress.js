import { useEffect, useState } from "react";

// The welcome screen's cherry blossom gets one petal per loading step: the
// fonts, the desk, the wood photo, the desk's pictures, and the hidden
// screens (résumé, About, Projects) that are prepared behind it.
export const PETALS = 5;
// How often LoadingScreen checks progress (ms).
export const TICK = 100;
// After this long the blossom fills in and the screen leaves anyway, so one
// slow or stuck file can't keep a visitor out of the site.
export const MAX_WAIT = 10000;

// first: earliest first petal. gap: least time between petals, so steps that
// finish together still grow one by one. hold: least time on screen (what the
// welcome screen showed for before it tracked loading). bloom: how long the
// finished flower shows before the screen leaves.
const PACE = { first: 400, gap: 700, hold: 4300, bloom: 600 };
// Reduced motion: petals show as soon as their step is done.
const REDUCED_PACE = { hold: 900, bloom: 0 };

// One tick of the blossom. steps is how many loading steps have finished and
// elapsed is how long the screen has been up (ms). Returns how many petals
// show, when the last one appeared, and whether the screen can leave. Kept
// free of React and the DOM so the timing rules can be tested on their own.
export function tickBlossom(state, steps, elapsed, reduce) {
  const pace = reduce ? REDUCED_PACE : PACE;
  const target = elapsed >= MAX_WAIT ? PETALS : Math.min(steps, PETALS);
  let { shown, lastAt } = state;
  if (shown < target) {
    if (reduce || elapsed >= MAX_WAIT) {
      shown = target;
      lastAt = elapsed;
    } else if (elapsed >= Math.max(pace.first, lastAt + pace.gap)) {
      shown += 1;
      lastAt = elapsed;
    }
  }
  const leave = shown === PETALS && elapsed >= pace.hold && elapsed - lastAt >= pace.bloom;
  return { shown, lastAt, leave };
}

// The same file index.css puts under the desk, so the browser downloads it once.
const WOOD = new URL("./oak-desk.webp", import.meta.url).href;

// Resolves with the first of the given events.
function once(target, ...events) {
  return new Promise((resolve) => {
    const done = (event) => {
      for (const name of events) target.removeEventListener(name, done);
      resolve(event);
    };
    for (const name of events) target.addEventListener(name, done);
  });
}

// Resolves once an image has loaded or failed. A failed one is reported but
// doesn't hold up the screen: the desk has a plain wood colour behind it.
async function imageSettled(image) {
  const failed = image.complete
    ? image.naturalWidth === 0
    : (await once(image, "load", "error")).type === "error";
  if (failed) console.warn(`Loading screen: couldn't load ${image.currentSrc || image.src}`);
}

// index.html preloads the Google Fonts stylesheet and switches it on when it
// arrives. Until it is on there are no font files to wait for, so wait for
// the stylesheet first, then for the title's font and any others in flight.
async function fontsLoaded() {
  if (!document.fonts) return;
  const link = document.querySelector('link[href^="https://fonts.googleapis.com/css2"]');
  while (link && !(link.rel === "stylesheet" && link.sheet)) {
    const event = await once(link, "load", "error");
    if (event.type === "error") {
      console.warn("Loading screen: couldn't load the font stylesheet");
      return;
    }
  }
  await document.fonts.load('650 1em "Source Serif 4"');
  await document.fonts.ready;
}

// Counts how many of the PETALS loading steps have finished. deskReady and
// extrasReady come from App, which builds the desk and the hidden screens.
export function useLoadSteps(deskReady, extrasReady) {
  const [fonts, setFonts] = useState(false);
  const [wood, setWood] = useState(false);
  const [pictures, setPictures] = useState(false);

  useEffect(() => {
    let live = true;
    fontsLoaded()
      .catch((error) => console.warn("Loading screen: font check failed", error))
      .then(() => live && setFonts(true));
    const photo = new Image();
    photo.src = WOOD;
    imageSettled(photo).then(() => live && setWood(true));
    return () => {
      live = false;
    };
  }, []);

  // The desk's pictures exist once it has been built. Lazy images are left
  // out because they may never load while the desk is hidden.
  useEffect(() => {
    if (!deskReady) return undefined;
    let live = true;
    const images = [...document.querySelectorAll('.desk-world img:not([loading="lazy"])')];
    Promise.all(images.map(imageSettled)).then(() => live && setPictures(true));
    return () => {
      live = false;
    };
  }, [deskReady]);

  return [fonts, deskReady, wood, pictures, extrasReady].filter(Boolean).length;
}
