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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = exports.collections = void 0;
// External Dependencies
const mongoDB = __importStar(require("mongodb"));
const dotenv = __importStar(require("dotenv"));
// Global Variables
exports.collections = {};
// Initialize Connection
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        dotenv.config();
        const client = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
        yield client.connect();
        const db = client.db(process.env.DB_NAME);
        // body validation
        yield db.command({
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
        });
        const parkirCollection = db.collection(process.env.PARKIR_COLLECTION_NAME);
        const transaksiCollection = db.collection(process.env.TRANSAKSI_COLLECTION_NAME);
        const laporanCollection = db.collection(process.env.LAPORAN_COLLECTION_NAME);
        exports.collections.parkir = parkirCollection;
        exports.collections.transaksi = transaksiCollection;
        exports.collections.laporan = laporanCollection;
        console.log(`Successfully connected to database: ${db.databaseName} and collection: ${parkirCollection.collectionName}, ${transaksiCollection.collectionName} and ${laporanCollection.collectionName} `);
    });
}
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=database.service.js.map