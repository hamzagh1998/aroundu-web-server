import { Request, Response, NextFunction } from "express";
import firebaseAdmin from "firebase-admin";

import { tryToCatch } from "../utils/try-to-catch";

export async function firebaseAuth(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const authorization = req.headers.authorization;
  if (!authorization) {
    return res.status(403).json({ error: true, detail: "Unauthorized!" });
  }

  const token = authorization.split(" ")[1];

  const [error, decodeValue] = await tryToCatch(
    (token) => firebaseAdmin.auth().verifyIdToken(token),
    token
  );

  if (error) {
    console.log("Internal server error: " + error);
    return res
      .status(500)
      .json({ error: true, detail: "Internal server error!" });
  } else if (decodeValue) {
    return next();
  } else {
    return res.status(401).json({ error: true, detail: "Unauthorized!" });
  }
}
