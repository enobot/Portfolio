import { useEffect } from "react";
import "./StarCursor.css";

const TRAIL = 9;

export default function StarCursor() {
  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine) return undefined;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = reduce ? 1 : TRAIL;
    const root = document.documentElement;
    root.classList.add("has-star-cursor");

    const layer = document.createElement("div");
    layer.className = "star-cursor-layer";
    layer.setAttribute("aria-hidden", "true");

    const stars = Array.from({ length: count }, (_, index) => {
      const star = document.createElement("span");
      star.className = index === 0 ? "cursor-star cursor-star-lead" : "cursor-star";
      star.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 0l1.7 8.3L22 12l-8.3 1.7L12 22l-1.7-8.3L2 12l8.3-1.7z"/></svg>';
      layer.appendChild(star);
      return star;
    });
    document.body.appendChild(layer);

    const points = Array.from({ length: count }, () => ({ x: -80, y: -80 }));
    let target = { x: -80, y: -80 };
    let frame = 0;
    let visible = false;

    function paint() {
      points[0].x += (target.x - points[0].x) * (reduce ? 1 : 0.62);
      points[0].y += (target.y - points[0].y) * (reduce ? 1 : 0.62);
      for (let index = 1; index < points.length; index += 1) {
        points[index].x += (points[index - 1].x - points[index].x) * 0.42;
        points[index].y += (points[index - 1].y - points[index].y) * 0.42;
      }
      stars.forEach((star, index) => {
        const scale = 1 - index * 0.08;
        star.style.transform = `translate3d(${points[index].x}px, ${points[index].y}px, 0) rotate(${index * 16}deg) scale(${scale})`;
        star.style.opacity = visible ? String(1 - index * 0.1) : "0";
      });
      frame = requestAnimationFrame(paint);
    }

    function show(event) {
      target = { x: event.clientX, y: event.clientY };
      visible = true;
    }

    function hide() {
      visible = false;
    }

    window.addEventListener("pointermove", show);
    window.addEventListener("pointerdown", show);
    document.addEventListener("pointerleave", hide);
    frame = requestAnimationFrame(paint);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", show);
      window.removeEventListener("pointerdown", show);
      document.removeEventListener("pointerleave", hide);
      layer.remove();
      root.classList.remove("has-star-cursor");
    };
  }, []);

  return null;
}
