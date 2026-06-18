import { Link } from "react-router-dom";
import { SITE } from "@/data/catalog";
import { handleImageError } from "@/lib/imageHandler";
import { proxyImageUrl } from "@/lib/imageProxy";
import { Truck, RefreshCw, Shield, Facebook, Instagram, Youtube, Twitter, Mail, Phone, MapPin } from "lucide-react";
import { getSettings } from "@/lib/settings";

const Footer = () => {
    const settings = getSettings();
    
    return (
        <footer className="bg-white dark:bg-gray-800 text-black dark:text-white">
            {/* Top Features Bar */}
            <div className="bg-white dark:bg-gray-800 border-b" style={{ borderColor: settings.accentColor }}>
                <div className="container mx-auto px-4 py-4 md:py-6">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 md:gap-6">
                        <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-[14px] border transition-all duration-300 ease dark:bg-gray-800" style={{ backgroundColor: `${settings.accentColor}15`, borderColor: settings.accentColor }}>
                            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: settings.accentColor }}>
                                <Truck className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-black dark:text-white text-xs md:text-sm">توصيل مجاني</h4>
                                <p className="text-[10px] md:text-xs text-black dark:text-gray-300">للطلبات فوق {settings.shipping.freeThreshold} ريال</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-[14px] border transition-all duration-300 ease dark:bg-gray-800" style={{ backgroundColor: `${settings.accentColor}15`, borderColor: settings.accentColor }}>
                            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: settings.accentColor }}>
                                <RefreshCw className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-black dark:text-white text-xs md:text-sm">إرجاع سهل</h4>
                                <p className="text-[10px] md:text-xs text-black dark:text-gray-300">خلال 15 يوم من الاستلام</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2 md:gap-3 p-3 md:p-4 rounded-[14px] border transition-all duration-300 ease dark:bg-gray-800" style={{ backgroundColor: `${settings.accentColor}15`, borderColor: settings.accentColor }}>
                            <div className="flex-shrink-0 w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: settings.accentColor }}>
                                <Shield className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <div>
                                <h4 className="font-bold text-black dark:text-white text-xs md:text-sm">دفع آمن</h4>
                                <p className="text-[10px] md:text-xs text-black dark:text-gray-300">تشفير SSL 100%</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Footer Content */}
            <div className="container mx-auto px-4 py-8 md:py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 lg:gap-12">

                    {/* Column 1 - Logo & About */}
                    <div className="flex flex-col gap-3 md:gap-4">
                        <Link to="/" className="inline-block">
                            <img
                                src={settings.logoUrl || proxyImageUrl(SITE.logo)}
                                alt={settings.storeName || SITE.name}
                                className="h-10 md:h-12 w-auto object-contain"
                                onError={handleImageError}
                            />
                        </Link>
                        <p className="text-xs md:text-sm leading-relaxed text-black dark:text-gray-200 line-clamp-3">
                            {settings.siteTagline || SITE.description}
                        </p>
                        <div className="text-[10px] md:text-xs space-y-1 text-black dark:text-gray-200 hidden sm:block">
                            {SITE.commercialRegister && (
                                <div className="flex gap-2">
                                    <span className="font-medium">السجل التجاري:</span>
                                    <span>{SITE.commercialRegister}</span>
                                </div>
                            )}
                            {SITE.taxNumber && (
                                <div className="flex gap-2">
                                    <span className="font-medium">الرقم الضريبي:</span>
                                    <span>{SITE.taxNumber}</span>
                                </div>
                            )}
                        </div>
                        
                        {/* Contact Info */}
                        <div className="space-y-2 md:space-y-3 mt-2">
                            <a href={`tel:${settings.phone}`} className="flex items-center gap-2 text-xs md:text-sm text-black dark:text-gray-200 hover:text-[#E91E63] transition-colors duration-300 ease">
                                <Phone className="w-3 h-3 md:w-4 md:h-4" />
                                <span className="text-[10px] md:text-sm">{settings.phone}</span>
                            </a>
                            <a href={`mailto:${settings.email}`} className="flex items-center gap-2 text-xs md:text-sm text-black dark:text-gray-200 hover:text-[#E91E63] transition-colors duration-300 ease">
                                <Mail className="w-3 h-3 md:w-4 md:h-4" />
                                <span className="text-[10px] md:text-sm truncate">{settings.email}</span>
                            </a>
                        </div>

                        {/* Social Media */}
                        <div className="flex items-center gap-2 md:gap-3 mt-3 md:mt-4">
                            <a
                                href={SITE.social?.facebook || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(233,30,99,0.2)] text-black dark:text-white hover:bg-[#E91E63] hover:text-white transition-all duration-300 ease"
                                aria-label="Facebook"
                            >
                                <Facebook className="h-4 w-4 md:h-5 md:w-5" />
                            </a>
                            <a
                                href={SITE.social?.instagram || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(233,30,99,0.2)] text-black dark:text-white hover:bg-[#E91E63] hover:text-white transition-all duration-300 ease"
                                aria-label="Instagram"
                            >
                                <Instagram className="h-4 w-4 md:h-5 md:w-5" />
                            </a>
                            <a
                                href={SITE.social?.youtube || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(233,30,99,0.2)] text-black dark:text-white hover:bg-[#E91E63] hover:text-white transition-all duration-300 ease"
                                aria-label="YouTube"
                            >
                                <Youtube className="h-4 w-4 md:h-5 md:w-5" />
                            </a>
                            <a
                                href={SITE.social?.twitter || "#"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex h-8 w-8 md:h-10 md:w-10 items-center justify-center rounded-full bg-[rgba(233,30,99,0.08)] dark:bg-[rgba(233,30,99,0.2)] text-black dark:text-white hover:bg-[#E91E63] hover:text-white transition-all duration-300 ease"
                                aria-label="Twitter"
                            >
                                <Twitter className="h-4 w-4 md:h-5 md:w-5" />
                            </a>
                        </div>
                    </div>

                    {/* Column 2 - Quick Links */}
                    <div>
                        <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4 text-black dark:text-white">روابط سريعة</h3>
                        <ul className="space-y-2 md:space-y-3">
                            {[
                                { name: "الرئيسية", href: "/" },
                                { name: "العروض الخاصة", href: "/offers" },
                                { name: "الماركات", href: "/brands" },
                                { name: "نظام الولاء", href: "/loyalty" },
                                { name: "برنامج التسويق بالعمولة", href: "/affiliate" },
                                { name: "تتبع طلبك", href: "/track-order" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-xs md:text-sm text-black dark:text-gray-200 hover:text-[#E91E63] transition-colors duration-300 ease flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#E91E63] group-hover:bg-[#C2185B] transition-colors duration-300 ease" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 3 - Customer Service */}
                    <div>
                        <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4 text-black dark:text-white">خدمة العملاء</h3>
                        <ul className="space-y-2 md:space-y-3">
                            {[
                                { name: "تواصل معنا", href: "/contact" },
                                { name: "الشروط والأحكام", href: "/terms" },
                                { name: "سياسة الاستخدام والخصوصية", href: "/privacy" },
                                { name: "سياسة الاسترجاع والإلغاء", href: "/returns" },
                                { name: "سياسة الشحن والتوصيل", href: "/shipping" },
                                { name: "سياسة الضمان والصيانة", href: "/warranty" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-xs md:text-sm text-black dark:text-gray-200 hover:text-[#E91E63] transition-colors duration-300 ease flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#E91E63] group-hover:bg-[#C2185B] transition-colors duration-300 ease" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Column 4 - About & Branches */}
                    <div>
                        <h3 className="font-bold text-base md:text-lg mb-3 md:mb-4 text-black dark:text-white">عن المتجر</h3>
                        <ul className="space-y-2 md:space-y-3">
                            {[
                                { name: "من نحن", href: "/about" },
                                { name: "فروع سحر", href: "/branches" },
                            ].map((link) => (
                                <li key={link.name}>
                                    <Link
                                        to={link.href}
                                        className="text-xs md:text-sm text-black dark:text-gray-200 hover:text-[#E91E63] transition-colors duration-300 ease flex items-center gap-2 group"
                                    >
                                        <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-[#E91E63] group-hover:bg-[#C2185B] transition-colors duration-300 ease" />
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>

                        {/* App Download - Desktop Only */}
                        <div className="mt-4 md:mt-6 hidden md:block">
                            <h4 className="font-semibold text-sm mb-3 text-black dark:text-white">تحميل التطبيق</h4>
                            <div className="flex flex-col gap-2">
                                <a
                                    href={SITE.apps?.ios || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 rounded-[14px] px-4 py-2.5 bg-black dark:bg-[#16213e] text-white hover:bg-[#E91E63] transition-colors duration-300 ease"
                                >
                                    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5c.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
                                    </svg>
                                    <div>
                                        <div className="text-[10px] opacity-70">التحميل من</div>
                                        <div className="text-xs font-semibold">App Store</div>
                                    </div>
                                </a>
                                <a
                                    href={SITE.apps?.android || "#"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 rounded-[14px] px-4 py-2.5 bg-black dark:bg-[#16213e] text-white hover:bg-[#E91E63] transition-colors duration-300 ease"
                                >
                                    <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M3.18 23.76c.3.17.64.23.99.17l12.47-7.23-2.88-2.88-10.58 9.94zM.41 1.83C.16 2.16 0 2.62 0 3.21v17.54c0 .59.16 1.05.42 1.38l.07.07L9.9 12.73v-.22L.48 1.76l-.07.07zM20.1 10.64l-2.91-1.69-3.22 3.22 3.22 3.22 2.92-1.7c.83-.48.83-1.27.0-1.75l-.01-.3zM4.17.25l12.47 7.22-2.88 2.88L3.18.41c.3-.17.65-.22.99-.16z" />
                                    </svg>
                                    <div>
                                        <div className="text-[10px] opacity-70">التحميل من</div>
                                        <div className="text-xs font-semibold">Google Play</div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Payment Methods */}
                <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t" style={{ borderColor: settings.accentColor }}>
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4 md:gap-6">
                        <div className="text-[10px] md:text-sm text-black dark:text-gray-200 text-center lg:text-right">
                            {settings.footerText}
                        </div>
                        <div className="flex flex-wrap items-center justify-center gap-2 md:gap-3">
                            <span className="text-[10px] md:text-sm text-black dark:text-white font-medium">طرق الدفع:</span>
                            <div className="flex flex-wrap items-center gap-1 md:gap-2">
                                {["MADA", "Visa", "Mastercard", "Tabby", "Tamara", "STC Pay", "Apple Pay"].map((p) => (
                                    <span
                                        key={p}
                                        className="px-2 py-1 md:px-3 md:py-1.5 text-[9px] md:text-xs font-semibold rounded-[14px] bg-white dark:bg-[#16213e] border text-black dark:text-white transition-all duration-300 ease"
                                        style={{ borderColor: settings.accentColor }}
                                    >
                                        {p}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
