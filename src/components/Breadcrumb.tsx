import { Link } from "react-router-dom";
import { Home } from "lucide-react";

interface BreadcrumbItem {
    label: string;
    href?: string;
}

interface BreadcrumbProps {
    items: BreadcrumbItem[];
}

const Breadcrumb = ({ items }: BreadcrumbProps) => (
    <nav className="flex items-center gap-1.5 text-xs text-muted-foreground mb-4 flex-wrap" aria-label="مسار التنقل" style={{ direction: 'rtl' }}>
        <Link to="/" className="flex items-center gap-1 hover:text-primary transition-colors flex-shrink-0" style={{ color: 'var(--store-text-primary, #9ca3af)' }}>
            <Home className="h-3.5 w-3.5" />
            <span>الرئيسية</span>
        </Link>
        {items.slice(1).map((item, i) => (
            <span key={i} className="flex items-center gap-1.5 flex-shrink-0">
                <span style={{ color: 'var(--store-text-secondary, #d1d5db)' }}>◂</span>
                {item.href ? (
                    <Link to={item.href} className="hover:text-primary transition-colors" style={{ color: 'var(--store-text-primary, #9ca3af)' }}>
                        {item.label}
                    </Link>
                ) : (
                    <span className="line-clamp-1 font-medium" style={{ color: 'var(--store-text-primary)' }}>{item.label}</span>
                )}
            </span>
        ))}
    </nav>
);

export default Breadcrumb;
