
 export const categories = [
  { label: "Kitablar", to: "/books" },
  { label: "Bədii Ədəbiyyat", to: "/fiction" },
  { label: "Qeyri-Bədii", to: "/nonfiction" },
  { label: "E-Kitablar", to: "/ebooks" },
  { label: "Səsli Kitablar", to: "/audiobooks" },
  { label: "Gənclər & YA", to: "/ya" },
  { label: "Uşaqlar", to: "/kids" },
  { label: "Oyuncaqlar & Oyunlar", to: "/toys-games" },
  { label: "Musiqi & Film", to: "/music-movies" },
]

export const infoMessages = [
  "Mağazadan təhvil alma: İki saat ərzində hazır",
  "$60 və daha çox sifarişdə PULSUZ çatdırılma",
  "Premium üzvlüyə bu gün qoşulun",
];

export const booksDropdown = {
  COX_SATILAN: {
    title: "ÇOX SATILAN",
    items: ["Ən çox satılanlar", "Yeni çıxanlar", "Endirimlilər", "Bütün kitablar"],
    links: ["/books?sort=bestseller", "/books?sort=new", "/books?sort=sale", "/books"],
  },
  JANRLAR: {
    title: "JANRLAR",
    items: ["Roman", "Fantastika", "Detektiv", "Tarix", "Elm", "Psixologiya", "Uşaq kitabları"],
    links: ["/books?genre=Roman", "/books?genre=Fantastika", "/books?genre=Detektiv", "/books?genre=Tarix", "/books?genre=Elm", "/books?genre=Psixologiya", "/books?genre=Usaq"],
  },
  MUELLIF: {
    title: "MÜƏLLİFLƏR",
    items: ["Azərbaycan müəllifləri", "Xarici müəlliflər", "Klassiklər", "Müasir yazarlar"],
    links: ["/books?author=az", "/books?author=foreign", "/books?author=classic", "/books?author=modern"],
  },
  FORMAT: {
    title: "FORMAT",
    items: ["Cild kitab", "E-kitab", "Uşaq kitabları", "Hədiyyəlik"],
    links: ["/books?format=hardcover", "/books?format=ebook", "/books?format=kids", "/books?format=gift"],
  },
};

export const utilityLinks = [
  { label: "Mağazalar & Tədbirlər", to: "/stores", icon: true },
  { label: "Üzvlük", to: "/membership" },
  { label: "Bloq", to: "/blog" },
  { label: "Hədiyyə Kartları", to: "/gift-cards" },
];
