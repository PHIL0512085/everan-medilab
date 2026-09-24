import storeInterior from "./assets/store-interior.webp?url";
import spaceCounter from "./assets/space-counter.webp?url";
import spaceDesk from "./assets/space-desk.webp?url";
import analyzer from "./assets/analyzer.webp?url";
import sampleTubes from "./assets/sample-tubes.webp?url";
import corridor from "./assets/corridor.webp?url";
import logoMark from "./assets/logo-mark.png?url";
import logoFull from "./assets/logo-full.png?url";
import medtechPortrait from "./assets/medtech-portrait.webp?url";
import medtechCard from "./assets/medtech-card.webp?url";
import addressCard from "./assets/address-card.webp?url";
import certLecturer from "./assets/cert-lecturer.webp?url";
import certMedtech from "./assets/cert-medtech.webp?url";
import certMasterZh from "./assets/cert-master-zh.webp?url";
import certMasterEn from "./assets/cert-master-en.webp?url";
import { testCatalog, testCatalogCount } from "./data/testCatalog";

export const media = {
  storeInterior,
  spaceCounter,
  spaceDesk,
  analyzer,
  sampleTubes,
  corridor,
  logoMark,
  logoFull,
  medtechPortrait,
  medtechCard,
  addressCard,
  certLecturer,
  certMedtech,
  certMasterZh,
  certMasterEn,
};

