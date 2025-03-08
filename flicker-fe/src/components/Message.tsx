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
        message.type === "whisper"
          ? "bg-[var(--color-purple)] border-[2px] border-[var(--color-darkpurple)] text-white"
          : "border-[2px] border-[var(--color-purple)]"
      }`}
    >
      <div className="flex gap-2">
        <span className="font-semibold text-[var(--color-darkpurple)]">
          {message.username}:
        </span>{" "}
        <div className="dark:text-white">{message.text}</div>
      </div>
      <div className="text-[var(--color-gray-500)] text-sm">
        {formattedTime}
      </div>
    </div>
  );
};

export default MessageComponent;
