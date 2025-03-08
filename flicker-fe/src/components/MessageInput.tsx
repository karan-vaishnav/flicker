import React, { useState } from "react";
import { motion } from "framer-motion";
import { twMerge } from "tailwind-merge";
import send from "../assets/sendIcon.svg";

interface MessageInputProps {
  onSendMessage: (text: string, type: "message" | "whisper") => void;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSendMessage }) => {
  const [text, setText] = useState("");
  const [isWhisper, setIsWhisper] = useState(false);

  const handleSendMessage = () => {
    if (text.trim()) {
      onSendMessage(text, isWhisper ? "whisper" : "message");
      setText("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex items-center p-3 gap-2 font-text">
      <div className="w-full flex border-[1px] border-[var(--color-green)] pl-4 pr-4 rounded-3xl dark:text-white">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-grow p-2 w-full outline-none dark:text-white"
          placeholder="Type your message..."
          onKeyDown={handleKeyPress}
        />
        <button
          onClick={handleSendMessage}
          className=" text-white p-2 rounded-lg cursor-pointer"
        >
          <img src={send} alt="sendIcon" className="w-[25px]" />
        </button>
      </div>

      <form className="flex flex-col space-x-4 antialiased items-center rotate-270">
        <label
          htmlFor="whisper-toggle"
          className={twMerge(
            "h-6 px-1 flex items-center border border-transparent shadow-[inset_0px_0px_12px_rgba(0,0,0,0.25)] rounded-full w-[50px] relative cursor-pointer transition duration-200",
            isWhisper ? "bg-[var(--color-purple)]" : "bg-gray-300"
          )}
        >
          <motion.div
            initial={{ x: isWhisper ? 32 : 0 }}
            animate={{
              height: ["20px", "10px", "20px"],
              width: ["20px", "30px", "20px", "20px"],
              x: isWhisper ? 32 : 0,
            }}
            transition={{ duration: 0.3, delay: 0.1 }}
            key={String(isWhisper)}
            className="h-[20px] w-[20px] block rounded-full bg-white shadow-md z-10"
          ></motion.div>
          <input
            type="checkbox"
            checked={isWhisper}
            onChange={(e) => setIsWhisper(e.target.checked)}
            className="hidden"
            id="whisper-toggle"
          />
        </label>
      </form>
    </div>
  );
};

export default MessageInput;
