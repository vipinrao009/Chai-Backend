import { config } from "dotenv";
config();
import connectToDB from "./db/db.connection.js";
import { app } from "./app.js";

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
