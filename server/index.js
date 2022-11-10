import mongoose from "mongoose";
import express from "express";
import config from "config";
import cors from "cors";
import userRoutes from "./routes/user.routes.js";

const app = express();
const PORT = process.env.PORT || config.get("serverPort");

app.use(express.json());
app.use(cors());

app.use("/", userRoutes);

const start = async () => {
  try {
    await mongoose
      .connect(config.get("dataBaseURL"))
      .then(() => console.log("MongoDb connected"))
      .catch((err) => console.log("MongoDb error", err));

    app.listen(PORT, () => {
      console.log(`Server stared on port ${PORT}`);
    });
  } catch (err) {
    console.log("Server error", err);
  }
};

start().then();
