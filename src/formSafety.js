const CONTROL = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g;

export const FIELD_LIMITS = {
  firstName: 80,
  lastName: 80,
  company: 120,
  email: 254,
  message: 2000,
};

export const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function clampInput(value, limit, { keepNewlines = false } = {}) {
  let text = String(value ?? "").replace(/\0/g, "").replace(/\r\n?/g, "\n");
  text = keepNewlines ? text.replace(CONTROL, "") : text.replace(/[\u0000-\u001F\u007F]/g, "");
  return text.slice(0, limit);
}

export function finalizeText(value, limit, { keepNewlines = false } = {}) {
  const text = clampInput(value, limit, { keepNewlines });
  if (!keepNewlines) return text.trim();
  return text.replace(/\n{3,}/g, "\n\n").trim();
}
