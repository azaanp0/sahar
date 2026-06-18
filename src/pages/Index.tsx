import { useState } from "react";
import { Link } from "react-router-dom";
import AnnouncementBar from "@/components/AnnouncementBar";
import HeroSlider from "@/components/home/HeroSlider";
import CategoryBar from "@/components/home/CategoryBar";
import BannerSection from "@/components/BannerSection";
import BrandCarousel from "@/components/BrandCarousel";
import ProductSection from "@/components/ProductSection";
import TabbedProductSection from "@/components/TabbedProductSection";
import ProductCard from "@/components/ProductCard";
import PageLayout from "@/components/PageLayout";
import MetaTags from "@/components/seo/MetaTags";
import { handleImageError } from "@/lib/imageHandler";
import { proxyImageUrl } from "@/lib/imageProxy";
// المكونات الجديدة
import FlashSaleSection from "@/components/home/FlashSaleSection";
import SpecialOffersSection from "@/components/home/SpecialOffersSection";
import BestSellersSection from "@/components/home/BestSellersSection";
import TrendingProductsSection from "@/components/home/TrendingProductsSection";
import NewArrivalsSection from "@/components/home/NewArrivalsSection";
import FeaturedProductsSection from "@/components/home/FeaturedProductsSection";
import RecommendedSection from "@/components/home/RecommendedSection";
import OffersSection from "@/components/home/OffersSection";
import SkinTypeSection from "@/components/home/SkinTypeSection";
import KoreanBeautySection from "@/components/home/KoreanBeautySection";
import MakeupSection from "@/components/home/MakeupSection";
import PerfumeSection from "@/components/home/PerfumeSection";
import BeautyQuizBanner from "@/components/home/BeautyQuizBanner";
import LoyaltyProgramSection from "@/components/home/LoyaltyProgramSection";
import InstagramGallery from "@/components/home/InstagramGallery";
import CustomerReviewsSection from "@/components/home/CustomerReviewsSection";
import BlogSection from "@/components/home/BlogSection";
import NewsletterSection from "@/components/home/NewsletterSection";
import FeaturesSection from "@/components/home/FeaturesSection";
import AppDownloadBanner from "@/components/home/AppDownloadBanner";
import {
    summerOffers,
    featuredProducts,
    hairProducts,
    bestsellerProducts,
    trendingProducts,
    newProducts,
    recommendedProducts,
    getProductsByTag,
    getProductsBySubcategory,
    getProductsByBrand,
    products,
} from "@/data/catalog";

const CDN = "https://cdn.files.salla.network/homepage/1945128061";

const giftsBanner = [{ image: `${CDN}/1a49d4eb-7c8b-406c-8249-fb9df2110eac.webp`, href: "/offers", alt: "ودك بهدايا مجانية" }];
const deliveryBanner = [{ image: `${CDN}/63b4c8df-0904-4183-9cd8-de6a8de93951.webp`, href: "/offers", alt: "توصيل مجاني" }];
const summerBrands = [
    { image: `${CDN}/010315dc-b2e5-4593-8180-f0045fb58fdf.webp`, href: "/brand/pastel", alt: "باستل" },
    { image: `${CDN}/3daf2c63-d173-47f3-886c-df7a51e7b106.webp`, href: "/brand/cosmo", alt: "كوزمو" },
    { image: `${CDN}/0a561bb8-74f8-407c-a38f-5f025978fe36.webp`, href: "/brand/beesline", alt: "بيسلاين" },
    { image: `${CDN}/b66c579e-6abb-4277-aaba-3034da10cc91.webp`, href: "/brand/romand", alt: "روماند" },
    { image: `${CDN}/79effd43-090e-4b34-a347-d2d8db5dac2c.webp`, href: "/brands", alt: "صالت رين" },
    { image: `${CDN}/606f4f69-32d4-44ef-b2be-f0278d8c6267.webp`, href: "/category/tan", alt: "سيلف تان" },
];

