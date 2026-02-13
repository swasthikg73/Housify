import express from "express";
import cores from "cors";
import indexRouter from "./routes/index.route.js";
import dotenv from "dotenv";
import CookieParser from "cookie-parser";
dotenv.config();

const app = express();
app.use(CookieParser());
app.use(
  cores({
    origin: ["https://housify-theta.vercel.app"],
    credentials: true,
  })
);
app.use(express.json());
const PORT = process.env.PORT || 5000;

app.use("/api/", indexRouter);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/favicon.ico", (req, res) => {
  res.status(204).end();
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
