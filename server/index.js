import express from "express";
import { config } from "dotenv";
import { graphqlHTTP } from "express-graphql";
import schema from "./schema/schema.js";
import colors from "colors";
import connectDB from "./config/db.js";
import cors from "cors";

config();
const port = process.env.PORT || 5000;
const app = express();

//connect to MongoDB
connectDB();
app.use(cors());

app.use(
  "/graphql",
  graphqlHTTP({
    schema: schema,
    // rootValue: root,
    graphiql: process.env.NODE_ENV === "development",
  })
);

app.listen(port, console.log(`server is running on port ${port}`));
