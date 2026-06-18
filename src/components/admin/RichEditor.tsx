import { useState } from "react";
import { Bold, Italic, Underline, List, ListOrdered, Link, AlignLeft, AlignCenter, AlignRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

interface RichEditorProps {
    value?: string;
    onChange?: (value: string) => void;
    placeholder?: string;
    minHeight?: number;
}

const RichEditor = ({
    value = "",
    onChange,
    placeholder = "اكتبي المحتوى هنا...",
    minHeight = 200
}: RichEditorProps) => {
    const [content, setContent] = useState(value);

    const handleContentChange = (e: React.FormEvent<HTMLDivElement>) => {
        const newContent = e.currentTarget.innerHTML;
        setContent(newContent);
        onChange?.(newContent);
    };

    const execCommand = (command: string, value?: string) => {
        document.execCommand(command, false, value);
        setContent(document.querySelector("[contenteditable]")?.innerHTML || "");
        onChange?.(document.querySelector("[contenteditable]")?.innerHTML || "");
    };

    return (
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
            {/* Toolbar */}
            <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 p-2 flex items-center gap-1 flex-wrap">
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => execCommand("bold")}
                    title="عريض"
                >
                    <Bold className="w-4 h-4" />
                </Button>
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => execCommand("italic")}
                    title="مائل"
                >
                    <Italic className="w-4 h-4" />
                </Button>
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => execCommand("underline")}
                    title="تسطير"
                >
                    <Underline className="w-4 h-4" />
                </Button>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />

                <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => execCommand("insertUnorderedList")}
                    title="قائمة نقطية"
                >
                    <List className="w-4 h-4" />
                </Button>
                <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => execCommand("insertOrderedList")}
                    title="قائمة مرقمة"
                >
                    <ListOrdered className="w-4 h-4" />
                </Button>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />

                <ToggleGroup type="single">
                    <ToggleGroupItem
                        value="left"
                        onClick={() => execCommand("justifyLeft")}
                        title="محاذاة لليسار"
                    >
                        <AlignLeft className="w-4 h-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="center"
                        onClick={() => execCommand("justifyCenter")}
                        title="توسيط"
                    >
                        <AlignCenter className="w-4 h-4" />
                    </ToggleGroupItem>
                    <ToggleGroupItem
                        value="right"
                        onClick={() => execCommand("justifyRight")}
                        title="محاذاة لليمين"
                    >
                        <AlignRight className="w-4 h-4" />
                    </ToggleGroupItem>
                </ToggleGroup>

                <div className="w-px h-6 bg-gray-300 dark:bg-gray-600 mx-2" />

                <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                        const url = prompt("أدخلي الرابط:");
                        if (url) execCommand("createLink", url);
                    }}
                    title="إضافة رابط"
                >
                    <Link className="w-4 h-4" />
                </Button>
            </div>

            {/* Editor */}
            <div
                contentEditable
                onInput={handleContentChange}
                dangerouslySetInnerHTML={{ __html: content }}
                className="p-4 min-h-[200px] focus:outline-none bg-white dark:bg-gray-900 text-black dark:text-white"
                style={{ minHeight: `${minHeight}px` }}
                dir="rtl"
                data-placeholder={placeholder}
            />

            {/* Placeholder styling */}
            <style>{`
                [contenteditable]:empty:before {
                    content: attr(data-placeholder);
                    color: #9ca3af;
                    pointer-events: none;
                }
                [contenteditable]:focus:before {
                    content: "";
                }
                .dark [contenteditable]:empty:before {
                    color: #6b7280;
                }
            `}</style>
        </div>
    );
};

export default RichEditor;
