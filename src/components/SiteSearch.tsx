import { useId, useMemo, useState } from "react";
import { clinic, popularTests, searchNote, testCatalogHref } from "../content";
import { searchSite } from "../search";

type ChipRowProps = {
  label: string;
  words: readonly string[];
  active: string;
  onPick: (word: string) => void;
};

function ChipRow({ label, words, active, onPick }: ChipRowProps) {
  return (
    <div className="search__chips-row">
      <span className="search__chips-label">{label}</span>
      <ul className="search__chips">
        {words.map((word) => (
          <li key={word}>
            <button
              type="button"
              className="search__chip"
              aria-pressed={active === word}
              onClick={() => onPick(word)}
            >
              {word}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SiteSearch() {
  const [query, setQuery] = useState("");
  const inputId = useId();

  const trimmed = query.trim();
  const results = useMemo(() => searchSite(trimmed), [trimmed]);

  return (
    <div className="search">
      <div className="search__form" role="search">
        <label className="sr-only" htmlFor={inputId}>
          {searchNote.eyebrow}
        </label>
        <input
          id={inputId}
          className="search__input"
          type="search"
          value={query}
          placeholder="中英文皆可，例如：HbA1c、醣化血色素、HBsAg、過敏原、樹林"
          autoComplete="off"
          onChange={(event) => setQuery(event.target.value)}
        />
        {query.length > 0 ? (
          <button type="button" className="search__clear" onClick={() => setQuery("")}>
            清除
          </button>
        ) : null}
      </div>

      <ChipRow
        label={searchNote.popularAreasLabel}
        words={searchNote.popularAreas}
        active={trimmed}
        onPick={setQuery}
      />
      <ChipRow
        label={searchNote.popularTestsLabel}
        words={popularTests}
        active={trimmed}
        onPick={setQuery}
      />

      <div className="search__output" aria-live="polite">
        {trimmed.length === 0 ? (
          <p className="search__hint">{searchNote.hint}</p>
        ) : results.length === 0 ? (
          <p className="search__hint">
            {searchNote.empty}{" "}
            <a href={clinic.phoneHref}>{clinic.phone}</a>
          </p>
        ) : (
          <>
            <p className="search__count">
              「{trimmed}」共 {results.length} {searchNote.countLabel}
            </p>
            <ul className="search__list">
              {results.map((entry) => (
                <li className="search-hit" key={entry.id}>
                  <a className="search-hit__link" href={entry.anchor}>
                    <span className="search-hit__group">{entry.group}</span>
                    <strong className="search-hit__title">{entry.title}</strong>
                    {entry.detail ? (
                      <span className="search-hit__detail">{entry.detail}</span>
                    ) : null}
                  </a>
                </li>
              ))}
            </ul>
          </>
        )}

        {/* 索引只放得下常用項目；完整的數百項都在檢驗項目大全，這裡直接帶查詢字串過去 */}
        {trimmed.length > 0 ? (
          <a
            className="search__catalog-link"
            href={`${testCatalogHref}?q=${encodeURIComponent(trimmed)}`}
          >
            {searchNote.catalogLinkLabel}
          </a>
        ) : null}
      </div>
    </div>
  );
}
