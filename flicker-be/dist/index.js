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
    const user = { ws, username };
    users.push(user);
    ws.on("error", console.error);
    ws.on("message", function message(data) {
        const sender = users.find((user) => user.ws === ws);
        if (sender) {
            const senderUsername = sender.username;
            const messageObject = {
                username: senderUsername,
                text: data.toString(),
                timestamp: new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                }),
            };
            users.forEach((user) => {
                if (user.ws !== ws && user.ws.readyState === ws_1.default.OPEN) {
                    user.ws.send(JSON.stringify(messageObject));
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
