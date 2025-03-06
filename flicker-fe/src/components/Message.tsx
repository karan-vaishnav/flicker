import React from "react";
import { Message } from "../types/message";

interface MessageProps {
  message: Message;
}

const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  const date = new Date(message.timestamp);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const formattedTime = `${hours}:${minutes}`;

  return (
    <div
      className={`p-3 rounded-lg mb-2 ${
        message.type === "whisper" ? "bg-red-100 text-red-600" : "bg-gray-100"
      }`}
    >
      <span className="font-semibold">{message.username}</span> ({formattedTime}
      ): {message.text}
    </div>
  );
};

export default MessageComponent;
