export function CoffeeCup() {
  return (
    <div className="coffee obj-coffee" aria-hidden="true">
      <svg className="desk-art" viewBox="0 0 140 150" role="presentation">
        <ellipse cx="70" cy="132" rx="42" ry="8" fill="rgba(70,40,20,0.18)" />
        <path
          className="steam"
          d="M48 46c6-10 2-16 8-26"
          fill="none"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.7"
        />
        <path
          className="steam steam-late"
          d="M70 42c8-12 2-18 8-28"
          fill="none"
          stroke="#fff"
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.55"
        />
        <ellipse cx="70" cy="118" rx="40" ry="9" fill="#f3e4d4" />
        <path
          d="M38 58h64c2 28-6 52-32 56-26-4-34-28-32-56z"
          fill="#f7d5e3"
        />
        <path d="M42 64h56c1 20-6 40-28 44-22-4-29-24-28-44z" fill="#fff6f8" />
        <path
          d="M102 72c14 2 18 16 4 24-10 6-16-2-16-10 0-8 4-14 12-14z"
          fill="none"
          stroke="#e7b7c8"
          strokeWidth="5"
        />
        <ellipse cx="70" cy="60" rx="32" ry="8" fill="#6b3d32" />
        <ellipse cx="70" cy="58" rx="26" ry="5" fill="#3d241e" />
      </svg>
    </div>
  );
}

export function LaptopArt() {
  return (
    <svg className="desk-art" viewBox="0 0 200 150" role="presentation">
      <rect x="38" y="18" width="124" height="82" rx="8" fill="#d9c7bc" />
      <rect x="46" y="26" width="108" height="66" rx="3" fill="#2a2428" />
      <text x="56" y="46" fill="#ffd0e2" fontSize="9" fontFamily="sans-serif">
        Tracer
      </text>
      <text x="56" y="62" fill="#fffaf6" fontSize="9" fontFamily="sans-serif">
        FITTMM
      </text>
      <text x="56" y="78" fill="#fffaf6" fontSize="9" fontFamily="sans-serif">
        BLU
      </text>
      <path d="M22 104h156l-12 16H34z" fill="#c9b6aa" />
      <rect x="86" y="108" width="28" height="4" rx="1" fill="#a89084" />
    </svg>
  );
}

export function NotebookArt() {
  return (
    <svg className="desk-art" viewBox="0 0 160 140" role="presentation">
      <rect x="28" y="22" width="104" height="100" rx="6" fill="#f3c6d8" />
      <rect x="40" y="22" width="12" height="100" fill="#e7a9c0" />
      <path d="M118 22c10 16 10 84 0 100" fill="none" stroke="#fff" strokeWidth="3" />
      <rect x="74" y="14" width="8" height="28" rx="2" fill="#d46b92" />
      <path d="M56 58h58M56 74h48M56 90h40" stroke="#fff" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}

export function PhoneArt() {
  return (
    <svg className="desk-art" viewBox="0 0 90 150" role="presentation">
      <rect x="18" y="12" width="54" height="112" rx="12" fill="#2c2826" />
      <rect x="24" y="22" width="42" height="86" rx="4" fill="#fff6f4" />
      <circle cx="45" cy="112" r="4" fill="#c9b6aa" />
      <rect x="32" y="36" width="26" height="4" rx="2" fill="#f3c6d8" />
      <rect x="32" y="48" width="26" height="4" rx="2" fill="#e7d4ea" />
      <rect x="32" y="60" width="18" height="4" rx="2" fill="#f6e2c4" />
    </svg>
  );
}

export function DeskButton({
  className,
  label,
  tip,
  tipId,
  buttonRef,
  onClick,
  children,
}) {
  return (
    <span className={`hot-wrap desk-object ${className}`}>
      <button
        type="button"
        ref={buttonRef}
        aria-describedby={tipId}
        onClick={onClick}
      >
        {children}
        <span className="desk-label">{label}</span>
      </button>
      <span className="tip" id={tipId} role="tooltip">
        {tip}
      </span>
    </span>
  );
}
