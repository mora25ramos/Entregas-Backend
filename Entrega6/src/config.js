import dotenv from "dotenv";

dotenv.config();


export const jwtClaveSecreta = 'Mora2002';

export default {
  port: process.env.PORT || 8080,
  dbURL: process.env.DB_URL || "mongodb://localhost:27017/miEcommerce",
  sessionSecret: process.env.SESSION_SECRET || "secreto",
  bcryptSaltRounds: process.env.BCRYPT_SALT_ROUNDS || 10,
};