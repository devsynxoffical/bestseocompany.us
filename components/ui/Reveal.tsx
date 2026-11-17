"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cx } from "@/lib/utils";

export type RevealVariant = "up" | "left" | "right" | "scale" | "blur" | "clip" | "tilt";

type Props = {
  as?: ElementType;
  variant?: RevealVariant;
  /** Stagger step 1-4 (each step adds 80ms delay). */
  delay?: 1 | 2 | 3 | 4;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  [key: string]: unknown;
};

/** Wraps content in an element that slides/fades in when scrolled into view. */
export function Reveal({ as: Tag = "div", variant = "up", delay, className, style, children, ...rest }: Props) {
  const ref = useReveal<HTMLElement>();
  return (
    <Tag ref={ref} className={cx("rv", className)} data-r={variant} data-d={delay} style={style} {...rest}>
      {children}
    </Tag>
  );
}
