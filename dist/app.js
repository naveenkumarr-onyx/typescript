"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const app = (0, express_1.default)();
app.get("/", (req, res) => {
    res.send(`Backend is running on port ${process.env.APP_PORT}... Have fun!`);
});
(0, db_1.connectDB)();
app.use((0, cors_1.default)({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
}));
app.listen(process.env.APP_PORT, () => {
    console.log(`[SERVER] Server is running on port ${process.env.APP_PORT}`);
});
