import {
  faqs,
  notices,
  pricePanels,
  serviceGroups,
  testCatalogHref,
  topicPages,
} from "./content";
import { testCatalog, testCatalogCount as catalogItemCount } from "./data/testCatalog";

export type SearchEntry = {
  id: string;
  title: string;
  detail: string;
  anchor: string;
  group: string;
  terms?: string[];
};

/* 頁面區塊本身沒有結構化資料，這裡手寫索引，讓「樹林」「隱私」「報告」這類
   不屬於單一檢驗項目的查詢也能命中正確的區塊。 */
const sectionEntries: SearchEntry[] = [
  {
    id: "section-topics",
    title: "專題專頁",
    detail:
      "性病匿名篩檢、癌症篩檢與急慢性過敏原檢測三個主題的完整專頁，已整合進服務項目對應的類別卡片，含流程、方案比較與常見問題。",
    anchor: "#services",
    group: "頁面區塊",
    terms: ["專題", "專頁", "專題專頁", "深入說明", "完整說明"],
  },
  {
    id: "section-about",
    title: "關於我們與醫檢師",
    detail:
      "本所理念「專業、精準、合理」，以及江柏毅醫檢師的臨床資歷、碩士學歷、教育部講師資格與運動身分。",
    anchor: "#about",
    group: "頁面區塊",
    terms: ["關於我們", "醫檢師", "江柏毅", "講師", "碩士", "理念"],
  },
  {
    id: "section-services",
    title: "服務項目",
    detail:
      "九類服務：檢驗項目大全、常規健檢與影像、癌症篩檢與腫瘤標記、性病與私密篩檢、備孕與孕期檢測、功能醫學與過敏、運動科學檢測、親子與基因鑑定、新興高階檢驗；其中性病、癌症與過敏三類可直接連到完整專頁，下方另有自費價目表。",
    anchor: "#services",
    group: "頁面區塊",
    terms: ["服務", "服務項目", "檢驗項目", "檢驗", "項目"],
  },
  {
    id: "section-prices",
    title: "自費檢驗價目表",
    detail:
      "健康檢查、勞工體檢、癌症篩檢、性病篩檢、過敏原、運動專項、基因與功能醫學等自費項目的參考價格。",
    anchor: "#prices",
    group: "頁面區塊",
    terms: ["價目表", "價格", "費用", "價錢", "自費", "收費"],
  },
  {
    id: "section-process",
    title: "檢驗流程",
    detail:
      "從預約、報到與採檢、檢驗分析到領取報告的四個步驟，以及電子報告的取得時間。",
    anchor: "#process",
    group: "頁面區塊",
    terms: ["流程", "預約", "採檢", "報到", "報告", "空腹", "電子報告"],
  },
  {
    id: "section-privacy",
    title: "檢驗隱私保密原則",
    detail:
      "可匿名採檢、檢驗結果絕對保密、不留保險紀錄、不上傳健保資料庫、不外流轉載共享。",
    anchor: "#privacy",
    group: "頁面區塊",
    terms: ["保密", "隱私", "匿名", "匿名篩檢", "個資", "保險", "健保"],
  },
  {
    id: "section-space",
    title: "檢驗空間",
    detail:
      "候檢與採檢空間分區、附設 X 光檢查室、可匿名採檢，以及 LGBTQ+ 友善空間。",
    anchor: "#space",
    group: "頁面區塊",
    terms: ["空間", "環境", "店面", "X 光", "X光", "友善"],
  },
  {
    id: "section-certs",
    title: "資格證明",
    detail: "醫事檢驗師證書、碩士學位證書與教育部講師證書。",
    anchor: "#certs",
    group: "頁面區塊",
    terms: ["資格", "證書", "證照", "證明", "學歷"],
  },
  {
    id: "section-notice",
    title: "最新公告",
    detail: "本所特殊公休與營業時間異動公告。",
    anchor: "#notice",
    group: "頁面區塊",
    terms: ["公告", "公休", "休診", "營業時間", "連假"],
  },
  {
    id: "section-faq",
    title: "常見問題",
    detail: "預約、空腹、隱私、營業時間、報告時間、檢驗單與價格等常見疑問。",
    anchor: "#faq",
    group: "頁面區塊",
    terms: ["常見問題", "問題", "QA", "疑問"],
  },
  {
    id: "section-visit",
    title: "交通與聯絡地址",
    detail:
      "新北市樹林區中山路一段 176 號（樹林星巴克對面），電話、LINE、email 與營業時間。",
    anchor: "#visit",
    group: "頁面區塊",
    terms: [
      "交通",
      "地址",
      "聯絡",
      "電話",
      "地圖",
      "怎麼去",
      "停車",
      "火車站",
      "樹林",
      "板橋",
      "迴龍",
      "新莊",
      "三重",
      "三峽",
      "桃園",
      "近",
      "附近",
    ],
  },
];

