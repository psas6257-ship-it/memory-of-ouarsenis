import kasbah from "@/assets/heritage-kasbah.jpg";
import crafts from "@/assets/heritage-crafts.jpg";
import music from "@/assets/heritage-music.jpg";
import manuscript from "@/assets/heritage-manuscript.jpg";
import mountain from "@/assets/mountain-hero.jpg";
import bookTissemsilt from "@/assets/book-tissemsilt.jpeg";
import bookMurshid from "@/assets/book-murshid.jpeg";
import bookGhoroub from "@/assets/book-ghoroub.jpeg";
import bookShir from "@/assets/book-shir.jpeg";

export type Book = {
  id: string;
  title: string;
  author: string;
  cover: string;
  pdf?: string;
  pages: number;
  category: string;
  year: string;
  description: string;
};

export const books: Book[] = [
  {
    id: "sidi-rabeh",
    title: "أسطورة سيدي رابح بوقبرين",
    author: "بحث أكاديمي",
    cover: manuscript,
    pdf: "/books/sidi-rabeh.pdf",
    pages: 24,
    category: "تراث لامادي",
    year: "2021",
    description: "قراءة سوسيو-تاريخية لأسطورة سيدي رابح بوقبرين في منطقة الونشريس.",
  },
  {
    id: "shir-shaabi",
    title: "الشِّعر الشعبي الملحون",
    author: "بحث أكاديمي",
    cover: bookShir,
    pdf: "/books/shir-shaabi.pdf",
    pages: 38,
    category: "أدب شعبي",
    year: "2020",
    description: "الشعر الشعبي الملحون في منطقة الونشريس: اجتماع، استماع، انتفاع ودفاع عن الهوية.",
  },
  {
    id: "mathahir-fikriya",
    title: "المظاهر الفكرية في الونشريس",
    author: "بحث أكاديمي",
    cover: bookMurshid,
    pdf: "/books/mathahir-fikriya.pdf",
    pages: 30,
    category: "تاريخ",
    year: "2019",
    description: "المظاهر الفكرية في منطقة الونشريس خلال القرن الخامس ميلادي.",
  },
  {
    id: "qabail-romaniya-1",
    title: "قبائل الونشريس في العهد الروماني",
    author: "بحث أكاديمي - الجزء الأول",
    cover: bookTissemsilt,
    pdf: "/books/qabail-romaniya-1.pdf",
    pages: 28,
    category: "تاريخ",
    year: "2018",
    description: "قبائل الونشريس ودورهم في المُقاومات خلال الفترة الرّومانية (40م - 284م).",
  },
  {
    id: "qabail-romaniya-2",
    title: "قبائل الونشريس - الجزء الثاني",
    author: "بحث أكاديمي - الجزء الثاني",
    cover: bookGhoroub,
    pdf: "/books/qabail-romaniya-2.pdf",
    pages: 32,
    category: "تاريخ",
    year: "2018",
    description: "تتمة دراسة دور قبائل الونشريس في المقاومات خلال الفترة الرومانية.",
  },
  {
    id: "ain-takriya",
    title: "موقع عين تكرية الأثري",
    author: "دراسة ميدانية",
    cover: kasbah,
    pdf: "/books/ain-takriya.pdf",
    pages: 22,
    category: "آثار",
    year: "2022",
    description: "موقع عين تكرية الأثري بين الواقع والاستشراف.",
  },
  {
    id: "taamir-bashari",
    title: "التعمير البشري بجنوب الونشريس",
    author: "دراسة أثرية",
    cover: manuscript,
    pdf: "/books/taamir-bashari.pdf",
    pages: 26,
    category: "آثار",
    year: "2021",
    description: "التعمير البشري بمنطقة جنوب الونشريس من خلال الشواهد الأثرية.",
  },
  {
    id: "thawra-wilaya-rabia",
    title: "الثورة في الولاية الرابعة",
    author: "دراسة تاريخية",
    cover: mountain,
    pdf: "/books/thawra-wilaya-rabia.pdf",
    pages: 40,
    category: "تاريخ معاصر",
    year: "2020",
    description: "الثورة التحريرية في الولاية الرابعة التاريخية.",
  },
  {
    id: "adriha-zawiya",
    title: "أضرحة جنائزية بزاوية تيسمسيلت",
    author: "دراسة ميدانية توثيقية",
    cover: bookTissemsilt,
    pdf: "/books/adriha-zawiya.pdf",
    pages: 20,
    category: "آثار",
    year: "2023",
    description: "اكتشاف أضرحة جنائزية جديدة بمنطقة زاوية ولاية تيسمسيلت.",
  },
  {
    id: "shir-malhoun",
    title: "الشعر الملحون - دراسة موسعة",
    author: "بحث أكاديمي",
    cover: bookShir,
    pdf: "/books/shir-malhoun.pdf",
    pages: 36,
    category: "أدب شعبي",
    year: "2022",
    description: "الشعر الشعبي الملحون في الونشريس: الهوية والانتماء.",
  },
];

export type VideoItem = {
  id: string;
  title: string;
  youtubeId: string;
  thumbnail: string;
  duration: string;
  category: string;
};

const yt = (id: string) => `https://img.youtube.com/vi/${id}/hqdefault.jpg`;

