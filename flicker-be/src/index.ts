import WebSocket, { WebSocketServer } from "ws";
import { uniqueNamesGenerator, adjectives } from "unique-names-generator";

interface User {
  ws: WebSocket;
  username: string;
}

const wss = new WebSocketServer({ port: 8080 });
const users: User[] = [];

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
  const user: User = { ws, username };
  users.push(user);

  ws.on("error", console.error);

  ws.on("message", function message(data) {
    const sender = users.find((user) => user.ws === ws);
    if (sender) {
      const senderUsername = sender.username;

      users.forEach((user) => {
        if (user.ws !== ws && user.ws.readyState === WebSocket.OPEN) {
          user.ws.send(`${senderUsername}: ${data}`);
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

  ws.send("Welcome to the Chat!");
});
