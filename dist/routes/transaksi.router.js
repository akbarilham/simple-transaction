"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.transaksiRouter = void 0;
// External Dependencies
const express_1 = __importDefault(require("express"));
const database_service_1 = require("../services/database.service");
// Global Config
exports.transaksiRouter = express_1.default.Router();
exports.transaksiRouter.use(express_1.default.json());
// POST
exports.transaksiRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.body.date_in = new Date(req.body.date_in);
        req.body.date_out = new Date(req.body.date_out);
        const insertTransaksi = req.body;
        console.log(insertTransaksi);
        const result = yield database_service_1.collections.transaksi.insertOne(insertTransaksi);
        result
            ? res.status(201).send(`Successfully created a transaksi with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a transaksi.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
//# sourceMappingURL=transaksi.router.js.map