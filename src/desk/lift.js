// Every resting shadow is cast by one light from the upper left, so offsets point
// down-right and grow with how far the object stands off the desk. Shadows switch
// rather than animate: animating a drop-shadow repaints the whole object every
// frame.

// Paper and the name tag lie flat: a contact edge and a short, soft spread.
export const flatShadow =
  "drop-shadow(0.5px 1px 0.8px rgba(40, 24, 10, 0.3)) drop-shadow(3px 4px 5px rgba(40, 24, 10, 0.12))";
// The phone stands about 0.3in off the desk.
export const restShadow =
  "drop-shadow(1px 1.5px 1px rgba(30, 18, 8, 0.34)) drop-shadow(7px 8px 7px rgba(40, 24, 10, 0.2))";
export const liftShadow = "drop-shadow(0px 36px 30px rgba(20, 12, 8, 0.42))";

export function liftTransition(reduced) {
  if (reduced) return { duration: 0 };
  return {
    layout: { type: "spring", stiffness: 230, damping: 28, mass: 0.9 },
    default: { type: "spring", stiffness: 230, damping: 28, mass: 0.9 },
  };
}
