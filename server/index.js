import express from "express";
import { config } from "dotenv";

config();
const port = process.env.PORT || 5000;
const app = express();

app.listen(port, console.log(`server is running on port ${port}`));
