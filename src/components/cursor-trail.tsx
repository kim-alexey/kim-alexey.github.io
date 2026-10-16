"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

// "crosshair" = new cursor
// "trail" = original circle and trailing dots
const CURSOR_STYLE: string = "crosshair";
// "trail" = original circle and trailing dots

export function CursorTrail({
  enabled,
  inDialog = false,
}: {
  enabled: boolean;
  inDialog?: boolean;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  const [portalTarget, setPortalTarget] = useState<Element | null>(null);

  useEffect(() => {
    setPortalTarget(
      inDialog ? document.querySelector(".project-dialog") : null,
    );
  }, [inDialog]);
  useEffect(() => {
    const canvas = ref.current;
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const mouse = matchMedia("(pointer: fine)");
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    document.body.classList.toggle("custom-cursor", enabled);
    let frame = 0;
    let last = 0;
    let visible = false;
    let target = { x: -100, y: -100 };
let hovering = false;
let pressed = false;
let hoverAmount = 0;
let pressAmount = 0;
let previousDrawTime = 0;

const clickableSelector = [
  "a[href]",
  "button:not(:disabled)",
  "summary",
  '[role="button"]',
  'input[type="submit"]:not(:disabled)',
  'input[type="button"]:not(:disabled)',
].join(", ");

const checkHover = (event: PointerEvent) => {
  hovering =
    event.target instanceof Element &&
    event.target.closest(clickableSelector) !== null;
};

const press = (event: PointerEvent) => {
  if (event.pointerType !== "mouse" || event.button !== 0) return;
  checkHover(event);
  pressed = hovering;
};

const release = () => {
  pressed = false;
};

const resetInteraction = () => {
  hovering = false;
  pressed = false;
};
    const points = Array.from({ length: 7 }, () => ({ ...target }));
    const resize = () => {
      const ratio = Math.min(devicePixelRatio || 1, 2);
      canvas.width = innerWidth * ratio;
      canvas.height = innerHeight * ratio;
      canvas.style.width = `${innerWidth}px`;
      canvas.style.height = `${innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };
    const draw = () => {
      context.clearRect(0, 0, innerWidth, innerHeight);
      if (
        !enabled ||
        motion.matches ||
        !mouse.matches ||
        !visible
      ) {
        frame = 0;
        return;
      }
      // points.forEach((point, i) => {
      //   const before = i === 0 ? target : points[i - 1];
      //   point.x += (before.x - point.x) * 0.3;
      //   point.y += (before.y - point.y) * 0.3;
      //   context.beginPath();
      //   context.arc(
      //     point.x,
      //     point.y,
      //     i === 0 ? 17 : Math.max(1, 3.1 - i * 0.25),
      //     0,
      //     Math.PI * 2,
      //   );
      //   if (i === 0) {
      //     context.strokeStyle = "rgba(142,183,255,.6)";
      //     context.lineWidth = 1;
      //     context.stroke();
      //   } else {
      //     context.fillStyle = `rgba(142,183,255,${0.5 - i * 0.055})`;
      //     context.fill();
      //   }
      // });

      // if (CURSOR_STYLE === "crosshair") {
      //   const { x, y } = target;
      //   const gap = 5;
      //   const reach = 10;

      //   context.save();
      //   context.strokeStyle = "#A9C7FF";
      //   context.lineWidth = 2;
      //   context.lineCap = "square";

      //   // Subtle shadow keeps the cursor visible on lighter elements.
      //   context.shadowColor = "rgba(0, 0, 0, 0.65)";
      //   context.shadowBlur = 3;

      //   context.beginPath();

      //   // Left arm
      //   context.moveTo(x - reach, y);
      //   context.lineTo(x - gap, y);

      //   // Right arm
      //   context.moveTo(x + gap, y);
      //   context.lineTo(x + reach, y);

      //   // Top arm
      //   context.moveTo(x, y - reach);
      //   context.lineTo(x, y - gap);

      //   // Bottom arm
      //   context.moveTo(x, y + gap);
      //   context.lineTo(x, y + reach);

      //   context.stroke();
      //   context.restore();
      if (CURSOR_STYLE === "crosshair") {
  const now = performance.now();
  const elapsed = previousDrawTime
    ? Math.min(now - previousDrawTime, 50)
    : 16;

  previousDrawTime = now;

  // Smooth transitions, independent of screen refresh rate.
  const hoverEase = 1 - Math.exp(-elapsed / 45);
  const pressEase = 1 - Math.exp(-elapsed / 30);

  hoverAmount += ((hovering ? 1 : 0) - hoverAmount) * hoverEase;
  pressAmount += ((pressed ? 1 : 0) - pressAmount) * pressEase;

  const { x, y } = target;
  const gap = 5 - hoverAmount * 2 - pressAmount;
  const reach = 12 - hoverAmount * 4 - pressAmount * 3;

  // Light blue gradually becomes almost white on hover.
  const red = Math.round(169 + hoverAmount * 64);
  const green = Math.round(199 + hoverAmount * 44);
  const color = `rgb(${red}, ${green}, 255)`;

  context.save();
  context.strokeStyle = color;
  context.fillStyle = color;
  context.lineWidth = 2;
  context.lineCap = "square";
  context.shadowColor = "rgba(0, 0, 0, 0.65)";
  context.shadowBlur = 3;

  context.beginPath();

  context.moveTo(x - reach, y);
  context.lineTo(x - gap, y);

  context.moveTo(x + gap, y);
  context.lineTo(x + reach, y);

  context.moveTo(x, y - reach);
  context.lineTo(x, y - gap);

  context.moveTo(x, y + gap);
  context.lineTo(x, y + reach);

  context.stroke();

  context.restore();
      } else {
        // ORIGINAL CURSOR — preserved for switching back.
        points.forEach((point, i) => {
          const before = i === 0 ? target : points[i - 1];
          point.x += (before.x - point.x) * 0.3;
          point.y += (before.y - point.y) * 0.3;

          context.beginPath();
          context.arc(
            point.x,
            point.y,
            i === 0 ? 17 : Math.max(1, 3.1 - i * 0.25),
            0,
            Math.PI * 2,
          );

          if (i === 0) {
            context.strokeStyle = "rgba(142,183,255,.6)";
            context.lineWidth = 1;
            context.stroke();
          } else {
            context.fillStyle = `rgba(142,183,255,${0.5 - i * 0.055})`;
            context.fill();
          }
        });
      }
// 
      frame = requestAnimationFrame(draw);
    };
    const move = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      target = { x: event.clientX, y: event.clientY };
      last = performance.now();
      if (!visible)
        points.forEach((p) => {
          p.x = target.x;
          p.y = target.y;
        });
      visible = true;
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const hide = () => {
      visible = false;
      context.clearRect(0, 0, innerWidth, innerHeight);
    };
    resize();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", move);
window.addEventListener("pointermove", checkHover);
window.addEventListener("pointerover", checkHover);
window.addEventListener("pointerdown", press);
window.addEventListener("pointerup", release);
window.addEventListener("pointercancel", release);
window.addEventListener("blur", resetInteraction);
document.addEventListener("pointerleave", resetInteraction);
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      document.body.classList.remove("custom-cursor");
      cancelAnimationFrame(frame);
      context.clearRect(0, 0, innerWidth, innerHeight);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
window.removeEventListener("pointermove", checkHover);
window.removeEventListener("pointerover", checkHover);
window.removeEventListener("pointerdown", press);
window.removeEventListener("pointerup", release);
window.removeEventListener("pointercancel", release);
window.removeEventListener("blur", resetInteraction);
document.removeEventListener("pointerleave", resetInteraction);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [enabled, portalTarget]);
  const canvas = (
  <canvas ref={ref} className="cursor-trail" aria-hidden="true" />
  );

  return portalTarget ? createPortal(canvas, portalTarget) : canvas;
}
