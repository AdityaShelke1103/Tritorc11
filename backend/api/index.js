import dotenv from "dotenv";
dotenv.config();

// Catch anything that would otherwise crash the whole function silently
process.on("uncaughtException", (err) => {
    console.error("UNCAUGHT EXCEPTION:", err);
});
process.on("unhandledRejection", (err) => {
    console.error("UNHANDLED REJECTION:", err);
});

import express from "express";
import cors from "cors";

import connectDB from "../Config/db.js";
import scanRoutes from "../Routes/scanRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/scan", scanRoutes);

// Catch-all error handler — surfaces the real error in the response
// TEMPORARY: remove the `stack` field once you're done debugging
app.use((err, req, res, next) => {
    console.error("Express error handler caught:", err);
    res.status(500).json({
        success: false,
        message: err.message,
        stack: err.stack
    });
});

if (process.env.NODE_ENV !== "production") {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}

export default app;