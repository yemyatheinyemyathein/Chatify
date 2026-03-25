import express from 'express';
import dotenv from "dotenv"
import authRoutes from "./routes/auth.route.ts"
import messageRoutes from "./routes/message.route.ts"
import path from "path";
import { connectDB } from './lib/db.ts';
dotenv.config();
import dns from "node:dns/promises";
dns.setServers(["1.1.1.1"]);

const app = express();
const __dirname = path.resolve();
const PORT = process.env.PORT || 3000

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if(process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/dist")))

    app.get("*", (_, res) => {
        res.sendFile(path.join(__dirname, "../frontend/dist/index.html"))
    })
}

app.listen(PORT, ()=>{
    console.log("Server is running on Port: " + PORT);
    connectDB();
})