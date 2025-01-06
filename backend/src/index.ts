import express, { Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import routes from "./routes";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mongo-db:27017/?authSource=admin`;

app.use(express.json());

const connectToDatabase = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
    process.exit(1);
  }
};

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the User Service!");
});

app.use("/api", routes);

app.listen(PORT, async () => {
  console.log(`Server is running on the port ${PORT}`);
  await connectToDatabase();
});
