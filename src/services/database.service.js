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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.connectToDatabase = exports.collections = void 0;
// External Dependencies
var mongoDB = require("mongodb");
var dotenv = require("dotenv");
// Global Variables
exports.collections = {};
// Initialize Connection
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function () {
        var client, db, parkirCollection, transaksiCollection, laporanCollection;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    dotenv.config();
                    client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
                    return [4 /*yield*/, client.connect()];
                case 1:
                    _a.sent();
                    db = client.db(process.env.DB_NAME);
                    // body validation
                    return [4 /*yield*/, db.command({
                            "collMod": process.env.PARKIR_COLLECTION_NAME,
                            "validator": {
                                $jsonSchema: {
                                    bsonType: "object",
                                    // required: ["transaksi_number", "date_in", "date_out"],
                                    additionalProperties: false,
                                    properties: {
                                        _id: {},
                                        transaksi_number: {
                                            bsonType: "string",
                                            description: "'number_of_blocks' is required and is a number"
                                        },
                                        plat: {
                                            bsonType: "object",
                                            description: "'plat' is an object",
                                            properties: {
                                                plat_code: { bsonType: "string" },
                                                plat_number: { bsonType: "number" },
                                                end_plat_code: { bsonType: "string" },
                                                plat_color: { bsonType: "string" }
                                            }
                                        },
                                        vehicle: {
                                            bsonType: "object",
                                            description: "'vehicle' is an object",
                                            properties: {
                                                vehicle_type: { bsonType: "string" },
                                                vehicle_brand: { bsonType: "string" }
                                            }
                                        },
                                        date_in: {
                                            bsonType: "date",
                                            description: "'block_code' is a Date"
                                        },
                                        date_out: {
                                            bsonType: "date",
                                            description: "'block_code' is a Date"
                                        },
                                        unit_price: {
                                            bsonType: "decimal",
                                            description: "'block_code' is a Decimal"
                                        },
                                        amount_price: {
                                            bsonType: "decimal",
                                            description: "'block_code' is a Decimal"
                                        }
                                    }
                                }
                            }
                        })];
                case 2:
                    // body validation
                    _a.sent();
                    parkirCollection = db.collection(process.env.PARKIR_COLLECTION_NAME);
                    transaksiCollection = db.collection(process.env.TRANSAKSI_COLLECTION_NAME);
                    laporanCollection = db.collection(process.env.LAPORAN_COLLECTION_NAME);
                    exports.collections.parkir = parkirCollection;
                    exports.collections.transaksi = transaksiCollection;
                    exports.collections.laporan = laporanCollection;
                    console.log("Successfully connected to database: ".concat(db.databaseName, " and collection: ").concat(parkirCollection.collectionName, ", ").concat(transaksiCollection.collectionName, " and ").concat(laporanCollection.collectionName, " "));
                    return [2 /*return*/];
            }
        });
    });
}
exports.connectToDatabase = connectToDatabase;
