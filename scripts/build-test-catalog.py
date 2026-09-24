#!/usr/bin/env python3
"""把診所的「檢驗項目大全」Excel 轉成網站用的兩份檔案。

    $UV_PYTHON scripts/build-test-catalog.py <xlsx 路徑>

輸出：
  src/data/testCatalog.ts   —— 首頁搜尋索引與服務項目卡片的唯一資料來源
  public/test-catalog.html  —— 給人看的獨立目錄頁（可被搜尋引擎索引）

原始檔是排版用的三欄並排表格：標題列、三欄各自的類別列（粗體）與項目列交錯。
分類規則：粗體 + 去掉面板代號（M01／RFT／O15…）後不含任何英文字母且至少兩個中文字。
改版後重跑即可，兩個輸出會一起更新。
"""

from __future__ import annotations

import html
import json
import re
import sys
from pathlib import Path

from openpyxl import load_workbook

ROOT = Path(__file__).resolve().parent.parent
SOURCE_HTML = ROOT / "public" / "cancer-screening.html"

CJK = r"一-鿿"
CJK_RE = re.compile(f"[{CJK}]")
CODE_RE = re.compile(r"\b[A-Za-z]{0,4}\d{2,4}\b")
UPPER_RE = re.compile(r"\b[A-Z]{2,4}\b")
# 「尿 液 與 糞 便 檢 查」這種逐字加空白的排版，顯示前先黏回去
CJK_SPACE_RE = re.compile(f"(?<=[{CJK}])\\s+(?=[{CJK}])")


# ----------------------------------------------------------------- 解析來源

def norm(text: str) -> str:
    return re.sub(r"\s+", " ", str(text or "")).strip()


def is_category_header(text: str) -> bool:
    """類別列＝去掉面板代號後，不含任何英文字母，且至少兩個中文字。"""
    stripped = UPPER_RE.sub("", CODE_RE.sub("", text))
    if re.search(r"[A-Za-z]", stripped):
        return False
    return len(re.sub(r"\s", "", stripped)) >= 2


def parse_workbook(path: Path) -> list[dict]:
    sheet = load_workbook(path, data_only=True).worksheets[0]
    sections: list[dict] = []

    for col in range(1, sheet.max_column + 1):
        current: dict | None = None
        for row in range(2, sheet.max_row + 1):
            cell = sheet.cell(row=row, column=col)
            value = norm(cell.value)
            if not value:
                continue
            if cell.font and cell.font.bold and is_category_header(value):
                current = {"name": value, "items": []}
                sections.append(current)
            elif current is not None:
                current["items"].append(value)

    return sections


def tidy_category(name: str) -> tuple[str, list[str]]:
    """回傳（顯示用名稱, 額外搜尋詞）。面板代號不給訪客看，但留著當搜尋詞。"""
    display = CJK_SPACE_RE.sub("", name)
    codes = re.findall(r"\b[A-Za-z]{1,4}\d{2,4}\b", display)
    display = re.sub(r"\s*\b[A-Za-z]{1,4}\d{2,4}\b\s*", " ", display).strip()
    return display, [c for c in codes if c]


def merge_sections(sections: list[dict]) -> list[dict]:
    merged: list[dict] = []
    index: dict[str, dict] = {}

    for section in sections:
        name = CJK_SPACE_RE.sub("", section["name"])
        if not section["items"]:
            # 「理學檢查」是排版時留下的空標題，實際項目掛在下一個類別底下
            continue
        if name in index:
            index[name]["items"].extend(section["items"])
            continue
        entry = {"name": section["name"], "items": list(section["items"])}
        index[name] = entry
        merged.append(entry)

    for entry in merged:
        seen: set[str] = set()
        unique = []
        for label in entry["items"]:
            key = re.sub(r"\s", "", clean_label(label)).lower()
            if key in seen:
                continue
            seen.add(key)
            unique.append(label)
        entry["items"] = unique

    return merged


# ------------------------------------------------- 英文名／中文名 的切分

# 原檔少數拼字錯誤，只在「唯一合理讀法」時才改；有疑問的一律保留原樣並在報告中列出。
LABEL_FIXES = {
    "Sepcific Gravity": "Specific Gravity",
    "Apperance": "Appearance",
    "Stool Parasits": "Stool Parasites",
    "Urine Cretinine": "Urine Creatinine",
    "Electrocardiograpic": "Electrocardiographic",
    "H. polyri": "H. pylori",
    "尿夜總蛋白肌酸酐比值": "尿液總蛋白肌酸酐比值",
    "血夜銅": "血中銅",
}