export const videos: VideoItem[] = [
  { id: "v1", youtubeId: "YF8PB_GZSPU", title: "حكايات الونشريس", thumbnail: yt("YF8PB_GZSPU"), duration: "12:34", category: "وثائقي" },
  { id: "v2", youtubeId: "oKespJ94Cmo", title: "تراث المنطقة", thumbnail: yt("oKespJ94Cmo"), duration: "08:21", category: "وثائقي" },
  { id: "v3", youtubeId: "wmsL1Bw1W3c", title: "الذاكرة الجبلية", thumbnail: yt("wmsL1Bw1W3c"), duration: "15:02", category: "حكايات" },
  { id: "v4", youtubeId: "0cnVAPv4OMw", title: "بث مباشر من الونشريس", thumbnail: yt("0cnVAPv4OMw"), duration: "LIVE", category: "مباشر" },
  { id: "v5", youtubeId: "6VvdmFkjjKo", title: "أصوات من الجبل", thumbnail: yt("6VvdmFkjjKo"), duration: "06:45", category: "موسيقى" },
  { id: "v6", youtubeId: "5-chkdkRiYI", title: "قصص الأجداد", thumbnail: yt("5-chkdkRiYI"), duration: "10:11", category: "حكايات" },
  { id: "v7", youtubeId: "nbDCWbT4mGI", title: "آثار الونشريس", thumbnail: yt("nbDCWbT4mGI"), duration: "14:58", category: "آثار" },
  { id: "v8", youtubeId: "GOJJ56shreI", title: "الحرف التقليدية", thumbnail: yt("GOJJ56shreI"), duration: "09:33", category: "حرف" },
  { id: "v9", youtubeId: "HzE0xYaOca8", title: "الموروث الشفهي", thumbnail: yt("HzE0xYaOca8"), duration: "11:20", category: "حكايات" },
  { id: "v10", youtubeId: "jj-_Qxb0aRs", title: "جبال الونشريس", thumbnail: yt("jj-_Qxb0aRs"), duration: "07:55", category: "وثائقي" },
  { id: "v11", youtubeId: "IpVy3mYkmfE", title: "الشعر الملحون", thumbnail: yt("IpVy3mYkmfE"), duration: "13:42", category: "موسيقى" },
  { id: "v12", youtubeId: "PqSKJN4J94c", title: "ذاكرة المكان", thumbnail: yt("PqSKJN4J94c"), duration: "09:08", category: "وثائقي" },
  { id: "v13", youtubeId: "fbcrl_GflvA", title: "حكاية قرية", thumbnail: yt("fbcrl_GflvA"), duration: "12:15", category: "حكايات" },
  { id: "v14", youtubeId: "U_iGJacrfXw", title: "مواقع أثرية", thumbnail: yt("U_iGJacrfXw"), duration: "16:30", category: "آثار" },
  { id: "v15", youtubeId: "y4G4MJQP8rI", title: "أغاني الجبل", thumbnail: yt("y4G4MJQP8rI"), duration: "05:48", category: "موسيقى" },
  { id: "v16", youtubeId: "81Rwe0byNSs", title: "تيسمسيلت ذاكرة", thumbnail: yt("81Rwe0byNSs"), duration: "18:22", category: "وثائقي" },
  { id: "v17", youtubeId: "iVGCoNRxuVQ", title: "حكايات شعبية", thumbnail: yt("iVGCoNRxuVQ"), duration: "08:50", category: "حكايات" },
  { id: "v18", youtubeId: "pKq6Dq1mUPc", title: "الموروث المعماري", thumbnail: yt("pKq6Dq1mUPc"), duration: "11:33", category: "وثائقي" },
  { id: "v19", youtubeId: "66DhvRtTELc", title: "صور من الماضي", thumbnail: yt("66DhvRtTELc"), duration: "13:05", category: "وثائقي" },
  { id: "v20", youtubeId: "_ogCKH4bNPQ", title: "صدى الونشريس", thumbnail: yt("_ogCKH4bNPQ"), duration: "10:40", category: "حكايات" },
];

export const collections = [
  { id: "c1", name: "العمارة الجبلية", image: kasbah, count: 24 },
  { id: "c2", name: "الحرف والتقاليد", image: crafts, count: 18 },
  { id: "c3", name: "الموسيقى الشعبية", image: music, count: 12 },
  { id: "c4", name: "المخطوطات النادرة", image: manuscript, count: 9 },
  { id: "c5", name: "جبال الونشريس", image: mountain, count: 31 },
];

export type Story = {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  readTime: string;
};

export const stories: Story[] = [
  { id: "s1", title: "أسطورة سيدي رابح", excerpt: "حكاية الولي الصالح الذي حرس الجبل قروناً...", image: kasbah, readTime: "٧ دقائق" },
  { id: "s2", title: "نداء العود في المساء", excerpt: "كيف تحوّل الشعر الملحون إلى ذاكرة جماعية...", image: music, readTime: "٥ دقائق" },
  { id: "s3", title: "ظلال القرن الخامس", excerpt: "رحلة فكرية في عمق ماضي الونشريس...", image: manuscript, readTime: "٩ دقائق" },
  { id: "s4", title: "خيوط الحرف", excerpt: "من يد الجدة إلى رحم النسيج...", image: crafts, readTime: "٤ دقائق" },
];
