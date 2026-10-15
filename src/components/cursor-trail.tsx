"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

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
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    return () => {
      document.body.classList.remove("custom-cursor");
      cancelAnimationFrame(frame);
      context.clearRect(0, 0, innerWidth, innerHeight);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
    };
  }, [enabled, portalTarget]);
  const canvas = (
  <canvas ref={ref} className="cursor-trail" aria-hidden="true" />
  );

  return portalTarget ? createPortal(canvas, portalTarget) : canvas;
}