const Index = () => {
    // Mock data for special offers
    const specialOffers = [
        {
            id: "1",
            type: "discount" as const,
            title: "خصم 50%",
            description: "على جميع منتجات العناية بالبشرة",
            image: "https://cdn.files.salla.network/homepage/1945128061/58552c94-ff77-4839-9a1b-1ff5cc719110.webp",
            products: summerOffers.slice(0, 4),
        },
        {
            id: "2",
            type: "1plus1" as const,
            title: "1+1 مجاني",
            description: "على منتجات المكياج المختارة",
            image: "https://cdn.files.salla.network/homepage/1945128061/50ded52f-5ded-4148-b1c7-f51ea016a4b9.webp",
            products: products.filter(p => p.categorySlug === "makeup").slice(0, 4),
        },
        {
            id: "3",
            type: "gift" as const,
            title: "هدية مجانية",
            description: "مع كل طلب فوق 199 ريال",
            image: "https://cdn.files.salla.network/homepage/1945128061/b48162e1-f523-468f-a5a6-7c2914f69c73.webp",
            products: products.slice(0, 4),
        },
        {
            id: "4",
            type: "bundle" as const,
            title: "باقة العناية",
            description: "منتجات متكاملة للعناية بالبشرة",
            image: "https://cdn.files.salla.network/homepage/1945128061/e90fa198-e472-4e11-80ff-9769f4488552.webp",
            products: products.filter(p => p.categorySlug === "skincare").slice(0, 4),
        },
    ];

    // Mock data for Instagram posts
    const instagramPosts = [
        { id: "1", image: "https://cdn.files.salla.network/homepage/1945128061/010315dc-b2e5-4593-8180-f0045fb58fdf.webp", url: "https://instagram.com/sahar.sa" },
        { id: "2", image: "https://cdn.files.salla.network/homepage/1945128061/02388ca7-3c78-4e67-9540-f6d1a819a281.webp", url: "https://instagram.com/sahar.sa" },
        { id: "3", image: "https://cdn.files.salla.network/homepage/1945128061/033caa56-88bf-4305-84f7-3f4abf7458f0.webp", url: "https://instagram.com/sahar.sa" },
        { id: "4", image: "https://cdn.files.salla.network/homepage/1945128061/0a561bb8-74f8-407c-a38f-5f025978fe36.webp", url: "https://instagram.com/sahar.sa" },
        { id: "5", image: "https://cdn.files.salla.network/homepage/1945128061/3daf2c63-d173-47f3-886c-df7a51e7b106.webp", url: "https://instagram.com/sahar.sa" },
        { id: "6", image: "https://cdn.files.salla.network/homepage/1945128061/606f4f69-32d4-44ef-b2be-f0278d8c6267.webp", url: "https://instagram.com/sahar.sa" },
    ];

    // Mock data for customer reviews
    const customerReviews = [
        {
            id: "1",
            name: "سارة أحمد",
            rating: 5,
            text: "منتجات رائعة وجودة عالية، التوصيل سريع جداً. أنصح الجميع بالشراء من سحر.",
            date: "2024-01-15",
        },
        {
            id: "2",
            name: "نورة محمد",
            rating: 5,
            text: "تجربة ممتازة، المنتجات أصلية والأسعار مناسبة. سأعود للشراء مرة أخرى.",
            date: "2024-01-10",
        },
        {
            id: "3",
            name: "فاطمة علي",
            rating: 4,
            text: "منتجات جيدة لكن التوصيل تأخر قليلاً. بشكل عام تجربة مرضية.",
            date: "2024-01-05",
        },
    ];

    // Mock data for blog posts
    const blogPosts = [
        {
            id: "1",
            title: "أفضل روتين للعناية بالبشرة في الصيف",
            excerpt: "اكتشفي أفضل المنتجات للعناية ببشرتك خلال فصل الصيف",
            image: "https://cdn.files.salla.network/homepage/1945128061/58552c94-ff77-4839-9a1b-1ff5cc719110.webp",
            date: "2024-01-15",
            readTime: "5 دقائق",
            slug: "summer-skincare-routine",
        },
        {
            id: "2",
            title: "أسرار الجمال الكوري",
            excerpt: "تعرفي على أسرار العناية الكورية للبشرة المثالية",
            image: "https://cdn.files.salla.network/homepage/1945128061/50ded52f-5ded-4148-b1c7-f51ea016a4b9.webp",
            date: "2024-01-10",
            readTime: "7 دقائق",
            slug: "korean-beauty-secrets",
        },
        {
            id: "3",
            title: "كيف تختارين المكياج المناسب لبشرتك",
            excerpt: "دليل شامل لاختيار المكياج المناسب لنوع بشرتك",
            image: "https://cdn.files.salla.network/homepage/1945128061/b48162e1-f523-468f-a5a6-7c2914f69c73.webp",
            date: "2024-01-05",
            readTime: "6 دقائق",
            slug: "choosing-right-makeup",
        },
    ];

    // Flash sale end time (24 hours from now)
    const flashSaleEndTime = new Date(Date.now() + 24 * 60 * 60 * 1000);

    return (
        <PageLayout title="الرئيسية">
            <h1 className="sr-only">سحر | متجر العناية والجمال – أجمل المنتجات بأفضل الأسعار</h1>
            <MetaTags
                title="سحر | متجر العناية والجمال – أجمل المنتجات بأفضل الأسعار"
                description="تسوقي من سحر أحدث منتجات العناية بالبشرة، المكياج، العطور، والجمال الكوري. شحن سريع، عروض حصرية، وتجربة تسوق فاخرة."
                type="website"
                canonical="https://sahar.sa"
            />

            {/* Essential Sections - Mobile Optimized */}
            {/* 1. Hero Section */}
            <HeroSlider />

            {/* 2. Categories Section */}
            <CategoryBar />

            {/* 3. Flash Sale Section */}
            <FlashSaleSection products={products} endTime={flashSaleEndTime} />

            {/* 4. Special Offers Section */}
            <SpecialOffersSection offers={specialOffers} />

            {/* 5. Best Sellers Section */}
            <BestSellersSection products={products} />

            {/* 6. Trending Products Section */}
            <TrendingProductsSection products={products} />

            {/* 7. New Arrivals Section */}
            <NewArrivalsSection products={products} />

            {/* 8. Customer Reviews */}
            <CustomerReviewsSection reviews={customerReviews} />

            {/* 9. Loyalty Program Section */}
            <LoyaltyProgramSection />

            {/* 10. Brands Section */}
            <BrandCarousel brands={summerBrands} title="ماركات الصيف" showAllHref="/brands" />

            {/* 11. Features Section */}
            <FeaturesSection />

            {/* Desktop-Only Additional Sections */}
            <div className="hidden md:block">
                {/* Featured Products Section */}
                <FeaturedProductsSection products={products} />

                {/* Skin Type Section */}
                <SkinTypeSection />

                {/* Korean Beauty Section */}
                <KoreanBeautySection products={products} />

                {/* Makeup Section */}
                <MakeupSection products={products} />

                {/* Perfume Section */}
                <PerfumeSection products={products} />

                {/* More Banners */}
                <div className="px-4 mb-4"><div className="container mx-auto"><BannerSection items={giftsBanner} cols={1} /></div></div>
                <div className="px-4 mb-6"><div className="container mx-auto"><BannerSection items={deliveryBanner} cols={1} /></div></div>

                {/* Recommended For You Section */}
                <RecommendedSection products={products} />

                {/* Beauty Quiz Banner */}
                <BeautyQuizBanner />

                {/* Instagram Gallery */}
                <InstagramGallery posts={instagramPosts} />

                {/* Blog Section */}
                <BlogSection posts={blogPosts} />

                {/* Newsletter Section */}
                <NewsletterSection />

                {/* App Download Banner */}
                <AppDownloadBanner />

                {/* Additional Products Sections */}
                <ProductSection title="العناية بالشعر والأجهزة" products={hairProducts} showAllHref="/category/devices" />
                <ProductSection title="الأكثر مبيعاً" products={bestsellerProducts} showAllHref="/products" />
            </div>
        </PageLayout>
    );
};

export default Index;
