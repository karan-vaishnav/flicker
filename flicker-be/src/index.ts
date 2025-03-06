import WebSocket, { WebSocketServer } from "ws";

const wss = new WebSocketServer({ port: 8080 });
const clients: WebSocket[] = [];

wss.on("connection", function connection(ws) {
  clients.push(ws);

  ws.on("error", console.error);

  ws.on("message", function message(data) {
    clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(`User: ${data}`);
      }
    });
  });

  ws.on("close", () => {
    const index = clients.indexOf(ws);
    if (index > -1) {
      clients.slice(index, 1);
    }
  });

  ws.send("Welcome to the Chat!");
});
