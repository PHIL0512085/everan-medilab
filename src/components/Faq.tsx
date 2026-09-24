import { useState } from "react";
import type { FaqItem } from "../content";

export function Faq({ items }: { items: FaqItem[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <ul className="faq">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <li className="faq__item" key={item.id}>
            <h3 className="faq__heading">
              <button
                type="button"
                className="faq__trigger"
                aria-expanded={open}
                aria-controls={`${item.id}-panel`}
                id={`${item.id}-trigger`}
                onClick={() => setOpenId(open ? null : item.id)}
              >
                <span className="faq__q">{item.q}</span>
                <span className="faq__icon" aria-hidden="true" />
              </button>
            </h3>
            <div
              className="faq__panel"
              id={`${item.id}-panel`}
              role="region"
              aria-labelledby={`${item.id}-trigger`}
              data-open={open ? "true" : "false"}
            >
              <div className="faq__panel-inner">
                <p className="faq__a">{item.a}</p>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
