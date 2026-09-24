import { useEffect, useState } from "react";
import { clinic, media } from "../content";

const NAV = [
  { href: "#about", label: "關於我們" },
  { href: "#services", label: "服務項目與價格" },
  { href: "#process", label: "檢驗流程" },
  { href: "#why", label: "為什麼選長安" },
  { href: "#privacy", label: "隱私保證" },
  { href: "#faq", label: "常見問題" },
  { href: "#visit", label: "交通與聯絡" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    const onResize = () => {
      if (window.innerWidth > 1180) setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [menuOpen]);

  return (
    <header className="site-header">
      <div className="shell site-header__inner">
        <a className="brand" href="#top" onClick={() => setMenuOpen(false)}>
          <img
            className="brand__mark"
            src={media.logoMark}
            alt=""
            width={64}
            height={62}
            aria-hidden="true"
          />
          <span className="brand__text">
            <span className="brand__name">{clinic.name}</span>
            <span className="brand__sub">
              {clinic.tagline}・{clinic.district}
            </span>
          </span>
        </a>

        <nav className="site-nav" aria-label="主要導覽">
          <ul className="site-nav__list">
            {NAV.map((item) => (
              <li key={item.href}>
                <a className="site-nav__link" href={item.href}>
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="site-header__actions">
          <a
            className="btn btn--line btn--sm"
            href={clinic.line}
            target="_blank"
            rel="noreferrer"
          >
            LINE 預約
          </a>
          <a className="btn btn--ghost btn--sm" href={clinic.phoneHref}>
            <span className="btn__label">{clinic.phone}</span>
          </a>
          <button
            type="button"
            className="nav-toggle"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav-toggle__bars" aria-hidden="true" />
            <span className="nav-toggle__text">{menuOpen ? "關閉" : "選單"}</span>
          </button>
        </div>
      </div>

      <div className="mobile-nav" id="mobile-nav" hidden={!menuOpen}>
        <div className="shell">
          <ul className="mobile-nav__list">
            {NAV.map((item) => (
              <li key={item.href}>
                <a
                  className="mobile-nav__link"
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="mobile-nav__actions">
            <a className="btn btn--line" href={clinic.line} target="_blank" rel="noreferrer">
              LINE 預約諮詢
            </a>
            <a className="btn btn--ghost" href={clinic.phoneHref}>
              電話預約 {clinic.phone}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
