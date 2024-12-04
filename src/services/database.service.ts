// External Dependencies
import * as mongoDB from "mongodb";
import * as dotenv from "dotenv";

// Global Variables
export const collections: { parkir?: mongoDB.Collection, transaksi?: mongoDB.Collection, laporan?: mongoDB.Collection } = {}

// Initialize Connection
export async function connectToDatabase () {
    dotenv.config();
    
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING);
    await client.connect();    
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
    // body validation
    await db.command({
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

    const parkirCollection: mongoDB.Collection = db.collection(process.env.PARKIR_COLLECTION_NAME);
    const transaksiCollection: mongoDB.Collection = db.collection(process.env.TRANSAKSI_COLLECTION_NAME);
    const laporanCollection: mongoDB.Collection = db.collection(process.env.LAPORAN_COLLECTION_NAME);
    collections.parkir = parkirCollection;
    collections.transaksi = transaksiCollection;
    collections.laporan = laporanCollection;

    console.log(`Successfully connected to database: ${db.databaseName} and collection: ${parkirCollection.collectionName}, ${transaksiCollection.collectionName} and ${laporanCollection.collectionName} `);
 }