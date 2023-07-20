"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const patients_1 = __importDefault(require("./data/patients"));
const app = (0, express_1.default)();
const cors = require('cors');
const body_parser_1 = __importDefault(require("body-parser"));
app.use(cors());
app.use(body_parser_1.default.json());
const port = 3000;
app.get('/ping', (req, res) => {
    return res.json({ 'ping': 'ping' });
});
app.get('/api/patients', (req, res) => {
    const soughtData = patients_1.default;
    return res.json([...soughtData]);
});
app.listen(port, () => {
    console.log(`Exercises app listening on port ${port}`);
});
