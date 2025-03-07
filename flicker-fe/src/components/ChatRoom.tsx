import React, { useState, useEffect, useRef } from "react";
import MessageComponent from "./Message.tsx";
import MessageInput from "./MessageInput.tsx";
import { createWebSocket } from "../services/websocketService.ts";
import type { Message } from "../types/message.d.ts";
import { HeaderComponent } from "./HeaderComponent.tsx";

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newWs = createWebSocket(
      "ws://localhost:8080",
      (event) => {
        const receivedMessages: Message[] = JSON.parse(event.data);
        setMessages(receivedMessages);
      },
      () => console.log("WebSocket connected"),
      () => console.log("WebSocket disconnected"),
      (error) => console.error("WebSocket error:", error)
    );
    setWs(newWs);

    return () => {
      newWs.close();
    };
  }, []);

  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (text: string, type: "message" | "whisper") => {
    ws?.send(JSON.stringify({ text, type }));
  };

  return (
    <div>
      <div>
        <HeaderComponent />
      </div>
      <div className="p-4 h-screen flex flex-col">
        <div className="flex-grow overflow-y-auto">
          {messages.map((message, index) => (
            <MessageComponent key={index} message={message} />
          ))}
          <div ref={chatBottomRef} />
        </div>
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatRoom;
