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
exports.laporanRouter = void 0;
// External Dependencies
const express_1 = __importDefault(require("express"));
const database_service_1 = require("../services/database.service");
// Global Config
exports.laporanRouter = express_1.default.Router();
exports.laporanRouter.use(express_1.default.json());
// GET
exports.laporanRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reports = (yield database_service_1.collections.transaksi.find({}).toArray());
        res.status(200).send(reports);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.laporanRouter.get("/tanggal-masuk", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date_in_from = new Date(req.body.date_in);
        const date_out_to = new Date(req.body.date_out);
        const query = { date_in: { $gte: date_in_from, $lt: date_out_to } };
        // const report = (await collections.transaksi.find(query).toArray()) as unknown as Laporan[];
        const report = (yield database_service_1.collections.transaksi.find(query).toArray());
        if (report) {
            res.status(200).send(report);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}));
exports.laporanRouter.get("/tanggal-keluar", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const date_in_from = new Date(req.body.date_in);
        const date_out_to = new Date(req.body.date_out);
        const query = { date_out: { $gte: date_in_from, $lt: date_out_to } };
        const report = (yield database_service_1.collections.transaksi.find(query).toArray());
        if (report) {
            res.status(200).send(report);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with id: ${req.params.id}`);
    }
}));
exports.laporanRouter.get("/plat-nomor", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const query = { plat: { plat_number: req.body.plat_number } };
        const query = { "plat.plat_number": req.body.plat_number };
        const report = (yield database_service_1.collections.transaksi.findOne(query));
        if (report) {
            res.status(200).send(report);
        }
        else if (!report) {
            res.status(204).send(`Plat number not found`);
        }
    }
    catch (error) {
        res.status(404).send(`Unable to find matching document with plat number: ${req.body.plat.plat_number}`);
    }
}));
//# sourceMappingURL=laporan.router.js.map