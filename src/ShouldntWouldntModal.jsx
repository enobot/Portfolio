import { useEffect, useId, useRef, useState } from "react";
import { lockPageScroll } from "./lockPageScroll.js";
import "./ShouldntWouldntModal.css";

const REPO = "https://github.com/enobot/ShouldntWouldnt";

// The wording is the extension's own (copy.ts, disclaimer.ts and types.ts in
// the ShouldntWouldnt repository), and the rules below follow its controller, so the
// demo behaves like the real thing on these sample pages.
const NOTE = {
  ssn: "Sensitive Information: This website appears to be asking for your Social Security number. Only share this information with organizations you trust.",
  card: "Sensitive Information: This website appears to be asking for your card number. Make sure you recognize and trust this website.",
  cvv: "Sensitive Information: This website appears to be asking for your card security code. Make sure you recognize and trust this website.",
  password:
    "Sensitive Information: This website appears to be asking for your password. Make sure you are on the correct website before entering it.",
  email:
    "Reminder: This field asks for your email address. Share it only if you are comfortable hearing from this website.",
};

const KIND = {
  ssn: "a Social Security number",
  card: "a card number",
  cvv: "a card security code",
  password: "a password",
  email: "an email address",
};

const BECAUSE = {
  ssn: "That number can be misused for identity theft, so it is worth sharing only with an organization you trust.",
  card: "A card number can be used to spend money, so make sure you recognize and trust this website.",
  cvv: "The security code helps someone charge a card, so make sure you recognize and trust this website.",
  password: "A password can let someone into an account, so check that you are on the correct website first.",
  email: "An email address is a way for this website to contact you or to identify you.",
};

const HTTP_HEADLINE =
  "Potential Security Risk: This website uses an insecure connection. Information you submit could be exposed.";
const HTTP_DETAIL =
  "This website does not use HTTPS. Information submitted over an insecure connection may be exposed.";
const FORM_LINE = "This form appears to send information over an insecure connection.";
const LOOKALIKE_LINE =
  "This website's address resembles another website. Double-check the URL before entering personal information.";
const MASK_LINE =
  "To keep it off your screen, what you type here shows as dots. Choose Show to see it. This only changes your screen. The website still receives what you enter.";

const STATUS = {
  no_obvious_risks: "No obvious risks",
  caution: "Caution recommended",
  strong_concern: "Strongly indicated concern",
  unable: "Unable to determine",
};

const PRIVACY = [
  "Shouldn't Wouldn't was created to help you and your loved ones browse with greater confidence.",
  "We don't read what you type into forms.",
  "We don't collect, save, share, or sell your personal information.",
  "Our extension simply identifies sensitive information requests and potential security concerns, then gives you a gentle reminder to think twice before sharing.",
  "Form analysis happens locally in your browser, without tracking your activity.",
  "Because your privacy should always come first.",
];

// Sample pages with fake labels, like the repository's mock pages.
const PAGES = [
  {
    id: "benefits",
    label: "Benefits form",
    url: "https://benefits.example.org/apply",
    title: "Benefits",
    submit: "Continue",
    fields: [
      { id: "ssn", label: "Social Security number", warn: "ssn", mask: true },
      { id: "comments", label: "Comments", textarea: true },
    ],
  },
  {
    id: "checkout",
    label: "Checkout over HTTP",
    url: "http://shop.example.com/checkout",
    title: "Checkout",
    submit: "Place order",
    fields: [
      { id: "card", label: "Card number", warn: "card", mask: true },
      { id: "cvv", label: "Security code", warn: "cvv" },
      { id: "email", label: "Email", warn: "email", type: "email" },
    ],
  },
  {
    id: "lookalike",
    label: "Lookalike address",
    url: "https://paypal-login.example/signin",
    title: "Sign in",
    submit: "Continue",
    lookalike: true,
    fields: [{ id: "password", label: "Password", warn: "password", type: "password" }],
  },
  {
    id: "contact",
    label: "Comments only",
    url: "https://library.example.org/contact",
    title: "Contact the library",
    submit: "Send",
    fields: [
      { id: "search", label: "Search the catalog", type: "search" },
      { id: "message", label: "Comments", textarea: true },
    ],
  },
];

function concernsFor(page, activeCount) {
  const http = page.url.startsWith("http:");
  const concerns = [];
  if (http) concerns.push("http-page");
  // The sample forms post to their own page, so on an HTTP page any form
  // with a warned field sends over HTTP too.
  if (http && activeCount > 0) concerns.push("http-form");
  if (page.lookalike) concerns.push("lookalike");
  return concerns;
}

function concernLines(concerns) {
  const lines = [];
  if (concerns.includes("http-page")) lines.push(HTTP_HEADLINE);
  if (concerns.includes("http-form")) lines.push(FORM_LINE);
  if (concerns.includes("lookalike")) lines.push(LOOKALIKE_LINE);
  return lines;
}

