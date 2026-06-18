import { useState } from "react";
import { Download, FileSpreadsheet, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExportButtonProps {
    data: Record<string, any>[];
    filename?: string;
    onExport?: (format: "excel" | "csv" | "pdf") => void;
}

const ExportButton = ({ data, filename = "export", onExport }: ExportButtonProps) => {
    const [exporting, setExporting] = useState(false);

    const handleExport = async (format: "excel" | "csv" | "pdf") => {
        setExporting(true);
        
        if (onExport) {
            await onExport(format);
        } else {
            // Default export logic
            switch (format) {
                case "csv":
                    exportToCSV();
                    break;
                case "excel":
                    exportToExcel();
                    break;
                case "pdf":
                    // PDF export would require additional library
                    break;
            }
        }
        
        setExporting(false);
    };

    const exportToCSV = () => {
        if (data.length === 0) return;

        const headers = Object.keys(data[0]);
        const csvContent = [
            headers.join(","),
            ...data.map((row) =>
                headers.map((header) => {
                    const value = row[header];
                    const stringValue = value !== null && value !== undefined ? String(value) : "";
                    return stringValue.includes(",") ? `"${stringValue}"` : stringValue;
                }).join(",")
            )
        ].join("\n");

        const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = `${filename}.csv`;
        link.click();
    };

    const exportToExcel = () => {
        // Simple Excel export (would ideally use xlsx library)
        exportToCSV(); // Fallback to CSV
    };

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="outline" disabled={exporting || data.length === 0}>
                    <Download className="w-4 h-4 mr-2" />
                    {exporting ? "جاري التصدير..." : "تصدير"}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleExport("csv")}>
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    CSV
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("excel")}>
                    <FileSpreadsheet className="w-4 h-4 mr-2" />
                    Excel
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("pdf")}>
                    <FileText className="w-4 h-4 mr-2" />
                    PDF
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ExportButton;
