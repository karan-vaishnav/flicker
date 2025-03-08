import React, { useState, useEffect, useRef } from "react";
import MessageComponent from "./Message.tsx";
import MessageInput from "./MessageInput.tsx";
import { createWebSocket } from "../services/websocketService.ts";
import type { Message } from "../types/message.d.ts";
import { HeaderComponent } from "./HeaderComponent.tsx";
import { Footer } from "./Footer.tsx";

const ChatRoom: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [ws, setWs] = useState<WebSocket | null>(null);
  const chatBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newWs = createWebSocket(
      "wss://flicker-production-8158.up.railway.app/",
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
    <div className="h-screen w-full flex justify-center">
      <div className="max-w-[1200px] w-full flex flex-col">
        <div className="sticky top-0 z-10">
          <HeaderComponent />
        </div>
        <div className="flex-grow flex flex-col p-4 overflow-y-auto">
          {messages.map((message, index) => (
            <MessageComponent key={index} message={message} />
          ))}
          <div ref={chatBottomRef} />
        </div>
        <div className="sticky bottom-0 z-10">
          <div className="flex flex-col gap-2">
            <MessageInput onSendMessage={handleSendMessage} />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