function whyText(kind, concerns, masked) {
  const parts = [
    `Shouldn't Wouldn't saw signs that this field is asking for ${KIND[kind]}.`,
    BECAUSE[kind],
    "We do not read what you type.",
  ];
  if (masked) parts.push(MASK_LINE);
  if (concerns.length === 0) {
    parts.push(
      "Nothing else here shows a connection problem or a lookalike web address. That does not mean we checked the website's reputation.",
    );
  } else {
    parts.push(...concernLines(concerns));
    if (concerns.includes("http-page")) parts.push(HTTP_DETAIL);
  }
  parts.push(
    "If you trust this organization, you can dismiss this note and keep typing. If you do not, leave the page without entering the information.",
  );
  return parts.join(" ");
}

function moreInformation(concerns) {
  const parts = [
    "This extra reminder is about the website, not about what you typed. Shouldn't Wouldn't does not read what you type.",
    "It cannot promise that a website is legitimate. HTTPS by itself does not mean a website is trustworthy.",
    ...concernLines(concerns),
  ];
  if (concerns.includes("http-page")) parts.push(HTTP_DETAIL);
  parts.push(
    "Go back leaves this page as it is and does not clear what you already typed. Continue anyway goes ahead with the form.",
  );
  return parts.join(" ");
}

function statusFor(enabled, sensitiveCount, concernCount) {
  if (!enabled) return "unable";
  if (concernCount > 0) return "strong_concern";
  if (sensitiveCount > 0) return "caution";
  return "no_obvious_risks";
}

function Eye({ open }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
      <path d="M2 12s3.6-6.5 10-6.5S22 12 22 12s-3.6 6.5-10 6.5S2 12 2 12z" />
      <circle cx="12" cy="12" r="3" />
      {open ? null : <path d="M4 4l16 16" />}
    </svg>
  );
}

