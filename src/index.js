import { config } from "dotenv";
config(); //If we use this method then we have to configuration here

import dotenv from "dotenv";
import connectToDB from "./db/db.connection.js";
import { app } from "./app.js";

import cloudinary from "cloudinary";
// dotenv.config({
//   path: "./.env",
// });

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
const PORT = process.env.PORT;

connectToDB()
  .then(() => {
    app.listen(PORT || 7000, () => {
      console.log(`Server is runnig at http://localhost:${PORT}`);
    });
  })

  .catch((e) => {
    console.log("MongoDB connection failed!!!");
  });
