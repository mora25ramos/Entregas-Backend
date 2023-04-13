import jwt from "jsonwebtoken";
import { getDB } from "../db/db.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const _id = decoded?._id;
    const db = getDB();
    const user = await db.collection("users").findOne({ _id, "tokens.token": token });
    if (!user) {
      throw new Error();
    }
    req.token = token;
    req.user = user;
    next();
  } catch (e) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

export const isAdmin = async (req, res, next) => {
  try {
    const user = req.user;
    if (user && user.admin) {
      next();
    } else {
      throw new Error();
    }
  } catch (e) {
    res.status(403).send({ error: "You are not authorized to access this resource." });
  }
};