export const clinic = {
  name: "長安醫事檢驗所",
  nameEn: "Chang An Medical Laboratory",
  tagline: "附設 X 光檢查室",
  shortName: "長安",
  category: "醫事檢驗所",
  district: "新北市樹林區",
  address: "238 新北市樹林區育英里中山路一段 176 號",
  addressQuery: "新北市樹林區中山路一段176號",
  phone: "(02) 2682-8209",
  phoneHref: "tel:+886226828209",
  phoneAlt: "(02) 2683-7800",
  phoneAltHref: "tel:+886226837800",
  email: "zhangann176@gmail.com",
  emailHref: "mailto:zhangann176@gmail.com",
  line: "https://lin.ee/xlzQzXQ",
  rating: "4.4",
  reviewCount: 49,
  mapHref: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    "新北市樹林區中山路一段176號",
  )}`,
} as const;

/* ---------------------------------------------------------------- 關鍵字搜尋 */

/* 性病匿名篩檢專頁是獨立的靜態檔（public/std-screening.html）。
   站內跨頁連結必須跟著 Vite base 走：預覽站台掛在 /instance/<id>/ 底下，
   寫死 /std-screening.html 在預覽時會 404。 */
export const stdScreeningHref = `${import.meta.env.BASE_URL}std-screening.html`;

/* 癌症篩檢專頁同樣是獨立靜態檔（public/cancer-screening.html），理由同上。 */
export const cancerScreeningHref = `${import.meta.env.BASE_URL}cancer-screening.html`;

/* 過敏原檢測專頁，同樣是 public/ 下的獨立靜態檔。 */
export const allergyTestingHref = `${import.meta.env.BASE_URL}allergy-testing.html`;

/* 檢驗項目大全也是 public/ 下的獨立靜態檔。內容由 Excel 產生，
   資料來源是 src/data/testCatalog.ts，不要手動改那一份。 */
export const testCatalogHref = `${import.meta.env.BASE_URL}test-catalog.html`;

/* 專題專頁是「頁面裡的頁面」：首頁只用一個區塊導流，搜尋索引也吃同一份資料，
   避免新增一個專頁時漏掉其中一邊。 */
export type TopicPage = {
  id: string;
  title: string;
  summary: string;
  href: string;
  tag: string;
  terms: string[];
};

export const topicPages: TopicPage[] = [
  {
    id: "std",
    title: "性病與傳染病匿名篩檢",
    summary:
      "愛滋 RT-PCR、梅毒、菜花、淋病與披衣菌檢驗，含空窗期時間點與三種方案比較。免健保卡、可匿名採檢，報告僅本人可領取。",
    href: stdScreeningHref,
    tag: "免健保卡・匿名採檢",
    terms: [
      "性病",
      "性病篩檢",
      "匿名篩檢",
      "匿篩",
      "愛滋",
      "HIV",
      "梅毒",
      "菜花",
      "淋病",
      "披衣菌",
      "空窗期",
    ],
  },
  {
    id: "cancer",
    title: "自費癌症篩檢與血液腫瘤標記",
    summary:
      "CEA、AFP、PSA、CA-125 等腫瘤標記，項數由少到多共三種組合。免空腹、一次抽血完成多項指標，並說明癌症指數偏高的意義。",
    href: cancerScreeningHref,
    tag: "免空腹・1–2 工作天",
    terms: [
      "癌症",
      "癌症篩檢",
      "防癌",
      "腫瘤",
      "腫瘤標記",
      "癌症指數",
      "抽血驗癌症",
      "CEA",
      "AFP",
      "PSA",
      "CA-125",
      "CA19-9",
      "CA-153",
    ],
  },
  {
    id: "allergy",
    title: "急慢性過敏原檢測",
    summary:
      "急性 IgE 與慢性 IgG4 一次抽血雙向分析，項數從 66 項到 587 項，含凌越生醫半定量與韓國、奧地利定量試劑，附完整價格表與飲食避敏建議。",
    href: allergyTestingHref,
    tag: "免空腹・約 3–5 個工作天",
    terms: [
      "過敏",
      "過敏原",
      "過敏原檢測",
      "過敏檢查",
      "急性過敏",
      "慢性過敏",
      "食物過敏",
      "食物不耐",
      "IgE",
      "IgG4",
      "過敏性鼻炎",
      "蕁麻疹",
      "異位性皮膚炎",
      "黑眼圈",
      "塵蟎",
      "224項",
      "587項",
      "凌越生醫",
      "定量過敏原",
    ],
  },
];

export const searchNote = {
  eyebrow: "關鍵字搜尋",
  title: "想找哪一項檢驗？",
  lead:
    "輸入檢驗項目、症狀或地區關鍵字，會直接列出頁面中對應的內容並帶您前往該區塊。",
  area:
    "本所位於新北市樹林區中山路一段，樹林在地。除了樹林，板橋、迴龍、新莊、三重、三峽與桃園的受檢者也都來過；無論搭火車、公車或自行開車，都在合理車程內。",
  popularAreasLabel: "地區",
  popularAreas: ["樹林", "板橋", "迴龍", "新莊", "三重", "三峽", "桃園"],
  popularTestsLabel: "熱門檢驗",
  hint:
    "也可以直接輸入檢驗項目，中英文都通，例如「醣化血色素」「HbA1c」「AMH」「AFP」「HBsAg」「維生素 D」「幽門螺旋桿菌」，或「抽血」「X 光」「親子鑑定」「報告」。",
  empty: "找不到符合的項目，歡迎直接來電或加 LINE 詢問：",
  countLabel: "筆結果",
  catalogLinkLabel: `到檢驗項目大全看全部 ${testCatalogCount} 項`,
} as const;

/* ------------------------------------------------------- 關於我們與醫檢師 */

export const about = {
  eyebrow: "關於我們",
  title: "一間承載歷史的醫事檢驗所",
  lead:
    "結合臨床實務經驗與專業學識，讓檢驗服務與時俱進，以「專業、精準、合理」的理念守護每一次檢驗的準確與品質。",
  pillars: ["專業", "精準", "合理"],
  paragraph:
    "團隊成員具備教育部認證講師資格與十年以上臨床經驗。店面沒有亮麗的裝潢，我們選擇把心力放在檢體流程、儀器品管與報告把關上；也主動投入社區健康推廣與疾病防治，透過定期衛教講座支持社區族群的健康篩檢。",
  credentialsTitle: "臨床與學術資歷",
  tagsTitle: "運動與跨界身分",
  person: {
    name: "江柏毅",
    nameEn: "Phil",
    title: "醫事檢驗師．運動員",
    lead:
      "醫事檢驗師，也是羽球教練、水上救生員與潛水員。在醫院臨床檢驗十年之後，把檢驗專業與運動習慣一起帶進日常生活。",
    photoAlt: "長安醫事檢驗所醫事檢驗師江柏毅的個人照，身著深藍色醫療工作服",
    cardAlt:
      "江柏毅醫事檢驗師的名片：國立交通大學分子醫學與生物工程研究所碩士、教育部部定講師、檢驗醫學課程授課與諮詢、醫事檢驗師",
    credentials: [
      "10 年醫院臨床檢驗經驗（新竹馬偕紀念醫院、羅東博愛醫院）",
      "國立陽明交通大學（原國立交通大學）分子醫學與生物工程研究所 碩士",
      "教育部部定講師",
    ],
    tags: [
      "專業羽球教練",
      "水上救生員",
      "PADI AOW 進階開放水域潛水員",
      "AIDA 2 自由潛水員",
      "越野跑者",
      "戶外運動愛好者",
    ],
    quote: {
      lead: "「醫學檢驗能看見數據，而運動能點亮生活。」",
      body:
        "我始終相信預防勝於治療。透過自律與生活平衡，搭配規律運動遠離疾病，帶領大家一起上山下海、擁抱自然，享受充滿活力的精彩人生！",
      by: "江柏毅　醫事檢驗師",
    },
  },
} as const;

/* ---------------------------------------------------------------- 檢驗空間 */

export const spaceNote = {
  eyebrow: "檢驗空間",
  title: "沒有亮麗的裝潢，只有務實的檢驗空間",
  body:
    "我們的店面不是新的，也沒有重新裝潢過的門面。對一間醫事檢驗所來說，真正影響結果的是檢體處理流程、儀器品管與每一次操作的嚴謹程度，所以我們選擇把心力放在檢驗品質與專業人員上。",
  photos: [
    {
      src: spaceCounter,
      alt: "長安醫事檢驗所店內實景：受理櫃檯、兩張採檢座椅與電腦設備，牆面為「專業、準確、迅速」與「長安檢查用心　身體健康安心」字樣",
      caption: "本所實際空間：受理櫃檯、採檢座位與後方作業區。",
    },
    {
      src: spaceDesk,
      alt: "長安醫事檢驗所店內實景：櫃檯上方牆面的「專業、準確、迅速」與「長安檢查用心　身體健康安心」字樣，以及櫃檯上的電腦設備與檢驗耗材",
      caption: "本所實際空間：櫃檯上方牆面與作業桌面。",
    },
  ],
  list: [
    "候檢與採檢空間分區進行，抽血由醫檢師現場操作",
    "附設 X 光檢查室，攝影與採檢不必互相等待",
    "可匿名採檢，報告僅本人可查詢與領取",
    "LGBTQ+ 友善空間，尊重每一位受檢者",
  ],
  panelTitle: "空間可以樸實，檢驗結果不能馬虎",
  panelBody:
    "「專業、精準、合理」是我們對自己的要求。門面不新，但檢體流程、儀器品管與報告把關，我們照標準來。",
} as const;

export type DayHours = {
  day: number;
  label: string;
  open: number;
  close: number;
};

const m = (h: number, min = 0) => h * 60 + min;

export const HOURS: DayHours[] = [
  { day: 1, label: "星期一", open: m(9), close: m(20) },
  { day: 2, label: "星期二", open: m(9), close: m(20) },
  { day: 3, label: "星期三", open: m(9), close: m(20) },
  { day: 4, label: "星期四", open: m(9), close: m(20) },
  { day: 5, label: "星期五", open: m(9), close: m(20) },
  { day: 6, label: "星期六", open: m(9), close: m(14) },
  { day: 0, label: "星期日", open: 0, close: 0 },
];

const hhmm = (mins: number) =>
  `${String(Math.floor(mins / 60)).padStart(2, "0")}:${String(mins % 60).padStart(2, "0")}`;

export const hoursLabel = (h: DayHours) =>
  h.open === 0 && h.close === 0 ? "固定公休" : `${hhmm(h.open)} – ${hhmm(h.close)}`;

export const hoursSummary = "週一至週五 09:00 – 20:00・週六 09:00 – 14:00・週日固定公休";

export type OpenState = { open: boolean; label: string; detail: string };

export function openStateAt(now: Date): OpenState {
  const today = HOURS.find((h) => h.day === now.getDay());
  if (!today || (today.open === 0 && today.close === 0)) {
    return { open: false, label: "今日固定公休", detail: "週日固定公休，其餘時段請見公告" };
  }
  const mins = now.getHours() * 60 + now.getMinutes();
  if (mins < today.open) {
    return {
      open: false,
      label: "尚未開始營業",
      detail: `今日 ${hhmm(today.open)} 開始服務`,
    };
  }
  if (mins >= today.close) {
    return { open: false, label: "今日已休息", detail: "歡迎改用 LINE 留言，我們將於營業時間回覆" };
  }
  return { open: true, label: "現在營業中", detail: `今日服務至 ${hhmm(today.close)}` };
}

export type ServiceGroup = {
  id: string;
  title: string;
  summary: string;
  includes: string[];
  /* 對應價目表的分頁 id，讓服務項目卡片可以直接跳到該分類的價目。
     沒有專屬價目分頁的類別（例如親子鑑定）留空。 */
  pricePanelId?: string;
  /* 已經做成獨立專頁的類別直接在卡片上連頁面——性病、癌症、過敏三個主題的
     專頁內容與網址都已經併進對應的服務卡片，不再另外排一組專題卡片。
     之後每一類服務都做專頁時，只要把 href 補上即可，卡片不用重寫。 */
  href?: string;
  linkLabel?: string;
  /* 專頁連結旁的補充說明，例如「免空腹・1–2 工作天」。 */
  hrefNote?: string;
};

export const serviceGroups: ServiceGroup[] = [
  {
    id: "catalog",
    title: "檢驗項目大全",
    summary: `本所可受理的檢驗項目完整清單，共 ${testCatalogCount} 項、${testCatalog.length} 個分類，中英文名稱對照並可直接搜尋。沒列到的項目也歡迎洽詢，我們協助確認是否受理。`,
    includes: ["中英文對照", `${testCatalogCount} 項清單`, "線上搜尋"],
    href: testCatalogHref,
    linkLabel: `瀏覽全部 ${testCatalogCount} 項`,
  },
  {
    id: "routine",
    title: "常規健檢與影像",
    summary:
      "日常最常需要的抽血與 X 光攝影，就近在社區完成，不必到大醫院排隊等排程；A／B／C 健檢組合可依年齡與風險挑選。",
    includes: ["X 光攝影", "抽血檢驗", "成人健檢"],
    pricePanelId: "price-checkup",
  },
  {
    id: "cancer",
    title: "癌症篩檢與腫瘤標記",
    summary:
      "以血液腫瘤標記做風險篩檢，項數由少到多共三種組合，免空腹、一次抽血完成多項指標，並可加做醫師執行的超音波探測。三種方案怎麼選、癌症指數偏高代表什麼，都寫在專頁裡。",
    includes: [
      "CEA 大腸癌指數",
      "AFP 肝癌指數",
      "PSA 攝護腺癌檢查",
      "CA-125 卵巢癌指數",
      "CA19-9 胰臟癌標記",
      "血液腫瘤標記",
    ],
    href: cancerScreeningHref,
    linkLabel: "癌症篩檢完整說明",
    hrefNote: "免空腹・1–2 工作天",
    pricePanelId: "price-cancer",
  },
  {
    id: "sti",
    title: "性病與私密篩檢",
    summary:
      "現場採檢、可匿名，僅本人可查詢與領取報告，不與保險公司或第三方機構交換任何檢驗資訊。空窗期怎麼算、三種方案差在哪裡，都寫在專頁裡。",
    includes: ["匿名篩檢", "確認檢測"],
    href: stdScreeningHref,
    linkLabel: "性病匿名篩檢完整說明",
    hrefNote: "免健保卡・匿名採檢",
    pricePanelId: "price-sti",
  },
  {
    id: "maternal",
    title: "備孕與孕期檢測",
    summary:
      "備孕前的健康與傳染性疾病篩檢，以及孕期相關檢驗，可依個人狀況、家族病史與產檢醫師建議安排。",
    includes: ["婚前檢驗", "孕中檢驗"],
    pricePanelId: "price-other",
  },
  {
    id: "functional",
    title: "功能醫學與過敏",
    summary:
      "從基因、營養、代謝與荷爾蒙等面向評估個人體質與風險，並提供多種急性與慢性過敏原組合。過敏原的品項與價格級距整理在專頁裡。",
    includes: ["過敏原檢測", "胰島素阻抗"],
    href: allergyTestingHref,
    linkLabel: "過敏原檢測完整說明",
    hrefNote: "免空腹・約 3–5 個工作天",
    pricePanelId: "price-allergy",
  },
  {
    id: "sports",
    title: "運動科學檢測",
    summary:
      "給健身族與運動員的專項檢測：VO2max、心肺適能、有氧能力與耐力訓練相關指標。",
    includes: ["運動壓力", "荷爾蒙", "健身荷爾蒙"],
    pricePanelId: "price-sport",
  },
  {
    id: "kinship",
    title: "親子與基因鑑定",
    summary:
      "以 DNA 進行親子血緣關係鑑定。採檢方式、所需證件與工作天數請先來電或加 LINE 洽詢。",
    includes: ["親子鑑定", "親緣確認"],
  },
  {
    id: "advanced",
    title: "新興高階檢驗",
    summary:
      "染色體與基因分析等高階項目，實際可檢驗內容與費用依方案而定，歡迎先與我們確認。",
    includes: ["染色體", "基因分析"],
    pricePanelId: "price-gene",
  },
];

/* 搜尋區塊的「熱門檢驗」快速鍵：先放最常被點的幾項，其餘由服務項目的標籤自動補齊。
   之後在 serviceGroups 增減項目，這裡會跟著更新，不必兩邊維護。
   catalog 是整份清單的入口，它的標籤（「260 項清單」這種）不適合當快速鍵。 */
export const popularTests: string[] = [
  "性病篩檢",
  "過敏原檢測",
  "三高成人健檢",
  "檢驗項目大全",
  ...serviceGroups
    .filter((group) => group.id !== "catalog")
    .flatMap((group) => group.includes),
].filter((word, index, all) => all.indexOf(word) === index);

export type Reason = { title: string; body: string };

export const reasons: Reason[] = [
  {
    title: "不用在大醫院等半天",
    body:
      "社區型檢驗所流程單純，從報到到完成採檢通常只需短短幾分鐘，對於只需要抽血或照 X 光的受檢者特別省時。",
  },
  {
    title: "醫檢師現場操作與說明",
    body:
      "抽血與檢體處理由醫檢師負責，報告完成後可現場詢問數值與注意事項，不必自己上網找答案。",
  },
  {
    title: "時段彈性，下班也來得及",
    body:
      "平日服務到晚上 8:00，週六 09:00–14:00 也有開診，上班族不必特地請假。",
  },
  {
    title: "尊重每一位受檢者",
    body:
      "本所為 LGBTQ+ 友善空間，並提供可匿名的採檢服務，重視隱私與個人感受，讓每個人都能安心完成檢查。",
  },
];

/* ---------------------------------------------------------------- 專業證書 */

export type Cert = {
  src: string;
  title: string;
  note: string;
  alt: string;
  w: number;
  h: number;
};

export const certs = {
  eyebrow: "資格證明",
  title: "醫檢師的證書與學歷",
  lead:
    "以下為江柏毅醫檢師的專業證書與學位證書。考量個人資料保護，證書上的身分證字號與出生日期皆已遮蔽處理，其餘內容為證書原始樣貌。",
  items: [
    {
      src: certMedtech,
      title: "醫事檢驗師證書",
      note: "考試院醫事檢驗師考試及格，檢字第 021371 號",
      alt: "考試院核發的醫事檢驗師證書，江柏毅經醫事檢驗師考試及格，證書上出生日期與證號欄位已遮蔽",
      w: 849,
      h: 1200,
    },
    {
      src: certMasterZh,
      title: "碩士學位證書（中文）",
      note: "國立陽明交通大學 分子醫學與生物工程研究所 理學碩士",
      alt: "國立陽明交通大學碩士學位證書，江柏毅畢業於生物科技學院分子醫學與生物工程研究所碩士班，證書上出生年月日欄位已遮蔽",
      w: 849,
      h: 1200,
    },
    {
      src: certLecturer,
      title: "教育部講師證書",
      note: "講字第 152737 號，年資自 111 年 9 月 1 日起計",
      alt: "教育部講字第 152737 號講師證書，江柏毅經審定合於講師資格，證書上出生日期與身分證字號欄位已遮蔽",
      w: 1697,
      h: 1200,
    },
    {
      src: certMasterEn,
      title: "碩士學位證書（英文）",
      note: "National Yang Ming Chiao Tung University, Master of Science",
      alt: "國立陽明交通大學英文版碩士學位證書，授予江柏毅理學碩士學位，證書上出生日期與證書編號欄位已遮蔽",
      w: 1697,
      h: 1200,
    },
  ] as Cert[],
} as const;

export type Step = { no: string; title: string; body: string };

export const steps: Step[] = [
  {
    no: "01",
    title: "預約",
    body: "以電話或 LINE 預約，先告知想檢驗的項目或持檢驗單前來，我們會提醒您是否需要空腹等準備事項。",
  },
  {
    no: "02",
    title: "報到與採檢",
    body: "現場核對檢驗項目後進行抽血；需要 X 光檢查者，由現場人員安排攝影。可選擇不留個人資料的匿名採檢。",
  },
  {
    no: "03",
    title: "檢驗分析",
    body: "檢體由本所與合作檢驗實驗室依項目進行分析與品管作業。",
  },
  {
    no: "04",
    title: "領取報告",
    body: "報告完成後通知您領取，可提供電子報告；僅本人可查詢與領取，並可現場詢問數值意義，後續診斷請交由您的醫師判讀。",
  },
];

export const reportNote = {
  title: "當天抽血，最快當天晚上拿到電子報告",
  body:
    "當天 09:30 前完成抽血，最快當天晚上即可取得電子報告。如遇國定假日或特殊假日，報告時間會稍微延後。",
} as const;

export type Principle = { title: string; body: string };

export const privacyPrinciples: Principle[] = [
  {
    title: "可匿名進行採檢服務",
    body: "現場採檢、即抽即走，可無須登錄個資，輕鬆完成檢驗。",
  },
  {
    title: "檢驗結果絕對保密",
    body: "非當事人允許，僅本人可查詢、領取與保存報告。",
  },
  {
    title: "不留保險紀錄",
    body: "不與保險公司或第三方機構交換、比對或共享任何檢驗資訊。",
  },
  {
    title: "不上傳健保資料庫",
    body: "完全自費檢驗，不連結健保資料，不留任何公務紀錄。",
  },
  {
    title: "不外流、轉載、共享",
    body: "所有檢驗資料僅限本所醫事人員於醫療用途內部使用，嚴格管控。",
  },
];

export type PriceItem = {
  name: string;
  meta?: string;
  includes?: string[];
  price: string;
  compareAt?: string;
};

export type PricePanel = {
  id: string;
  tab: string;
  title: string;
  lead: string;
  items: PriceItem[];
  foot?: string;
  /* 指向站內其他頁面的延伸連結，不是每個分類都有。 */
  more?: { href: string; label: string };
};

export const pricePanels: PricePanel[] = [
  {
    id: "price-checkup",
    tab: "健康檢查",
    title: "健康檢查組合",
    lead:
      "依年齡與風險挑選：A 方案適合初次健檢，B、C 方案逐步加上沉默器官與腫瘤指標，也可另外加選單項。",
    items: [
      {
        name: "A. 基礎健康檢查",
        meta: "52 項基礎預防體檢｜建議：一般上班族、初次健檢者、換季保養族群",
        includes: [
          "尿液與血液常規檢查",
          "空腹血糖、腎臟功能、痛風檢測",
          "血脂肪分析與心血管、中風風險因子",
          "肝臟／膽囊及脂肪肝與蛋白營養評估",
          "甲狀腺功能篩檢",
        ],
        price: "NT$1,300",
      },
      {
        name: "B. 進階沉默器官健檢",
        meta: "建議：三高族群、壓力大、代謝異常、應酬族群",
        includes: [
          "含 A 方案所有項目",
          "胰臟檢測（Amylase）",
          "心臟功能指標（CK、LDH）",
          "肝癌風險指標（AFP）",
          "B 型肝炎（HBsAg、Anti-HBs）",
        ],
        price: "NT$2,200",
      },
      {
        name: "C. 全方位風險檢查",
        meta: "建議：家族病史族群、慢性病患者、40 歲以上族群",
        includes: [
          "含 A、B 方案所有項目",
          "風濕性關節炎篩檢（RF）",
          "慢性胃病與腸胃功能檢測",
          "肝臟、大腸直腸癌症標記（AFP、CEA）",
          "急、慢性發炎指標（CRP、ESR）",
        ],
        price: "NT$3,600",
      },
      {
        name: "加選｜胰島素阻抗與血糖管理",
        meta: "建議：多吃多喝易疲倦、四肢瘦但腰腹肥胖、難以停止攝取糖類",
        includes: ["胰島素（Insulin）", "胰島素阻抗值（HOMA-IR）", "糖化血色素（HbA1C）"],
        price: "NT$600",
      },
      {
        name: "加選｜骨質密度檢驗",
        meta: "建議：經常四肢疼痛、身體容易腫脹、容易發生骨折",
        includes: ["骨鈣素（Osteocalcin）"],
        price: "NT$500",
      },
      {
        name: "加選｜長壽與阿茲海默基因分型",
        meta: "建議：高血脂體質、想了解長壽體質與阿茲海默症風險",
        includes: ["載脂蛋白 E（APOE）基因檢測"],
        price: "NT$1,500",
      },
    ],
  },
  {
    id: "price-labor",
    tab: "勞工體檢",
    title: "勞工與從業人員體檢",
    lead:
      "體檢組合依「勞工局」定訂，各公司嚴謹程度不同，如有不同需求請告知醫檢人員。部分體檢建議空腹 8 小時後受檢，否則將影響空腹血糖及三酸甘油脂等數值。",
    items: [
      {
        name: "一般勞工體檢",
        includes: ["一般檢查", "X 光", "肝腎血脂", "空腹血糖", "血液與尿液"],
        price: "NT$1,100",
      },
      {
        name: "餐飲供膳人員",
        includes: [
          "一般檢查（身高、體重及手部皮膚）",
          "X 光",
          "A 肝抗體 IgM",
          "糞便傷寒",
        ],
        price: "NT$1,000",
      },
      {
        name: "幼教保姆人員",
        includes: [
          "一般檢查（身高、體重及手部皮膚）",
          "X 光",
          "A 肝抗體 IgM 與 IgG（Total）",
          "糞便傷寒",
        ],
        price: "NT$1,200",
      },
      {
        name: "勞工餐飲人員",
        includes: [
          "一般檢查",
          "X 光",
          "肝腎血脂",
          "空腹血糖",
          "血液與尿液",
          "A 肝抗體 IgM",
          "糞便傷寒",
        ],
        price: "NT$1,500",
      },
      {
        name: "照顧服務人員",
        includes: [
          "一般檢查",
          "X 光",
          "肝腎血脂",
          "空腹血糖",
          "血液與尿液",
          "A 肝抗體 IgM",
          "糞便傷寒",
          "阿米巴",
          "桿菌性痢疾",
        ],
        price: "NT$2,000",
      },
    ],
    foot: "現場提供一般物理檢查紀錄（身高、體重、腰圍、血壓、聽力、辨色力、視力、手部皮膚）。",
  },
  {
    id: "price-cancer",
    tab: "癌症篩檢",
    title: "癌症腫瘤篩檢",
    lead:
      "以血液腫瘤標記進行風險篩檢，可依預算選擇不同項數的組合，並可加做醫師執行的超音波探測。",
    items: [
      {
        name: "常見高癌腫瘤篩檢",
        meta: "★ 十大癌症排名",
        includes: [
          "Cyfra 21-1 肺非小細胞癌",
          "AFP 肝癌",
          "CEA 直腸、肺癌",
          "CA-199 胰臟、大腸癌",
          "CA-153 乳癌",
          "CA-125 卵巢、子宮肌瘤",
          "NSE 小細胞肺癌",
          "PSA 攝護腺特異抗原（攝護腺癌）",
        ],
        price: "NT$3,000",
      },
      {
        name: "多種癌腫瘤篩檢",
        meta: "★ 十大癌症排名",
        includes: [
          "Cyfra 21-1 肺非小細胞癌",
          "AFP 肝癌",
          "CEA 直腸、肺癌",
          "CA72-4 胃腸癌",
          "CA-199 胰臟、大腸癌",
          "Thyroglobulin 甲狀腺癌",
          "EB VCA-IgA 鼻咽癌",
          "CA-153 乳癌",
          "CA-125 卵巢、子宮肌瘤",
          "SCC 鱗狀細胞癌、子宮頸癌",
          "NSE 小細胞肺癌",
          "PSA 攝護腺特異抗原（攝護腺癌）",
          "b-hCG 人類絨毛膜促性腺素（睪丸癌／子宮癌）",
        ],
        price: "NT$5,000",
      },
      {
        name: "全身上下癌腫瘤篩檢",
        meta: "★ 十大癌症排名",
        includes: [
          "AFP 肝癌",
          "CA-125 卵巢、子宮肌瘤",
          "CA-153 乳癌",
          "CA-199 胰臟、大腸癌",
          "CEA 直腸、肺癌",
          "PSA 攝護腺特異抗原（攝護腺癌）",
          "Free PSA（用於評估攝護腺疾病）",
          "NSE 小細胞肺癌",
          "Cyfra 21-1 肺非小細胞肺癌、食道癌",
          "CA72-4 胃腸腫瘤",
          "B2-MG 骨癌、淋巴癌",
          "Thyroglobulin 甲狀腺癌",
          "SCC 鱗狀細胞癌、子宮頸癌",
          "EB VCA-IgA 鼻咽癌",
          "TPA 鱗狀細胞癌、膀胱癌",
          "b-hCG 人類絨毛膜促性腺素（睪丸癌／子宮癌）",
        ],
        price: "NT$7,000",
      },
      {
        name: "超音波探測（醫師執行）",
        meta: "腹部與各部位超音波",
        includes: [
          "肝臟：肝硬化、鈣化、囊腫及腫瘤",
          "膽囊：膽結石、息肉、膽囊瘤",
          "胰臟：胰臟炎、腫大及腫瘤",
          "腎臟：結石、鈣化、囊腫、水腎及腫瘤",
          "攝護腺、甲狀腺、乳房、子宮、卵巢、頸動脈",
        ],
        price: "NT$1,000／項",
      },
    ],
    foot: "腫瘤標記為輔助篩檢工具，數值異常不代表確診，結果需由醫師搭配影像與臨床評估判讀。",
    more: {
      href: cancerScreeningHref,
      label: "癌症篩檢完整說明：三種方案比較、腫瘤標記是什麼、數值偏高怎麼辦",
    },
  },
  {
    id: "price-sti",
    tab: "性病篩檢",
    title: "常規與性病篩檢",
    lead:
      "現場採檢、可匿名，僅本人可查詢與領取報告，不與保險公司或第三方機構交換任何檢驗資訊。",
    items: [
      {
        name: "組合 1｜抗體檢驗",
        meta: "檢體：血液",
        includes: [
          "HIV combo Ab 愛滋病抗體",
          "RPR／TPHA 梅毒螺旋體",
          "HSV-1 皰疹",
          "HSV-2 生殖器皰疹",
          "C. trachomatis 砂眼披衣菌",
        ],
        price: "NT$2,600",
      },
      {
        name: "單項 1｜HPV DNA 分型",
        meta: "檢體：尿液",
        includes: ["HPV DNA 分型", "人類乳頭瘤病毒 DNA（菜花）"],
        price: "NT$1,200",
      },
      {
        name: "單項 2｜淋病雙球菌 DNA",
        meta: "檢體：尿液",
        includes: ["N. gono DNA 分型", "淋病雙球菌 DNA"],
        price: "NT$1,000",
      },
      {
        name: "單項 3｜砂眼披衣菌 DNA",
        meta: "檢體：尿液",
        includes: ["C. trachomatis DNA 分型"],
        price: "NT$1,000",
      },
      {
        name: "單項 4｜HIV PCR 病毒量",
        meta: "檢體：血液・空窗期可直接偵測",
        includes: ["HIV PCR viral load", "愛滋病毒定量"],
        price: "NT$5,500",
      },
      {
        name: "單選｜HIV combo Ab 愛滋病抗體",
        meta: "檢體：血液",
        price: "NT$800",
      },
      {
        name: "單選｜RPR／TPHA 梅毒螺旋體",
        meta: "檢體：血液",
        price: "NT$200／400",
      },
      {
        name: "單選｜C. Trachomatis IgG 披衣菌",
        meta: "檢體：血液",
        price: "NT$500",
      },
      {
        name: "單選｜HSV-1、HSV-2 IgG 皰疹",
        meta: "檢體：血液",
        price: "NT$800／800",
      },
    ],
    foot: "匿名採檢不需登錄個人資料；如需報告，請於現場確認領取方式。",
    more: {
      href: stdScreeningHref,
      label: "性病匿名篩檢完整說明：空窗期、方案比較與常見問題",
    },
  },
  {
    id: "price-allergy",
    tab: "過敏原",
    title: "過敏原組合檢測",
    lead:
      "急性與慢性過敏原檢測，依檢測項目數與定量方式分為多種方案，下列為優惠價格。",
    items: [
      {
        name: "E66｜66 項急性過敏原檢測",
        meta: "凌越生醫・半定量",
        price: "NT$3,200",
        compareAt: "市場訂價 NT$3,600",
      },
      {
        name: "GE110｜110 項急性與慢性過敏原檢測",
        meta: "凌越生醫・半定量",
        price: "NT$4,800",
        compareAt: "市場訂價 NT$4,800",
      },
      {
        name: "GE224｜224 項急性與慢性過敏原檢測",
        meta: "凌越生醫・半定量",
        price: "NT$10,000",
        compareAt: "市場訂價 NT$12,000",
      },
      {
        name: "Q207｜207 項急性與慢性過敏原檢測",
        meta: "韓國・定量",
        price: "NT$11,000",
        compareAt: "市場訂價 NT$12,000",
      },
      {
        name: "A300｜300 項急性過敏原檢測",
        meta: "奧地利・定量",
        price: "NT$16,000",
        compareAt: "市場訂價 NT$18,000",
      },
      {
        name: "F287｜287 項慢性過敏原檢測",
        meta: "奧地利・定量",
        price: "NT$16,000",
        compareAt: "市場訂價 NT$18,000",
      },
      {
        name: "AF587｜587 項急性與慢性過敏原檢測",
        meta: "奧地利・定量",
        price: "NT$32,000",
        compareAt: "市場訂價 NT$35,000",
      },
    ],
  },
  {
    id: "price-other",
    tab: "其他與 X 光",
    title: "其他常見自費檢驗與 X 光",
    lead: "單一系統的深入檢查，以及各部位 X 光攝影。",
    items: [
      {
        name: "完整肝功能與病毒篩檢",
        includes: ["營養評估、肝功能、膽道功能與病毒抗體檢"],
        price: "NT$1,800",
      },
      {
        name: "心血管疾病風險評估",
        includes: ["AC、LIP、LFT、RFT、CRP、HS-CRP、LDH、CK"],
        price: "NT$2,400",
      },
      {
        name: "慢性感染發炎篩檢",
        includes: ["CBC、ESR、CRP、HS-CRP、FERRITIN"],
        price: "NT$1,800",
      },
      {
        name: "甲狀腺篩檢追蹤",
        includes: ["T3、T4、TSH、CA、P"],
        price: "NT$1,000",
      },
      {
        name: "甲狀腺篩檢追蹤（進階）",
        includes: ["FT3、FT4、TSH、CA、P"],
        price: "NT$1,500",
      },
      {
        name: "性荷爾蒙分析",
        includes: ["Tes.、DHEA、Prolac.、Cort.、LH、FSH"],
        price: "NT$2,000",
      },
      {
        name: "性荷爾蒙分析（完整）",
        includes: ["F-tes、SHBG、Bio-tes、IGF1、Prolac.、Cort.、FSH、Tes.、E2、P4"],
        price: "NT$6,000",
      },
      {
        name: "X 光攝影（單一部位）",
        meta: "現場燒錄光碟約 3–5 分鐘，由專科醫師判讀約 1–2 天",
        includes: [
          "胸椎、胸部、肩部、頸椎、頭部",
          "小腿、膝蓋、大腿、骨盆、腰椎",
          "手腕、手肘、腳踝、腳趾",
        ],
        price: "NT$400／450",
      },
    ],
    foot: "上列為常見自費項目，其餘單項檢驗歡迎來電或 LINE 洽詢。價格如有調整，以現場公告為準。",
  },
  {
    id: "price-sport",
    tab: "運動專項",
    title: "運動專項檢測",
    lead:
      "給健身族與運動員的三種方案，對應 VO2max、心肺適能（CardioFitness）、有氧能力（AerobicCapacity）與耐力訓練（EnduranceTraining）需要的指標，可依訓練階段挑選。",
    items: [
      {
        name: "基礎檢驗",
        meta: "適用：一般健康檢查、運動人必備",
        includes: [
          "CBC 血液常規檢查（WBC、RBC、Hemoglobin、Hematocrit、MCV、MCH、MCHC、Platelet）",
          "Ferritin 鐵蛋白",
          "Glucose 空腹血糖",
          "Insulin 胰島素、HOMA-IR 胰島素阻抗",
          "HbA1c 醣化血色素",
          "Renal function 腎功能（BUN、Creatinine 肌酸酐、Uric Acid、CKD-eGFR 腎絲球過濾率）",
          "肝膽（增肌減脂效率）：GOT（AST）、GPT（ALT）、Total／Direct Bilirubin、Alk. Phosphatase、r-GT（GGT）",
          "蛋白質營養評估：Total Protein、Albumin、Globulin、Albumin／Globulin",
        ],
        price: "NT$2,000",
      },
      {
        name: "荷爾蒙變化｜身體耐受壓力",
        meta: "適用：長期訓練者階段性檢測、訓練效果不如預期",
        includes: [
          "HS-CRP 高靈敏度 C 反應蛋白",
          "LDH 乳酸脫氫酶、CPK 肌酸磷酸化酶",
          "Cortisol（AM）皮質素",
          "Testosterone 睪固酮",
          "T3 三碘甲狀腺素、T4 四碘甲狀腺素、TSH 甲狀腺刺激素",
          "25-OH Vitamin D 維生素 D",
        ],
        price: "NT$2,800",
      },
      {
        name: "非自然健身荷爾蒙",
        meta: "適用：非／自然運動員、懷疑荷爾蒙失調、性功能障礙、異常掉髮",
        includes: [
          "肌肉合成之荷爾蒙（增肌關鍵）",
          "Free Testosterone 游離睪固酮",
          "Testosterone 睪固酮",
          "SHBG 性荷爾蒙結合球蛋白",
          "Bioavailable Testosterone 生物可利用睪固酮",
        ],
        price: "NT$4,000",
      },
    ],
    foot: "運動檢測數值需搭配訓練量、作息與飲食一同判讀，結果請交由醫師或專業人員評估。",
  },
  {
    id: "price-gene",
    tab: "基因與功能醫學",
    title: "預知因®－全方位基因檢測",
    lead:
      "以基因資訊評估體質與風險，涵蓋 12 個分類。實際檢測項目與費用依方案內容而定，歡迎來電或加 LINE 洽詢。",
    items: [
      {
        name: "流感風險",
        includes: ["流感疫苗不良反應與抗體效力", "流感易感性", "流感嚴重度", "普通感冒嚴重度"],
        price: "請洽詢",
      },
      {
        name: "健康風險",
        includes: ["氣喘", "異位性皮膚炎", "肥胖等"],
        price: "請洽詢",
      },
      {
        name: "維生素需求",
        includes: ["維生素 A／B6／B12／D／E、葉酸等攝取需求"],
        price: "請洽詢",
      },
      {
        name: "膳食敏感",
        includes: ["乳糖不耐", "麩質不耐", "酒精敏感度等"],
        price: "請洽詢",
      },
      {
        name: "汙染物敏感",
        includes: ["塵蟎過敏", "空氣汙染物敏感"],
        price: "請洽詢",
      },
      {
        name: "用藥安全（成人、小兒）",
        includes: [
          "抗生素、降膽固醇、糖尿病、麻醉藥、消炎止痛藥",
          "癲癇、心血管藥、抗憂鬱藥、免疫用藥等常用藥物",
        ],
        price: "請洽詢",
      },
      {
        name: "睡眠品質",
        includes: ["睡眠成效", "睡眠質量"],
        price: "請洽詢",
      },
      {
        name: "運動健康",
        includes: ["肌力、耐力、燃脂潛力、攝氧效率、受傷風險等"],
        price: "請洽詢",
      },
      {
        name: "心血管風險",
        includes: ["靜脈血栓栓塞", "遺傳性腦中風", "動脈粥狀硬化", "家族性高膽固醇血症"],
        price: "請洽詢",
      },
      {
        name: "老化風險",
        includes: ["骨關節炎", "骨質疏鬆"],
        price: "請洽詢",
      },
      {
        name: "成人代謝風險",
        includes: ["非酒精性脂肪肝", "第二型糖尿病", "高尿酸血症"],
        price: "請洽詢",
      },
      {
        name: "眼睛健康風險",
        includes: ["老年性黃斑部病變", "高眼壓"],
        price: "請洽詢",
      },
    ],
    foot:
      "基因檢測結果代表的是體質傾向與風險高低，不是診斷；數值需由醫師搭配臨床資訊判讀。",
  },
];

export type Notice = { date: string; title: string; body: string; tone: "accent" | "plain" };

export const notices: Notice[] = [
  {
    date: "9/19（六）～ 9/20（日）",
    title: "日月潭萬人泳渡戒護公休",
    body:
      "一年一度的日月潭萬人泳渡登場，本所醫檢師將前往擔任大會水域安全戒護員，公休兩日。",
    tone: "accent",
  },
  {
    date: "9/25（五）～ 9/28（一）",
    title: "合作實驗室連假公休",
    body: "配合合作檢驗實驗室排程，本所同步公休 4 天，請提前安排抽血與領取報告的時間。",
    tone: "plain",
  },
];

export type Review = { quote: string; source: string };

export const reviews: Review[] = [
  {
    quote: "江醫生抽血技術一流，親切和藹可親，詳細解答任何問題，真心大推薦！",
    source: "Google 評論",
  },
  {
    quote: "人員親切，服務態度良好，不想在醫院等半天的話，這家檢驗所真的是第一選擇。",
    source: "Google 評論",
  },
  {
    quote: "有一段緣份找到院長來檢測身體各方面數值狀況，發現是真的很細心講解。",
    source: "Google 評論",
  },
];

export type FaqItem = { id: string; q: string; a: string };

export const faqs: FaqItem[] = [
  {
    id: "faq-book",
    q: "需要事先預約嗎？",
    a: "建議先以電話或 LINE 預約，可減少現場等候時間。現場也可以直接前來，但尖峰時段可能需要稍候。",
  },
  {
    id: "faq-fasting",
    q: "抽血前需要空腹嗎？",
    a: "部分血糖、血脂等項目需要空腹約 8 小時，有些項目則不需要。請在預約時告知想檢驗的項目，我們會提醒您需要留意的準備事項。",
  },
  {
    id: "faq-privacy",
    q: "檢驗結果會被別人知道嗎？",
    a: "不會。本所提供可匿名的採檢服務，報告僅本人可查詢、領取與保存；不與保險公司或第三方機構交換、比對或共享任何檢驗資訊，也不上傳健保資料庫。",
  },
  {
    id: "faq-hours",
    q: "營業時間是幾點到幾點？",
    a: "平日週一至週五 09:00–20:00，週六 09:00–14:00，週日固定公休。若遇特殊公休（如連假或合作實驗室休診），會公告於本頁最新公告與現場。",
  },
  {
    id: "faq-report",
    q: "報告要多久才能拿到？",
    a: "當天 09:30 前完成抽血，最快當天晚上即可取得電子報告；如遇國定假日或特殊假日，報告時間會稍微延後。X 光攝影現場燒錄光碟約 3–5 分鐘，醫師判讀約 1–2 天；其餘項目請於採檢時向現場人員確認可領取的時間。",
  },
  {
    id: "faq-order",
    q: "可以帶其他醫療院所的檢驗單來嗎？",
    a: "歡迎先來電或透過 LINE 詢問，把檢驗單上的項目告訴我們，我們會為您確認本所是否能協助執行。",
  },
  {
    id: "faq-price",
    q: "網站上的價格是最終價格嗎？",
    a: "本頁列出的是常見自費項目的參考價格，未列出的單項歡迎來電或 LINE 洽詢。價格如有調整，以本所現場公告為準。",
  },
];