# 中英文對照明顯錯誤、經使用者確認「照檢驗常規修正」的項目。整筆標籤精確比對，
# 不用關鍵字取代，避免 "Ge" 這類短字串誤傷其他品項名稱。
EXACT_LABEL_FIXES = {
    "Ge 鎘": "Cd 鎘",  # 鎘是 Cd（cadmium）；Ge 是鍺
    "E2, Estradiol 二氨基春情素": "E2, Estradiol 雌二醇",
    "Direct Bilirubin 間接膽紅素": "Direct Bilirubin 直接膽紅素",
    "TPU, Urine Total Protein 尿液微白蛋白": "TPU, Urine Total Protein 尿液總蛋白",
    "TPHA 梅毒螺旋體": "TPHA 梅毒螺旋體抗體",
    "VDRL 梅毒螺旋體": "VDRL 梅毒血清反應",
    "VDRL 梅毒": "VDRL 梅毒血清反應",  # 同分類內與上一筆為同一檢驗，修正後會去重
    "Testosterone 睪丸酯醇": "Testosterone 睪固酮",
    "Free-Testosterone 游離睪丸酯醇": "Free-Testosterone 游離睪固酮",
    # 原檔與「糞便培養」只差大小寫，經確認是志賀氏菌（痢疾桿菌）培養
    "Stool culture 桿菌性痢疾": "Shigella culture 桿菌性痢疾",
}

BRACKETS = "()（）【】「」"
GLUE_RE = re.compile(r"[A-Za-z][A-Za-z0-9.\-]*")

# 檔案裡的「血壓舒張壓/收縮壓」這種項目名稱可能有數百筆，這裡改寫只是為了讓
# 空白不會把中文名切斷；真正的檢驗名稱一律照原檔呈現。
TIGHTEN_PARENS = re.compile(r"\(\s*([^)]*?)\s*\)")


def clean_label(label: str) -> str:
    label = EXACT_LABEL_FIXES.get(re.sub(r"\s+", " ", label).strip(), label)
    for wrong, right in LABEL_FIXES.items():
        if wrong in label:
            label = label.replace(wrong, right)
    # 只有中文括號才把空白收掉，英文括號（SHBG (sex hormone binding globulin)）要保持原樣
    label = TIGHTEN_PARENS.sub(
        lambda m: "(" + m.group(1).replace(" ", "") + ")"
        if CJK_RE.search(m.group(1))
        else m.group(0),
        label,
    )
    return re.sub(r"\s*-\s*", "-", label).strip()


def split_names(raw_label: str) -> tuple[str, str]:
    """把「HBsAg B型肝炎病毒表面抗原」拆成英文名與中文名。

    逐個空白分隔的詞判斷。黏在中文裡、拿不掉也讀得懂的英文片段（B 型、維生素 B12、
    E66 項）算中文名的一部分；有連字號或括號隔開的（皰疹病毒抗體-IgG）才拆去英文欄。
    拆不動的就整串留在中文欄，寧可原樣呈現也不要把檢驗名稱拆錯。
    """
    label = clean_label(raw_label)
    en: list[str] = []
    zh: list[str] = []

    for token in label.split():
        if not CJK_RE.search(token):
            if re.search(r"[A-Za-z0-9]", token):
                en.append(token)
            continue

        if not re.search(r"[A-Za-z]", token):
            zh.append(token)
            continue

        runs = list(GLUE_RE.finditer(token)) if False else list(
            re.finditer(rf"[A-Za-z][A-Za-z0-9.\-]*|[{CJK}]+|[^\sA-Za-z0-9{CJK}]+", token)
        )
        for position, match in enumerate(runs):
            run = match.group()

            if CJK_RE.search(run[0]):
                zh.append(run)
                continue

            if not re.search(r"[A-Za-z]", run):
                # 標點：前後都是中文才留著，否則只是分隔用的符號
                previous = runs[position - 1].group() if position > 0 else ""
                following = runs[position + 1].group() if position + 1 < len(runs) else ""
                both_cjk = bool(CJK_RE.search(previous[:1] or "")) and bool(
                    CJK_RE.search(following[:1] or "")
                )
                # 括號只要跟著中文詞就留著（(K他命)、(委外)），連字號那種純分隔符丟掉
                bracket = run in BRACKETS and bool(CJK_RE.search(token))
                if both_cjk or bracket:
                    zh.append(run)
                continue

            previous_char = token[match.start() - 1] if match.start() > 0 else ""
            next_char = token[match.end()] if match.end() < len(token) else ""
            glued = bool(CJK_RE.match(previous_char or "")) or bool(
                CJK_RE.match(next_char or "")
            )
            # 縮寫（DNA、IgG）與中文相鄰時仍算英文；短標記與帶數字的代號（B、E66、
            # 維生素 B12）才是中文名的一部分。
            if glued and (len(run) <= 2 or re.search(r"\d", run)):
                zh.append(run)
            else:
                en.append(run)

    def dedupe(parts: list[str], joiner: str) -> str:
        seen: set[str] = set()
        keep = []
        for part in parts:
            key = part.lower()
            if key in seen:
                continue
            seen.add(key)
            keep.append(part)
        return joiner.join(keep).strip()

    return dedupe(en, " "), dedupe(zh, "")


