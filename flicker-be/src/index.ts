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

const wss = new WebSocketServer({ port: 8080 });
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
        }, 20000);
      }

      users.forEach((user) => {
        if (user.ws !== ws && user.ws.readyState === WebSocket.OPEN) {
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
    const index = users.findIndex((user) => user.ws === ws);
    if (index > -1) {
      users.splice(index, 1);
    }
  });

  ws.send(JSON.stringify(messages));
});

setInterval(() => {
  let i = users.length - 1;
  while (i >= 0) {
    if (users[i]) {
      const now = Date.now();
      if (now - users[i].lastActive > 300000) {
        users[i].ws.close();
        users.splice(i, 1);
      }
    }
    i--;
  }
}, 60000);
