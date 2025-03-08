import WebSocket, { WebSocketServer } from "ws";
import { uniqueNamesGenerator, adjectives } from "unique-names-generator";

interface User {
  ws: WebSocket;
  username: string;
  lastActive: number;
}

interface Message {
  username: string;
  text: string;
  timestamp: number;
  type: "message" | "whisper";
}

const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 8080;

const wss = new WebSocketServer({ port: PORT });
const users: User[] = [];
const messages: Message[] = [];

const natureNouns = [
  "River",
  "Mountain",
  "Comet",
  "Galaxy",
  "Horizon",
  "Echo",
  "Blaze",
  "Storm",
  "Aurora",
  "Ember",
  "Shadow",
  "Breeze",
  "Vortex",
  "Drift",
  "Canyon",
  "Tundra",
  "Nebula",
  "Cosmos",
  "Zephyr",
  "Mist",
];

function generateUsername(): string {
  return uniqueNamesGenerator({
    dictionaries: [adjectives, natureNouns],
    separator: "",
    length: 2,
    style: "capital",
  });
}

function generateUniqueUsername(): string {
  let username = generateUsername();
  while (users.some((user) => user.username === username)) {
    username = generateUsername();
  }
  return username;
}

wss.on("connection", function connection(ws) {
  const username = generateUniqueUsername();
  const user: User = { ws, username, lastActive: Date.now() };
  users.push(user);

  ws.on("error", console.error);

  ws.on("message", function message(data) {
    const sender = users.find((user) => user.ws === ws);
    if (sender) {
      const senderUsername = sender.username;
      const parsedData = JSON.parse(data.toString());
      const timestamp = Date.now();
      const messageObject: Message = {
        username: senderUsername,
        text: parsedData.text,
        timestamp: timestamp,
        type: parsedData.type || "message",
      };

      messages.push(messageObject);

      if (messageObject.type === "whisper") {
        setTimeout(() => {
          const index = messages.findIndex(
            (msg) =>
              msg.username === messageObject.username &&
              msg.text === messageObject.text &&
              msg.timestamp === messageObject.timestamp
          );
          if (index > -1) {
            messages.splice(index, 1);
          }

          users.forEach((user) => {
            if (user.ws.readyState === WebSocket.OPEN) {
              const filteredMessages = messages.filter(
                (msg) =>
                  msg.type !== "whisper" || Date.now() - msg.timestamp < 20000
              );
              user.ws.send(JSON.stringify(filteredMessages));
            }
          });
        }, 20000);
      }

      users.forEach((user) => {
        if (user.ws.readyState === WebSocket.OPEN) {
          const filteredMessages = messages.filter(
            (msg) =>
              msg.type !== "whisper" || Date.now() - msg.timestamp < 20000
          );
          user.ws.send(JSON.stringify(filteredMessages));
        }
      });
    }
  });

  ws.on("close", () => {
    users.splice(
      users.findIndex((user) => user.ws === ws),
      1
    );
  });

  ws.send(JSON.stringify(messages));
});