# ------------------------------------------------------------------ 輸出 TS

def write_typescript(sections: list[dict]) -> int:
    lines = [
        "/* 由 scripts/build-test-catalog.py 從「檢驗項目大全」產生，請勿手改。 */",
        "",
        "export type CatalogItem = {",
        "  /** 錨點用的穩定識別碼 */",
        "  id: string;",
        "  /** 英文名或縮寫，沒有對應英文時為空字串 */",
        "  en: string;",
        "  /** 中文名；無法安全拆分時，這裡放完整原文 */",
        "  zh: string;",
        "  /** 原文標籤，搜尋與顯示的保底值 */",
        "  label: string;",
        "};",
        "",
        "export type CatalogSection = {",
        "  id: string;",
        "  title: string;",
        "  /** 搜尋用的別名（面板代號等） */",
        "  terms: string[];",
        "  items: CatalogItem[];",
        "};",
        "",
        "export const testCatalog: CatalogSection[] = [",
    ]

    total = 0
    for position, section in enumerate(sections, start=1):
        title, terms = tidy_category(section["name"])
        section_id = f"cat-{position:02d}"
        lines.append("  {")
        lines.append(f"    id: {json.dumps(section_id, ensure_ascii=False)},")
        lines.append(f"    title: {json.dumps(title, ensure_ascii=False)},")
        lines.append(f"    terms: {json.dumps(terms, ensure_ascii=False)},")
        lines.append("    items: [")
        for item_position, raw_label in enumerate(section["items"], start=1):
            label = clean_label(raw_label)
            en, zh = split_names(label)
            lines.append("      {")
            lines.append(
                f"        id: {json.dumps(f'{section_id}-{item_position}', ensure_ascii=False)},"
            )
            lines.append(f"        en: {json.dumps(en, ensure_ascii=False)},")
            lines.append(f"        zh: {json.dumps(zh, ensure_ascii=False)},")
            lines.append(f"        label: {json.dumps(label, ensure_ascii=False)},")
            lines.append("      },")
            total += 1
        lines.append("    ],")
        lines.append("  },")

    lines += [
        "];",
        "",
        "export const testCatalogCount = testCatalog.reduce(",
        "  (sum, section) => sum + section.items.length,",
        "  0,",
        ");",
        "",
    ]

    target = ROOT / "src" / "data" / "testCatalog.ts"
    target.parent.mkdir(parents=True, exist_ok=True)
    target.write_text("\n".join(lines), encoding="utf-8")
    return total


# ----------------------------------------------------------------- HTML 頁面

