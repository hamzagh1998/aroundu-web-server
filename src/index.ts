import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import { dbConnect } from "./db/db-connect";
import { configuration } from "./config";

dotenv.config();

const PORT = configuration.port;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(require("morgan")("dev"));
}

dbConnect(configuration.databaseURL);

app.get("/", (_, res) => res.json({ Status: "Healthy!" }));

app.listen(PORT, () =>
  console.info(`Server is running on http://localhost:${PORT}`)
);