export default function ShouldntWouldntModal({ onClose }) {
  const titleId = useId();
  const idBase = useId();
  const dialogRef = useRef(null);
  const panelRef = useRef(null);
  const submitRef = useRef(null);
  const popupButtonRef = useRef(null);
  const focusPanelRef = useRef(false);
  const [pageId, setPageId] = useState(PAGES[0].id);
  const [enabled, setEnabled] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  // What the extension keeps in memory for one page; a new page starts fresh.
  const [dismissed, setDismissed] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [whyOpen, setWhyOpen] = useState([]);
  const [panel, setPanel] = useState(null);
  const [acknowledged, setAcknowledged] = useState(false);
  const [focusShown, setFocusShown] = useState(false);
  const [sent, setSent] = useState(false);
  const popupOpenRef = useRef(popupOpen);
  popupOpenRef.current = popupOpen;

  const page = PAGES.find((item) => item.id === pageId) ?? PAGES[0];
  const active = enabled ? page.fields.filter((field) => field.warn && !dismissed.includes(field.id)) : [];
  const concerns = enabled ? concernsFor(page, active.length) : [];
  const status = statusFor(enabled, active.length, concerns.length);
  const http = page.url.startsWith("http:");

  useEffect(() => {
    const dialog = dialogRef.current;
    const focusable = () =>
      [...dialog.querySelectorAll("a, button, input, textarea")].filter(
        (node) => !node.hasAttribute("disabled"),
      );
    focusable()[0]?.focus();

    function onKey(event) {
      if (event.key === "Escape") {
        event.preventDefault();
        if (popupOpenRef.current) {
          setPopupOpen(false);
          popupButtonRef.current?.focus();
          return;
        }
        onClose();
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
    const unlockScroll = lockPageScroll();
    return () => {
      document.removeEventListener("keydown", onKey);
      unlockScroll();
    };
  }, [onClose]);

  // A paused submit brings the site note into view and moves focus to it.
  useEffect(() => {
    if (!focusPanelRef.current || !panelRef.current) return;
    focusPanelRef.current = false;
    panelRef.current.scrollIntoView({ block: "nearest" });
    panelRef.current.focus({ preventScroll: true });
  }, [panel]);

  function openPage(id) {
    setPageId(id);
    setDismissed([]);
    setRevealed([]);
    setWhyOpen([]);
    setPanel(null);
    setAcknowledged(false);
    setFocusShown(false);
    setSent(false);
  }

  function toggle(list, setList, id) {
    setList(list.includes(id) ? list.filter((item) => item !== id) : [...list, id]);
  }

  function toggleProtection() {
    setEnabled((on) => !on);
    setPanel(null);
  }

  function onFieldFocus(field) {
    if (!active.includes(field) || acknowledged || focusShown || concerns.length === 0) return;
    setFocusShown(true);
    setPanel({ after: field.id, fromSubmit: false, more: false });
  }

  function onSubmit(event) {
    // Nothing on these sample pages is ever sent anywhere.
    event.preventDefault();
    if (active.length > 0 && !acknowledged && concerns.length > 0) {
      focusPanelRef.current = true;
      setPanel({ after: active[0].id, fromSubmit: true, more: false });
      return;
    }
    setSent(true);
  }

  function answer(choice) {
    const fromSubmit = panel?.fromSubmit;
    setAcknowledged(true);
    setPanel(null);
    if (!fromSubmit) return;
    if (choice === "continue") setSent(true);
    else submitRef.current?.focus({ preventScroll: true });
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-top">
          <h2 id={titleId}>Shouldn&rsquo;t Wouldn&rsquo;t</h2>
          <button type="button" className="close" onClick={onClose}>
            Close
          </button>
        </div>

        <section>
          <h3>The project</h3>
          <p>
            Shouldn&rsquo;t Wouldn&rsquo;t is a free Chrome extension for parents and other adults
            who aren&rsquo;t software specialists. When a web form seems to ask for something
            sensitive, like a Social Security or card number, it shows a short, calm reminder
            beside the field, and it can hide those characters on screen while you type. It runs
            entirely in the browser: it never reads what you type and makes no network requests.
          </p>
        </section>

        <section>
          <h3>How it works</h3>
          <ol className="steps">
            <li>
              A content script looks at each form field&rsquo;s metadata: its type, name,
              autocomplete token, label, and nearby description. It never reads what you type.
            </li>
            <li>
              Rules sort what a field asks for. Social Security, card, bank, ID, password, and
              health fields get a stronger reminder; address, phone, email, and date of birth get
              a milder one. Comment and search boxes stay quiet.
            </li>
            <li>
              The reminder sits beside the field in a closed shadow root, so the page can&rsquo;t
              rewrite it. Social Security, card, bank, and ID fields can show dots instead of the
              characters.
            </li>
            <li>
              Three local checks can add a site note before you send: the page loaded over HTTP,
              the form sends over HTTP, or the address looks like another brand&rsquo;s.
            </li>
            <li>
              The popup shows the site, the connection, the counts, and a status. The only thing
              it saves is whether protection is on.
            </li>
          </ol>
        </section>

        <section>
          <h3>Tool stack</h3>
          <dl className="stack-list">
            <div>
              <dt>Extension</dt>
              <dd>Chrome Manifest V3 with a content script, a service worker, and a popup, in TypeScript</dd>
            </div>
            <div>
              <dt>Privacy</dt>
              <dd>Only the storage permission and access to http and https pages; no network requests or analytics</dd>
            </div>
            <div>
              <dt>Testing</dt>
              <dd>Node&rsquo;s test runner for unit and accuracy tests, and Playwright with Chromium for real-browser tests</dd>
            </div>
          </dl>
        </section>

        <section className="demo-section">
          <h3>Demo</h3>
          <p className="demo-lead">
            Pick a sample page, click into the fields, type something, and press the form&rsquo;s
            button. The icon at the end of the address bar opens the popup.
          </p>

          <div className="clip-list sw-pages" role="group" aria-label="Sample pages">
            {PAGES.map((item) => (
              <button
                key={item.id}
                type="button"
                className="clip"
                aria-pressed={item.id === pageId}
                onClick={() => openPage(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="sw-browser">
            <div className="sw-toolbar">
              <p className="sw-address">
                {http ? <span className="sw-insecure">Not secure</span> : <span className="sw-secure">Secure</span>}
                <span className="sw-url">{page.url}</span>
              </p>
              <button
                ref={popupButtonRef}
                type="button"
                className="sw-ext"
                aria-label="Shouldn't Wouldn't"
                aria-expanded={popupOpen}
                onClick={() => setPopupOpen((open) => !open)}
              >
                <span className="sw-icon" aria-hidden="true" />
              </button>
            </div>

            {popupOpen ? (
              <div className="sw-popup" role="group" aria-label="Shouldn't Wouldn't popup">
                <h4>Shouldn&rsquo;t Wouldn&rsquo;t</h4>
                <p>Think Twice Before You Share.</p>
                <button
                  type="button"
                  className="sw-switch"
                  role="switch"
                  aria-checked={enabled}
                  onClick={toggleProtection}
                >
                  <span>Protection</span>
                  <span className="sw-state" aria-hidden="true">
                    {enabled ? "On" : "Off"}
                  </span>
                </button>
                <p>
                  If you turn protection off, scanning stops until you turn it back on. That
                  choice is saved in this browser profile. It stays off when you change pages,
                  refresh, or close Chrome. It is not sent to us.
                </p>
                <p className="sw-status" role="status">
                  {STATUS[status]}
                </p>
                <p>This is not a verdict that the website is legitimate.</p>
                <p>
                  <span className="sw-k">Site: </span>
                  {new URL(page.url).hostname}
                </p>
                <p>
                  <span className="sw-k">Connection: </span>
                  {http ? "http" : "https"}
                </p>
                <p>
                  <span className="sw-k">Sensitive fields: </span>
                  {enabled ? active.length : "—"}
                </p>
                <p>
                  <span className="sw-k">Security concerns: </span>
                  {enabled ? concerns.length : "—"}
                </p>
                {enabled ? null : <p>Protection is off right now, so this page was not scanned.</p>}
                <h5>Your Privacy Matters</h5>
                {PRIVACY.map((line) => (
                  <p key={line}>{line}</p>
                ))}
              </div>
            ) : null}

            <form
              key={pageId}
              className="sw-page"
              onSubmit={onSubmit}
              onPointerDown={() => setPopupOpen(false)}
              noValidate
            >
              <h4>{page.title}</h4>
              {page.fields.map((field) => {
                const warned = active.includes(field);
                const masked = warned && field.mask && !revealed.includes(field.id);
                const noteId = `${idBase}-${field.id}-note`;
                const whyId = `${idBase}-${field.id}-why`;
                const why = whyOpen.includes(field.id);
                const control = {
                  name: field.id,
                  autoComplete: "off",
                  className: `${warned ? "is-marked" : ""} ${masked ? "is-masked" : ""}`.trim() || undefined,
                  "aria-describedby": warned ? noteId : undefined,
                  onFocus: () => onFieldFocus(field),
                };
                return (
                  <div key={field.id}>
                    <label className="sw-field">
                      <span>{field.label}</span>
                      {field.textarea ? (
                        <textarea rows={2} {...control} />
                      ) : (
                        <input type={field.type ?? "text"} {...control} />
                      )}
                    </label>
                    {warned ? (
                      <div className="sw-note" role="note" aria-label="Shouldn't Wouldn't reminder">
                        <p id={noteId}>{NOTE[field.warn]}</p>
                        {why ? <p id={whyId}>{whyText(field.warn, concerns, field.mask)}</p> : null}
                        <div className="sw-row">
                          {field.mask ? (
                            <button
                              type="button"
                              aria-label={masked ? "Show what you typed in this field" : "Hide what you typed in this field"}
                              onClick={() => toggle(revealed, setRevealed, field.id)}
                            >
                              <Eye open={masked} />
                              <span>{masked ? "Show" : "Hide"}</span>
                            </button>
                          ) : null}
                          <button
                            type="button"
                            className="sw-quiet"
                            aria-expanded={why}
                            aria-controls={why ? whyId : undefined}
                            onClick={() => toggle(whyOpen, setWhyOpen, field.id)}
                          >
                            Why am I seeing this?
                          </button>
                          <button
                            type="button"
                            aria-label="Dismiss this reminder"
                            onClick={() => {
                              setDismissed([...dismissed, field.id]);
                              if (panel?.after === field.id) setPanel(null);
                            }}
                          >
                            Dismiss
                          </button>
                        </div>
                      </div>
                    ) : null}
                    {panel && panel.after === field.id && concerns.length > 0 ? (
                      <div
                        ref={panelRef}
                        className="sw-panel"
                        role="region"
                        aria-label="Shouldn't Wouldn't site reminder"
                        tabIndex={-1}
                      >
                        {concernLines(concerns).map((line) => (
                          <p key={line}>{line}</p>
                        ))}
                        {panel.more ? <p>{moreInformation(concerns)}</p> : null}
                        <div className="sw-row">
                          <button type="button" onClick={() => answer("back")}>
                            Go Back
                          </button>
                          <button type="button" onClick={() => answer("continue")}>
                            Continue Anyway
                          </button>
                          <button
                            type="button"
                            className="sw-quiet"
                            aria-expanded={panel.more}
                            onClick={() => setPanel({ ...panel, more: true })}
                          >
                            More Information
                          </button>
                        </div>
                      </div>
                    ) : null}
                  </div>
                );
              })}
              <button ref={submitRef} type="submit" className="sw-submit">
                {page.submit}
              </button>
              {sent ? (
                <p className="sw-sent" role="status">
                  The form went through. On this sample page nothing is actually sent.
                </p>
              ) : null}
            </form>
          </div>

          <p className="sw-caveat">
            This in-browser copy uses the extension&rsquo;s own wording and rules. The real one runs
            in Chrome; version 0.1.1 was submitted to the Chrome Web Store and is waiting for review.
          </p>

          <p className="repo-line">
            Check out my repo:{" "}
            <a className="repo-link" href={REPO} target="_blank" rel="noopener noreferrer">
              github.com/enobot/ShouldntWouldnt
            </a>
          </p>
        </section>
      </div>
    </div>
  );
}
