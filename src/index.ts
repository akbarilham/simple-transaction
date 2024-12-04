import express from "express"
import { connectToDatabase } from "./services/database.service"
import { parkirRouter } from "./routes/parkir.router"
import { transaksiRouter } from "./routes/transaksi.router"
import { pingRouter } from "./routes/ping.router"

const app = express();
const port = 2245;

connectToDatabase()
    .then(() => {
        app.use("/ping", pingRouter);
        // app.use("/parkir", parkirRouter);
        // app.use("/transaksi", transaksiRouter);

        app.listen(port, () => {
            console.log(`Server started at http://localhost:${port}`);
        });
    })
    .catch((error: Error) => {
        console.error("Database connection failed", error);
        process.exit();
    }
);