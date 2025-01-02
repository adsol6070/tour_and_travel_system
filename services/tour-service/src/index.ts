import express, { Request, Response } from "express";

// Create Express app
const app = express();
const port = process.env.PORT || 3002;

// Middleware setup
app.use(express.json()); // To parse JSON request bodies

// Basic Health Check Route
app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to the Tour Service!");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on the port ${port}`);
});