HEAD = """<!doctype html>
<html lang="zh-Hant-TW">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>檢驗項目大全｜__COUNT__ 項中英文對照清單・樹林長安醫事檢驗所</title>
    <meta
      name="description"
      content="長安醫事檢驗所檢驗項目大全，共 __COUNT__ 項、__SECTIONS__ 個分類，中英文名稱對照。涵蓋血液、尿液糞便、肝腎功能、血糖、電解質、荷爾蒙、腫瘤標誌、病毒與細菌、性病、過敏原、親子鑑定、超音波與理學檢查。未列價項目歡迎來電或 LINE 洽詢。"
    />
    <meta
      name="keywords"
      content="檢驗項目查詢,檢驗項目大全,檢驗項目中英文對照,樹林檢驗所,新北檢驗所,板橋檢驗所,抽血檢驗項目,自費檢驗項目,血液檢驗,尿液檢查,肝功能檢查,腎功能檢查,血糖檢查,荷爾蒙檢查,腫瘤標誌,病毒檢查,細菌檢查,性病檢查,過敏原檢測,親子鑑定,超音波檢查,理學檢查,CBC,HBsAg,PSA,CEA,HbA1c"
    />
    <meta name="robots" content="index, follow, max-image-preview:large" />
    <link rel="canonical" href="https://everan-medilab.com/test-catalog.html" />
    <meta name="theme-color" content="#0e5a4a" />
    <meta name="format-detection" content="telephone=yes" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="長安醫事檢驗所" />
    <meta property="og:url" content="https://everan-medilab.com/test-catalog.html" />
    <meta property="og:title" content="檢驗項目大全｜__COUNT__ 項中英文對照清單" />
    <meta
      property="og:description"
      content="共 __COUNT__ 項、__SECTIONS__ 個分類的檢驗項目清單，中英文名稱對照，可直接搜尋。位於新北樹林，鄰近板橋與新莊。"
    />
    <meta property="og:image" content="https://everan-medilab.com/media/og-cover.jpg" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="長安醫事檢驗所店內實景：受理櫃檯與採檢座位" />
    <meta property="og:locale" content="zh_TW" />
    <meta name="twitter:card" content="summary_large_image" />
    <link rel="icon" type="image/png" href="./media/favicon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@400;500;700&family=Noto+Serif+TC:wght@500;600;700&display=swap"
      rel="stylesheet"
    />

    <script type="application/ld+json">
      {
        "@context": "https://schema.org",
        "@graph": [
          {
            "@type": ["MedicalBusiness", "DiagnosticLab"],
            "@id": "https://everan-medilab.com/#clinic",
            "name": "長安醫事檢驗所",
            "alternateName": "Chang An Medical Laboratory",
            "url": "https://everan-medilab.com/",
            "image": "https://everan-medilab.com/media/og-cover.jpg",
            "description": "位於新北市樹林區的醫事檢驗所，提供抽血檢驗、X 光攝影、成人健檢、癌症篩檢、性病匿名篩檢與過敏原檢測等自費檢驗服務。",
            "telephone": "+886226828209",
            "email": "zhangann176@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "中山路一段176號",
              "addressLocality": "樹林區育英里",
              "addressRegion": "新北市",
              "postalCode": "238",
              "addressCountry": "TW"
            },
            "areaServed": [
              { "@type": "AdministrativeArea", "name": "新北市樹林區" },
              { "@type": "AdministrativeArea", "name": "新北市板橋區" },
              { "@type": "AdministrativeArea", "name": "新北市新莊區" },
              { "@type": "AdministrativeArea", "name": "新北市三重區" },
              { "@type": "AdministrativeArea", "name": "新北市三峽區" },
              { "@type": "AdministrativeArea", "name": "桃園市" }
            ],
            "openingHoursSpecification": [
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "20:00"
              },
              {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": "Saturday",
                "opens": "09:00",
                "closes": "14:00"
              }
            ]
          },
          {
            "@type": "WebPage",
            "@id": "https://everan-medilab.com/test-catalog.html#page",
            "url": "https://everan-medilab.com/test-catalog.html",
            "name": "檢驗項目大全｜__COUNT__ 項中英文對照清單",
            "inLanguage": "zh-Hant-TW",
            "isPartOf": { "@id": "https://everan-medilab.com/#clinic" }
          },
          {
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "長安醫事檢驗所",
                "item": "https://everan-medilab.com/"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "檢驗項目大全",
                "item": "https://everan-medilab.com/test-catalog.html"
              }
            ]
          },
          {
            "@type": "ItemList",
            "name": "檢驗項目分類",
            "numberOfItems": __SECTIONS__,
            "itemListElement": [__ITEMLIST__]
          }
        ]
      }
    </script>
"""

