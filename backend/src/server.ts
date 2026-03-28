import express from "express";
import CookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.ts";
import messageRoutes from "./routes/message.route.ts";
import path from "path";
import { connectDB } from "./lib/db.ts";
import dns from "node:dns/promises";
import { ENV } from "./lib/ENV.ts";
dns.setServers(["1.1.1.1"]);

const app = express();
const __dirname = path.resolve();
const PORT = ENV.PORT || 3000;

app.use(express.json());
app.use(CookieParser())
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));

  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist/index.html"));
  });
}

app.listen(PORT, () => {
  console.log("Server is running on Port: " + PORT);
  connectDB();
});
