import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { PricePanel } from "../content";

export function PriceMenu({ panels }: { panels: PricePanel[] }) {
  const [activeId, setActiveId] = useState<string>(panels[0]?.id ?? "");
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const menuRef = useRef<HTMLDivElement | null>(null);

  /* 服務項目的卡片用 #price-cancer 這類錨點指定分類，搜尋結果也可能連進來，
     所以把網址 hash 當成來源之一，切換分頁後再捲到價目表（避開 sticky header）。 */
  useEffect(() => {
    const syncFromHash = () => {
      const id = window.location.hash.slice(1).replace(/-panel$/, "");
      if (!panels.some((panel) => panel.id === id)) return;
      setActiveId(id);
      menuRef.current?.scrollIntoView({ block: "start" });
    };

    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
  }, [panels]);

  if (panels.length === 0) return null;

  const move = (from: number, delta: number) => {
    const next = panels[(from + delta + panels.length) % panels.length];
    setActiveId(next.id);
    tabRefs.current[next.id]?.focus();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>, index: number) => {
    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        move(index, 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        move(index, -1);
        break;
      case "Home":
        event.preventDefault();
        move(0, 0);
        break;
      case "End":
        event.preventDefault();
        move(panels.length - 1, 0);
        break;
      default:
        break;
    }
  };

  return (
    <div className="price-menu" ref={menuRef}>
      <div className="price-menu__tablist" role="tablist" aria-label="檢驗項目分類">
        {panels.map((panel, index) => {
          const selected = panel.id === activeId;
          return (
            <button
              key={panel.id}
              type="button"
              role="tab"
              id={`${panel.id}-tab`}
              className="price-menu__tab"
              aria-selected={selected}
              aria-controls={`${panel.id}-panel`}
              tabIndex={selected ? 0 : -1}
              ref={(node) => {
                tabRefs.current[panel.id] = node;
              }}
              onClick={() => setActiveId(panel.id)}
              onKeyDown={(event) => onKeyDown(event, index)}
            >
              {panel.tab}
            </button>
          );
        })}
      </div>

      {panels.map((panel) => {
        const selected = panel.id === activeId;
        return (
          <div
            key={panel.id}
            role="tabpanel"
            id={`${panel.id}-panel`}
            aria-labelledby={`${panel.id}-tab`}
            tabIndex={0}
            hidden={!selected}
            className="price-menu__panel"
          >
            <div className="price-menu__intro">
              <h3 className="price-menu__title">{panel.title}</h3>
              <p className="price-menu__lead">{panel.lead}</p>
            </div>

            <ul className="price-list">
              {panel.items.map((item) => (
                <li className="price-row" key={item.name}>
                  <div className="price-row__main">
                    <h4 className="price-row__name">{item.name}</h4>
                    {item.meta ? <p className="price-row__meta">{item.meta}</p> : null}
                    {item.includes && item.includes.length > 0 ? (
                      <ul className="price-row__includes">
                        {item.includes.map((entry) => (
                          <li key={entry}>{entry}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>
                  <div className="price-row__price">
                    <span className="price-row__amount">{item.price}</span>
                    {item.compareAt ? (
                      <span className="price-row__compare">{item.compareAt}</span>
                    ) : null}
                  </div>
                </li>
              ))}
            </ul>

            {panel.foot ? <p className="price-menu__foot">{panel.foot}</p> : null}

            {panel.more ? (
              <p className="price-menu__more">
                <a href={panel.more.href}>{panel.more.label}</a>
              </p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}
