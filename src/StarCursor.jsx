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

    const starMarkup =
      '<svg viewBox="-2 -2 28 28" aria-hidden="true"><path fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round" opacity="0.45" d="M12 0l1.7 8.3L22 12l-8.3 1.7L12 22l-1.7-8.3L2 12l8.3-1.7z"/><path fill="currentColor" d="M12 0l1.7 8.3L22 12l-8.3 1.7L12 22l-1.7-8.3L2 12l8.3-1.7z"/></svg>';
    const stars = Array.from({ length: count }, (_, index) => {
      const star = document.createElement("span");
      star.className = index === 0 ? "cursor-star cursor-star-lead" : "cursor-star";
      star.innerHTML = starMarkup;
      star.style.opacity = "0";
      layer.appendChild(star);
      return star;
    });
    document.body.appendChild(layer);

    const points = Array.from({ length: count }, () => ({ x: -80, y: -80 }));
    let target = { x: -80, y: -80 };
    let frame = 0;
    let running = false;
    let visible = false;

    function follow(point, goal, ease) {
      const dx = goal.x - point.x;
      const dy = goal.y - point.y;
      if (Math.abs(dx) < 0.4 && Math.abs(dy) < 0.4) {
        point.x = goal.x;
        point.y = goal.y;
        return false;
      }
      point.x += dx * ease;
      point.y += dy * ease;
      return true;
    }

    function paint() {
      let moving = follow(points[0], target, reduce ? 1 : 0.62);
      for (let index = 1; index < points.length; index += 1) {
        if (follow(points[index], points[index - 1], 0.42)) moving = true;
      }
      stars.forEach((star, index) => {
        const scale = 1 - index * 0.08;
        star.style.transform = `translate3d(${points[index].x}px, ${points[index].y}px, 0) rotate(${index * 16}deg) scale(${scale})`;
      });
      if (!visible && !moving) {
        running = false;
        return;
      }
      if (visible && !moving) {
        running = false;
        return;
      }
      frame = requestAnimationFrame(paint);
    }

    function start() {
      if (running) return;
      running = true;
      frame = requestAnimationFrame(paint);
    }

    function setVisible(next) {
      if (visible === next) return;
      visible = next;
      stars.forEach((star, index) => {
        star.style.opacity = next ? String(1 - index * 0.1) : "0";
      });
    }

    function show(event) {
      target = { x: event.clientX, y: event.clientY };
      setVisible(true);
      start();
    }

    function hide() {
      setVisible(false);
      start();
    }

    function onVisibility() {
      if (document.hidden) hide();
    }

    window.addEventListener("pointermove", show);
    window.addEventListener("pointerdown", show);
    document.addEventListener("pointerleave", hide);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", show);
      window.removeEventListener("pointerdown", show);
      document.removeEventListener("pointerleave", hide);
      document.removeEventListener("visibilitychange", onVisibility);
      layer.remove();
      root.classList.remove("has-star-cursor");
    };
  }, []);

  return null;
}
