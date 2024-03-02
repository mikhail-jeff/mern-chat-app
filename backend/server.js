import express from "express";
import colors from "@colors/colors";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
	res.json({ message: "Server running" });
});

app.listen(PORT, () => {
	console.log(`Server running on http://localhost:${PORT}`.brightMagenta.underline.bold);
});
