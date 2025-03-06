export interface Message {
  username: string;
  text: string;
  timestamp: number;
  type: "message" | "whisper";
}
