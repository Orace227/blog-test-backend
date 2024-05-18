import express from "express";
import { config as dotenvConfig } from "dotenv";
import connectToMongo from "./db.js";
import blogRoutes from "./routes/blog.js";
const app = express();
import cors from "cors";

dotenvConfig();

// here all variables are defined

const port = 8000;

// connected to db
const db = connectToMongo();

app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL_1, process.env.CLIENT_URL_2],
    methods: ["GET", "POST", "UPDATE", "DELETE"],
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.json({
    massage: "Welcome to the Blog Task Api Server!!",
    status: "success",
  });
});

//  blog route //
app.use("/api/v1/blog", blogRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
