import { categories } from "./catalog";

export interface NavItem {
    label: string;
    href?: string;
    image?: string;
    children?: NavItem[];
}

export const mainNavItems: NavItem[] = [
    { label: "الرئيسية", href: "/" },
    { label: "العروض الخاصة", href: "/offers" },
    { label: "الماركات", href: "/brands" },
    ...categories.slice(0, 12).map((c) => ({
        label: c.name,
        href: `/category/${c.slug}`,
        image: c.image,
        children: getSubcategories(c.slug),
    })),
    { label: "عن المتجر", href: "/about" },
    { label: "تواصل معنا", href: "/contact" },
];

function getSubcategories(slug: string): NavItem[] | undefined {
    const subs: Record<string, NavItem[]> = {
        makeup: [
            { label: "مكياج الوجه", href: "/category/makeup?sub=makeup-face" },
            { label: "الشفاه", href: "/category/makeup?sub=makeup-lips" },
            { label: "العيون والحواجب", href: "/category/makeup?sub=makeup-eyes" },
            { label: "العدسات", href: "/category/makeup?sub=makeup-lenses" },
            { label: "الفرش والاسفنج", href: "/category/makeup?sub=makeup-brushes" },
            { label: "مثبتات ومزيلات المكياج", href: "/category/makeup?sub=makeup-setting" },
        ],
        skincare: [
            { label: "غسول الوجه", href: "/category/skincare" },
            { label: "مرطبات الوجه", href: "/category/skincare" },
            { label: "أقنعة الوجه", href: "/category/skincare" },
            { label: "مقشر الوجه", href: "/category/skincare" },
        ],
        korean: [
            { label: "سيرومات", href: "/category/korean" },
            { label: "أقنعة كورية", href: "/category/korean" },
            { label: "تونر", href: "/category/korean" },
        ],
        perfume: [
            { label: "عطور نسائية", href: "/category/perfume?sub=perfume-women" },
            { label: "عطور شعر وجسم", href: "/category/perfume?sub=perfume-hair" },
            { label: "عطور صلبة", href: "/category/perfume?sub=perfume-solid" },
            { label: "عطور أطفال", href: "/category/perfume?sub=perfume-kids" },
            { label: "عطور ميني", href: "/category/perfume?sub=perfume-mini" },
            { label: "معطرات المنزل والسيارة", href: "/category/perfume?sub=perfume-home" },
            { label: "الفحم والبخور", href: "/category/perfume?sub=perfume-incense" },
        ],
        oily: [{ label: "عرض الكل", href: "/category/oily" }],
        dry: [{ label: "عرض الكل", href: "/category/dry" }],
        sensitive: [{ label: "عرض الكل", href: "/category/sensitive" }],
        mixed: [{ label: "عرض الكل", href: "/category/mixed" }],
        normal: [{ label: "عرض الكل", href: "/category/normal" }],
    };
    return subs[slug];
}

export const announcementSlides = [
    { text: "توصيل مجاني للطلبات فوق 199 ريال", href: "/shipping" },
    { text: "كاش باك بدون حد أدنى", href: "/loyalty" },
    { text: "عروض حصرية يومياً", href: "/offers" },
    { text: "أكثر من 500 ماركة عالمية", href: "/brands" },
];
