import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProductsPage from "./pages/ProductsPage";
import CartPage from "./pages/CartPage";
import AccountPage from "./pages/AccountPage";
import OffersPage from "./pages/OffersPage";
import CategoryPage from "./pages/CategoryPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import BrandsPage from "./pages/BrandsPage";
import SearchPage from "./pages/SearchPage";
import WishlistPage from "./pages/WishlistPage";
import CheckoutPage from "./pages/CheckoutPage";
import ErrorPage from "./pages/ErrorPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import ComparePage from "./pages/ComparePage";
import SkinQuizPage from "./pages/SkinQuizPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import VerifyOTPPage from "./pages/VerifyOTPPage";
import OrdersPage from "./pages/account/OrdersPage";
import OrderDetailPage from "./pages/account/OrderDetailPage";
import AddressesPage from "./pages/account/AddressesPage";
import ProfilePage from "./pages/account/ProfilePage";
import LoyaltyPage from "./pages/account/LoyaltyPage";
import DashboardPage from "./pages/DashboardPage";
import PaymentPage from "./pages/PaymentPage";
import CheckoutSuccessPage from "./pages/CheckoutSuccessPage";
import {
    AboutPage,
    TermsPage,
    PrivacyPage,
    ShippingPage,
    ReturnsPage,
    BranchesPage,
    WarrantyPage,
    AffiliatePage,
    TrackOrderPage,
    ContactPage,
} from "./pages/StaticPages";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [pathname]);
    return null;
}

function ScrollToTopLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <ScrollToTop />
            {children}
        </>
    );
}

const withScrollToTop = (component: React.ReactNode) => <ScrollToTopLayout>{component}</ScrollToTopLayout>;

export const routers = [
    { path: "/", name: "home", element: withScrollToTop(<Index />) },
    { path: "/products", name: "products", element: withScrollToTop(<ProductsPage />) },
    { path: "/cart", name: "cart", element: withScrollToTop(<CartPage />) },
    { path: "/account", name: "account", element: withScrollToTop(<AccountPage />) },
    { path: "/account/:section", name: "account-section", element: withScrollToTop(<AccountPage />) },
    { path: "/account/orders", name: "account-orders", element: withScrollToTop(<OrdersPage />) },
    { path: "/account/orders/:id", name: "account-order-detail", element: withScrollToTop(<OrderDetailPage />) },
    { path: "/account/orders/:id/tracking", name: "account-order-tracking", element: withScrollToTop(<OrderDetailPage />) },
    { path: "/account/addresses", name: "account-addresses", element: withScrollToTop(<AddressesPage />) },
    { path: "/account/profile", name: "account-profile", element: withScrollToTop(<ProfilePage />) },
    { path: "/account/loyalty", name: "account-loyalty", element: withScrollToTop(<LoyaltyPage />) },
    { path: "/offers", name: "offers", element: withScrollToTop(<OffersPage />) },
    { path: "/category/:slug", name: "category", element: withScrollToTop(<CategoryPage />) },
    { path: "/product/:id", name: "product", element: withScrollToTop(<ProductDetailPage />) },
    { path: "/brands", name: "brands", element: withScrollToTop(<BrandsPage />) },
    { path: "/brand/:slug", name: "brand", element: withScrollToTop(<BrandsPage />) },
    { path: "/search", name: "search", element: withScrollToTop(<SearchPage />) },
    { path: "/wishlist", name: "wishlist", element: withScrollToTop(<WishlistPage />) },
    { path: "/checkout", name: "checkout", element: withScrollToTop(<CheckoutPage />) },
    { path: "/checkout/payment", name: "checkout-payment", element: withScrollToTop(<PaymentPage />) },
    { path: "/checkout/success", name: "checkout-success", element: withScrollToTop(<CheckoutSuccessPage />) },
    { path: "/500", name: "500", element: withScrollToTop(<ErrorPage />) },
    { path: "/blog", name: "blog", element: withScrollToTop(<BlogPage />) },
    { path: "/blog/:slug", name: "blog-detail", element: withScrollToTop(<BlogDetailPage />) },
    { path: "/compare", name: "compare", element: withScrollToTop(<ComparePage />) },
    { path: "/skin-quiz", name: "skin-quiz", element: withScrollToTop(<SkinQuizPage />) },
    // Auth Routes
    { path: "/login", name: "login", element: withScrollToTop(<LoginPage />) },
    { path: "/register", name: "register", element: withScrollToTop(<RegisterPage />) },
    { path: "/forgot-password", name: "forgot-password", element: withScrollToTop(<ForgotPasswordPage />) },
    { path: "/reset-password", name: "reset-password", element: withScrollToTop(<ResetPasswordPage />) },
    { path: "/verify-otp", name: "verify-otp", element: withScrollToTop(<VerifyOTPPage />) },
    // Static Pages
    { path: "/about", name: "about", element: withScrollToTop(<AboutPage />) },
    { path: "/terms", name: "terms", element: withScrollToTop(<TermsPage />) },
    { path: "/privacy", name: "privacy", element: withScrollToTop(<PrivacyPage />) },
    { path: "/shipping", name: "shipping", element: withScrollToTop(<ShippingPage />) },
    { path: "/returns", name: "returns", element: withScrollToTop(<ReturnsPage />) },
    { path: "/branches", name: "branches", element: withScrollToTop(<BranchesPage />) },
    { path: "/loyalty", name: "loyalty", element: withScrollToTop(<LoyaltyPage />) },
    { path: "/warranty", name: "warranty", element: withScrollToTop(<WarrantyPage />) },
    { path: "/affiliate", name: "affiliate", element: withScrollToTop(<AffiliatePage />) },
    { path: "/track-order", name: "track-order", element: withScrollToTop(<TrackOrderPage />) },
    { path: "/contact", name: "contact", element: withScrollToTop(<ContactPage />) },
    // Admin Routes - Using dashe-main dashboard
    { path: "/admin", name: "admin-dashboard", element: withScrollToTop(<DashboardPage />) },
    /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
    { path: "*", name: "404", element: withScrollToTop(<NotFound />) },
];

declare global {
    interface Window {
        __routers__: typeof routers;
    }
}

window.__routers__ = routers;
