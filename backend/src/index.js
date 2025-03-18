import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import messageRoutes from "./routes/message.route.js";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

dotenv.config();  // Load environment variables

const PORT = process.env.PORT || 5000;
const FRONTEND_URL = process.env.FRONTEND_URL || "http://localhost:5173";

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Middleware
app.use(
  cors({
    origin: FRONTEND_URL,
    credentials: true,
  })
);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

// Ensure database connection
connectDB();

// Start server only in development (Vercel handles serverless functions automatically)
if (process.env.NODE_ENV !== "production") {
  server.listen(PORT, () => {
    console.log("Server is running on PORT: " + PORT);
  });
}

// Export Express app for Vercel
export default app;



// // const express = require("express")
// import express from "express"
// import authRoutes from "./routes/auth.route.js"
// import dotenv from "dotenv"
// import cookieParser from "cookie-parser"
// import messageRoutes from "./routes/message.route.js"
// import cors from "cors";

// import {connectDB} from './lib/db.js'
// import { app, server } from "./lib/socket.js"
// dotenv.config()
// // const app = express();    // delete because soket.io me app create kar diya hai
// // import { app, server } from "./lib/socket.js"  <------ we imported this app from soket.io this will we will use

// const PORT = process.env.PORT
// // this will allow you to extract json data out of body
// app.use(express.json()); 
// app.use(cookieParser());
// app.use(cors(
//     { 
//     origin: "http://localhost:5173",
//     credentials: true
// }
// ))


// app.use("/api/auth", authRoutes);
// app.use("/api/messages", messageRoutes);

// // app.listen(PORT, ()=>{             <------------- app ko server se replace kar de to use socket.io
// server.listen(PORT, ()=>{
//     console.log("server is running on PORT :" + PORT);
//     connectDB()
// }) 

