import { config } from "dotenv";
config();
import connectToDB from "./db/db.connection.js";

connectToDB()