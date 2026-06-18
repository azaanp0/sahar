import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Sparkles, Minimize2, Maximize2 } from "lucide-react";
import ChatBubble from "@/components/ai/ChatBubble";
import { useStore } from "@/context/StoreContext";

interface Message {
    id: string;
    role: "user" | "assistant";
    content: string;
    timestamp: Date;
}

const AIAssistant = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isMinimized, setIsMinimized] = useState(false);
    const [input, setInput] = useState("");
    const [messages, setMessages] = useState<Message[]>([
        {
            id: "1",
            role: "assistant",
            content: "مرحباً! أنا مساعدك الذكي من سحر. كيف يمكنني مساعدتك اليوم؟",
            timestamp: new Date()
        }
    ]);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { cartProducts } = useStore();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage: Message = {
            id: Date.now().toString(),
            role: "user",
            content: input,
            timestamp: new Date()
        };

        setMessages(prev => [...prev, userMessage]);
        setInput("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            const response = generateAIResponse(input);
            const assistantMessage: Message = {
                id: (Date.now() + 1).toString(),
                role: "assistant",
                content: response,
                timestamp: new Date()
            };
            setMessages(prev => [...prev, assistantMessage]);
            setIsTyping(false);
        }, 1500);
    };

    const generateAIResponse = (userMessage: string): string => {
        const lowerMessage = userMessage.toLowerCase();

        // Product recommendations based on cart
        if (lowerMessage.includes("منتج") || lowerMessage.includes("اقترح")) {
            if (cartProducts.length > 0) {
                return `بناءً على منتجاتك في السلة، أقترح عليك إضافة مرطب غني بالهيالورونيك للحصول على نتائج أفضل. هل تودين رؤية التفاصيل؟`;
            }
            return "يمكنني اقتراح منتجات مناسبة لك! ما نوع بشرتك؟ (جافة، دهنية، مختلطة، أو حساسة)";
        }

        // Order tracking
        if (lowerMessage.includes("طلب") || lowerMessage.includes("تتبع")) {
            return "يمكنك تتبع طلبك من خلال صفحة حسابي في قسم طلباتي. هل تودين مساعدة في الوصول إليها؟";
        }

        // Shipping info
        if (lowerMessage.includes("شحن") || lowerMessage.includes("توصيل")) {
            return "نوفر شحن مجاني للطلبات فوق 199 ريال. التوصيل يستغرق 3-5 أيام عمل للشحن القياسي، و1-2 يوم للشحن السريع.";
        }

        // Returns
        if (lowerMessage.includes("استرجاع") || lowerMessage.includes("إرجاع")) {
            return "سياسة الاسترجاع تسمح بإرجاع المنتجات خلال 14 يوم من الاستلام بشرط أن تكون في حالتها الأصلية. يمكنك طلب الاسترجاع من صفحة طلباتك.";
        }

        // Skin type
        if (lowerMessage.includes("بشرة") || lowerMessage.includes("نوع")) {
            return "لتحديد نوع بشرتك بدقة، يمكنك إجراء اختبار البشرة المجاني في صفحة 'اختاري ما يناسب بشرتك'. سيساعدك هذا في العثور على المنتجات المثالية لك.";
        }

        // Default response
        return "شكراً لتواصلك معي! يمكنني مساعدتك في اختيار المنتجات المناسبة، تتبع طلباتك، أو الإجابة على أسئلة حول الشحن والاسترجاع. كيف يمكنني مساعدتك؟";
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <>
            {/* Floating Button */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="fixed bottom-24 left-4 z-50 bg-[#E91E63] dark:bg-[#C2185B] text-white p-4 rounded-full shadow-lg hover:bg-[#B089C0] dark:hover:bg-[#AD1457] transition-all duration-300 hover:scale-110"
                    aria-label="مساعد الذكاء الاصطناعي"
                >
                    <MessageCircle className="w-6 h-6" />
                </button>
            )}

            {/* Chat Window */}
            {isOpen && (
                <div
                    className={`fixed bottom-24 left-4 z-50 bg-white dark:bg-[#16213e] rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-600 transition-all duration-300 ${
                        isMinimized ? "w-72 h-16" : "w-96 h-[500px]"
                    }`}
                >
                    {/* Header */}
                    <div className="bg-gradient-to-r from-[#E91E63] to-[#B089C0] text-white p-4 rounded-t-2xl flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                                <Sparkles className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold">مساعد سحر</h3>
                                <p className="text-xs text-white/80">متاح الآن</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setIsMinimized(!isMinimized)}
                                className="p-1 hover:bg-white/20 rounded transition-colors"
                            >
                                {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
                            </button>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-white/20 rounded transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {!isMinimized && (
                        <>
                            {/* Messages */}
                            <div className="h-[360px] overflow-y-auto p-4 space-y-4">
                                {messages.map((message) => (
                                    <ChatBubble key={message.id} message={message} />
                                ))}
                                {isTyping && (
                                    <div className="flex items-center gap-2 text-gray-500 text-sm">
                                        <div className="flex gap-1">
                                            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce" />
                                            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce delay-100" />
                                            <div className="w-2 h-2 bg-gray-400 dark:bg-gray-500 rounded-full animate-bounce delay-200" />
                                        </div>
                                        <span className="text-gray-500 dark:text-gray-400">جاري الكتابة...</span>
                                    </div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-4 border-t border-gray-200 dark:border-gray-600 bg-white dark:bg-[#16213e]">
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                        placeholder="اكتبي رسالتك هنا..."
                                        className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:border-[#E91E63] dark:focus:border-[#C2185B] focus:ring-2 focus:ring-[#E91E63]/20 dark:focus:ring-[#C2185B]/20 bg-white dark:bg-gray-800 text-black dark:text-white"
                                    />
                                    <button
                                        onClick={handleSend}
                                        disabled={!input.trim() || isTyping}
                                        className="bg-[#E91E63] dark:bg-[#C2185B] text-white p-2 rounded-lg hover:bg-[#B089C0] dark:hover:bg-[#AD1457] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                    >
                                        <Send className="w-5 h-5" />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            )}
        </>
    );
};

export default AIAssistant;
