import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
    darkMode: ["class"],
    content: [
        "./pages/**/*.{ts,tsx}",
        "./components/**/*.{ts,tsx}",
        "./app/**/*.{ts,tsx}",
        "./src/**/*.{ts,tsx}",
    ],
    prefix: "",
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px'
            }
        },
        extend: {
            height: {
                '68': '17rem',
            },
            colors: {
                // SAHAR Brand Colors
                sahar: {
                    primary: '#E91E63',
                    dark: '#C2185B',
                    light: '#F48FB1',
                    darker: '#AD1457',
                    lightest: '#F8BBD0'
                },
                // Required Colors
                accent: '#E91E8C',
                accentDark: '#C0176D',
                success: '#22C55E',
                warning: '#F59E0B',
                danger: '#EF4444',
                info: '#3B82F6',
                border: 'hsl(var(--border))',
                input: 'hsl(var(--input))',
                ring: 'hsl(var(--ring))',
                background: '#F8F8F8',
                foreground: '#1A1A1A',
                surface: '#F8F6FB',
                primary: {
                    DEFAULT: '#E91E63',
                    foreground: '#FFFFFF',
                    50: '#FAF5FB',
                    100: '#F3E8F7',
                    200: '#E8D5F0',
                    300: '#D9B8E6',
                    400: '#C6AAD0',
                    500: '#B089C0',
                    600: '#9A68A8',
                    700: '#7D4F8A',
                    800: '#5F3A6A',
                    900: '#422850',
                },
                // Dashboard specific colors
                sidebar: '#1E0A2E',
                sidebarLight: '#2D1445',
                sidebarHover: '#3D1F5C',
                onyx: '#1A3A5C',
                onyxLight: '#2A5080',
                secondary: {
                    DEFAULT: 'hsl(var(--secondary))',
                    foreground: 'hsl(var(--secondary-foreground))'
                },
                destructive: {
                    DEFAULT: 'hsl(var(--destructive))',
                    foreground: 'hsl(var(--destructive-foreground))'
                },
                muted: {
                    DEFAULT: 'hsl(var(--muted))',
                    foreground: 'hsl(var(--muted-foreground))'
                },
                popover: {
                    DEFAULT: 'hsl(var(--popover))',
                    foreground: 'hsl(var(--popover-foreground))'
                },
                card: {
                    DEFAULT: 'hsl(var(--card))',
                    foreground: 'hsl(var(--card-foreground))'
                },
                sidebarTheme: {
                    DEFAULT: 'hsl(var(--sidebar-background))',
                    foreground: 'hsl(var(--sidebar-foreground))',
                    primary: 'hsl(var(--sidebar-primary))',
                    'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
                    accent: 'hsl(var(--sidebar-accent))',
                    'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
                    border: 'hsl(var(--sidebar-border))',
                    ring: 'hsl(var(--sidebar-ring))'
                }
            },
            fontFamily: {
                sans: ['Cairo', 'Inter', 'system-ui', 'sans-serif'],
                arabic: ['Cairo', 'system-ui', 'sans-serif'],
                english: ['Inter', 'system-ui', 'sans-serif'],
            },
            borderRadius: {
                lg: 'var(--radius)',
                md: 'calc(var(--radius) - 2px)',
                sm: 'calc(var(--radius) - 4px)',
                card: '16px',
                button: '10px',
                badge: '20px',
                xl2: '20px',
            },
            boxShadow: {
                card: '0 4px 24px rgba(198, 170, 208, 0.15)',
                cardHover: '0 8px 40px rgba(198, 170, 208, 0.28)',
                sidebar: '4px 0 24px rgba(30, 10, 46, 0.3)',
                glow: '0 0 20px rgba(198, 170, 208, 0.4)',
                glowAccent: '0 0 20px rgba(233, 30, 140, 0.35)',
            },
            keyframes: {
                'accordion-down': {
                    from: {
                        height: '0'
                    },
                    to: {
                        height: 'var(--radix-accordion-content-height)'
                    }
                },
                'accordion-up': {
                    from: {
                        height: 'var(--radix-accordion-content-height)'
                    },
                    to: {
                        height: '0'
                    }
                },
                fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
                slideIn: { '0%': { transform: 'translateX(-20px)', opacity: '0' }, '100%': { transform: 'translateX(0)', opacity: '1' } },
                slideUp: { '0%': { transform: 'translateY(20px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
                pulse2: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.5' } },
                spin2: { '0%': { transform: 'rotate(0deg)' }, '100%': { transform: 'rotate(360deg)' } },
                shimmer: { '0%': { backgroundPosition: '-1000px 0' }, '100%': { backgroundPosition: '1000px 0' } },
                bounceIn: { '0%': { transform: 'scale(0.5)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
                marquee: { '0%': { transform: 'translateX(0%)' }, '100%': { transform: 'translateX(-50%)' } },
            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                fadeIn: 'fadeIn 0.3s ease-out',
                slideIn: 'slideIn 0.3s ease-out',
                slideUp: 'slideUp 0.4s ease-out',
                pulse2: 'pulse2 2s ease-in-out infinite',
                spin2: 'spin2 1.5s linear infinite',
                shimmer: 'shimmer 2s linear infinite',
                bounceIn: 'bounceIn 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)',
                marquee: 'marquee 25s linear infinite',
            }
        }
    },
    plugins: [tailwindcssAnimate],
} satisfies Config;