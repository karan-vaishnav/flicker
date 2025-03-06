import React, { useState } from "react";

// Define the correct props type
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

  return (
    <div className="flex items-center gap-2 p-3 bg-white shadow rounded-lg">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="flex-grow border p-2 rounded-lg"
        placeholder="Type your message..."
      />
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 text-white p-2 rounded-lg"
      >
        Send
      </button>
      <button
        onClick={() => setIsWhisper(!isWhisper)}
        className={`p-2 rounded-lg transition-colors ${
          isWhisper ? "bg-red-500 text-white" : "bg-gray-300 text-black"
        }`}
      >
        Whisper
      </button>
    </div>
  );
};

export default MessageInput;