CATALOG_CSS = """
      /* ============================================ 檢驗項目大全專用樣式 */
      /* 搜尋列跟著捲動；top 要避開 sticky 的 .topbar（約 61.7px，取 4rem 概略值） */
      .cat-tools {
        position: sticky;
        top: 4rem;
        z-index: 30;
        padding: 0.85rem 1rem 0.9rem;
        background: rgba(255, 255, 255, 0.95);
        backdrop-filter: blur(10px);
        border: 1px solid var(--line);
        border-radius: var(--radius);
        box-shadow: var(--shadow-sm);
      }

      .cat-tools__row {
        display: flex;
        flex-wrap: wrap;
        gap: 0.75rem;
        align-items: center;
      }

      .cat-search {
        position: relative;
        flex: 1 1 17rem;
        min-width: 0;
      }

      .cat-search__icon {
        position: absolute;
        left: 0.95rem;
        top: 50%;
        width: 1.05rem;
        height: 1.05rem;
        transform: translateY(-50%);
        color: var(--ink-3);
        pointer-events: none;
      }

      .cat-search__input {
        width: 100%;
        padding: 0.7rem 2.6rem 0.7rem 2.6rem;
        font: inherit;
        font-size: 0.98rem;
        color: var(--ink);
        background: var(--surface);
        border: 1px solid var(--line-strong);
        border-radius: 999px;
      }

      .cat-search__input:focus {
        outline: 2px solid var(--primary);
        outline-offset: 1px;
      }

      .cat-search__clear {
        position: absolute;
        right: 0.5rem;
        top: 50%;
        display: none;
        width: 1.7rem;
        height: 1.7rem;
        transform: translateY(-50%);
        font-size: 1rem;
        line-height: 1;
        color: var(--ink-2);
        background: transparent;
        border: 0;
        border-radius: 999px;
        cursor: pointer;
      }

      .cat-search__clear:hover {
        background: var(--surface-tint);
      }

      .cat-search__clear[data-visible="true"] {
        display: block;
      }

      .cat-tools__count {
        flex: 0 0 auto;
        font-size: 0.9rem;
        color: var(--ink-2);
        white-space: nowrap;
      }

      .cat-chips {
        display: flex;
        gap: 0.45rem;
        margin-top: 0.75rem;
        padding-bottom: 0.15rem;
        overflow-x: auto;
        scrollbar-width: thin;
      }

      .cat-chip {
        flex: 0 0 auto;
        padding: 0.32rem 0.8rem;
        font-size: 0.86rem;
        color: var(--ink-2);
        text-decoration: none;
        white-space: nowrap;
        background: var(--surface);
        border: 1px solid var(--line);
        border-radius: 999px;
      }

      .cat-chip:hover {
        color: var(--primary-deep);
        border-color: var(--primary);
      }

      .cat-chip[aria-current="true"] {
        color: #fff;
        background: var(--primary);
        border-color: var(--primary);
      }

      /* 分類錨點要落在 sticky 的 topbar（62px）＋搜尋列（133px）底下 */
      .cat-section {
        padding: clamp(1.75rem, 3vw, 2.5rem) 0;
        scroll-margin-top: 13.5rem;
      }

      .cat-section + .cat-section {
        border-top: 1px solid var(--line);
      }

      .cat-section__title {
        display: flex;
        flex-wrap: wrap;
        gap: 0.6rem;
        align-items: baseline;
        font-family: var(--font-display);
        font-size: clamp(1.15rem, 1rem + 0.7vw, 1.45rem);
        color: var(--ink);
      }

      .cat-section__count {
        font-family: var(--font-body);
        font-size: 0.82rem;
        font-weight: 500;
        color: var(--ink-3);
      }

      .cat-list {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(min(100%, 20rem), 1fr));
        gap: 0.5rem 1.5rem;
        margin-top: 1.1rem;
        padding: 0;
        list-style: none;
      }

      .cat-item {
        display: flex;
        flex-wrap: wrap;
        gap: 0.15rem 0.7rem;
        align-items: baseline;
        padding: 0.5rem 0.7rem;
        border-radius: var(--radius-sm);
        border-bottom: 1px solid var(--line);
      }

      .cat-item[hidden] {
        display: none;
      }

      .cat-item:hover {
        background: var(--surface-tint);
      }

      .cat-item__en {
        flex: 0 0 auto;
        font-size: 0.88rem;
        color: var(--primary-deep);
        letter-spacing: 0.01em;
      }

      .cat-item__zh {
        flex: 1 1 8rem;
        min-width: 0;
        font-size: 0.95rem;
        color: var(--ink);
      }

      .cat-item--zhOnly .cat-item__zh,
      .cat-item--raw .cat-item__zh {
        flex-basis: 100%;
      }

      .cat-empty {
        display: none;
        padding: 2.5rem 0 3rem;
        text-align: center;
      }

      .cat-empty[data-visible="true"] {
        display: block;
      }

      .cat-empty__title {
        font-family: var(--font-display);
        font-size: 1.15rem;
        color: var(--ink);
      }

      .cat-empty__body {
        margin: 0.6rem auto 1.25rem;
        max-width: 30rem;
        color: var(--ink-2);
        font-size: 0.95rem;
      }

      .cat-note {
        margin-top: 1.5rem;
        padding: 0.9rem 1.1rem;
        font-size: 0.9rem;
        color: var(--ink-2);
        background: var(--surface-tint);
        border-radius: var(--radius-sm);
      }

      @media (max-width: 700px) {
        .cat-tools {
          position: static;
        }

        .cat-section {
          scroll-margin-top: 5rem;
        }

        .cat-tools__count {
          order: 3;
          flex-basis: 100%;
        }
      }
"""