/* 訪客常用的說法未必等於網站上的標題（例如標題是「性病與私密篩檢」，
   但大家會搜「性病篩檢」），這裡補同義詞，讓搜尋結果符合直覺。 */
const serviceTerms: Record<string, string[]> = {
  routine: [
    "抽血",
    "抽血檢驗",
    "X 光",
    "X光",
    "成人健檢",
    "三高",
    "三高成人健檢",
    "勞工體檢",
    "健檢",
    "體檢",
    "影像",
    "健康檢查",
  ],
  sti: [
    "性病",
    "性病篩檢",
    "匿名",
    "匿名篩檢",
    "愛滋",
    "HIV",
    "梅毒",
    "皰疹",
    "淋病",
    "披衣菌",
    "菜花",
    "HPV",
    "確認檢測",
  ],
  catalog: [
    "檢驗項目",
    "檢驗項目大全",
    "項目查詢",
    "項目清單",
    "檢驗清單",
    "中英文",
    "英文名稱",
    "對照表",
    "檢驗單",
    "項目表",
  ],
  maternal: ["備孕", "孕前", "懷孕", "孕期", "產檢", "婚前檢驗", "孕中檢驗"],
  functional: [
    "過敏",
    "過敏原",
    "過敏原檢測",
    "急性過敏",
    "慢性過敏",
    "胰島素",
    "胰島素阻抗",
    "功能醫學",
    "基因",
  ],
  sports: [
    "運動",
    "運動檢測",
    "運動科學",
    "運動壓力",
    "VO2max",
    "心肺",
    "荷爾蒙",
    "健身",
    "健身荷爾蒙",
    "睪固酮",
  ],
  kinship: ["親子鑑定", "親緣", "親緣確認", "DNA", "血緣", "血緣鑑定"],
  advanced: ["染色體", "基因分析", "基因檢測", "高階檢驗", "新興"],
  allergy: [
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
    "凌越生醫",
    "定量過敏原",
  ],
  cancer: [
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
    "超音波",
  ],
};

const serviceEntries: SearchEntry[] = serviceGroups.map((group) => ({
  id: `service-${group.id}`,
  title: group.title,
  detail: group.summary,
  anchor: `#service-${group.id}`,
  group: "服務項目",
  terms: [...group.includes, ...(serviceTerms[group.id] ?? [])],
}));

/* 訪客想找的通常不是「類別」而是某一支檢驗。以下依本所檢驗總表挑出常用項目，
   只作為搜尋入口（不顯示價格），點擊後帶到該項目所屬的服務類別。 */
type TestTarget =
  | "routine"
  | "sti"
  | "maternal"
  | "functional"
  | "sports"
  | "kinship"
  | "advanced"
  | "cancer"
  | "services";

const testTargets: Record<TestTarget, { anchor: string; label: string }> = {
  routine: { anchor: "#service-routine", label: "常規健檢與影像" },
  sti: { anchor: "#service-sti", label: "性病與私密篩檢" },
  maternal: { anchor: "#service-maternal", label: "備孕與孕期檢測" },
  functional: { anchor: "#service-functional", label: "功能醫學與過敏" },
  sports: { anchor: "#service-sports", label: "運動科學檢測" },
  kinship: { anchor: "#service-kinship", label: "親子與基因鑑定" },
  advanced: { anchor: "#service-advanced", label: "新興高階檢驗" },
  cancer: { anchor: "#prices", label: "癌症篩檢" },
  services: { anchor: "#services", label: "服務項目" },
};

type TestItem = { name: string; to: TestTarget; alt?: string[] };

