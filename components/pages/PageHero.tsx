import type { ReactNode } from "react";
import type { Color } from "@/lib/pages/types";
import { Breadcrumbs } from "./Breadcrumbs";
import { SplitText } from "@/components/ui/SplitText";
import { cx } from "@/lib/utils";

type Props = {
  crumbs: Array<{ name: string; path: string }>;
  eyebrow: string;
  h1: string;
  intro: string;
  color: Color;
  actions?: ReactNode;
  aside?: ReactNode;
  wide?: boolean;
};

/** Hero used by every inner page: breadcrumb, eyebrow chip, animated H1, intro, actions and an optional visual. */
export function PageHero({ crumbs, eyebrow, h1, intro, color, actions, aside, wide }: Props) {
  return (
    <section className={cx("ph", !!aside && "ph-split", !!wide && "ph-wide")} style={{ ["--pc" as string]: `var(--${color})` }}>
      <div className="wrap">
        <Breadcrumbs items={crumbs} />
        <div className="ph-grid">
          <div className="ph-copy">
            <span className="ph-eyebrow">{eyebrow}</span>
            <SplitText as="h1" parts={[h1]} className="ph-h1" />
            <p className="ph-intro">{intro}</p>
            {actions && <div className="ph-actions">{actions}</div>}
          </div>
          {aside && <div className="ph-aside">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
