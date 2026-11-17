"use client";

import type { ReactNode } from "react";
import { useRef } from "react";
import { hasFinePointer, prefersReducedMotion } from "@/hooks/useReducedMotion";
import { cx } from "@/lib/utils";

type Props = {
  href?: string;
  type?: "button" | "submit";
  className?: string;
  children: ReactNode;
  arrow?: boolean;
  onClick?: () => void;
  ariaLabel?: string;
};

/** Pill button that leans toward the pointer. Renders an <a> when `href` is set, otherwise a <button>. */
export function MagneticLink({ href, type = "button", className, children, arrow = false, onClick, ariaLabel }: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);

  const onMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    el.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * 0.25}px, ${(e.clientY - r.top - r.height / 2) * 0.35}px)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  const content = (
    <>
      {children}
      {arrow && <span className="arrow" aria-hidden="true">↗</span>}
    </>
  );
  const shared = {
    ref,
    className: cx("btn mag", className),
    onMouseMove: onMove,
    onMouseLeave: onLeave,
    "aria-label": ariaLabel,
    style: { transition: "transform .4s cubic-bezier(.2,.75,.15,1), background .25s, color .25s" },
  };

  return href ? (
    <a href={href} {...shared} onClick={onClick}>
      {content}
    </a>
  ) : (
    <button type={type} {...shared} onClick={onClick}>
      {content}
    </button>
  );
}