const testIndex: TestItem[] = [
  /* 常規健檢與影像 */
  { name: "尿液常規檢查", to: "routine", alt: ["Urine Routine", "驗尿", "尿液"] },
  { name: "糞便常規檢查", to: "routine", alt: ["Stool Routine", "糞便"] },
  { name: "糞便潛血檢查", to: "routine", alt: ["FOBT", "潛血", "大腸癌"] },
  { name: "糞便寄生蟲檢查", to: "routine", alt: ["寄生蟲", "蟯蟲"] },
  { name: "精液分析", to: "routine", alt: ["Semen Analysis", "精蟲", "精液"] },
  {
    name: "血液常規檢查",
    to: "routine",
    alt: ["CBC", "血球", "血紅素", "白血球", "血小板", "貧血"],
  },
  {
    name: "凝血功能檢查",
    to: "routine",
    alt: ["PT", "APTT", "INR", "D-dimer", "凝血"],
  },
  { name: "紅血球沉降速率", to: "routine", alt: ["ESR", "發炎"] },
  { name: "地中海貧血篩檢", to: "routine", alt: ["Thalassemia", "地中海型貧血"] },
  { name: "血色素電泳分析", to: "routine", alt: ["Hb-EP", "血色素"] },
  { name: "G6PD 蠶豆症篩檢", to: "routine", alt: ["G6PD", "蠶豆症"] },
  { name: "血型與 Rh 因子", to: "routine", alt: ["Blood Type", "血型", "Rh"] },
  {
    name: "血糖",
    to: "routine",
    alt: ["Glucose", "AC", "PC", "空腹血糖", "飯後血糖", "糖尿病"],
  },
  {
    name: "醣化血色素",
    to: "routine",
    alt: ["HbA1c", "糖化血色素", "A1c", "糖尿病", "血糖"],
  },
  { name: "醣化白蛋白", to: "routine", alt: ["Glycated Albumin", "GA", "血糖"] },
  { name: "胰島素", to: "routine", alt: ["Insulin", "血糖"] },
  {
    name: "腎功能檢查",
    to: "routine",
    alt: ["BUN", "Creatinine", "肌酸酐", "尿素氮", "eGFR", "腎絲球", "腎臟"],
  },
  { name: "尿酸", to: "routine", alt: ["Uric Acid", "痛風"] },
  {
    name: "電解質檢查",
    to: "routine",
    alt: ["鈉", "鉀", "氯", "鈣", "磷", "鎂", "Na", "K", "Ca", "電解質"],
  },
  {
    name: "肝功能檢查",
    to: "routine",
    alt: [
      "GOT",
      "GPT",
      "AST",
      "ALT",
      "肝指數",
      "肝臟",
      "總蛋白",
      "白蛋白",
      "膽紅素",
      "鹼性磷酸酶",
      "ALK-P",
      "r-GT",
      "GGT",
    ],
  },
  { name: "肝纖維化指數", to: "routine", alt: ["FIB-4", "Fibrosis", "肝"] },
  { name: "總膽固醇", to: "routine", alt: ["Cholesterol", "膽固醇", "血脂"] },
  {
    name: "三酸甘油脂",
    to: "routine",
    alt: ["Triglyceride", "TG", "三酸甘油酯", "血油", "血脂"],
  },
  { name: "高密度脂蛋白膽固醇", to: "routine", alt: ["HDL", "好膽固醇", "血脂"] },
  { name: "低密度脂蛋白膽固醇", to: "routine", alt: ["LDL", "壞膽固醇", "血脂"] },
  { name: "脂蛋白 A", to: "routine", alt: ["Lipoprotein a", "Lp(a)", "血脂"] },
  { name: "ApoA1 與 ApoB", to: "routine", alt: ["Apo-A1", "Apo-B", "脂蛋白"] },
  { name: "同半胱胺酸", to: "routine", alt: ["Homocysteine", "心血管"] },
  {
    name: "心臟酵素檢查",
    to: "routine",
    alt: ["Troponin", "CK-MB", "心肌", "心臟", "心肌梗塞"],
  },
  { name: "乳酸脫氫酶", to: "routine", alt: ["LDH"] },
  { name: "肌酸磷酸酶", to: "routine", alt: ["CPK", "CK", "肌肉"] },
  {
    name: "C 反應蛋白",
    to: "routine",
    alt: ["CRP", "HS-CRP", "發炎", "發炎指數"],
  },
  { name: "解脂酶", to: "routine", alt: ["Lipase", "胰臟"] },
  { name: "澱粉酶", to: "routine", alt: ["Amylase", "胰臟"] },
  {
    name: "血清鐵與鐵蛋白",
    to: "routine",
    alt: ["Serum Iron", "Ferritin", "鐵蛋白", "TIBC", "總鐵結合能力", "缺鐵"],
  },
  {
    name: "甲狀腺功能檢查",
    to: "routine",
    alt: ["TSH", "T3", "T4", "Free T4", "甲狀腺", "甲亢", "甲狀腺低下"],
  },
  {
    name: "甲狀腺抗體",
    to: "routine",
    alt: ["Anti-TPO", "ATA", "Anti-Tg", "甲狀腺"],
  },
  { name: "副甲狀腺素", to: "routine", alt: ["PTH", "副甲狀腺"] },
  { name: "X 光攝影", to: "routine", alt: ["X光", "X-ray", "胸部X光", "影像"] },
  { name: "心電圖", to: "routine", alt: ["EKG", "ECG", "心臟"] },
  {
    name: "骨質代謝檢查",
    to: "routine",
    alt: ["BAP", "骨鈣素", "Osteocalcin", "骨質疏鬆", "骨密度"],
  },
  { name: "幽門螺旋桿菌檢查", to: "routine", alt: ["H. pylori", "幽門桿菌", "胃"] },
  {
    name: "肺結核潛伏感染篩檢",
    to: "routine",
    alt: ["IGRA", "QuantiFERON", "結核", "TB"],
  },
  {
    name: "B 型肝炎檢查",
    to: "routine",
    alt: ["HBsAg", "Anti-HBs", "HBV", "B肝", "肝炎", "e抗原", "核心抗體"],
  },
  { name: "C 型肝炎檢查", to: "routine", alt: ["Anti-HCV", "HCV", "C肝", "肝炎"] },
  { name: "A 型肝炎檢查", to: "routine", alt: ["Anti-HAV", "HAV", "A肝"] },
  {
    name: "傷寒與痢疾檢查",
    to: "routine",
    alt: ["Widal", "傷寒", "痢疾", "糞便培養"],
  },
  { name: "水質培養", to: "routine", alt: ["Water culture", "水質"] },
  {
    name: "毒藥物快篩",
    to: "services",
    alt: [
      "K他命",
      "Ketamine",
      "安非他命",
      "Amphetamine",
      "嗎啡",
      "Morphine",
      "海洛英",
      "Heroin",
      "搖頭丸",
      "大麻",
      "毒品",
      "藥檢",
    ],
  },

  /* 性病與私密篩檢 */
  {
    name: "愛滋病篩檢",
    to: "sti",
    alt: ["HIV", "愛滋", "AIDS", "HIV combo", "HIV Ag/Ab"],
  },
  { name: "愛滋病毒量檢測", to: "sti", alt: ["HIV PCR", "病毒量", "HIV viral load"] },
  {
    name: "梅毒篩檢",
    to: "sti",
    alt: ["RPR", "VDRL", "TPHA", "梅毒", "梅毒螺旋體"],
  },
  {
    name: "披衣菌檢查",
    to: "sti",
    alt: ["Chlamydia", "C. Trachomatis", "砂眼披衣菌", "尿道炎"],
  },
  {
    name: "淋病檢查",
    to: "sti",
    alt: ["Gonorrhea", "淋病雙球菌", "N. gonorrhoeae", "尿道炎"],
  },
  { name: "皰疹檢查", to: "sti", alt: ["HSV", "HSV-1", "HSV-2", "皰疹", "生殖器皰疹"] },
  {
    name: "人類乳突病毒檢查",
    to: "sti",
    alt: ["HPV", "菜花", "尖形濕疣", "HPV DNA"],
  },
  {
    name: "性病匿名篩檢",
    to: "sti",
    alt: ["匿名", "匿篩", "性病", "性傳染病", "STD", "性病全套"],
  },

  /* 備孕與孕期檢測 */
  {
    name: "AMH 抗穆勒氏管荷爾蒙",
    to: "maternal",
    alt: ["AMH", "卵巢功能", "卵子庫存", "不孕"],
  },
  {
    name: "絨毛膜促性腺激素",
    to: "maternal",
    alt: ["β-hCG", "hCG", "懷孕", "驗孕"],
  },
  { name: "黃體素", to: "maternal", alt: ["Progesterone", "P4", "助孕酮", "黃體酮"] },
  { name: "動情素", to: "maternal", alt: ["Estradiol", "E2", "雌激素"] },
  { name: "泌乳激素", to: "maternal", alt: ["Prolactin", "泌乳素"] },
  { name: "濾泡刺激素", to: "maternal", alt: ["FSH", "卵巢", "排卵"] },
  { name: "黃體刺激素", to: "maternal", alt: ["LH", "排卵"] },
  {
    name: "德國麻疹抗體",
    to: "maternal",
    alt: ["Rubella", "德國麻疹", "孕前", "抗體"],
  },
  { name: "麻疹抗體", to: "maternal", alt: ["Measles", "麻疹", "抗體"] },
  { name: "腮腺炎抗體", to: "maternal", alt: ["Mumps", "腮腺炎", "抗體"] },
  {
    name: "水痘帶狀皰疹抗體",
    to: "maternal",
    alt: ["VZV", "Varicella", "水痘", "帶狀皰疹", "抗體"],
  },
  { name: "婚前健康檢查", to: "maternal", alt: ["婚前", "婚前檢驗", "結婚"] },
  {
    name: "孕前與孕期檢查",
    to: "maternal",
    alt: ["孕前", "懷孕", "孕期", "產檢", "備孕"],
  },

  /* 功能醫學與過敏 */
  {
    name: "急性過敏原檢測",
    to: "functional",
    alt: ["E66", "A300", "過敏", "急性過敏", "IgE", "過敏原"],
  },
  {
    name: "慢性過敏原檢測",
    to: "functional",
    alt: ["F287", "慢性過敏", "IgG", "食物過敏", "過敏原"],
  },
  {
    name: "急性與慢性過敏原檢測",
    to: "functional",
    alt: ["GE110", "GE224", "Q207", "AF587", "過敏原", "過敏"],
  },
  { name: "食物過敏原檢測", to: "functional", alt: ["食物過敏", "飲食", "過敏"] },
  {
    name: "胰島素阻抗",
    to: "functional",
    alt: ["HOMA-IR", "胰島素", "血糖", "代謝", "糖尿病"],
  },
  { name: "維生素 D", to: "functional", alt: ["25-OH Vitamin D", "Vit D", "骨質"] },
  { name: "維生素 B12", to: "functional", alt: ["Vitamin B12", "B12", "貧血"] },
  { name: "葉酸", to: "functional", alt: ["Folate", "Folic acid", "懷孕"] },
  { name: "血中鋅", to: "functional", alt: ["Zn", "Zinc", "鋅", "微量元素"] },
  {
    name: "重金屬檢測",
    to: "functional",
    alt: ["砷", "鉛", "鎘", "汞", "銅", "重金屬", "微量元素"],
  },
  { name: "阿茲海默症基因", to: "functional", alt: ["ApoE", "失智", "阿茲海默", "基因"] },
  {
    name: "癌症風險基因檢測",
    to: "functional",
    alt: ["基康", "癌症風險", "基因", "遺傳"],
  },

  /* 運動科學檢測 */
  {
    name: "睪固酮",
    to: "sports",
    alt: ["Testosterone", "睾固酮", "男性荷爾蒙", "健身", "重訓"],
  },
  {
    name: "游離睪固酮",
    to: "sports",
    alt: ["Free Testosterone", "游離睾固酮", "男性荷爾蒙"],
  },
  { name: "性荷爾蒙結合球蛋白", to: "sports", alt: ["SHBG", "荷爾蒙"] },
  { name: "硫酸去氫表雄固酮", to: "sports", alt: ["DHEA-S", "DHEA", "荷爾蒙"] },
  {
    name: "皮質醇",
    to: "sports",
    alt: ["Cortisol", "壓力", "腎上腺", "過度訓練"],
  },
  {
    name: "類胰島素生長因子",
    to: "sports",
    alt: ["IGF-1", "生長激素", "肌肉", "增肌"],
  },
  {
    name: "二氫睪固酮",
    to: "sports",
    alt: ["DHT", "Dihydrotestosterone", "雄性禿", "攝護腺"],
  },
  { name: "腎上腺皮質素", to: "sports", alt: ["ACTH", "腎上腺"] },
  {
    name: "運動壓力荷爾蒙分析",
    to: "sports",
    alt: ["運動壓力", "過度訓練", "恢復", "疲勞", "荷爾蒙"],
  },
  {
    name: "非自然健身荷爾蒙檢測",
    to: "sports",
    alt: ["健身荷爾蒙", "增肌", "禁藥", "運動員"],
  },

  /* 親子與基因鑑定 */
  {
    name: "親子鑑定",
    to: "kinship",
    alt: ["DNA", "血緣", "親子", "父子", "毛髮", "法律件", "一般件"],
  },
  { name: "親緣關係確認", to: "kinship", alt: ["親緣", "血緣", "手足", "祖孫", "DNA"] },

  /* 新興高階檢驗 */
  {
    name: "染色體檢查",
    to: "advanced",
    alt: ["染色體", "核型", "Karyotype", "基因"],
  },
  { name: "基因分析", to: "advanced", alt: ["基因", "DNA", "基因檢測", "遺傳"] },
  {
    name: "B 型肝炎病毒核酸定量",
    to: "advanced",
    alt: ["HBV DNA", "B肝病毒量", "核酸"],
  },
  {
    name: "C 型肝炎病毒核酸定量",
    to: "advanced",
    alt: ["HCV RNA", "C肝病毒量", "核酸"],
  },
  {
    name: "遠腎佳 DNlite",
    to: "advanced",
    alt: ["DNlite", "DKD", "糖尿病腎病變", "腎功能"],
  },

  /* 癌症篩檢 */
  { name: "甲型胎兒蛋白", to: "cancer", alt: ["AFP", "肝癌", "胎兒蛋白"] },
  { name: "癌胚胎抗原", to: "cancer", alt: ["CEA", "大腸癌", "癌症"] },
  {
    name: "攝護腺特異抗原",
    to: "cancer",
    alt: ["PSA", "Free PSA", "攝護腺", "前列腺"],
  },
  { name: "CA-125", to: "cancer", alt: ["CA125", "卵巢癌", "癌症"] },
  { name: "CA-153", to: "cancer", alt: ["CA153", "乳癌", "癌症"] },
  { name: "CA-199", to: "cancer", alt: ["CA199", "胰臟癌", "胃癌"] },
  { name: "CA72-4", to: "cancer", alt: ["CA724", "胃癌"] },
  { name: "NSE 神經元特異性烯醇酶", to: "cancer", alt: ["NSE", "肺癌"] },
  { name: "Cyfra 21-1", to: "cancer", alt: ["CYFRA", "肺癌"] },
  { name: "鱗狀細胞癌抗原", to: "cancer", alt: ["SCC", "鱗狀細胞癌"] },
  { name: "EB 病毒抗體", to: "cancer", alt: ["EB VCA-IgA", "鼻咽癌", "EB病毒"] },
  { name: "組織多肽抗原", to: "cancer", alt: ["TPA", "癌症"] },
  { name: "β2 微球蛋白", to: "cancer", alt: ["B2-MG", "B2MG"] },
  { name: "甲狀腺球蛋白", to: "cancer", alt: ["Thyroglobulin", "甲狀腺癌"] },
];

