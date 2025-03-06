"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = __importStar(require("ws"));
const unique_names_generator_1 = require("unique-names-generator");
const wss = new ws_1.WebSocketServer({ port: 8080 });
const users = [];
const messages = [];
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
function generateUsername() {
    return (0, unique_names_generator_1.uniqueNamesGenerator)({
        dictionaries: [unique_names_generator_1.adjectives, natureNouns],
        separator: "",
        length: 2,
        style: "capital",
    });
}
function generateUniqueUsername() {
    let username = generateUsername();
    while (users.some((user) => user.username === username)) {
        username = generateUsername();
    }
    return username;
}
wss.on("connection", function connection(ws) {
    const username = generateUniqueUsername();
    const user = { ws, username, lastActive: Date.now() };
    users.push(user);
    ws.on("error", console.error);
    ws.on("message", function message(data) {
        const sender = users.find((user) => user.ws === ws);
        if (sender) {
            const senderUsername = sender.username;
            const parsedData = JSON.parse(data.toString());
            const timestamp = Date.now();
            const messageObject = {
                username: senderUsername,
                text: parsedData.text,
                timestamp: timestamp,
                type: parsedData.type || "message",
            };
            messages.push(messageObject);
            if (messageObject.type === "whisper") {
                setTimeout(() => {
                    const index = messages.findIndex((msg) => msg.username === messageObject.username &&
                        msg.text === messageObject.text &&
                        msg.timestamp === messageObject.timestamp);
                    if (index > -1) {
                        messages.splice(index, 1);
                    }
                    // Broadcast updated messages
                    users.forEach((user) => {
                        if (user.ws.readyState === ws_1.default.OPEN) {
                            const filteredMessages = messages.filter((msg) => msg.type !== "whisper" || Date.now() - msg.timestamp < 20000);
                            user.ws.send(JSON.stringify(filteredMessages));
                        }
                    });
                }, 20000);
            }
            // Send updated messages
            users.forEach((user) => {
                if (user.ws.readyState === ws_1.default.OPEN) {
                    const filteredMessages = messages.filter((msg) => msg.type !== "whisper" || Date.now() - msg.timestamp < 20000);
                    user.ws.send(JSON.stringify(filteredMessages));
                }
            });
        }
    });
    ws.on("close", () => {
        users.splice(users.findIndex((user) => user.ws === ws), 1);
    });
    ws.send(JSON.stringify(messages));
});
