import { useEffect, useId, useRef, useState } from "react";
import { profile } from "./data.js";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const FEEDBACK_SUBJECT = "My Portfolio Suggestions and Feedback";

function FeedbackForm() {
  const baseId = useId();
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    company: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({});

  function update(name, value) {
    setFields((current) => ({ ...current, [name]: value }));
    setErrors((current) => {
      if (!current[name]) return current;
      const next = { ...current };
      delete next[name];
      return next;
    });
  }

  function validate(values) {
    const next = {};
    if (!values.firstName.trim()) next.firstName = "Enter your first name.";
    if (!values.lastName.trim()) next.lastName = "Enter your last name.";
    if (!values.company.trim()) next.company = "Enter your company.";
    const email = values.email.trim();
    if (!email) next.email = "Enter your email address.";
    else if (!EMAIL_PATTERN.test(email)) next.email = "Enter a valid email address.";
    if (!values.message.trim()) next.message = "Write your feedback before sending.";
    return next;
  }

  function onSubmit(event) {
    event.preventDefault();
    const next = validate(fields);
    setErrors(next);
    if (Object.keys(next).length > 0) {
      const firstInvalid = Object.keys(next)[0];
      document.getElementById(`${baseId}-${firstInvalid}`)?.focus();
      return;
    }
    const body = [
      `First name: ${fields.firstName.trim()}`,
      `Last name: ${fields.lastName.trim()}`,
      `Company: ${fields.company.trim()}`,
      `Email: ${fields.email.trim()}`,
      "",
      fields.message.trim(),
    ].join("\n");
    const href = `mailto:${profile.email}?subject=${encodeURIComponent(FEEDBACK_SUBJECT)}&body=${encodeURIComponent(body)}`;
    window.location.href = href;
  }

  const inputs = [
    ["firstName", "First name", "text"],
    ["lastName", "Last name", "text"],
    ["company", "Company", "text"],
    ["email", "Email address", "email"],
  ];

  return (
    <form className="feedback-form" onSubmit={onSubmit} noValidate>
      <div className="feedback-grid">
        {inputs.map(([name, label, type]) => {
          const id = `${baseId}-${name}`;
          const errorId = `${id}-error`;
          return (
            <div className="field" key={name}>
              <label htmlFor={id}>{label}</label>
              <input
                id={id}
                name={name}
                type={type}
                autoComplete={
                  name === "email"
                    ? "email"
                    : name === "company"
                      ? "organization"
                      : name === "firstName"
                        ? "given-name"
                        : "family-name"
                }
                value={fields[name]}
                aria-invalid={errors[name] ? "true" : "false"}
                aria-describedby={errors[name] ? errorId : undefined}
                onChange={(event) => update(name, event.target.value)}
              />
              {errors[name] ? (
                <p className="field-error" id={errorId}>
                  {errors[name]}
                </p>
              ) : null}
            </div>
          );
        })}
      </div>
      <div className="field">
        <label htmlFor={`${baseId}-message`}>Feedback</label>
        <textarea
          id={`${baseId}-message`}
          name="message"
          rows={6}
          value={fields.message}
          aria-invalid={errors.message ? "true" : "false"}
          aria-describedby={errors.message ? `${baseId}-message-error` : undefined}
          onChange={(event) => update("message", event.target.value)}
        />
        {errors.message ? (
          <p className="field-error" id={`${baseId}-message-error`}>
            {errors.message}
          </p>
        ) : null}
      </div>
      <button type="submit" className="send-note">
        Send
      </button>
    </form>
  );
}

export default function FeedbackModal({ onClose }) {
  const titleId = useId();
  const dialogRef = useRef(null);

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
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="closing-note feedback-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        ref={dialogRef}
        onClick={(event) => event.stopPropagation()}
      >
        <h2 id={titleId} className="feedback-title">
          Get in touch
        </h2>
        <p>
          I'm always looking for ways to learn and grow, so if you have any
          feedback or suggestions on my résumé, I'd genuinely appreciate
          hearing them!
        </p>
        <p>
          <strong>
            I'm confident that my curiosity, work ethic, and willingness to
            learn would make me a valuable addition to your team.
          </strong>{" "}
          I'd love the opportunity to connect, share more about what I can
          bring to the table, and discuss how I can contribute to your team's
          success.
        </p>
        <p>
          <strong>Let's connect and make something great together!</strong>
        </p>
        <FeedbackForm />
        <button type="button" className="feedback-close" aria-label="Close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
}