const testEntries: SearchEntry[] = testIndex.map((item) => ({
  id: `test-${item.name}`,
  title: item.name,
  detail: `所屬類別：${testTargets[item.to].label}`,
  anchor: testTargets[item.to].anchor,
  group: "檢驗項目",
  terms: item.alt,
}));

/* 檢驗項目大全自己一筆，搜「檢驗項目」「項目清單」會直接連到目錄頁。
   分類名稱放進來，打「肝功能檢查」也能連過去。 */
const catalogPageEntries: SearchEntry[] = [
  {
    id: "catalog-page",
    title: "檢驗項目大全",
    detail: `本所可受理的檢驗項目完整清單，共 ${catalogItemCount} 項、${testCatalog.length} 個分類，中英文名稱對照並可直接搜尋。`,
    anchor: testCatalogHref,
    group: "檢驗項目大全",
    terms: ["檢驗項目", "項目清單", "全部項目", ...testCatalog.map((s) => s.title)],
  },
];

/* 每一項檢驗也單獨進索引，中英文名稱並列，讓「HbA1c」與「醣化血色素」
   查得到同一個項目。點擊後開目錄頁並帶上查詢字串，直接篩出該項目。 */
const catalogEntries: SearchEntry[] = testCatalog.flatMap((section) =>
  section.items.map((item) => {
    const title = [item.en, item.zh].filter(Boolean).join(" ") || item.label;
    return {
      id: `catalog-${item.id}`,
      title,
      detail: `檢驗分類：${section.title}`,
      anchor: `${testCatalogHref}?q=${encodeURIComponent(item.zh || item.en || item.label)}`,
      group: "檢驗項目大全",
      terms: [item.label, section.title, ...section.terms].filter(Boolean),
    };
  }),
);

