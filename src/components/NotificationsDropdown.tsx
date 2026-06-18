import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { Bell, Check, Loader2, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

const NotificationsDropdown = () => {
    const { notifications, unreadNotificationsCount, markNotificationRead, markAllNotificationsRead } = useStore();
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClick = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
        };
        document.addEventListener("mousedown", handleClick);
        return () => document.removeEventListener("mousedown", handleClick);
    }, []);

    const handleToggle = () => {
        if (!open) {
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
                setOpen(true);
            }, 150);
        } else {
            setOpen(false);
        }
    };

    return (
        <div className="relative" ref={ref}>
            <button
                onClick={handleToggle}
                className="relative p-2 rounded-lg hover:bg-pink-50 dark:hover:bg-gray-700 transition-colors group"
                aria-label="الإشعارات"
                aria-expanded={open}
            >
                <Bell className="w-5 h-5 md:w-6 md:h-6 text-gray-700 dark:text-gray-300 group-hover:text-pink-600 transition-colors" />
                {unreadNotificationsCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-pink-600 text-white text-[10px] font-bold shadow-sm">
                        {unreadNotificationsCount > 99 ? '99+' : unreadNotificationsCount}
                    </span>
                )}
            </button>

            {open && (
                <div className="absolute left-0 top-full mt-2 w-80 sm:w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700 bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-900 rounded-t-2xl">
                        <div className="flex items-center gap-2">
                            <Bell className="h-5 w-5 text-pink-600" />
                            <h3 className="font-bold text-gray-800 dark:text-white">الإشعارات</h3>
                            {unreadNotificationsCount > 0 && (
                                <span className="bg-pink-600 text-white text-xs px-2 py-0.5 rounded-full font-bold">
                                    {unreadNotificationsCount}
                                </span>
                            )}
                        </div>
                        <div className="flex items-center gap-2">
                            {unreadNotificationsCount > 0 && (
                                <button
                                    onClick={markAllNotificationsRead}
                                    className="text-xs text-pink-600 hover:text-pink-700 font-medium flex items-center gap-1 transition-colors"
                                >
                                    <Check className="h-3 w-3" />
                                    قراءة الكل
                                </button>
                            )}
                            <button
                                onClick={() => setOpen(false)}
                                className="p-1 hover:bg-white/50 dark:hover:bg-gray-700 rounded-full transition-colors"
                                aria-label="إغلاق"
                            >
                                <X className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            </button>
                        </div>
                    </div>

                    <div className="max-h-96 overflow-y-auto">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="h-8 w-8 animate-spin text-pink-500" />
                            </div>
                        ) : notifications.length === 0 ? (
                            <div className="py-12 text-center">
                                <div className="h-16 w-16 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto mb-4">
                                    <Bell className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                                </div>
                                <p className="text-gray-500 dark:text-gray-400 font-medium">لا توجد إشعارات</p>
                                <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">سنخبرك عند وجود جديد</p>
                            </div>
                        ) : (
                            <ul>
                                {notifications.map((n) => (
                                    <li key={n.id} className={`border-b border-gray-100 dark:border-gray-700 last:border-0 ${!n.read ? "bg-pink-50/30 dark:bg-pink-900/20" : ""}`}>
                                        {n.href ? (
                                            <Link
                                                to={n.href}
                                                onClick={() => {
                                                    markNotificationRead(n.id);
                                                    setOpen(false);
                                                }}
                                                className="block p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                                            >
                                                <NotificationContent notification={n} />
                                            </Link>
                                        ) : (
                                            <button
                                                onClick={() => markNotificationRead(n.id)}
                                                className="w-full text-right p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors group"
                                            >
                                                <NotificationContent notification={n} />
                                            </button>
                                        )}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {notifications.length > 0 && (
                        <div className="p-3 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 rounded-b-2xl">
                            <Link
                                to="/account/notifications"
                                onClick={() => setOpen(false)}
                                className="block text-center text-sm font-medium text-pink-600 hover:text-pink-700 transition-colors"
                            >
                                عرض جميع الإشعارات
                            </Link>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

function NotificationContent({ notification: n }: { notification: { title: string; message: string; read: boolean; date: string } }) {
    return (
        <div className="flex gap-3">
            <div className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${!n.read ? "bg-pink-600" : "bg-gray-300 dark:bg-gray-600"}`} />
            <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                    <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{n.title}</p>
                    {!n.read && (
                        <span className="flex h-2 w-2 rounded-full shrink-0 mt-1.5 bg-pink-600" />
                    )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 line-clamp-2">{n.message}</p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-2 flex items-center gap-1">
                    {formatDistanceToNow(new Date(n.date), { addSuffix: true, locale: ar })}
                </p>
            </div>
        </div>
    );
}

export default NotificationsDropdown;
