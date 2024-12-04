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
exports.pingRouter = void 0;
// External Dependencies
const express_1 = __importDefault(require("express"));
const axios_1 = __importDefault(require("axios"));
const database_service_1 = require("../services/database.service");
// Global Config
exports.pingRouter = express_1.default.Router();
exports.pingRouter.use(express_1.default.json());
// GET
exports.pingRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reports = (yield database_service_1.collections.transaksi.find({}).toArray());
        res.status(200).send(reports);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.pingRouter.get("/pokemon", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const url = "https://pokeapi.co/api/v2/pokemon/ditto";
    try {
        const { data, status } = yield axios_1.default.get(url, {
            headers: {
                Accept: 'application/json',
            },
        });
        res.status(200).send(data);
        // collect data and save informaton ping to personal database
        // create if condition status public and send notif to email
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        }
        else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}));
//# sourceMappingURL=ping.router.js.map