const priceEntries: SearchEntry[] = pricePanels.flatMap((panel) =>
  panel.items.map((item) => ({
    id: `price-${panel.id}-${item.name}`,
    title: item.name,
    detail: [item.meta, item.includes?.join("・")].filter(Boolean).join("｜"),
    anchor: "#prices",
    group: `價目表・${panel.tab}`,
    terms: item.includes,
  })),
);

const faqEntries: SearchEntry[] = faqs.map((faq) => ({
  id: `faq-${faq.id}`,
  title: faq.q,
  detail: faq.a,
  anchor: "#faq",
  group: "常見問題",
}));

const noticeEntries: SearchEntry[] = notices.map((notice) => ({
  id: `notice-${notice.title}`,
  title: notice.title,
  detail: `${notice.date}　${notice.body}`,
  anchor: "#notice",
  group: "最新公告",
}));

type IndexedEntry = SearchEntry & { titleText: string; allText: string };

/* 中英文混排時「維生素 D」與「維生素D」都有人打，比對前一律去掉空白，
   避免只因為一個空格就查不到。 */
const normalize = (text: string) => text.replace(/\s+/g, "").toLowerCase();

const toIndexed = (entry: SearchEntry): IndexedEntry => ({
  ...entry,
  titleText: normalize([entry.title, ...(entry.terms ?? [])].join(" ")),
  allText: normalize(
    [entry.title, entry.detail, entry.group, ...(entry.terms ?? [])].join(" "),
  ),
});

