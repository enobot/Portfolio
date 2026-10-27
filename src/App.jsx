import { lazy, startTransition, Suspense, useCallback, useEffect, useId, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { flatShadow, liftShadow, liftTransition } from "./desk/lift.js";
import DeskDecor from "./desk/DeskDecor.jsx";
import { DeskPhone, MacBook } from "./desk/DeskDevices.jsx";
import NameTag from "./desk/NameTag.jsx";
import ResumePaper from "./desk/ResumePaper.jsx";
import "./desk/Desk.css";
import LoadingScreen from "./LoadingScreen.jsx";
import { lockPageScroll } from "./lockPageScroll.js";
import StarCursor from "./StarCursor.jsx";

// The dialogs load when first opened, so the desk itself downloads less.
const AboutModal = lazy(() => import("./AboutModal.jsx"));
const BluModal = lazy(() => import("./BluModal.jsx"));
const FeedbackModal = lazy(() => import("./FeedbackModal.jsx"));
const FittmmModal = lazy(() => import("./FittmmModal.jsx"));
const ShouldntWouldntModal = lazy(() => import("./ShouldntWouldntModal.jsx"));
const TracerModal = lazy(() => import("./TracerModal.jsx"));

export default function App() {
  const [tracerOpen, setTracerOpen] = useState(false);
  const [fittmmOpen, setFittmmOpen] = useState(false);
  const [bluOpen, setBluOpen] = useState(false);
  const [shouldntWouldntOpen, setShouldntWouldntOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [deskReady, setDeskReady] = useState(false);
  const [extrasReady, setExtrasReady] = useState(false);
  const [which, setWhich] = useState(null);
  const [posed, setPosed] = useState(false);
  const [ready, setReady] = useState(false);
  const tracerTipId = useId();
  const fittmmTipId = useId();
  const bluTipId = useId();
  const aboutTipId = useId();
  const paperTipId = useId();
  const macTitleId = useId();
  const phoneTitleId = useId();
  const badgeTitleId = useId();
  const tracerButtonRef = useRef(null);
  const fittmmButtonRef = useRef(null);
  const bluButtonRef = useRef(null);
  const aboutButtonRef = useRef(null);
  const feedbackButtonRef = useRef(null);
  const paperRef = useRef(null);
  const macRef = useRef(null);
  const phoneRef = useRef(null);
  const badgeRef = useRef(null);
  const sheetRef = useRef(null);
  const macBoxRef = useRef(null);
  const phoneBoxRef = useRef(null);
  const badgeBoxRef = useRef(null);
  const openerRef = useRef(null);
  const [pageCount, setPageCount] = useState(2);
  const aboutOpenerRef = useRef(null);
  const projectOpenerRef = useRef(null);
  const closeTimer = useRef(0);
  const closeTracer = useCallback(() => {
    setTracerOpen(false);
    (projectOpenerRef.current || tracerButtonRef.current)?.focus();
    projectOpenerRef.current = null;
  }, []);
  const closeFittmm = useCallback(() => {
    setFittmmOpen(false);
    (projectOpenerRef.current || fittmmButtonRef.current)?.focus();
    projectOpenerRef.current = null;
  }, []);
  const closeBlu = useCallback(() => {
    setBluOpen(false);
    (projectOpenerRef.current || bluButtonRef.current)?.focus();
    projectOpenerRef.current = null;
  }, []);
  const closeShouldntWouldnt = useCallback(() => {
    setShouldntWouldntOpen(false);
    projectOpenerRef.current?.focus();
    projectOpenerRef.current = null;
  }, []);
  const closeAbout = useCallback(() => {
    setAboutOpen(false);
    (aboutOpenerRef.current || aboutButtonRef.current)?.focus();
    aboutOpenerRef.current = null;
  }, []);
  const prefersReduced = useReducedMotion();
  const reducedMotion = useCallback(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    [],
  );
  const lift = liftTransition(prefersReduced);
  const paperOpen = which === "paper" && posed;
  const openDesk = useCallback((id, element) => {
    if (which) return;
    openerRef.current = element ?? null;
    window.clearTimeout(closeTimer.current);
    setReady(false);
    setWhich(id);
    setPosed(true);
  }, [which]);
  const openProject = useCallback((id, element) => {
    projectOpenerRef.current = element ?? null;
    if (id === "tracer") setTracerOpen(true);
    else if (id === "fittmm") setFittmmOpen(true);
    else if (id === "blu") setBluOpen(true);
    else if (id === "surfsafe") setShouldntWouldntOpen(true);
  }, []);
  const closeDesk = useCallback(() => {
    if (!which) return;
    setReady(false);
    setPosed(false);
    const wait = reducedMotion() ? 0 : 560;
    window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setWhich(null), wait);
  }, [reducedMotion, which]);
  const closeFeedback = useCallback(() => {
    setFeedbackOpen(false);
    feedbackButtonRef.current?.focus();
  }, []);
  // Steady handlers, so the readable résumé (memoized) only re-renders when
  // it actually changes, not on every desk state change.
  const openAboutFromResume = useCallback(() => {
    aboutOpenerRef.current = aboutButtonRef.current;
    setAboutOpen(true);
  }, []);
  const openTracerFromResume = useCallback(() => {
    projectOpenerRef.current = null;
    setTracerOpen(true);
  }, []);
  const openFittmmFromResume = useCallback(() => {
    projectOpenerRef.current = null;
    setFittmmOpen(true);
  }, []);
  const openBluFromResume = useCallback(() => {
    projectOpenerRef.current = null;
    setBluOpen(true);
  }, []);
  const openFeedback = useCallback(() => setFeedbackOpen(true), []);

  useEffect(() => {
    if (!which) return undefined;
    return lockPageScroll();
  }, [which]);

  // The welcome screen paints first. The desk renders behind it as an
  // interruptible transition, so the petals keep moving while it builds. A
  // timer rather than an animation frame: frames pause in background tabs.
  useEffect(() => {
    const timer = window.setTimeout(() => startTransition(() => setDeskReady(true)), 0);
    return () => window.clearTimeout(timer);
  }, []);

  // What only shows once something is opened (the readable résumé, About,
  // Projects) is built a moment later, still behind the welcome screen, so it
  // neither slows the first paint nor lands on the first click.
  useEffect(() => {
    if (!deskReady) return undefined;
    const timer = window.setTimeout(() => startTransition(() => setExtrasReady(true)), 400);
    return () => window.clearTimeout(timer);
  }, [deskReady]);

  useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return undefined;
    const paper = sheet.querySelector(".letter-stack .paper");
    const page = sheet.querySelector(".letter-page");
    if (!paper || !page) return undefined;
    const apply = () => {
      if (sheet.classList.contains("is-open")) return;
      const previewW = 816;
      const pageH = 1056;
      sheet.style.setProperty("--doc-w", `${previewW}px`);
      sheet.style.setProperty("--page-h", String(pageH));
      const docH = paper.scrollHeight;
      if (page.clientWidth < 8 || docH < 8) return;
      const pages = Math.min(4, Math.max(1, Math.ceil((docH - 12) / pageH)));
      const restFit = page.clientWidth / previewW;
      sheet.style.setProperty("--rest-fit", restFit.toFixed(4));
      sheet.style.setProperty("--open-fit", "1");
      sheet.style.setProperty("--doc-h", String(Math.ceil(docH)));
      sheet.dataset.pages = String(pages);
      sheet.classList.add("is-measured");
      setPageCount((current) => (current === pages ? current : pages));
    };

    apply();
    document.fonts?.ready.then(apply);
    const observer = new ResizeObserver(() => {
      if (!sheet.classList.contains("is-open")) apply();
    });
    observer.observe(page);
    observer.observe(paper);
    window.addEventListener("resize", apply);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", apply);
    };
  }, [deskReady, pageCount]);

  const lastDesk = useRef(null);
  useEffect(() => {
    if (which) {
      lastDesk.current = which;
      return undefined;
    }
    const previous = lastDesk.current;
    if (!previous) return undefined;
    const opener = openerRef.current;
    openerRef.current = null;
    if (opener && document.contains(opener)) {
      opener.focus();
      return undefined;
    }
    const target =
      previous === "paper" ? paperRef : previous === "mac" ? macRef : previous === "phone" ? phoneRef : badgeRef;
    target.current?.focus();
    return undefined;
  }, [which]);

  useEffect(() => {
    if (!which || !posed) return undefined;
    const wait = reducedMotion() ? 0 : 700;
    const id = window.setTimeout(() => setReady(true), wait);
    return () => window.clearTimeout(id);
  }, [posed, reducedMotion, which]);

  useEffect(() => {
    if (!ready || !which) return undefined;
    if (tracerOpen || fittmmOpen || bluOpen || aboutOpen || feedbackOpen) return undefined;
    const root =
      which === "paper"
        ? sheetRef.current
        : which === "mac"
          ? macBoxRef.current
          : which === "phone"
            ? phoneBoxRef.current
            : badgeBoxRef.current;
    if (!root) return undefined;
    const focusable = () =>
      [...root.querySelectorAll("a, button")].filter(
        (node) => !node.hasAttribute("disabled"),
      );
    focusable()[0]?.focus();

    function onKey(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        closeDesk();
        return;
      }
      if (event.key !== "Tab") return;
      const items = focusable();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [aboutOpen, bluOpen, closeDesk, feedbackOpen, fittmmOpen, ready, tracerOpen, which]);

  return (
    <div className="desk">
      <StarCursor />
      {showWelcome ? (
        <LoadingScreen onDone={() => setShowWelcome(false)} />
      ) : null}
      {deskReady || !showWelcome ? (
      <div
        className={`desk-world ${posed ? "is-lifted" : ""}`}
        inert={showWelcome ? true : undefined}
      >
      <button
        type="button"
        className="desk-dim"
        aria-label="Close"
        tabIndex={posed ? 0 : -1}
        onClick={closeDesk}
      />
      <nav className="desk-fallback" aria-label="Portfolio" inert={posed ? true : undefined}>
        <button type="button" onClick={(event) => openDesk("paper", event.currentTarget)}>
          Résumé
        </button>
        <button type="button" onClick={(event) => openDesk("mac", event.currentTarget)}>
          Projects
        </button>
        <button type="button" onClick={(event) => openDesk("badge", event.currentTarget)}>
          About Me
        </button>
        <button type="button" onClick={(event) => openDesk("phone", event.currentTarget)}>
          Contact
        </button>
      </nav>
      <div className="desk-scene">
      <DeskDecor />
      <div ref={badgeBoxRef}>
        <NameTag
          prepared={extrasReady}
          open={which === "badge" && posed}
          ready={which === "badge" && ready}
          titleId={badgeTitleId}
          buttonRef={badgeRef}
          onOpen={(event) => openDesk("badge", event.currentTarget)}
          onClose={closeDesk}
        />
      </div>
      <div ref={macBoxRef}>
        <MacBook
          prepared={extrasReady}
          open={which === "mac" && posed}
          ready={which === "mac" && ready}
          titleId={macTitleId}
          buttonRef={macRef}
          onOpen={(event) => openDesk("mac", event.currentTarget)}
          onClose={closeDesk}
          onOpenProject={openProject}
        />
      </div>
      <div ref={phoneBoxRef}>
        <DeskPhone
          open={which === "phone" && posed}
          ready={which === "phone" && ready}
          titleId={phoneTitleId}
          buttonRef={phoneRef}
          onOpen={(event) => openDesk("phone", event.currentTarget)}
          onClose={closeDesk}
        />
      </div>
      <motion.div
        layout
        className={`sheet ${paperOpen ? "is-open" : ""}`}
        ref={sheetRef}
        transition={lift}
      >
      <motion.div
        className="pose"
        initial={false}
        style={{ filter: paperOpen ? liftShadow : flatShadow }}
        animate={{ rotate: paperOpen ? 0 : -2 }}
        whileHover={paperOpen || prefersReduced ? undefined : { y: -11, scale: 1.02 }}
        transition={lift}
      >
      {which !== "paper" && (
        <button
          type="button"
          className="lift-hit"
          ref={paperRef}
          aria-describedby={paperTipId}
          onClick={(event) => openDesk("paper", event.currentTarget)}
        >
          <span className="lift-name">Open résumé</span>
          <span className="tip" id={paperTipId} role="tooltip" aria-hidden="true">
            Résumé
          </span>
        </button>
      )}
      {which === "paper" && posed && (
        <button type="button" className="sheet-close close" onClick={closeDesk}>
          Close
        </button>
      )}
      <div className="letter-stack" aria-hidden="true">
        {pageCount > 1 ? <div className="letter-under" /> : null}
        <div className="letter-page" style={{ "--page": 0 }}>
          <div className="letter-slice">
            <ResumePaper />
          </div>
        </div>
      </div>
      <div className="sheet-clip">
      <div className="paper-fit">
      {extrasReady || which === "paper" ? (
      <ResumePaper
        interactive={paperOpen}
        aboutButtonRef={aboutButtonRef}
        aboutTipId={aboutTipId}
        tracerButtonRef={tracerButtonRef}
        tracerTipId={tracerTipId}
        fittmmButtonRef={fittmmButtonRef}
        fittmmTipId={fittmmTipId}
        bluButtonRef={bluButtonRef}
        bluTipId={bluTipId}
        feedbackButtonRef={feedbackButtonRef}
        onAbout={openAboutFromResume}
        onTracer={openTracerFromResume}
        onFittmm={openFittmmFromResume}
        onBlu={openBluFromResume}
        onFeedback={openFeedback}
      />
      ) : null}
      </div>
      </div>
      </motion.div>
      </motion.div>
      </div>
      </div>
      ) : null}

      <Suspense fallback={null}>
        {tracerOpen ? <TracerModal onClose={closeTracer} /> : null}
        {fittmmOpen ? <FittmmModal onClose={closeFittmm} /> : null}
        {bluOpen ? <BluModal onClose={closeBlu} /> : null}
        {shouldntWouldntOpen ? <ShouldntWouldntModal onClose={closeShouldntWouldnt} /> : null}
        {aboutOpen ? <AboutModal onClose={closeAbout} /> : null}
        {feedbackOpen ? <FeedbackModal onClose={closeFeedback} /> : null}
      </Suspense>
    </div>
  );
}
