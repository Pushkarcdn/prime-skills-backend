import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const port = process.env.PORT;

export const mongoUri = process.env.MONGO_URI;
