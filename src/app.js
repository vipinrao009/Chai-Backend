import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

// cors is used for connecting fronted with backend
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
); // app.use mostly middleware or configuration me use hota hai

app.use(cookieParser());
app.use(express.json({ limit: "16kb" })); // body me jab json aaye to usko bhi accept karana
app.use(express.urlencoded({ limit: "16kb" })); //accept encoded data from the body (%)

app.use(express.static("public")); // allow to store the asset in public folder
const app = express();

export { app };