/* 專題專頁（性病匿名篩檢、癌症篩檢）是獨立靜態檔，anchor 直接放頁面路徑。
   href 由 content.ts 產生，已經跟著 Vite base 走。 */
const topicEntries: SearchEntry[] = topicPages.map((page) => ({
  id: `topic-${page.id}`,
  title: page.title,
  detail: page.summary,
  anchor: page.href,
  group: "專題專頁",
  terms: page.terms,
}));

/* 索引順序即同分時的排序：先服務類別（訪客最需要先看到的大方向），
   再人工挑選的常用檢驗項目，接著才是檢驗項目大全的完整清單，
   最後是價目組合、常見問題、頁面區塊與公告。 */
const INDEX: IndexedEntry[] = [
  ...topicEntries,
  ...serviceEntries,
  ...testEntries,
  ...catalogPageEntries,
  ...catalogEntries,
  ...priceEntries,
  ...faqEntries,
  ...sectionEntries,
  ...noticeEntries,
].map(toIndexed);

function rank(terms: string[], requireAll: boolean): SearchEntry[] {
  const hits: { entry: SearchEntry; score: number }[] = [];

  for (const entry of INDEX) {
    let score = 0;
    let matched = 0;

    for (const term of terms) {
      if (!entry.allText.includes(term)) {
        if (requireAll) {
          score = 0;
          break;
        }
        continue;
      }
      matched += 1;
      score += entry.titleText.includes(term) ? 4 : 1;
    }

    if (score > 0 && matched > 0) hits.push({ entry, score });
  }

  // Array.prototype.sort 在現代 JS 引擎為穩定排序，同分者維持索引順序
  // （專題專頁 → 服務項目 → 檢驗項目 → 價目表 → 常見問題 → 頁面區塊 → 公告）。
  hits.sort((a, b) => b.score - a.score);

  return hits.map((hit) => hit.entry);
}

/**
 * 以子字串比對建立索引查詢。中文不需斷詞，空白或標點分隔的多個關鍵字
 * 預設採「全部命中」規則，標題命中比內文命中權重高。
 */
export function searchSite(rawQuery: string, limit = 6): SearchEntry[] {
  const terms = rawQuery
    .split(/[\s,，、。！？!?]+/)
    .map(normalize)
    .filter((term) => term.length > 0);

  if (terms.length === 0) return [];

  const strict = rank(terms, true);
  if (strict.length > 0) return strict.slice(0, limit);

  // 訪客常把地點與項目混著打（例如「板橋 抽血」），全數命中會篩成 0 筆，
  // 這時放寬為「任一關鍵字命中」，至少給出可行的下一步。
  return rank(terms, false).slice(0, limit);
}
