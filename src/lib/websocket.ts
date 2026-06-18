type WebSocketMessage = {
    type: "location_update" | "order_status" | "driver_info";
    data: any;
};

type WebSocketEventHandler = (message: WebSocketMessage) => void;

class WebSocketService {
    private ws: WebSocket | null = null;
    private url: string;
    private reconnectAttempts = 0;
    private maxReconnectAttempts = 5;
    private reconnectDelay = 3000;
    private handlers: Map<string, WebSocketEventHandler[]> = new Map();

    constructor(url: string) {
        this.url = url;
    }

    connect() {
        try {
            this.ws = new WebSocket(this.url);

            this.ws.onopen = () => {
                this.reconnectAttempts = 0;
            };

            this.ws.onmessage = (event) => {
                try {
                    const message: WebSocketMessage = JSON.parse(event.data);
                    this.handleMessage(message);
                } catch (error) {
                    // Error parsing WebSocket message
                }
            };

            this.ws.onerror = (error) => {
                // WebSocket error
            };

            this.ws.onclose = () => {
                this.attemptReconnect();
            };
        } catch (error) {
            // Failed to connect to WebSocket
            this.attemptReconnect();
        }
    }

    private attemptReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            setTimeout(() => this.connect(), this.reconnectDelay);
        }
    }

    private handleMessage(message: WebSocketMessage) {
        const handlers = this.handlers.get(message.type) || [];
        handlers.forEach((handler) => handler(message));
    }

    on(eventType: string, handler: WebSocketEventHandler) {
        if (!this.handlers.has(eventType)) {
            this.handlers.set(eventType, []);
        }
        this.handlers.get(eventType)!.push(handler);
    }

    off(eventType: string, handler: WebSocketEventHandler) {
        const handlers = this.handlers.get(eventType) || [];
        const index = handlers.indexOf(handler);
        if (index > -1) {
            handlers.splice(index, 1);
        }
    }

    send(message: WebSocketMessage) {
        if (this.ws && this.ws.readyState === WebSocket.OPEN) {
            this.ws.send(JSON.stringify(message));
        } else {
            // WebSocket is not connected
        }
    }

    disconnect() {
        if (this.ws) {
            this.ws.close();
            this.ws = null;
        }
        this.handlers.clear();
    }
}

// Singleton instance
let wsService: WebSocketService | null = null;

export function getWebSocketService(url?: string): WebSocketService {
    if (!wsService && url) {
        wsService = new WebSocketService(url);
        wsService.connect();
    }
    return wsService!;
}

export default WebSocketService;
