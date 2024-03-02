import express from "express";
import colors from "@colors/colors";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//test route
app.get("/", (req, res) => {
	res.json({ message: "Server running" });
});

app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`.brightMagenta.underline.bold);
});
