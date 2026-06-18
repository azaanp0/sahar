import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
    server: {
        host: "::",
        port: 8086,
        allowedHosts: ["dimmed-fever-override.ngrok-free.dev", "localhost"],
        proxy: {
            '/cdn/': {
                target: 'https://cdn.salla.sa',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/cdn\//, ''),
            },
            '/homepage/': {
                target: 'https://cdn.files.salla.network/homepage',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/homepage\//, ''),
            },
        },
    },
    preview: {
        port: 4173,
        proxy: {
            '/cdn/': {
                target: 'https://cdn.salla.sa',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/cdn\//, ''),
            },
            '/homepage/': {
                target: 'https://cdn.files.salla.network/homepage',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/homepage\//, ''),
            },
        },
    },
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@dashe": path.resolve(__dirname, "./dashe-main/src"),
        },
    },
    base: '/',
    build: {
        outDir: 'dist',
    },
});
