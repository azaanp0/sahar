import type { Product, Category, Brand } from "@/types";

const SALLA = "https://cdn.salla.sa/onqKZz";
const CDN = "https://cdn.files.salla.network/homepage/1945128061";

const p = (
    id: string,
    data: Omit<Product, "id" | "href"> & { href?: string }
): Product => ({
    id,
    href: data.href ?? `/product/${id}`,
    inStock: data.inStock ?? true,
    ...data,
});

export const categories: Category[] = [
    { slug: "makeup", name: "المكياج", description: "أفضل منتجات المكياج العالمية", image: `${CDN}/92a9fe54-4e63-424b-9d14-76eb65c0c882.webp` },
    { slug: "skincare", name: "العناية", description: "منتجات العناية بالبشرة والجسم", image: `${CDN}/8f9923bb-afdd-431f-98dd-12b9a239b903.webp` },
    { slug: "korean", name: "الجمال الكوري", description: "أشهر ماركات الجمال الكوري", image: `${CDN}/aa6af782-56bf-48c2-9013-6393dbd3d2ec.webp` },
    { slug: "oral", name: "صحة الفم", description: "منتجات العناية بالأسنان والفم", image: `${CDN}/8df2cb5a-c036-4a95-b77f-2ec36499fb13.webp` },
    { slug: "nails", name: "الأظافر", description: "منتجات العناية بالأظافر", image: `${CDN}/442a9766-af67-41af-b2eb-509fcdd31edf.webp` },
    { slug: "tan", name: "التان", description: "منتجات التان والبرونز", image: `${CDN}/606f4f69-32d4-44ef-b2be-f0278d8c6267.webp` },
    { slug: "sunscreen", name: "واقي الشمس", description: "أفضل واقيات الشمس", image: `${CDN}/8cf2d671-26fd-4341-acf6-6c6bfa81e6e8.webp` },
    { slug: "devices", name: "الأجهزة", description: "أجهزة العناية والجمال", image: `${CDN}/e5dc8015-e8e9-426a-aab9-59d1da7d0019.webp` },
    { slug: "perfume", name: "العطور", description: "عطور ومعطرات فاخرة", image: `${CDN}/f2036e5d-42e1-402d-9b4e-94c46c9599d6.webp` },
    { slug: "oily", name: "بشرة دهنية", description: "منتجات للبشرة الدهنية", image: `${CDN}/6dffe619-c5df-4c4e-82ec-5460a15d1459.webp` },
    { slug: "dry", name: "بشرة جافة", description: "منتجات للبشرة الجافة", image: `${CDN}/d3503700-cf0f-4f75-b844-d5e5afeedaea.webp` },
    { slug: "sensitive", name: "بشرة حساسة", description: "منتجات للبشرة الحساسة", image: `${CDN}/99d49e55-17fe-4511-9465-e3936d62f381.webp` },
    { slug: "mixed", name: "بشرة مختلطة", description: "منتجات للبشرة المختلطة", image: `${CDN}/7db3b64b-4637-4e11-86c2-cd218aae0686.webp` },
    { slug: "normal", name: "بشرة عادية", description: "منتجات للبشرة العادية", image: `${CDN}/bd79121d-d4b4-4efa-955f-6fc82b96f6dc.webp` },
    { slug: "hair", name: "العناية بالشعر", description: "منتجات العناية بالشعر", image: `${CDN}/671e0ed0-dd83-408a-a729-82b6f0c72d91.webp` },
    { slug: "body", name: "العناية بالجسم", description: "منتجات العناية بالجسم", image: `${CDN}/c20f08de-b2ce-43c9-8a61-ffb1f6d8f928.webp` },
];

export const brands: Brand[] = [
    { slug: "laneige", name: "LANEIGE", image: `${CDN}/932101da-4f57-4d0f-b648-05b73f7a620b.webp`, category: "الجمال الكوري" },
    { slug: "cosmo", name: "COSMO", image: `${CDN}/3daf2c63-d173-47f3-886c-df7a51e7b106.webp`, category: "العناية" },
    { slug: "agiva", name: "AGIVA", image: `${CDN}/f92f86b6-f5eb-4562-825c-f4712be8f4c0.webp`, category: "العناية بالشعر" },
    { slug: "medicube", name: "MEDICUBE", image: `${CDN}/ebef97f0-5b55-4bd1-9b5c-d8ab21f86bd2.webp`, category: "الجمال الكوري" },
    { slug: "beesline", name: "BEESLINE", image: `${CDN}/0a561bb8-74f8-407c-a38f-5f025978fe36.webp`, category: "واقي الشمس" },
    { slug: "saltrain", name: "SALTRAIN", image: `${CDN}/a486c2f3-f0a8-40f9-b225-9e402e1ed8d2.webp`, category: "صحة الفم" },
    { slug: "vaseline", name: "Vaseline", image: `${CDN}/45e9c81d-0ff6-447a-9e92-b1cc10ba6d7e.webp`, category: "العناية" },
    { slug: "pastel", name: "PASTEL", image: `${CDN}/010315dc-b2e5-4593-8180-f0045fb58fdf.webp`, category: "المكياج" },
    { slug: "missrose", name: "Miss Rose", image: `${CDN}/28d18d89-75b1-420c-96bb-a4ec5b2f6226.webp`, category: "المكياج" },
    { slug: "flexitol", name: "Flexitol", image: `${CDN}/74bd0dc4-0e6b-4e90-a119-b1cdf14f97fb.webp`, category: "العناية" },
    { slug: "nair", name: "NAIR", image: `${CDN}/8d11be49-8219-4a77-9e06-633787f49d33.gif`, category: "إزالة الشعر" },
    { slug: "cosmofresh", name: "COSMO Fresh", image: `${CDN}/5d4f5691-261a-4d3e-9f9a-a8046f28c17c.webp`, category: "العناية بالجسم" },
    { slug: "romand", name: "روماند", image: `${CDN}/b66c579e-6abb-4277-aaba-3034da10cc91.webp`, category: "المكياج" },
    { slug: "equalberry", name: "ايكوال بيري", image: `${CDN}/1c436c7b-5427-45ea-8b37-1c0803b0b2e3.webp`, category: "الجمال الكوري" },
    { slug: "skin1004", name: "سكين 1004", image: `${CDN}/d3c86631-b33f-489f-a10d-83f2d226667d.webp`, category: "الجمال الكوري" },
    { slug: "beautyofjoseon", name: "بيوتي اوف جوسون", image: `${CDN}/262e721c-d6dc-4e26-9e7f-86530d448530.webp`, category: "الجمال الكوري" },
    { slug: "cosrx", name: "كوسركس", image: `${CDN}/02388ca7-3c78-4e67-9540-f6d1a819a281.webp`, category: "الجمال الكوري" },
    { slug: "somebymi", name: "سوم باي مي", image: `${CDN}/033caa56-88bf-4305-84f7-3f4abf7458f0.webp`, category: "الجمال الكوري" },
    { slug: "ksecret", name: "كي سيكرت", image: `${CDN}/932101da-4f57-4d0f-b648-05b73f7a620b.webp`, category: "الجمال الكوري" },
    { slug: "anua", name: "أنوا", image: `${CDN}/aa6af782-56bf-48c2-9013-6393dbd3d2ec.webp`, category: "الجمال الكوري" },
    { slug: "dralthea", name: "دكتور الثيا", image: `${CDN}/d3c86631-b33f-489f-a10d-83f2d226667d.webp`, category: "الجمال الكوري" },
];

