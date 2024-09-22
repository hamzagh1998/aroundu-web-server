import express from "express";
import cors from "cors";
import admin from "firebase-admin";

import { configuration } from "./config";

import { dbConnect } from "./db/db-connect";

import { firebaseAuth } from "./middlewares/firebase-auth";

import { authRouter } from "./controllers/auth/auth.router";
import { profileRouter } from "./controllers/profile/profile.router";

const app = express();

const PORT = +configuration.port;

const firebaseConfig = configuration.firebaseAppConfig;
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig as admin.ServiceAccount),
});

dbConnect(configuration.databaseURL);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
if (process.env.NODE_ENV === "development") {
  app.use(require("morgan")("dev"));
}

// Routes
app.use("/api/auth", firebaseAuth, authRouter);
app.use("/api/profile", firebaseAuth, profileRouter);

app.get("/", (_, res) => res.json({ Status: "Healthy!" }));

app.listen(PORT, () =>
  console.info(`Server is running on http://localhost:${PORT}`)
);
