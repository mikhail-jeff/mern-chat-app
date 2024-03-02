import express from "express";
import colors from "@colors/colors";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import { connectToMongoDB } from "./db/connection.js";

const app = express();
const PORT = process.env.PORT || 5000;

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
	connectToMongoDB();

	console.log(`Server running on http://localhost:${PORT}`.brightMagenta.underline.bold);
});