export const products: Product[] = [
    p("s1", { name: "مجموعة الشفاه الكوريه موكا موس من روماند - 8 جرام", description: "مجدد + مرطب + قاووس", price: 97.75, originalPrice: 157.67, image: `${SALLA}/87e0b587-49f3-4016-8bd5-2672c71534f3-375x500-XOp98s4xaWQsSOs0lkrf13ZaIsFKYZFcnM1X4k3U.jpg`, brand: "روماند", brandSlug: "romand", categorySlug: "makeup", subcategory: "makeup-lips", rating: 4, reviews: 18, badge: "38%", tags: ["summer", "online", "bestseller", "makeup-lips"] }),
    p("s2", { name: "مجموعة تفتيح وتوحيد لون الجسم - لوشن كوزمو و زيت عرق السوس", description: "نياسيناميد - هيالورونيك - عرق سوس", price: 23, originalPrice: 44.08, image: `${SALLA}/67dac8a2-2266-43d0-9acb-efc9e7335573-500x500-S8325sKl6gLEJoOeoKF7ReWRcVIUQerKJT7FJrKr.png`, brand: "كوزمو", brandSlug: "cosmo", categorySlug: "body", rating: 5, reviews: 42, badge: "تفتيح التصبغات", tags: ["summer", "half", "recommended"] }),
    p("s3", { name: "مجموعة سيلف تان تسمير ذاتي للوجه والجسم من كوكوسوليس", description: "تسمير بدون شمس", price: 258.75, originalPrice: 345, image: `${SALLA}/ad9806e5-9bb8-4a13-9db5-faf47b630e40-500x500-Gfq8fQSGNszeEznaGa593BtaFeI1twqx9VEK3fLs.png`, brand: "كوكوسوليس", categorySlug: "tan", rating: 4, reviews: 29, badge: "25%", tags: ["summer", "gifts"] }),
    p("s4", { name: "مجموعة عناية الصيف المتكاملة - 9 قطع", description: "كود: summer", price: 193.55, originalPrice: 269.74, image: `${SALLA}/6feae384-d084-4a74-80b5-710f5c72f362-500x500-u9tl6ADgpVnwuMtRfH0DNsTWWbrJkAxN0DmLJFyE.png`, brand: "متنوع", categorySlug: "skincare", rating: 5, reviews: 67, badge: "خصم حصري وهدية", tags: ["summer", "1plus1", "trending"] }),
    p("s5", { name: "مجموعة ارواج درجات النود + شنطة مكياج ميني مجاناً", description: "أرواج بدرجات النود الجميلة", price: 69.86, originalPrice: 124.2, image: `${SALLA}/6bff939b-6be1-4c88-afd2-c949398cea67-500x500-G1ZRRfDtkxvmbHyy51x2rM4Xm2Ts7QQGfscP9UyM.png`, brand: "باستل", brandSlug: "pastel", categorySlug: "makeup", subcategory: "makeup-lips", rating: 4, reviews: 35, badge: "44%", tags: ["summer", "gifts", "makeup-lips"] }),
    p("s6", { name: "مجموعة قلم حواجب ريل بيوتي و ماسكارا - 2 قطعة", description: "تعريف الحواجب + كثافة الرموش", price: 28.88, originalPrice: 43.13, image: `${SALLA}/d62a838c-81b0-492e-b042-605831771b32-500x500-ntDfEjt7RJb6KBo21I7KkbG7m1YDSDqWAY2dVMRZ.png`, brand: "ريل بيوتي", categorySlug: "makeup", subcategory: "makeup-eyes", rating: 4, reviews: 21, badge: "33%", tags: ["summer", "makeup-eyes"] }),
    p("s7", { name: "مجموعة بخاخ مثبت مكياج - 3 قطع", description: "ثبات طويل الأمد", price: 40.27, originalPrice: 61.85, image: `${SALLA}/95de0bfe-eab2-474d-b96d-e1ac66309983-500x500-v9gJPllkx94lEkdTRxzvPVy7GTTAcVZ8OYugqtNb.png`, brand: "باستل", brandSlug: "pastel", categorySlug: "makeup", subcategory: "makeup-setting", rating: 5, reviews: 58, badge: "35%", tags: ["summer", "online", "makeup-setting"] }),
    p("s8", { name: "كونسيلر بوغينيا ناتشورال بيج و برايمر باستل", description: "إخفاء العيوب + تثبيت المكياج", price: 50.76, originalPrice: 73.98, image: `${SALLA}/cb82baec-6b5b-4ed2-952c-1dba33e86f79-500x500-mSGLeOsnV2nfeY4mCUCxSgVYyIxLO6p2XOGDQyQt.png`, brand: "باستل", brandSlug: "pastel", categorySlug: "makeup", subcategory: "makeup-face", rating: 4, reviews: 14, badge: "31%", tags: ["summer", "makeup-face"] }),
    p("f1", { name: "مجموعة الشفاه الكوريه جليزد بلوم من روماند", description: "بريق وترطيب للشفاه", price: 97.75, originalPrice: 157.67, image: `${SALLA}/9152ab7f-6693-4826-bb12-11b4a413fd5a-375x500-ykEjhbDqunzgN7c8VX1hO5n32kuVwPTrHFMUXvEW.jpg`, brand: "روماند", brandSlug: "romand", categorySlug: "makeup", rating: 5, reviews: 33, badge: "38%", tags: ["bestseller", "trending", "makeup-lips"] }),
    p("f2", { name: "تنت شفاه مائي لامع من روماند", description: "لون طبيعي يدوم طويلاً", price: 49.08, originalPrice: 77.91, image: `${SALLA}/cedf9bea-753a-4cdc-8527-682ce6f57cc7-375x500-ddChoZyYn1kZdVKTLk4u1xSfI4y7tr0eja27nVkA.jpg`, brand: "روماند", brandSlug: "romand", categorySlug: "makeup", rating: 4, reviews: 27, badge: "37%", tags: ["trending", "new", "makeup-lips"] }),
    p("f3", { name: "مقشر وجه فيتامين سي من كوزمو", description: "تفتيح وإشراق الوجه", price: 12.36, originalPrice: 25.0, image: `${SALLA}/7d778ffe-2fc9-443f-9d8f-3824bff593e0-375x500-scOhGc7ytUI6E5lirQtpu6rAzWymFYonWohJmlJD.jpg`, brand: "كوزمو", brandSlug: "cosmo", categorySlug: "skincare", rating: 4, reviews: 89, badge: "51%", tags: ["bestseller", "recommended"] }),
    p("f4", { name: "بخاخ العناية بالبشرة الدهنية - ماء الورد", description: "ترطيب خفيف ومنعش", price: 78.05, originalPrice: 130.08, image: `${SALLA}/7c5abb2c-499b-44f1-8ab2-ef39c4e2fd6f-375x500-1fDYm5vFt3RY2YViKAdpGmBhQFaMnuMVVhLpENO0.jpg`, brand: "بيوتي سيستم", categorySlug: "oily", rating: 5, reviews: 44, badge: "40%", tags: ["recommended", "new"] }),
    p("f5", { name: "مجموعة شامبو فيشي ضد القشرة", description: "تخلصي من القشرة نهائياً", price: 70.23, originalPrice: 82.63, image: `${SALLA}/7b3d7814-0d90-4279-ba58-f94b95e3cd20-500x500-OIpTfeB4sLpjv5ueeBdsApby5tdHBGCL4rjVI3J2.png`, brand: "فيشي", categorySlug: "hair", rating: 4, reviews: 52, badge: "15%", tags: ["bestseller"] }),
    p("f6", { name: "مجموعة زيت جونسون و لوشن مرطب للجسم", description: "ترطيب عميق وتغذية للجلد", price: 22.28, originalPrice: 36.32, image: `${SALLA}/6a5c4ed0-e976-40be-8952-73f517d291bf-500x500-Wp04ekG45vD1TDGnagWTjENQPfmrJwl2VmGSXEBe.png`, brand: "جونسون", categorySlug: "body", rating: 5, reviews: 121, badge: "39%", tags: ["bestseller", "recommended"] }),
    p("f7", { name: "مجموعة تفتيح وتنعيم الجسم من كوزمو", description: "بشرة ناعمة وموحدة اللون", price: 21.39, originalPrice: 44.08, image: `${SALLA}/8c5460c6-e3b1-4a77-bac5-8c16e46fbd78-500x500-Dan6tJXgknXeQvhdv3RbdkKfJRFWyahS7iV6hXoM.png`, brand: "كوزمو", brandSlug: "cosmo", categorySlug: "body", rating: 4, reviews: 77, badge: "51%", tags: ["trending"] }),
    p("f8", { name: "مجموعة شامبو و تونيك خل التفاح من اجيفا", description: "تقوية الشعر وتنشيطه", price: 39.56, originalPrice: 79.01, image: `${SALLA}/12fba0c8-8b3a-4874-9dfc-5802ee3e2350-500x500-ENYgQ7mXCuvilGNjl2zhxjE4R2XKHmkU5jfAahhZ.png`, brand: "اجيفا", brandSlug: "agiva", categorySlug: "hair", rating: 4, reviews: 38, badge: "50%", tags: ["new"] }),
    p("h1", { name: "جهاز تجعيد الشعر من سل تيك - حراري احترافي", description: "تجعيد ثابت وجذاب", price: 138, originalPrice: 200, image: `${SALLA}/0c13c04f-fece-481d-8a81-45d8cc2d893c-375x500-iHj3j6pAE0fqGKkVyY5XLlfoLBp6erFf1Nvg6aE4.jpg`, brand: "سل تيك", categorySlug: "devices", rating: 5, reviews: 45, badge: "31%", tags: ["bestseller", "devices"] }),
    p("h2", { name: "جهاز تدليك فروة الرأس الكهربائي", description: "ينشط الدورة الدموية", price: 149.5, originalPrice: 210, image: `${SALLA}/6db7bbc9-a63b-4d4a-8a01-0979316f1a7c-500x500-YQl1HBwM9KRJ23J0Mc1Rx7bcpirEO7f3KuIz0Su4.png`, brand: "بيوتي تيك", categorySlug: "devices", rating: 4, reviews: 31, badge: "29%", tags: ["trending", "devices"] }),
    p("h3", { name: "جهاز تصفيف الشعر متعدد الاستخدامات 5 في 1", description: "مجفف + مجعد + مفرود", price: 391, originalPrice: 550, image: `${SALLA}/d9f53f7e-aa3a-46a5-94b3-2b114db69698-375x500-O0jnY9YR6MELxbDUPgPK5UoARzoC5OoqfvaYYMtQ.jpg`, brand: "إيدجو", categorySlug: "devices", rating: 5, reviews: 62, badge: "29%", tags: ["recommended", "devices"] }),
    p("h4", { name: "بخاخ مرطب للوجه من بيوتي سيستم", description: "ترطيب فوري للبشرة", price: 12.36, originalPrice: 29.67, image: `${SALLA}/c2e9851e-7f16-429a-b5ff-bcf66ffafca2-375x500-F8MCc9QnD3huhWDUpC4aAGPbdqflaJwUImNOgDei.jpg`, brand: "بيوتي سيستم", categorySlug: "skincare", rating: 4, reviews: 19, badge: "58%", tags: ["new"] }),
    p("h5", { name: "مجموعة ليب كومبو نود من باستل", description: "قلم شفاه + رج شفاه", price: 43.13, originalPrice: 69, image: `${SALLA}/1aeb057c-0093-4dbc-89e0-314c9bd74483-500x500-mHTp8YGHMhVE9FmibyD5Pg3CBCi1GbqjSoq5eJg3.png`, brand: "باستل", brandSlug: "pastel", categorySlug: "makeup", subcategory: "makeup-lips", rating: 5, reviews: 88, badge: "37%", tags: ["bestseller", "makeup-lips"] }),
    p("h6", { name: "مجموعة العناية بالطفل + شنطة تنظيم مجاناً", description: "تنظيف وترطيب لطيف للأطفال", price: 48.48, originalPrice: 113.46, image: `${SALLA}/67fea666-46e8-4097-8fa7-870cbe33de92-500x500-gZBsUEu9pZ0xrG7OTvXvqpctunXBJJaiR5hEh5Qq.png`, brand: "جونسون", categorySlug: "skincare", rating: 5, reviews: 43, badge: "57%", tags: ["gifts"] }),
    p("h7", { name: "زيت ميسيلار مزيل مكياج مع قطن", description: "يزيل المكياج بلطف وفعالية", price: 18.41, originalPrice: 34.64, image: `${SALLA}/4923d723-046f-45a4-9092-31861cf8dd07-500x500-N6VdmmcrZhFUNJViIXsEOXs9OyVqISRA2RqhvbEo.png`, brand: "باستل", brandSlug: "pastel", categorySlug: "makeup", subcategory: "makeup-remover", rating: 4, reviews: 56, badge: "47%", tags: ["recommended", "makeup-remover"] }),
    p("h8", { name: "مجموعة الشفاه الكوريه بيري نود من روماند", description: "درجات بيري النود الجمالية", price: 99.33, originalPrice: 157.67, image: `${SALLA}/89195991-ca68-4372-8e56-23a503b9606e-375x500-tZ9EII77bzi2Nr4FthIj3pZXBAFQVjICIMfNeCCP.jpg`, brand: "روماند", brandSlug: "romand", categorySlug: "makeup", rating: 5, reviews: 24, badge: "37%", tags: ["trending", "makeup-lips"] }),
    p("m1", { name: "مجموعة ماسكارا ميبيلين وبيج ان بلاك باستل", description: "رموش كثيفة وطويلة", price: 56.1, originalPrice: 74.54, image: `${SALLA}/eecec3e4-0db2-4a87-b389-50fa318fdbec-500x500-hczTZhpfv730b6GIsO7yRhltKbiZGBhqQFD7ijoc.png`, brand: "ميبيلين + باستل", brandSlug: "pastel", categorySlug: "makeup", subcategory: "makeup-eyes", rating: 5, reviews: 93, badge: "25%", tags: ["bestseller", "makeup-eyes"] }),
    p("m2", { name: "كفر جوال هايلي حامل لمرطب الشفاه", description: "أنيق وعملي", price: 57.5, originalPrice: 115, image: `${SALLA}/76543f0d-72cb-48b6-b316-e1ff322fe050-375x500-4uEjTwgRtc28DHaCF9paYK99rp2u6UTcfRhQXOWD.jpg`, brand: "هايلي", categorySlug: "makeup", rating: 4, reviews: 17, badge: "50%", tags: ["new"] }),
    p("1", { name: "كريم مرطب LANEIGE بالسيتيلا الكورية للبشرة الجافة", description: "كريم مرطب فاخر مصنوع من مستخلص السيتيلا الكوري. يساعد على ترطيب البشرة لمدة 24 ساعة.", price: 89, originalPrice: 120, image: `${SALLA}/7c5abb2c-499b-44f1-8ab2-ef39c4e2fd6f-375x500-1fDYm5vFt3RY2YViKAdpGmBhQFaMnuMVVhLpENO0.jpg`, images: [`${SALLA}/7c5abb2c-499b-44f1-8ab2-ef39c4e2fd6f-375x500-1fDYm5vFt3RY2YViKAdpGmBhQFaMnuMVVhLpENO0.jpg`, `${SALLA}/7d778ffe-2fc9-443f-9d8f-3824bff593e0-375x500-scOhGc7ytUI6E5lirQtpu6rAzWymFYonWohJmlJD.jpg`], brand: "LANEIGE", brandSlug: "laneige", categorySlug: "korean", rating: 5, reviews: 234, badge: "الأكثر مبيعاً", features: ["مرطب 24 ساعة", "خالي من البارابين", "مناسب للبشرة الحساسة"], tags: ["bestseller", "korean"] }),
    p("2", { name: "سيروم فيتامين سي COSMO للوجه", description: "سيروم مركز لتفتيح البشرة وتوحيد لونها", price: 65, originalPrice: 95, image: `${SALLA}/7d778ffe-2fc9-443f-9d8f-3824bff593e0-375x500-scOhGc7ytUI6E5lirQtpu6rAzWymFYonWohJmlJD.jpg`, brand: "COSMO", brandSlug: "cosmo", categorySlug: "skincare", rating: 4, reviews: 128, tags: ["recommended"] }),
    p("3", { name: "واقي الشمس BEESLINE SPF50+", description: "حماية عالية من أشعة الشمس", price: 75, originalPrice: 110, image: `${SALLA}/c2e9851e-7f16-429a-b5ff-bcf66ffafca2-375x500-F8MCc9QnD3huhWDUpC4aAGPbdqflaJwUImNOgDei.jpg`, brand: "BEESLINE", brandSlug: "beesline", categorySlug: "sunscreen", rating: 5, reviews: 312, tags: ["bestseller", "summer"] }),
    p("4", { name: "قناع الوجه الكوري MEDICUBE بالكولاجين", description: "قناع مغذي للبشرة", price: 12, originalPrice: 20, image: `${SALLA}/6feae384-d084-4a74-80b5-710f5c72f362-500x500-u9tl6ADgpVnwuMtRfH0DNsTWWbrJkAxN0DmLJFyE.png`, brand: "MEDICUBE", brandSlug: "medicube", categorySlug: "korean", rating: 4, reviews: 89, tags: ["new", "korean"] }),
    p("5", { name: "مرطب الشفاه Vaseline الأصلي", description: "ترطيب فوري للشفاه", price: 18.5, image: `${SALLA}/9152ab7f-6693-4826-bb12-11b4a413fd5a-375x500-ykEjhbDqunzgN7c8VX1hO5n32kuVwPTrHFMUXvEW.jpg`, brand: "Vaseline", brandSlug: "vaseline", categorySlug: "skincare", rating: 5, reviews: 567, tags: ["bestseller"] }),
    p("6", { name: "غسول الوجه بالسيليسيليك أسيد COSMO", description: "تنظيف عميق للمسام", price: 55, originalPrice: 75, image: `${SALLA}/8c5460c6-e3b1-4a77-bac5-8c16e46fbd78-500x500-Dan6tJXgknXeQvhdv3RbdkKfJRFWyahS7iV6hXoM.png`, brand: "COSMO", brandSlug: "cosmo", categorySlug: "skincare", rating: 4, reviews: 201, tags: ["recommended"] }),
    p("7", { name: "كريم العيون المضاد للتجاعيد LANEIGE", description: "عناية متكاملة لمنطقة العين", price: 129, originalPrice: 180, image: `${SALLA}/7b3d7814-0d90-4279-ba58-f94b95e3cd20-500x500-OIpTfeB4sLpjv5ueeBdsApby5tdHBGCL4rjVI3J2.png`, brand: "LANEIGE", brandSlug: "laneige", categorySlug: "korean", rating: 5, reviews: 145, tags: ["trending"] }),
    p("8", { name: "تونر الماء للبشرة المختلطة AGIVA", description: "توازن وترطيب للبشرة", price: 48, image: `${SALLA}/12fba0c8-8b3a-4874-9dfc-5802ee3e2350-500x500-ENYgQ7mXCuvilGNjl2zhxjE4R2XKHmkU5jfAahhZ.png`, brand: "AGIVA", brandSlug: "agiva", categorySlug: "mixed", rating: 4, reviews: 78, tags: ["new"] }),
    p("9", { name: "مقشر الجسم الطبيعي بالملح COSMO", description: "تقشير لطيف ونعومة فائقة", price: 42, originalPrice: 65, image: `${SALLA}/6a5c4ed0-e976-40be-8952-73f517d291bf-500x500-Wp04ekG45vD1TDGnagWTjENQPfmrJwl2VmGSXEBe.png`, brand: "COSMO", brandSlug: "cosmo", categorySlug: "body", rating: 4, reviews: 134, tags: ["recommended"] }),
    p("10", { name: "زيت الأرغان المغربي الأصلي AGIVA", description: "تغذية عميقة للشعر والبشرة", price: 78, originalPrice: 100, image: `${SALLA}/0c13c04f-fece-481d-8a81-45d8cc2d893c-375x500-iHj3j6pAE0fqGKkVyY5XLlfoLBp6erFf1Nvg6aE4.jpg`, brand: "AGIVA", brandSlug: "agiva", categorySlug: "hair", rating: 5, reviews: 223, tags: ["bestseller"] }),
    p("11", { name: "ماسك الطمي المنقي للمسام MEDICUBE", description: "تنظيف عميق للمسام", price: 95, originalPrice: 150, image: `${SALLA}/6db7bbc9-a63b-4d4a-8a01-0979316f1a7c-500x500-YQl1HBwM9KRJ23J0Mc1Rx7bcpirEO7f3KuIz0Su4.png`, brand: "MEDICUBE", brandSlug: "medicube", categorySlug: "korean", rating: 5, reviews: 189, badge: "خصم 37%", tags: ["trending", "korean"] }),
    p("12", { name: "كريم SPF للبشرة الحساسة BEESLINE", description: "حماية لطيفة للبشرة الحساسة", price: 85, originalPrice: 120, image: `${SALLA}/d9f53f7e-aa3a-46a5-94b3-2b114db69698-375x500-O0jnY9YR6MELxbDUPgPK5UoARzoC5OoqfvaYYMtQ.jpg`, brand: "BEESLINE", brandSlug: "beesline", categorySlug: "sensitive", rating: 5, reviews: 276, tags: ["recommended", "summer"] }),
    p("o1", { name: "سيروم الليلة بالريتينول MEDICUBE", description: "تجديد البشرة أثناء النوم", price: 95, originalPrice: 150, image: `${SALLA}/6feae384-d084-4a74-80b5-710f5c72f362-500x500-u9tl6ADgpVnwuMtRfH0DNsTWWbrJkAxN0DmLJFyE.png`, brand: "MEDICUBE", brandSlug: "medicube", categorySlug: "korean", rating: 5, reviews: 189, badge: "خصم 37%", tags: ["summer", "online", "offer"] }),
    p("o2", { name: "مجموعة العناية الكاملة SALTRAIN", description: "عناية شاملة بالفم", price: 135, originalPrice: 210, image: `${SALLA}/eecec3e4-0db2-4a87-b389-50fa318fdbec-500x500-hczTZhpfv730b6GIsO7yRhltKbiZGBhqQFD7ijoc.png`, brand: "SALTRAIN", brandSlug: "saltrain", categorySlug: "oral", rating: 4, reviews: 92, badge: "خصم 36%", tags: ["summer", "1plus1", "offer"] }),
    p("o3", { name: "كريم الشمس الملون للوجه BEESLINE", description: "حماية وتغطية خفيفة", price: 85, originalPrice: 120, image: `${SALLA}/c2e9851e-7f16-429a-b5ff-bcf66ffafca2-375x500-F8MCc9QnD3huhWDUpC4aAGPbdqflaJwUImNOgDei.jpg`, brand: "BEESLINE", brandSlug: "beesline", categorySlug: "sunscreen", rating: 5, reviews: 276, badge: "خصم 29%", tags: ["summer", "half", "offer"] }),
    p("o4", { name: "مقشر الجسم بالسكر COSMO", description: "بشرة ناعمة ومشرقة", price: 42, originalPrice: 65, image: `${SALLA}/8c5460c6-e3b1-4a77-bac5-8c16e46fbd78-500x500-Dan6tJXgknXeQvhdv3RbdkKfJRFWyahS7iV6hXoM.png`, brand: "COSMO", brandSlug: "cosmo", categorySlug: "body", rating: 4, reviews: 134, badge: "خصم 35%", tags: ["summer", "gifts", "offer"] }),
    p("o5", { name: "زيت الأرجان للشعر AGIVA", description: "لمعان وقوة للشعر", price: 78, originalPrice: 100, image: `${SALLA}/0c13c04f-fece-481d-8a81-45d8cc2d893c-375x500-iHj3j6pAE0fqGKkVyY5XLlfoLBp6erFf1Nvg6aE4.jpg`, brand: "AGIVA", brandSlug: "agiva", categorySlug: "hair", rating: 5, reviews: 223, badge: "خصم 22%", tags: ["summer", "offer"] }),
    p("o6", { name: "غسول الوجه المنقي COSMO", description: "تنظيف يومي لطيف", price: 55, originalPrice: 80, image: `${SALLA}/7d778ffe-2fc9-443f-9d8f-3824bff593e0-375x500-scOhGc7ytUI6E5lirQtpu6rAzWymFYonWohJmlJD.jpg`, brand: "COSMO", brandSlug: "cosmo", categorySlug: "skincare", rating: 4, reviews: 167, badge: "خصم 31%", tags: ["summer", "online", "offer"] }),
    p("o7", { name: "ماسك الطمي المنقي MEDICUBE", description: "مسام نظيفة ومشرقة", price: 68, originalPrice: 95, image: `${SALLA}/6db7bbc9-a63b-4d4a-8a01-0979316f1a7c-500x500-YQl1HBwM9KRJ23J0Mc1Rx7bcpirEO7f3KuIz0Su4.png`, brand: "MEDICUBE", brandSlug: "medicube", categorySlug: "korean", rating: 5, reviews: 201, badge: "خصم 28%", tags: ["summer", "offer"] }),
    p("o8", { name: "كريم مرطب الجسم الفاخر LANEIGE", description: "ترطيب عميق للجسم", price: 45, originalPrice: 70, image: `${SALLA}/6a5c4ed0-e976-40be-8952-73f517d291bf-500x500-Wp04ekG45vD1TDGnagWTjENQPfmrJwl2VmGSXEBe.png`, brand: "LANEIGE", brandSlug: "laneige", categorySlug: "body", rating: 4, reviews: 145, badge: "خصم 36%", tags: ["summer", "half", "offer"] }),
    p("pf1", { name: "عطر نسائي فاخر - روز إليجانس", description: "عطر زهري أنيق يدوم طويلاً", price: 189, originalPrice: 249, image: `${SALLA}/76543f0d-72cb-48b6-b316-e1ff322fe050-375x500-4uEjTwgRtc28DHaCF9paYK99rp2u6UTcfRhQXOWD.jpg`, brand: "سحر", categorySlug: "perfume", subcategory: "perfume-women", rating: 5, reviews: 67, badge: "24%", tags: ["perfume-women", "bestseller"] }),
    p("pf2", { name: "عطر شعر وجسم - فانيلا دريم", description: "رائحة دافئة ومميزة", price: 79, originalPrice: 110, image: `${SALLA}/1aeb057c-0093-4dbc-89e0-314c9bd74483-500x500-mHTp8YGHMhVE9FmibyD5Pg3CBCi1GbqjSoq5eJg3.png`, brand: "سحر", categorySlug: "perfume", subcategory: "perfume-hair", rating: 4, reviews: 45, tags: ["perfume-hair", "trending"] }),
    p("pf3", { name: "عطر صلب - بيري بلوسوم", description: "عطر صلب سهل الحمل", price: 45, originalPrice: 65, image: `${SALLA}/4923d723-046f-45a4-9092-31861cf8dd07-500x500-N6VdmmcrZhFUNJViIXsEOXs9OyVqISRA2RqhvbEo.png`, brand: "سحر", categorySlug: "perfume", subcategory: "perfume-solid", rating: 5, reviews: 32, tags: ["perfume-solid", "new"] }),
    p("pf4", { name: "عطر أطفال - سوفت بيبي", description: "رائحة لطيفة وآمنة للأطفال", price: 55, image: `${SALLA}/67fea666-46e8-4097-8fa7-870cbe33de92-500x500-gZBsUEu9pZ0xrG7OTvXvqpctunXBJJaiR5hEh5Qq.png`, brand: "سحر", categorySlug: "perfume", subcategory: "perfume-kids", rating: 5, reviews: 28, tags: ["perfume-kids"] }),
    p("pf5", { name: "عطر ميني - تروفيل كولكشن", description: "مجموعة عطور ميني فاخرة", price: 99, originalPrice: 149, image: `${SALLA}/89195991-ca68-4372-8e56-23a503b9606e-375x500-tZ9EII77bzi2Nr4FthIj3pZXBAFQVjICIMfNeCCP.jpg`, brand: "سحر", categorySlug: "perfume", subcategory: "perfume-mini", rating: 4, reviews: 56, badge: "33%", tags: ["perfume-mini", "gifts"] }),
    p("pf6", { name: "معطر منزل وسيارة - أوشن بريز", description: "انتعاش يدوم لأسابيع", price: 35, originalPrice: 50, image: `${SALLA}/d62a838c-81b0-492e-b042-605831771b32-500x500-ntDfEjt7RJb6KBo21I7KkbG7m1YDSDqWAY2dVMRZ.png`, brand: "سحر", categorySlug: "perfume", subcategory: "perfume-home", rating: 4, reviews: 89, tags: ["perfume-home", "recommended"] }),
    p("pf7", { name: "فحم وبخور - عود ملكي", description: "بخور فاخر برائحة العود", price: 65, originalPrice: 85, image: `${SALLA}/95de0bfe-eab2-474d-b96d-e1ac66309983-500x500-v9gJPllkx94lEkdTRxzvPVy7GTTAcVZ8OYugqtNb.png`, brand: "سحر", categorySlug: "perfume", subcategory: "perfume-incense", rating: 5, reviews: 112, tags: ["perfume-incense", "bestseller"] }),
    p("mk1", { name: "عدسات ملونة يومية - درجة هازل", description: "عدسات لاصقة مريحة للعين", price: 89, originalPrice: 120, image: `${SALLA}/76543f0d-72cb-48b6-b316-e1ff322fe050-375x500-4uEjTwgRtc28DHaCF9paYK99rp2u6UTcfRhQXOWD.jpg`, brand: "سحر", categorySlug: "makeup", subcategory: "makeup-lenses", rating: 4, reviews: 34, badge: "26%", tags: ["makeup-lenses", "trending"] }),
    p("mk2", { name: "عدسات ملونة - درجة رمادي فاتح", description: "لون طبيعي يدوم 12 ساعة", price: 95, originalPrice: 130, image: `${SALLA}/89195991-ca68-4372-8e56-23a503b9606e-375x500-tZ9EII77bzi2Nr4FthIj3pZXBAFQVjICIMfNeCCP.jpg`, brand: "سحر", categorySlug: "makeup", subcategory: "makeup-lenses", rating: 5, reviews: 28, tags: ["makeup-lenses", "new"] }),
    p("mk3", { name: "طقم فرش مكياج احترافي - 12 قطعة", description: "فرش ناعمة للوجه والعيون", price: 79, originalPrice: 110, image: `${SALLA}/eecec3e4-0db2-4a87-b389-50fa318fdbec-500x500-hczTZhpfv730b6GIsO7yRhltKbiZGBhqQFD7ijoc.png`, brand: "باستل", brandSlug: "pastel", categorySlug: "makeup", subcategory: "makeup-brushes", rating: 5, reviews: 67, badge: "28%", tags: ["makeup-brushes", "bestseller"] }),
    p("mk4", { name: "اسفنجة مكياج بيضاوية - 3 قطع", description: "توزيع متساوي للكريم والكونسيلر", price: 25, originalPrice: 40, image: `${SALLA}/1aeb057c-0093-4dbc-89e0-314c9bd74483-500x500-mHTp8YGHMhVE9FmibyD5Pg3CBCi1GbqjSoq5eJg3.png`, brand: "باستل", brandSlug: "pastel", categorySlug: "makeup", subcategory: "makeup-brushes", rating: 4, reviews: 45, tags: ["makeup-brushes", "recommended"] }),
    p("kr1", { name: "سيروم فيتامين سي من كي سيكرت", description: "إشراق وتفتيح للبشرة", price: 89, originalPrice: 120, image: `${SALLA}/7d778ffe-2fc9-443f-9d8f-3824bff593e0-375x500-scOhGc7ytUI6E5lirQtpu6rAzWymFYonWohJmlJD.jpg`, brand: "كي سيكرت", brandSlug: "ksecret", categorySlug: "korean", rating: 5, reviews: 156, badge: "26%", tags: ["korean", "bestseller"] }),
    p("kr2", { name: "تونر الأرز من أنوا", description: "تنظيف لطيف وترطيب", price: 72, originalPrice: 95, image: `${SALLA}/7c5abb2c-499b-44f1-8ab2-ef39c4e2fd6f-375x500-1fDYm5vFt3RY2YViKAdpGmBhQFaMnuMVVhLpENO0.jpg`, brand: "أنوا", brandSlug: "anua", categorySlug: "korean", rating: 5, reviews: 203, tags: ["korean", "trending"] }),
    p("kr3", { name: "كريم 345 من دكتور الثيا", description: "علاج حب الشباب والاحمرار", price: 85, originalPrice: 110, image: `${SALLA}/6feae384-d084-4a74-80b5-710f5c72f362-500x500-u9tl6ADgpVnwuMtRfH0DNsTWWbrJkAxN0DmLJFyE.png`, brand: "دكتور الثيا", brandSlug: "dralthea", categorySlug: "korean", rating: 4, reviews: 178, badge: "23%", tags: ["korean", "recommended"] }),
];

