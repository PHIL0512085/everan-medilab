import { useState } from "react";
import { Header } from "./components/Header";
import { Faq } from "./components/Faq";
import { PriceMenu } from "./components/PriceMenu";
import { SiteSearch } from "./components/SiteSearch";
import {
  HOURS,
  about,
  certs,
  clinic,
  faqs,
  hoursLabel,
  hoursSummary,
  media,
  notices,
  openStateAt,
  pricePanels,
  privacyPrinciples,
  reasons,
  reportNote,
  reviews,
  searchNote,
  serviceGroups,
  spaceNote,
  stdScreeningHref,
  steps,
  testCatalogHref,
  topicPages,
} from "./content";

function Hero() {
  const [status] = useState(() => openStateAt(new Date()));

  return (
    <section className="hero" id="top">
      <div className="shell hero__inner">
        <div className="hero__copy">
          <p className="eyebrow">
            {clinic.district} · {clinic.category}
          </p>
          <h1 className="hero__title">
            <span>在樹林，抽血與 X 光檢查</span>
            <span>不必在大醫院等半天</span>
          </h1>
          <p className="hero__lead">
            長安醫事檢驗所位於中山路一段（樹林星巴克對面），附設 X 光檢查室，
            提供抽血檢驗、X 光攝影與多種自費健康檢查組合。醫檢師現場操作、時段彈性，
            平日開到晚上 8:00，週六到下午 2:00 也能安排，特殊時段可以透過 LINE 諮詢。
          </p>
          <div className="hero__actions">
            <a
              className="btn btn--line btn--lg"
              href={clinic.line}
              target="_blank"
              rel="noreferrer"
            >
              LINE 預約諮詢
            </a>
            <a className="btn btn--ghost btn--lg" href={clinic.phoneHref}>
              電話預約 {clinic.phone}
            </a>
          </div>
          <ul className="hero__facts">
            <li>
              <strong>{clinic.rating}</strong> Google 評分（{clinic.reviewCount} 則評論）
            </li>
            <li>可匿名採檢</li>
            <li>醫檢師現場抽血</li>
            <li>LGBTQ+ 友善空間</li>
          </ul>
          <p className="hero__note">
            詢問檢驗項目、預約時段或確認報告進度，加 LINE 最方便，我們會在營業時間內回覆。
          </p>
        </div>

        <div className="hero__media">
          <div className="hero__stage">
            <img
              className="hero__image"
              src={media.storeInterior}
              alt="長安醫事檢驗所店內實景：櫃檯、採檢座椅與電腦設備，牆面為「專業、準確、迅速」字樣"
              width={1360}
              height={765}
            />
            <div className={`status-card status-card--${status.open ? "open" : "closed"}`}>
              <span className="status-card__dot" aria-hidden="true" />
              <span className="status-card__text">
                <strong className="status-card__label">{status.label}</strong>
                <span className="status-card__detail">{status.detail}</span>
              </span>
            </div>
          </div>
          <p className="media-note">本所實際空間。</p>
        </div>
      </div>
    </section>
  );
}

function QuickFacts() {
  return (
    <section className="facts" aria-label="本所基本資訊">
      <div className="shell facts__grid">
        <div className="facts__item">
          <span className="facts__key">地址</span>
          <span className="facts__val">{clinic.address}</span>
        </div>
        <div className="facts__item">
          <span className="facts__key">LINE 預約</span>
          <a
            className="facts__val facts__link facts__link--strong"
            href={clinic.line}
            target="_blank"
            rel="noreferrer"
          >
            加入好友預約諮詢
          </a>
        </div>
        <div className="facts__item">
          <span className="facts__key">預約專線</span>
          <a className="facts__val facts__link" href={clinic.phoneHref}>
            {clinic.phone}
          </a>
          <a className="facts__val facts__link" href={clinic.phoneAltHref}>
            {clinic.phoneAlt}
          </a>
        </div>
        <div className="facts__item">
          <span className="facts__key">營業時間</span>
          <span className="facts__val">週一至週五 09:00 – 20:00</span>
          <span className="facts__val">週六 09:00 – 14:00</span>
        </div>
      </div>
    </section>
  );
}

