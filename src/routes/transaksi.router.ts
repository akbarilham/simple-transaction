// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Transaksi from "../models/transaksi";

// Global Config
export const transaksiRouter = express.Router();
transaksiRouter.use(express.json());

// POST
transaksiRouter.post("/", async (req: Request, res: Response) => {
    try {
        req.body.date_in = new Date(req.body.date_in)
        req.body.date_out = new Date(req.body.date_out)

        const insertTransaksi = req.body as Transaksi;
        console.log(insertTransaksi)
        const result = await collections.transaksi.insertOne(insertTransaksi);

        result
            ? res.status(201).send(`Successfully created a transaksi with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a transaksi.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});