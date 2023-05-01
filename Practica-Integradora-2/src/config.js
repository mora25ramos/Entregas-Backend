import dotenv from "dotenv";

dotenv.config();

export default {
  dbMongoURI: process.env.DB_MONGO_URI,
  sessionSecret: process.env.SESSION_SECRET,
  jwtSecret: process.env.JWT_SECRET,
};