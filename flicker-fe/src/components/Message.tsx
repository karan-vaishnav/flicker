import React from "react";
import { Message } from "../types/message";

interface MessageProps {
  message: Message;
}

const MessageComponent: React.FC<MessageProps> = ({ message }) => {
  const date = new Date(message.timestamp);
  let hours: number = date.getHours();
  const minutes: string = date.getMinutes().toString().padStart(2, "0");
  const ampm: string = hours >= 12 ? "PM" : "AM";

  hours = hours % 12 || 12;

  const formattedTime: string = `${hours}:${minutes} ${ampm}`;

  return (
    <div
      className={`p-3 font-text flex items-center justify-between rounded-lg mb-2 ${
        message.type === "whisper" ? "bg-red-100 text-red-600" : "bg-gray-100"
      }`}
    >
      <div>
        <span className="font-semibold">{message.username}</span> :{" "}
        {message.text}
      </div>
      <div className="text-gray-400 text-sm">{formattedTime}</div>
    </div>
  );
};

export default MessageComponent;
