import { User, Bot } from "lucide-react";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

interface ChatBubbleProps {
    message: Message;
}

const ChatBubble = ({ message }: ChatBubbleProps) => {
    const isUser = message.role === "user";

    return (
        <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
            {/* Avatar */}
            <div
                className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    isUser ? "bg-[#E91E63] dark:bg-[#C2185B]" : "bg-gray-200 dark:bg-gray-700"
                }`}
            >
                {isUser ? <User className="w-4 h-4 text-white" /> : <Bot className="w-4 h-4 text-gray-600 dark:text-gray-400" />}
            </div>

            {/* Message */}
            <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                    isUser
                        ? "bg-[#E91E63] dark:bg-[#C2185B] text-white rounded-tr-sm"
                        : "bg-gray-100 dark:bg-[#16213e] text-gray-900 dark:text-white rounded-tl-sm"
                }`}
            >
                <p className="text-sm leading-relaxed">{message.content}</p>
                <p
                    className={`text-xs mt-1 ${isUser ? "text-white/70" : "text-gray-500 dark:text-gray-400"}`}
                >
                    {message.timestamp.toLocaleTimeString('ar-SA', {
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </p>
            </div>
        </div>
    );
};

export default ChatBubble;