/* 搜尋單獨成一個區塊：搜不到完整答案時，搜尋結果下方會直接帶到檢驗項目大全。 */
function SearchBand() {
  return (
    <section className="section section--search" id="search" aria-labelledby="search-title">
      <div className="shell">
        <header className="section__head">
          <p className="eyebrow">{searchNote.eyebrow}</p>
          <h2 id="search-title">{searchNote.title}</h2>
          <p className="section__lead">{searchNote.lead}</p>
        </header>

        <SiteSearch />

        <p className="search__area">{searchNote.area}</p>
      </div>
    </section>
  );
}

/* 關於我們與檢驗空間合併：一個講人、一個講場所，原本拆成兩個區塊，
   合併後同屬「長安是什麼樣的地方」。 */
function About() {
  const { person } = about;

  return (
    <section className="section section--tint" id="about" aria-labelledby="about-title">
      <div className="shell">
        <div className="about">
          <div className="about__media">
            <img
              className="about__photo"
              src={media.medtechPortrait}
              alt={person.photoAlt}
              loading="lazy"
              width={900}
              height={1124}
            />
            <figure className="about__card">
              <img
                src={media.medtechCard}
                alt={person.cardAlt}
                loading="lazy"
                width={767}
                height={1100}
              />
              <figcaption className="about__card-caption">名片</figcaption>
            </figure>
          </div>

          <div className="about__copy">
            <p className="eyebrow">{about.eyebrow}</p>
            <h2 id="about-title">{about.title}</h2>
            <p className="about__lead">{about.lead}</p>
            <ul className="about__pillars">
              {about.pillars.map((pillar) => (
                <li className="about__pillar" key={pillar}>
                  {pillar}
                </li>
              ))}
            </ul>
            <p className="about__paragraph">{about.paragraph}</p>

            <div className="about__person">
              <h3 className="about__person-name">
                {person.name}
                <span className="about__person-sep">｜</span>
                {person.title}
              </h3>
              <p className="about__person-lead">{person.lead}</p>

              <h4 className="about__person-title">{about.credentialsTitle}</h4>
              <ul className="about__list">
                {person.credentials.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>

              <h4 className="about__person-title">{about.tagsTitle}</h4>
              <ul className="about__tags">
                {person.tags.map((tag) => (
                  <li className="tag" key={tag}>
                    {tag}
                  </li>
                ))}
              </ul>
            </div>

            <blockquote className="about__quote">
              <p className="about__quote-lead">{person.quote.lead}</p>
              <p className="about__quote-body">{person.quote.body}</p>
              <footer className="about__quote-by">{person.quote.by}</footer>
            </blockquote>
          </div>
        </div>

        <div className="section__group" id="space">
          <div className="space">
            <div className="space__copy">
              <p className="eyebrow">{spaceNote.eyebrow}</p>
              <h3 id="space-title" className="section__group-title">
                {spaceNote.title}
              </h3>
              <p className="space__body">{spaceNote.body}</p>
              <ul className="space__list">
                {spaceNote.list.map((entry) => (
                  <li key={entry}>{entry}</li>
                ))}
              </ul>
            </div>
            <div className="space__panel">
              <h3 className="space__panel-title">{spaceNote.panelTitle}</h3>
              <p className="space__panel-body">{spaceNote.panelBody}</p>
              <p className="space__panel-foot">長安醫事檢驗所・{clinic.district}</p>
            </div>

            <ul className="space__gallery">
              {spaceNote.photos.map((photo) => (
                <li key={photo.caption}>
                  <figure className="space__photo">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      width={1175}
                      height={765}
                    />
                    <figcaption className="space__photo-caption">{photo.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* 服務項目、專題專頁與價目表合併成同一區塊：都屬於「本所有哪些服務、各要多少錢」。
   順序是服務卡片 → 專題專頁 → 自費價目表，價目表在最下面，要查價就往這裡找。 */
function Services() {
  return (
    <section className="section" id="services" aria-labelledby="services-title">
      <div className="shell">
        <header className="section__head">
          <p className="eyebrow">服務項目</p>
          <h2 id="services-title">日常需要的檢驗，在社區裡就能完成</h2>
          <p className="section__lead">
            從例行抽血、X 光攝影到基因與運動專項檢測，多數常見檢驗不必到大醫院排隊等候。
            九類服務中，性病、癌症與過敏三類另外寫了完整專頁，直接從卡片點進去看；
            最下面則是自費價目表——同一頁看完就知道有哪些服務、各要多少錢。
          </p>
        </header>

        <ul className="service-groups">
          {serviceGroups.map((group) => (
            <li
              className={group.href ? "service-group service-group--page" : "service-group"}
              key={group.id}
              id={`service-${group.id}`}
            >
              <h3 className="service-group__title">{group.title}</h3>
              <p className="service-group__summary">{group.summary}</p>
              <ul className="service-group__includes">
                {group.includes.map((entry) => (
                  <li className="tag" key={entry}>
                    {entry}
                  </li>
                ))}
              </ul>
              {group.href || group.pricePanelId ? (
                <div className="service-group__links">
                  {group.href ? (
                    <span className="service-group__primary">
                      <a className="service-group__link" href={group.href}>
                        {group.linkLabel ?? "看完整說明"}
                      </a>
                      {group.hrefNote ? (
                        <span className="service-group__note">{group.hrefNote}</span>
                      ) : null}
                    </span>
                  ) : null}
                  {group.pricePanelId ? (
                    <a
                      className="service-group__link service-group__link--sub"
                      href={`#${group.pricePanelId}`}
                    >
                      查看這類的價目
                    </a>
                  ) : null}
                </div>
              ) : null}
            </li>
          ))}
        </ul>

        <p className="service-groups__foot">
          上列項目的檢驗內容、所需證件與工作天數依項目而異；部分項目需事先預約或轉送合作實驗室，
          歡迎來電 <a href={clinic.phoneHref}>{clinic.phone}</a> 或加 LINE 洽詢。
        </p>

        <div className="section__group section__group--prices" id="prices">
          <div className="section__group-head">
            <p className="eyebrow">檢驗項目與價格</p>
            <h3 className="section__group-title">自費檢驗價目表</h3>
            <p className="section__group-lead">
              下列為常見自費項目的參考價格，可依需求單選或選擇組合。
              找不到的項目請先看上方服務項目裡的「檢驗項目大全」，或直接來電與 LINE 洽詢；
              價格如有調整，以本所現場公告為準。
            </p>
          </div>
          <PriceMenu panels={pricePanels} />
        </div>
      </div>
    </section>
  );
}

function Privacy() {
  return (
    <section className="section section--privacy" id="privacy" aria-labelledby="privacy-title">
      <div className="shell">
        <header className="section__head">
          <p className="eyebrow eyebrow--light">隱私保證</p>
          <h2 id="privacy-title">檢驗隱私保密五大原則</h2>
          <p className="section__lead">
            檢驗醫學涉及最個人的隱私秘密，我們承諾守護每位客戶的資料安全。
          </p>
        </header>

        <ol className="principles">
          {privacyPrinciples.map((principle, index) => (
            <li className="principle" key={principle.title}>
              <span className="principle__no" aria-hidden="true">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="principle__title">{principle.title}</h3>
              <p className="principle__body">{principle.body}</p>
            </li>
          ))}
        </ol>

        <p className="privacy__note">
          需要不留紀錄的檢驗嗎？電話或 LINE 告訴我們想檢驗的項目即可，
          現場可選擇不登錄個人資料的匿名採檢。
          <a className="privacy__more" href={stdScreeningHref}>
            性病匿名篩檢專頁：空窗期、方案比較與費用說明
          </a>
        </p>
      </div>
    </section>
  );
}

/* 為什麼選長安＋資格證明＋受檢者回饋：三塊講的是同一件事（憑什麼信任本所），
   原本各佔一個 section，合併後成為單一「信任」區塊。 */
function Why() {
  return (
    <section className="section" id="why" aria-labelledby="why-title">
      <div className="shell">
        <div className="why">
          <div className="why__media">
            <img
              src={media.analyzer}
              alt="實驗室內的自動化生化檢驗儀器，具備檢體轉盤與狀態指示燈"
              loading="lazy"
              width={1200}
              height={900}
            />
          </div>
          <div className="why__copy">
            <p className="eyebrow">為什麼選長安</p>
            <h2 id="why-title">受檢者願意再回來的原因</h2>
            <ul className="why__list">
              {reasons.map((reason) => (
                <li className="why__item" key={reason.title}>
                  <h3 className="why__item-title">{reason.title}</h3>
                  <p className="why__item-body">{reason.body}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="section__group" id="certs">
          <div className="section__group-head">
            <p className="eyebrow">{certs.eyebrow}</p>
            <h3 className="section__group-title">{certs.title}</h3>
            <p className="section__group-lead">{certs.lead}</p>
          </div>

          <ul className="certs__grid">
            {certs.items.map((cert) => (
              <li className="cert" key={cert.title}>
                <figure className="cert__figure">
                  <img
                    className="cert__image"
                    src={cert.src}
                    alt={cert.alt}
                    loading="lazy"
                    width={cert.w}
                    height={cert.h}
                  />
                  <figcaption className="cert__caption">
                    <strong className="cert__name">{cert.title}</strong>
                    <span className="cert__note">{cert.note}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </ul>
        </div>

        <div className="section__group" id="reviews">
          <div className="section__group-head">
            <p className="eyebrow">受檢者回饋</p>
            <h3 className="section__group-title">
              Google 評論 {clinic.rating} 分，累積 {clinic.reviewCount} 則回饋
            </h3>
            <p className="section__group-lead">
              以下內容節錄自本所 Google 商家檔案的公開評論。
            </p>
          </div>

          <ul className="reviews">
            {reviews.map((review) => (
              <li className="review" key={review.quote}>
                <p className="review__quote">「{review.quote}」</p>
                <p className="review__source">— {review.source}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Process() {
  return (
    <section className="section section--tint" id="process" aria-labelledby="process-title">
      <div className="shell process">
        <div className="process__intro">
          <p className="eyebrow">檢驗流程</p>
          <h2 id="process-title">從預約到拿到報告，四個步驟</h2>
          <p className="section__lead">
            部分項目需要空腹，預約時先告訴我們想檢驗的內容，
            我們會提醒您需要留意的準備事項。
          </p>
          <div className="process__media">
            <img
              src={media.sampleTubes}
              alt="實驗室工作台上的真空採血管，依採檢項目排列整齊"
              loading="lazy"
              width={1000}
              height={1250}
            />
          </div>
        </div>
        <div className="process__steps">
          <ol className="steps">
            {steps.map((step) => (
              <li className="step" key={step.no}>
                <span className="step__no" aria-hidden="true">
                  {step.no}
                </span>
                <h3 className="step__title">{step.title}</h3>
                <p className="step__body">{step.body}</p>
              </li>
            ))}
          </ol>

          <aside className="process__callout">
            <h3 className="process__callout-title">{reportNote.title}</h3>
            <p className="process__callout-body">{reportNote.body}</p>
          </aside>
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="section section--tint" id="faq" aria-labelledby="faq-title">
      <div className="shell faq-layout">
        <div className="faq-layout__intro">
          <p className="eyebrow">常見問題</p>
          <h2 id="faq-title">來之前，你可能想先知道</h2>
          <p className="section__lead">
            還有其他問題嗎？歡迎直接來電或加 LINE 詢問，我們會依您的狀況說明。
          </p>
          <a className="btn btn--line" href={clinic.line} target="_blank" rel="noreferrer">
            LINE 詢問
          </a>
        </div>
        <Faq items={faqs} />
      </div>
    </section>
  );
}

/* 交通與聯絡＋最新公告合併：公休公告講的正是「什麼時候來」，
   放在營業時間同一區塊比獨立一個 section 更好找。 */
function Visit() {
  const today = new Date().getDay();

  return (
    <section className="section" id="visit" aria-labelledby="visit-title">
      <div className="shell">
        <header className="section__head">
          <p className="eyebrow">交通與聯絡</p>
          <h2 id="visit-title">新北市樹林區中山路一段 176 號</h2>
          <p className="section__lead">
            位於育英里中山路一段上，就在樹林星巴克對面、育英街與樹德街之間，鄰近樹林火車站與區公所。
            服務範圍以樹林為核心，板橋、迴龍、新莊、三重、三峽與桃園的民眾也常前來。
            出發前建議先來電或 LINE 確認時段，以免遇到臨時公休。
          </p>
        </header>

        <div className="visit">
          <div className="visit__card">
            <h3 className="visit__card-title">聯絡方式</h3>
            <dl className="visit__dl">
              <div className="visit__row">
                <dt>LINE</dt>
                <dd>
                  <a href={clinic.line} target="_blank" rel="noreferrer">
                    加入好友預約／諮詢
                  </a>
                </dd>
              </div>
              <div className="visit__row">
                <dt>預約專線</dt>
                <dd>
                  <a href={clinic.phoneHref}>{clinic.phone}</a>
                </dd>
              </div>
              <div className="visit__row">
                <dt>第二線電話</dt>
                <dd>
                  <a href={clinic.phoneAltHref}>{clinic.phoneAlt}</a>
                </dd>
              </div>
              <div className="visit__row">
                <dt>電子郵件</dt>
                <dd>
                  <a href={clinic.emailHref}>{clinic.email}</a>
                </dd>
              </div>
              <div className="visit__row">
                <dt>地址</dt>
                <dd>{clinic.address}</dd>
              </div>
            </dl>
            <div className="visit__actions">
              <a
                className="btn btn--line"
                href={clinic.line}
                target="_blank"
                rel="noreferrer"
              >
                LINE 預約諮詢
              </a>
              <a
                className="btn btn--ghost"
                href={clinic.mapHref}
                target="_blank"
                rel="noreferrer"
              >
                在 Google 地圖開啟
              </a>
            </div>
          </div>

          <div className="visit__card">
            <h3 className="visit__card-title">營業時間</h3>
            <table className="hours">
              <caption className="sr-only">長安醫事檢驗所營業時間</caption>
              <tbody>
                {HOURS.map((entry) => (
                  <tr
                    key={entry.day}
                    className={
                      entry.day === today ? "hours__row hours__row--today" : "hours__row"
                    }
                  >
                    <th scope="row">
                      {entry.label}
                      {entry.day === today ? <span className="hours__today">今天</span> : null}
                    </th>
                    <td>{hoursLabel(entry)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="visit__note">遇特殊公休將另行公告，詳見下方「最新公告」。</p>
          </div>

          <div className="visit__card visit__card--wide">
            <h3 className="visit__card-title">地址名片</h3>
            <img
              className="visit__address-card"
              src={media.addressCard}
              alt="長安醫事檢驗所位置名片：中山路一段上、樹林星巴克對面，介於育英街與樹德街之間，附近有樹林火車站前站與後火車站、區公所及樹林地下道；下方列有 email、電話、地址與 Google 地圖、LINE 快速諮詢 QR Code"
              loading="lazy"
              width={1600}
              height={887}
            />
            <p className="visit__note">
              名片上的位置圖可對照育英街、樹德街與樹林地下道等地標；用手機掃描 QR Code
              可直接開啟 Google 地圖導航，或加入 LINE 快速諮詢。
            </p>
          </div>
        </div>

        <div className="section__group" id="notice">
          <div className="section__group-head">
            <p className="eyebrow">最新公告</p>
            <h3 className="section__group-title">9 月公休公告</h3>
            <p className="section__group-lead">
              秋意漸濃，九月有兩個階段的特殊公休，
              請提前規劃您的健檢、抽血與領取報告行程。
            </p>
          </div>

          <div className="notices">
            {notices.map((notice) => (
              <article className={`notice notice--${notice.tone}`} key={notice.title}>
                <p className="notice__date">{notice.date}</p>
                <h4 className="notice__title">{notice.title}</h4>
                <p className="notice__body">{notice.body}</p>
              </article>
            ))}
          </div>

          <p className="notices__foot">平時常態營業時間：{hoursSummary}</p>
        </div>
      </div>
    </section>
  );
}

function CtaBand() {
  return (
    <section className="cta-band" aria-labelledby="cta-title">
      <img className="cta-band__bg" src={media.corridor} alt="" aria-hidden="true" />
      <div className="shell cta-band__inner">
        <h2 id="cta-title">需要抽血或 X 光檢查嗎？</h2>
        <p className="cta-band__lead">
          先來電或加 LINE 告訴我們想檢驗的項目，我們會協助確認準備事項與適合的時間。
        </p>
        <div className="cta-band__actions">
          <a
            className="btn btn--line btn--lg"
            href={clinic.line}
            target="_blank"
            rel="noreferrer"
          >
            LINE 預約諮詢
          </a>
          <a className="btn btn--outline-light btn--lg" href={clinic.phoneHref}>
            電話預約 {clinic.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell site-footer__inner">
        <div className="site-footer__info">
          <img
            className="site-footer__logo"
            src={media.logoFull}
            alt={clinic.name}
            width={260}
            height={232}
            loading="lazy"
          />
          <p className="site-footer__line">{clinic.address}</p>
          <p className="site-footer__line">
            預約專線 <a href={clinic.phoneHref}>{clinic.phone}</a> ・{" "}
            <a href={clinic.phoneAltHref}>{clinic.phoneAlt}</a>
          </p>
          <p className="site-footer__line">
            <a href={clinic.emailHref}>{clinic.email}</a>
          </p>
          <p className="site-footer__line">
            <a href={clinic.line} target="_blank" rel="noreferrer">
              LINE 預約諮詢
            </a>{" "}
            ・{" "}
            <a href={clinic.mapHref} target="_blank" rel="noreferrer">
              Google 地圖
            </a>
          </p>
        </div>
        <div className="site-footer__meta">
          <p className="site-footer__line">{hoursSummary}</p>
          <ul className="site-footer__links">
            <li>
              <a href={testCatalogHref}>檢驗項目大全</a>
            </li>
            {topicPages.map((page) => (
              <li key={page.id}>
                <a href={page.href}>{page.title}</a>
              </li>
            ))}
          </ul>
          <p className="site-footer__fine">
            檢驗項目、費用與服務時間以本所現場公告為準。除標示為「本所實際空間」者外，本頁照片為情境示意。
            本頁內容為服務資訊說明，不構成醫療診斷或治療建議；檢驗結果須由醫師判讀與診斷。
          </p>
        </div>
      </div>
    </footer>
  );
}

export function App() {
  return (
    <div className="page">
      <a className="skip-link" href="#main">
        跳至主要內容
      </a>
      <Header />
      <main id="main">
        <Hero />
        <QuickFacts />
        <SearchBand />
        <About />
        <Services />
        <Process />
        <Privacy />
        <Why />
        <FaqSection />
        <Visit />
        <CtaBand />
      </main>
      <Footer />
    </div>
  );
}