def render_body(sections: list[dict], count: int) -> str:
    chips = [
        '          <a class="cat-chip" href="#catalog-top" data-chip="all">全部</a>'
    ]
    blocks = []

    for index, section in enumerate(sections, start=1):
        title, _ = tidy_category(section["name"])
        section_id = f"cat-{index:02d}"
        chips.append(
            f'          <a class="cat-chip" href="#{html.escape(section_id)}" '
            f'data-chip="{html.escape(section_id)}">{html.escape(title)}</a>'
        )

        items = []
        for item_position, raw_label in enumerate(section["items"], start=1):
            label = clean_label(raw_label)
            en, zh = split_names(label)
            if not en:
                modifier = " cat-item--zhOnly"
                en_html = ""
            elif not zh:
                modifier = " cat-item--raw"
                en_html = ""
                zh = label
            else:
                modifier = ""
                en_html = (
                    f'<span class="cat-item__en">{html.escape(en)}</span>'
                )
            haystack = " ".join(dict.fromkeys([en, zh, label])).lower()
            items.append(
                f'            <li class="cat-item{modifier}" id="{section_id}-{item_position}" '
                f'data-key="{html.escape(haystack, quote=True)}">\n'
                f"              {en_html}"
                f'<span class="cat-item__zh">{html.escape(zh or en)}</span>\n'
                f"            </li>"
            )

        blocks.append(
            f'        <section class="cat-section" id="{html.escape(section_id)}" '
            f'aria-labelledby="{html.escape(section_id)}-title">\n'
            f'          <h2 class="cat-section__title" id="{html.escape(section_id)}-title">\n'
            f"            {html.escape(title)}\n"
            f'            <span class="cat-section__count">{len(section["items"])} 項</span>\n'
            f"          </h2>\n"
            f'          <ul class="cat-list">\n' + "\n".join(items) + "\n          </ul>\n"
            f"        </section>"
        )

    return (
        '    <main id="main">\n'
        '      <section class="hero" aria-labelledby="hero-title">\n'
        '        <div class="shell hero__inner">\n'
        '          <nav class="crumbs" aria-label="麵包屑">\n'
        '            <a href="./">長安醫事檢驗所</a>\n'
        '            <span class="crumbs__sep" aria-hidden="true">/</span>\n'
        '            <span aria-current="page">檢驗項目大全</span>\n'
        "          </nav>\n\n"
        '          <p class="hero__eyebrow">新北樹林・鄰近板橋與新莊</p>\n\n'
        '          <h1 class="hero__title" id="hero-title">\n'
        "            檢驗項目大全｜<br />共 " + str(count) + " 項，<em>中英文名稱對照</em>\n"
        "          </h1>\n\n"
        '          <p class="hero__lead">\n'
        "            本所可受理的檢驗項目整理成一份清單，依照檢體與檢驗類別分成 "
        + str(len(sections))
        + " 類，中英文名稱並列，方便您核對醫師開立的檢驗單或用藥紀錄。\n"
        "          </p>\n\n"
        '          <ul class="hero__tags">\n'
        "            <li>" + str(count) + " 項清單</li>\n"
        "            <li>中英文對照</li>\n"
        "            <li>未列價項目可洽詢</li>\n"
        "          </ul>\n\n"
        '          <div class="hero__actions">\n'
        '            <a class="btn btn--line" href="https://lin.ee/xlzQzXQ" rel="noopener">\n'
        "              LINE 詢問項目與費用\n"
        "            </a>\n"
        '            <a class="btn btn--ghost" href="tel:+886226828209">電話洽詢</a>\n'
        "          </div>\n\n"
        '          <p class="hero__note">\n'
        "            清單僅列出可受理的項目名稱，<strong>價格請見首頁價目表</strong>；未列價的項目歡迎來電\n"
        '            <a href="tel:+886226828209">(02) 2682-8209</a> 或加 LINE 洽詢。\n'
        "          </p>\n"
        "        </div>\n"
        "      </section>\n\n"
        '      <section class="section section--tint" id="catalog-top">\n'
        '        <div class="shell">\n'
        '          <header class="section__head">\n'
        '            <p class="section__eyebrow">TEST CATALOG</p>\n'
        '            <h2 class="section__title">搜尋或瀏覽全部項目</h2>\n'
        '            <p class="section__lead">\n'
        "              輸入中文或英文都可以查，例如「醣化血色素」「HbA1c」「HBsAg」「CA-125」。下方分類可直接跳轉。\n"
        "            </p>\n"
        "          </header>\n\n"
        '          <div class="cat-tools">\n'
        '            <div class="cat-tools__row">\n'
        '              <div class="cat-search">\n'
        '                <svg\n'
        '                  class="cat-search__icon"\n'
        '                  viewBox="0 0 24 24"\n'
        '                  fill="none"\n'
        '                  stroke="currentColor"\n'
        '                  stroke-width="1.8"\n'
        '                  stroke-linecap="round"\n'
        '                  aria-hidden="true"\n'
        '                  focusable="false"\n'
        "                >\n"
        '                  <circle cx="11" cy="11" r="6.5" />\n'
        '                  <path d="M16 16l4.5 4.5" />\n'
        "                </svg>\n"
        '                <label class="sr-only" for="cat-q">搜尋檢驗項目</label>\n'
        '                <input\n'
        '                  class="cat-search__input"\n'
        '                  id="cat-q"\n'
        '                  type="search"\n'
        '                  inputmode="search"\n'
        '                  autocomplete="off"\n'
        '                  placeholder="搜尋中文或英文項目名稱…"\n'
        "                />\n"
        '                <button class="cat-search__clear" type="button" id="cat-clear" aria-label="清除搜尋">\n'
        "                  ×\n"
        "                </button>\n"
        "              </div>\n"
        '              <p class="cat-tools__count" id="cat-count" aria-live="polite">\n'
        "                共 " + str(count) + " 項\n"
        "              </p>\n"
        "            </div>\n"
        '            <nav class="cat-chips" aria-label="項目分類">\n'
        + "\n".join(chips)
        + "\n            </nav>\n"
        "          </div>\n\n"
        '          <div class="cat-empty" id="cat-empty">\n'
        '            <p class="cat-empty__title">找不到符合的項目</p>\n'
        '            <p class="cat-empty__body">\n'
        "              可能是名稱寫法不同，或該項目本所沒有受理。歡迎直接來電或加 LINE，我們幫您確認。\n"
        "            </p>\n"
        '            <a class="btn btn--line" href="https://lin.ee/xlzQzXQ" rel="noopener">LINE 詢問</a>\n'
        "          </div>\n\n"
        + "\n".join(blocks)
        + "\n\n"
        '          <p class="cat-note">\n'
        "            本清單為本所可受理項目的整理，實際可檢驗內容、檢體種類、工作天數與費用會依檢驗單與試劑狀況調整；\n"
        "            未列出的項目也歡迎洽詢，我們會協助確認是否受理或轉介。\n"
        "          </p>\n"
        "        </div>\n"
        "      </section>\n"
        "    </main>\n"
    )


