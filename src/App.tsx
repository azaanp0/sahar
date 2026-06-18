import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { StoreProvider } from "@/context/StoreContext";
import { UIProvider } from "@/context/UIContext";
import { ThemeProvider } from "@/components/providers/ThemeProvider";
import { routers } from "./router";
import AIAssistant from "@/components/ai/AIAssistant";
import ErrorBoundary from "@/components/ErrorBoundary";
import "@/lib/i18n";

const queryClient = new QueryClient();

const App = () => {
    const router = createBrowserRouter(routers);
    return (
        <ErrorBoundary>
            <QueryClientProvider client={queryClient}>
                <StoreProvider>
                    <UIProvider>
                        <ThemeProvider>
                            <TooltipProvider>
                                <Toaster />
                                <Sonner position="top-center" richColors />
                                <RouterProvider router={router} />
                                <AIAssistant />
                            </TooltipProvider>
                        </ThemeProvider>
                    </UIProvider>
                </StoreProvider>
            </QueryClientProvider>
        </ErrorBoundary>
    );
};

export default App;
