import { Component, type ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
    children: ReactNode;
}

interface State {
    hasError: boolean;
    error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: Error): State {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: any) {
        // Log error to error reporting service
        // errorReportingService.logError(error, errorInfo);
    }

    handleReset = () => {
        this.setState({ hasError: false, error: null });
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
                    <div className="max-w-md w-full bg-white dark:bg-[#16213e] rounded-2xl shadow-lg p-8 text-center border border-gray-200 dark:border-gray-600">
                        <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">حدث خطأ غير متوقع</h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            نأسف لحدوث هذا الخطأ. يرجى المحاولة مرة أخرى أو الاتصال بالدعم إذا استمرت المشكلة.
                        </p>
                        {this.state.error && (
                            <div className="bg-gray-100 dark:bg-[#16213e] rounded-lg p-4 mb-6 text-right">
                                <p className="text-sm text-gray-700 dark:text-gray-300 font-mono">
                                    {this.state.error.message}
                                </p>
                            </div>
                        )}
                        <Button
                            onClick={this.handleReset}
                            className="w-full"
                            size="lg"
                        >
                            <RefreshCw className="w-4 h-4 ml-2" />
                            إعادة المحاولة
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
