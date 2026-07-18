# 📚 Book & Store

Müasir, tam funksional onlayn kitab mağazası. React, TypeScript və Tailwind CSS ilə hazırlanıb, Open Library API-dən real kitab məlumatları istifadə edir.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind_CSS-3-06B6D4?logo=tailwindcss&logoColor=white)
![License](https://img.shields.io/badge/License-Educational-lightgrey)

> 🎓 **Bu layihə Bakı Mühəndislik Universiteti, Kompüter Mühəndisliyi ixtisası üzrə buraxılış (diplom) layihəsi kimi hazırlanmışdır.**

---

## 📑 Mündəricat

- [Haqqında](#-haqqında)
- [Əsas Xüsusiyyətlər](#-əsas-xüsusiyyətlər)
- [İstifadə Olunan Texnologiyalar](#️-istifadə-olunan-texnologiyalar)
- [Layihə Strukturu](#-layihə-strukturu)
- [Quraşdırma](#️-quraşdırma)
- [Skriptlər](#-skriptlər)
- [Arxitektura Qərarları](#️-arxitektura-qərarları)
- [Əsas Funksional Axınlar](#-əsas-funksional-axınlar)
- [Ekran Görüntüləri](#-ekran-görüntüləri)
- [Məlum Məhdudiyyətlər və Gələcək Planlar](#-məlum-məhdudiyyətlər-və-gələcək-planlar)
- [Müəllif](#-müəllif)

---

## 📖 Haqqında

Book & Store — Barnes & Noble tərzində dizayn edilmiş, real dünya e-ticarət saytının demək olar bütün funksionallığını əhatə edən bir layihədir. Layihə sıfırdan qurulub, Open Library açıq mənbə API-si ilə inteqrasiya olunub və tam responsiv dizaynla hazırlanıb.

Layihənin məqsədi — React, TypeScript, state idarəetməsi, autentifikasiya, localStorage ilə data persistensiyası və mürəkkəb UI komponentlərinin qurulması bacarıqlarını real ölçülü bir layihədə nümayiş etdirməkdir.

---

## ✨ Əsas Xüsusiyyətlər

### 🔐 Autentifikasiya Sistemi
- Qeydiyyat, giriş, şifrə bərpası modalları
- Şifrə güclülük göstəricisi (real-vaxt validasiya)
- Profil idarəetməsi (ProfileModal)
- localStorage əsaslı sessiya idarəetməsi
- Çıxış zamanı istifadəçiyə məxsus məlumatların qorunması

### 🛒 Səbət və Sifariş Sistemi
- Kitabları səbətə əlavə etmə, miqdar artırma/azaltma
- **İstifadəçiyə görə ayrı səbət** (hər email üçün öz localStorage açarı)
- Promo kod sistemi — istifadəçi başına bir dəfəlik istifadə limiti
- Pulsuz çatdırılma həddi (₼60+)
- Tam checkout axını: çatdırılma məlumatları, kart/nağd ödəniş seçimi
- Kart nömrəsi, son tarix, CVV validasiyası (real-vaxt formatlama)
- Sifariş tarixçəsi və idarəetməsi:
  - Sifarişi **ləğv etmə** (yalnız çatdırılmaya 2+ gün qalıbsa)
  - Ləğv edilmiş sifarişi **silmə**
  - Status izləmə (gözləyir / təsdiqləndi / çatdırıldı / ləğv edildi)

### ❤️ İstək Siyahısı (Wishlist)
- Çoxlu siyahı yaratma (məs. "Mənim Sevimlilərim", xüsusi adlı siyahılar)
- Açıq/şəxsi siyahı parametrləri
- Siyahı redaktəsi (ad, təsvir, məxfilik)
- Kitabları siyahıdan səbətə birbaşa əlavə etmə
- Sıralama (yeni→köhnə, A-Z, Z-A) və nəticə sayı filtri
- Deterministik (təsadüfi olmayan) reytinq və qiymət generasiyası — hər kitab həmişə eyni dəyəri göstərir

### 📚 Kitab Kəşfi
- **Open Library API** inteqrasiyası — milyonlarla real kitab
- Janr üzrə filtirlər (Bədii Ədəbiyyat, Qeyri-Bədii, və s.)
- Axtarış (başlıq, müəllif, ISBN)
- Sıralama (populyarlıq, reytinq, nəşr ili, əlifba sırası)
- Kitab təfərrüat səhifəsi:
  - Tam məlumat (süjet, müəllif, janr, reytinq, statistik məlumatlar)
  - Oxşar kitablar tövsiyəsi
  - Müştəri rəyləri bölməsi (filtrlənə bilən, sıralana bilən)
  - "Onlayn Oxu" / "Səbətə Əlavə Et" / "Sevimlilərə Əlavə Et" əməliyyatları
- Endirimli kitablar səhifəsi (avtomatik endirim hesablama)
- Səsli kitablar bölməsi (ayrıca kataloq və kart dizaynı)

### 🎨 Digər Səhifələr

- **Blog** — trend kitablar, aylıq seçim, kateqoriyalı bölmələr
- **Hədiyyə Kartları** — real bank kartı görünüşlü SVG dizaynlar, balans yoxlama (validasiyalı)
- **Üzvlük** — Rewards (pulsuz) və Premium plan müqayisəsi, FAQ
- **Mağazalar** — xəritə inteqrasiyası
- **Əlaqə** — forma validasiyası, uğur modalı
- **Mobil Tətbiq** — App Store/Google Play tanıtım səhifəsi

---

## 🛠️ İstifadə Olunan Texnologiyalar

| Kateqoriya | Texnologiya |
|---|---|
| Frontend Framework | React 19 |
| Dil | TypeScript |
| Build Tool | Vite |
| Stillər | Tailwind CSS |
| Routing | React Router DOM |
| HTTP Client | Axios |
| API | Open Library API |
| Data Saxlama | localStorage (auth, cart, wishlist, orders, promo) |

---

## 📁 Layihə Strukturu

```
src/
├── components/
│   ├── auth/          → SignInModal, RegisterModal, ForgotPasswordModal, ProfileModal
│   ├── layout/        → Layout (Navbar + modallar + əsas konteyner)
│   ├── navbar/        → InfoBar, UtilityBar, MainBar, CategoryNav, MobileMenu
│   ├── ui/            → Button, Input, Modal, LoadingSpinner, ToastContainer, və s.
│   ├── book/          → BookCard, BookCover, BookInfo, BookActions, BookTabs, BookReviews
│   ├── blog/          → FeaturedBook, TrendingSidebar, BookOfTheMonth, BookSection
│   ├── cart/          → CartItem, OrderSummary, PromoSection, QtyControl
│   ├── checkout/      → CheckoutModal, DeliveryForm, PaymentForm, CheckoutSummary
│   ├── orders/        → OrderCard, OrderHeader, OrderThumbnails, OrderDetails
│   ├── wishlist/      → WishlistSidebar, WishlistItemCard, WishlistFormModal
│   ├── home/          → ImageSlider, ScrollRow, GenreNav, ServiceNav, Footer
│   ├── discount/      → DiscountedCard, StatsBar, PageStates
│   └── shared/        → CarouselSection, Sidebar, FaqAccordion
│
├── context/            → AuthContext, CartContext, OrderContext, WishlistContext, AuthModalContext
├── hooks/              → useBooks, useCheckoutForm, usePromo, useWishlist, useFormValidation, və s.
├── pages/              → HomePage, BooksPage, BookDetailPage, CartPage, OrdersPage, WishlistPage, və s.
├── services/           → bookService.ts (Open Library API inteqrasiyası)
├── types/              → Book, Order, CartItem, WishlistItem tip tərifləri
├── utils/              → bookPrice, bookSort, cartCalc, promoStorage, wishlistStorage
├── constants/          → theme.ts (bütün rəng sabitləri), link.ts
└── data/               → genres, navbar, sections, promoCodes
```

---

## ⚙️ Quraşdırma

### Tələblər
- Node.js 18+ (tövsiyə olunur: 20 LTS)
- npm 9+

### Addımlar

```bash
# Repozitoriyanı klonlayın
git clone https://github.com/dianamemmedova/bookstore.git

# Qovluğa keçin
cd bookstore

# Asılılıqları quraşdırın
npm install

# Development serverini başladın
npm run dev
```

Brauzerdə açın: **http://localhost:5173**

> API açarı tələb olunmur — Open Library açıq mənbə API-si olduğu üçün layihə heç bir `.env` konfiqurasiyası olmadan işə düşür.

---

## 📜 Skriptlər

| Əmr | Təsvir |
|---|---|
| `npm run dev` | Development serverini işə salır (hot-reload ilə) |
| `npm run build` | Production üçün optimallaşdırılmış build yaradır |
| `npm run preview` | Production build-i lokal olaraq önizləyir |
| `npm run lint` | ESLint ilə kod keyfiyyətini yoxlayır |

---

## 🏗️ Arxitektura Qərarları

- **Komponent ayrılması**: Hər səhifə kiçik, təkrar istifadə oluna bilən komponentlərə bölünüb (məs. `BookDetailPage` 6 alt-komponentə ayrılıb: `BookCover`, `BookInfo`, `BookActions`, `SimilarBooks`, `BookTabs`, `BookReviews`)
- **Mərkəzləşdirilmiş rənglər**: Bütün rənglər `constants/theme.ts`-də saxlanılır — heç bir hardcoded hex rəng komponent daxilində yazılmır
- **Tiplər və data ayrılığı**: Bütün TypeScript interfeysləri `types/`, statik data `data/` qovluğunda — komponentlər yalnız UI məntiqini saxlayır
- **İstifadəçiyə görə data izolyasiyası**: Səbət, sifariş və sevimlilər hər istifadəçi üçün ayrıca localStorage açarı ilə saxlanılır (`bookstore_cart_${userEmail}`)
- **Responsive-first**: Bütün səhifələr mobil, tablet və desktop üçün ayrıca test edilib və optimallaşdırılıb
- **Validasiya mərkəzləşdirilməsi**: Bütün form validasiya qaydaları `useFormValidation.ts`-də vahid sistemdə idarə olunur

---

## 🔑 Əsas Funksional Axınlar

**Qeydiyyat → Giriş → Kitab Axtarışı → Səbətə Əlavə → Checkout → Sifariş Tarixçəsi**

**Kitab Kəşfi → Sevimlilərə Əlavə → Sevimlilər Səhifəsi → Səbətə Köçürmə**

**Promo Kod Tətbiqi → Sifariş Tamamlama → Promo Kodun Bağlanması (bir dəfəlik istifadə)**

---



## 🚧 Məlum Məhdudiyyətlər və Gələcək Planlar

- Backend/verilənlər bazası yoxdur — bütün istifadəçi datası (auth, səbət, sifariş, wishlist) `localStorage`-da saxlanılır; real production üçün bu, backend (Node/Express + verilənlər bazası) ilə əvəz olunmalıdır
- Ödəniş sistemi simulyasiyadır — real ödəniş provayderi (Stripe, PayPal və s.) inteqrasiyası yoxdur
- Kitab qiymətləri Open Library API-də mövcud olmadığı üçün ID-yə əsaslanan deterministik alqoritmlə generasiya olunur

---

## 👩‍💻 Müəllif

**Diana Mammadova**
Frontend Developer · Kompüter Mühəndisliyi tələbəsi (BEU, 4-cü kurs)

[GitHub](https://github.com/dianamemmedova) · [LinkedIn](https://linkedin.com/in/diana-memmedova-112097282)

---

## 📄 Lisenziya

Bu layihə təhsil məqsədilə hazırlanmışdır.
