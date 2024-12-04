// External Dependencies
import express, { Request, Response } from "express";
import axios from "axios";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Ping from "../models/ping";

// Global Config
export const pingRouter = express.Router();
pingRouter.use(express.json());

// GET
pingRouter.get("/", async (_req: Request, res: Response) => {
    try {
       const reports = (await collections.transaksi.find({}).toArray()) as unknown as Ping[];

        res.status(200).send(reports);
    } catch (error) {
        res.status(500).send(error.message);
    }
});

pingRouter.get("/pokemon", async (req: Request, res: Response) => {
    const url: string = "https://pokeapi.co/api/v2/pokemon/ditto"
    try {
        const { data } = await axios.get<Ping>(
        url,
        {
          headers: {
            Accept: 'application/json',
          },
        },
      )
      res.status(200).send(data.forms)
      // collect data and save informaton ping to personal database
      // create if condition status public and send notif to email
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log('error message: ', error.message);
        return error.message;
      } else {
        console.log('unexpected error: ', error);
        return 'An unexpected error occurred';
      }
    }
});