export const SITE = {
    name: "سحر",
    fullName: "سحر - أكبر تجمع لمنتجات العناية",
    description: "سحر متجر العناية والجمال الرائد - أكبر تجمع لمستلزمات العناية بالبشرة والجسم والشعر والمكياج",
    url: "https://saher.com.sa",
    phone: "+966573064351",
    whatsapp: "+966573064351",
    email: "roaaleon.marketing@gmail.com",
    commercialRegister: "1010359452",
    taxNumber: "310218485500003",
    logo: "/saher-logo.png",
    vatCertificate: "https://roaaleon.sa/assets/images/RRdGالشهاده الضريبيه (1).pdf",
    vatImage: "https://roaaleon.sa/assets/vat.jpg",
    social: {
        instagram: "",
        snapchat: "",
        tiktok: "",
        facebook: "https://www.facebook.com",
        twitter: "https://www.twitter.com",
        youtube: "https://www.youtube.com",
        linkedin: "https://www.linkedin.com",
    },
    apps: {
        ios: "",
        android: "",
    },
};

export function getProductById(id: string): Product | undefined {
    return products.find((p) => p.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
    return categories.find((c) => c.slug === slug);
}

export function getBrandBySlug(slug: string): Brand | undefined {
    return brands.find((b) => b.slug === slug);
}

export function getProductsByCategory(slug: string): Product[] {
    return products.filter((p) => p.categorySlug === slug || p.tags?.includes(slug));
}

export function getProductsByBrand(slug: string): Product[] {
    return products.filter((p) => p.brandSlug === slug);
}

export function getProductsByTag(tag: string): Product[] {
    return products.filter((p) => p.tags?.includes(tag));
}

export function getProductsBySubcategory(sub: string): Product[] {
    return products.filter((p) => p.subcategory === sub || p.tags?.includes(sub));
}

export function getOfferProducts(): Product[] {
    return products.filter((p) => p.tags?.includes("offer") || p.tags?.includes("summer") || p.originalPrice);
}

export function searchProducts(query: string): Product[] {
    const q = query.toLowerCase().trim();
    if (!q) return [];
    return products.filter(
        (p) =>
            p.name.toLowerCase().includes(q) ||
            p.brand?.toLowerCase().includes(q) ||
            p.description?.toLowerCase().includes(q)
    );
}

export function sortProducts(list: Product[], sort: string): Product[] {
    const copy = [...list];
    switch (sort) {
        case "السعر: من الأقل":
            return copy.sort((a, b) => a.price - b.price);
        case "السعر: من الأعلى":
            return copy.sort((a, b) => b.price - a.price);
        case "الأحدث":
            return copy.sort((a, b) => (b.tags?.includes("new") ? 1 : 0) - (a.tags?.includes("new") ? 1 : 0));
        case "الأعلى تقييماً":
            return copy.sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0));
        default:
            return copy.sort((a, b) => (b.tags?.includes("bestseller") ? 1 : 0) - (a.tags?.includes("bestseller") ? 1 : 0));
    }
}

export const summerOffers = products.filter((p) => p.tags?.includes("summer")).slice(0, 8);
export const featuredProducts = products.filter((p) => ["f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8"].includes(p.id));
export const hairProducts = products.filter((p) => ["h1", "h2", "h3", "h4", "h5", "h6", "h7", "h8"].includes(p.id));
export const bestsellerProducts = getProductsByTag("bestseller");
export const trendingProducts = getProductsByTag("trending");
export const newProducts = getProductsByTag("new");
export const recommendedProducts = getProductsByTag("recommended");
