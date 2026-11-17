"use client";

import type { CSSProperties, ElementType, ReactNode } from "react";
import { useReveal } from "@/hooks/useReveal";
import { cx } from "@/lib/utils";

export type TextPart = string | { text: string; className?: string };

type Props = {
  as?: ElementType;
  parts: TextPart[];
  className?: string;
  style?: CSSProperties;
  id?: string;
};

/**
 * Heading whose words slide up one after another when it enters the viewport.
 * Each word is wrapped in a mask (`.sw`) with an inner element (`i`) that moves.
 */
export function SplitText({ as: Tag = "h2", parts, className, style, id }: Props) {
  const ref = useReveal<HTMLElement>();
  let index = 0;

  const renderWords = (text: string, keyPrefix: string): ReactNode[] =>
    text.split(/(\s+)/).map((chunk, i) => {
      if (!chunk) return null;
      if (/^\s+$/.test(chunk)) return chunk;
      const w = index++;
      return (
        <span className="sw" key={`${keyPrefix}-${i}`}>
          <i style={{ ["--w" as string]: w }}>{chunk}</i>
        </span>
      );
    });

  return (
    <Tag ref={ref} id={id} className={cx("split", className)} style={style}>
      {parts.map((part, pi) =>
        typeof part === "string" ? (
          renderWords(part, `p${pi}`)
        ) : (
          <span key={`p${pi}`} className={part.className}>
            {renderWords(part.text, `p${pi}`)}
          </span>
        ),
      )}
    </Tag>
  );
}
