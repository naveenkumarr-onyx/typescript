"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("dotenv/config");
const cors_1 = __importDefault(require("cors"));
require("./config/db");
const route_1 = __importDefault(require("./routes/route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.send(`Backend is running on port ${process.env.APP_PORT}... Have fun!`);
});
app.use((0, cors_1.default)({
    origin: "*"
}));
app.use("/app", route_1.default);
app.listen(process.env.APP_PORT, () => {
    console.log(`[SERVER] Express is running on port ${process.env.APP_PORT}`);
});