def build_html(sections: list[dict], count: int) -> str:
    source = SOURCE_HTML.read_text(encoding="utf-8")
    open_tag = source.index("<style>") + len("<style>")
    close_tag = source.index("</style>", open_tag)
    base_css = source[open_tag:close_tag].rstrip("\n")

    itemlist = ",\n              ".join(
        "{"
        f'"@type": "ListItem", "position": {position}, '
        f'"name": {json.dumps(tidy_category(section["name"])[0], ensure_ascii=False)}, '
        f'"url": "https://everan-medilab.com/test-catalog.html#cat-{position:02d}"'
        "}"
        for position, section in enumerate(sections, start=1)
    )

    head = (
        HEAD.replace("__COUNT__", str(count))
        .replace("__SECTIONS__", str(len(sections)))
        .replace("__ITEMLIST__", itemlist)
    )
    tail = f"""    <header class="topbar">
      <div class="shell topbar__inner">
        <a class="brand" href="./">
          <span class="brand__mark" aria-hidden="true">安</span>
          <span class="brand__text">
            <span class="brand__name">長安醫事檢驗所</span>
            <span class="brand__sub">新北樹林・檢驗項目大全</span>
          </span>
        </a>
        <div class="topbar__actions">
          <a class="btn btn--ghost" href="tel:+886226828209">電話預約</a>
          <a class="btn btn--line" href="https://lin.ee/xlzQzXQ" rel="noopener">LINE 諮詢</a>
        </div>
      </div>
    </header>

{render_body(sections, count)}
    <footer class="site-footer">
      <div class="shell">
        <div class="site-footer__top">
          <span class="site-footer__name">長安醫事檢驗所</span>
          <span>新北市樹林區育英里中山路一段 176 號</span>
          <span><a href="tel:+886226828209">(02) 2682-8209</a></span>
          <span><a href="https://lin.ee/xlzQzXQ" rel="noopener">LINE 諮詢</a></span>
        </div>
        <div class="site-footer__meta">
          <p>醫事機構代碼 9431070039　|　週一至週五 09:00–20:00・週六 09:00–14:00・週日公休</p>
          <p>
            檢驗項目大全・
            <a href="./std-screening.html">性病與傳染病匿名篩檢專頁</a>・
            <a href="./cancer-screening.html">自費癌症篩檢與腫瘤標記專頁</a>・
            <a href="./allergy-testing.html">急慢性過敏原檢測專頁</a>・
            <a href="./">回到長安醫事檢驗所首頁</a>
          </p>
        </div>
      </div>
    </footer>

    <div class="call-bar">
      <a class="btn btn--primary" href="tel:+886226828209">電話預約</a>
      <a class="btn btn--line" href="https://lin.ee/xlzQzXQ" rel="noopener">LINE 諮詢</a>
    </div>

    <script>
      (function () {{
        var input = document.getElementById("cat-q");
        var clear = document.getElementById("cat-clear");
        var countBox = document.getElementById("cat-count");
        var empty = document.getElementById("cat-empty");
        var items = Array.prototype.slice.call(document.querySelectorAll(".cat-item"));
        var sections = Array.prototype.slice.call(document.querySelectorAll(".cat-section"));
        var chips = Array.prototype.slice.call(document.querySelectorAll(".cat-chip"));
        var total = items.length;

        function normalize(text) {{
          return String(text || "").replace(/\\s+/g, "").toLowerCase();
        }}

        function apply(rawQuery) {{
          var query = normalize(rawQuery);
          var shown = 0;

          sections.forEach(function (section) {{
            var hits = 0;
            Array.prototype.forEach.call(section.querySelectorAll(".cat-item"), function (item) {{
              var match = !query || normalize(item.getAttribute("data-key")).indexOf(query) !== -1;
              item.hidden = !match;
              if (match) hits += 1;
            }});
            section.hidden = hits === 0;
            shown += hits;
          }});

          countBox.textContent = query ? "符合 " + shown + " / " + total + " 項" : "共 " + total + " 項";
          empty.setAttribute("data-visible", String(shown === 0));
          clear.setAttribute("data-visible", String(query.length > 0));
        }}

        input.addEventListener("input", function () {{
          apply(input.value);
        }});

        clear.addEventListener("click", function () {{
          input.value = "";
          apply("");
          input.focus();
        }});

        chips.forEach(function (chip) {{
          chip.addEventListener("click", function () {{
            chips.forEach(function (other) {{
              other.removeAttribute("aria-current");
            }});
            chip.setAttribute("aria-current", "true");
          }});
        }});

        // 首頁搜尋結果會用 ?q= 直接帶著查詢字串進來
        var params = new URLSearchParams(window.location.search);
        var preset = params.get("q");
        if (preset) {{
          input.value = preset;
          apply(preset);
        }}

        if (window.location.hash) {{
          var target = document.getElementById(window.location.hash.slice(1));
          if (target) {{
            // 進來時若帶了查詢字串，先把清單還原，否則捲到的分類可能是空的
            if (preset) {{
              input.value = "";
              apply("");
            }}
            target.scrollIntoView();
          }}
        }}
      }})();
    </script>
  </body>
</html>
"""

    return (
        head
        + "    <style>"
        + base_css
        + CATALOG_CSS
        + "    </style>\n  </head>\n\n  <body>\n"
        + '    <a class="skip-link" href="#main">跳到主要內容</a>\n\n'
        + tail
    )


def main() -> int:
    if len(sys.argv) < 2:
        print("usage: build-test-catalog.py <xlsx>", file=sys.stderr)
        return 2

    source = Path(sys.argv[1]).expanduser()
    if not source.is_file():
        print(f"找不到檔案：{source}", file=sys.stderr)
        return 2

    sections = merge_sections(parse_workbook(source))
    total = write_typescript(sections)
    (ROOT / "public" / "test-catalog.html").write_text(
        build_html(sections, total), encoding="utf-8"
    )

    print(f"分類 {len(sections)} 個、項目 {total} 項")
    for section in sections:
        title, codes = tidy_category(section["name"])
        suffix = f"  [{', '.join(codes)}]" if codes else ""
        print(f"  {len(section['items']):>3}  {title}{suffix}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
