import dotenv from "dotenv";

dotenv.config();

export default {
  mongoDBUrl: process.env.MONGODB_URI,
  sessionSecret: process.env.SESSION_SECRET,
  jwtSecret: process.env.JWT_SECRET,
};