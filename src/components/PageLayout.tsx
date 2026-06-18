import { ReactNode, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import MobileNav from "./MobileNav";
import PageMeta from "./PageMeta";
import AnnouncementBar from "./AnnouncementBar";
import SideMenu from "./SideMenu";
import SearchOverlay from "./SearchOverlay";
import PromotionalPopup from "./PromotionalPopup";
import { getSettings } from "@/lib/settings";

interface PageLayoutProps {
    children: ReactNode;
    title?: string;
    description?: string;
    showMobileNav?: boolean;
    showAnnouncement?: boolean;
}

const PageLayout = ({
    children,
    title,
    description,
    showMobileNav = true,
    showAnnouncement = true,
}: PageLayoutProps) => {
    const settings = getSettings();
    const location = useLocation();
    const isHomePage = location.pathname === "/";
    const shouldShowAnnouncement = showAnnouncement && isHomePage;

    // Update document title dynamically from settings
    useEffect(() => {
        if (settings.siteTitle) {
            document.title = title || settings.siteTitle;
        }
    }, [title, settings.siteTitle]);

    return (
        <div 
            className="min-h-screen bg-white dark:bg-[#1a1a2e] flex flex-col overflow-x-hidden"
            style={{ 
                '--primary-color': settings.primaryColor,
                '--accent-color': settings.accentColor,
                fontFamily: settings.fontFamily || 'Cairo'
            } as React.CSSProperties}
        >
            <PageMeta title={title || settings.siteTitle} description={description} />
            {shouldShowAnnouncement && <AnnouncementBar />}
            <Header />
            <main className={`flex-1 ${showMobileNav ? "pb-20 md:pb-0" : ""}`}>{children}</main>
            <Footer />
            {showMobileNav && <MobileNav />}
            <SideMenu />
            <SearchOverlay />
            <PromotionalPopup />
        </div>
    );
};

export default PageLayout;
