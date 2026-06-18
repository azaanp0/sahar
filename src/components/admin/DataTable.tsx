import { useState } from "react";
import { ChevronDown, ChevronUp, Search, Filter, MoreHorizontal, Edit, Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface Column<T> {
    key: keyof T;
    label: string;
    sortable?: boolean;
    render?: (value: any, row: T) => React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onEdit?: (row: T) => void;
    onDelete?: (row: T) => void;
    onView?: (row: T) => void;
    searchable?: boolean;
    filterable?: boolean;
}

const DataTable = <T extends Record<string, any>>({
    data,
    columns,
    onEdit,
    onDelete,
    onView,
    searchable = true,
    filterable = true
}: DataTableProps<T>) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState<keyof T | null>(null);
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter and sort data
    const filteredData = data.filter((row) => {
        if (!searchTerm) return true;
        return Object.values(row).some(
            (value) =>
                value &&
                value.toString().toLowerCase().includes(searchTerm.toLowerCase())
        );
    });

    const sortedData = [...filteredData].sort((a, b) => {
        if (!sortColumn) return 0;
        const aValue = a[sortColumn];
        const bValue = b[sortColumn];
        
        if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
        if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
        return 0;
    });

    // Pagination
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const paginatedData = sortedData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handleSort = (column: keyof T) => {
        if (sortColumn === column) {
            setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        } else {
            setSortColumn(column);
            setSortDirection("asc");
        }
    };

    return (
        <div className="space-y-4">
            {/* Header */}
            {(searchable || filterable) && (
                <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
                    {searchable && (
                        <div className="relative w-full sm:flex-1">
                            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 dark:text-gray-500" />
                            <Input
                                placeholder="بحث..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pr-10"
                            />
                        </div>
                    )}
                    {filterable && (
                        <Button variant="outline" size="icon" className="w-full sm:w-auto">
                            <Filter className="w-4 h-4" />
                        </Button>
                    )}
                </div>
            )}

            {/* Table */}
            <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-x-auto bg-white dark:bg-gray-800">
                <Table>
                    <TableHeader>
                        <TableRow>
                            {columns.map((column) => (
                                <TableHead key={String(column.key)} className="whitespace-nowrap">
                                    <div className="flex items-center gap-2">
                                        {column.label}
                                        {column.sortable && (
                                            <button
                                                onClick={() => handleSort(column.key)}
                                                className="hover:text-[#E91E63] dark:hover:text-[#C2185B]"
                                            >
                                                {sortColumn === column.key ? (
                                                    sortDirection === "asc" ? (
                                                        <ChevronUp className="w-4 h-4" />
                                                    ) : (
                                                        <ChevronDown className="w-4 h-4" />
                                                    )
                                                ) : (
                                                    <ChevronDown className="w-4 h-4 text-gray-300 dark:text-gray-600" />
                                                )}
                                            </button>
                                        )}
                                    </div>
                                </TableHead>
                            ))}
                            {(onEdit || onDelete || onView) && (
                                <TableHead className="w-16 whitespace-nowrap">إجراءات</TableHead>
                            )}
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {paginatedData.length === 0 ? (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length + (onEdit || onDelete || onView ? 1 : 0)}
                                    className="text-center py-8 text-gray-500 dark:text-gray-400"
                                >
                                    لا توجد بيانات
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedData.map((row, index) => (
                                <TableRow key={index}>
                                    {columns.map((column) => (
                                        <TableCell key={String(column.key)}>
                                            {column.render
                                                ? column.render(row[column.key], row)
                                                : String(row[column.key])}
                                        </TableCell>
                                    ))}
                                    {(onEdit || onDelete || onView) && (
                                        <TableCell>
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button variant="ghost" size="icon">
                                                        <MoreHorizontal className="w-4 h-4" />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end">
                                                    {onView && (
                                                        <DropdownMenuItem onClick={() => onView(row)}>
                                                            <Eye className="w-4 h-4 mr-2" />
                                                            عرض
                                                        </DropdownMenuItem>
                                                    )}
                                                    {onEdit && (
                                                        <DropdownMenuItem onClick={() => onEdit(row)}>
                                                            <Edit className="w-4 h-4 mr-2" />
                                                            تعديل
                                                        </DropdownMenuItem>
                                                    )}
                                                    {onDelete && (
                                                        <DropdownMenuItem
                                                            onClick={() => onDelete(row)}
                                                            className="text-red-600"
                                                        >
                                                            <Trash2 className="w-4 h-4 mr-2" />
                                                            حذف
                                                        </DropdownMenuItem>
                                                    )}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </TableCell>
                                    )}
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        عرض {((currentPage - 1) * itemsPerPage) + 1} إلى{" "}
                        {Math.min(currentPage * itemsPerPage, sortedData.length)} من{" "}
                        {sortedData.length}
                    </p>
                    <div className="flex items-center gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            السابق
                        </Button>
                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }).map((_, i) => (
                                <Button
                                    key={i}
                                    variant={currentPage === i + 1 ? "default" : "outline"}
                                    size="sm"
                                    onClick={() => setCurrentPage(i + 1)}
                                    className={currentPage === i + 1 ? "bg-[#E91E63] dark:bg-[#C2185B]" : ""}
                                >
                                    {i + 1}
                                </Button>
                            ))}
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            التالي
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DataTable;
