import "dotenv/config";

import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route";
import userRoutes from "./routes/user.route";
import sessionRoutes from "./routes/session.route";

import authenticate from "./middleware/authenticate";
import errorHandler from "./middleware/errorHandler";

import { OK } from "./constants/http";
import connectToDatabase from "./config/db";
import { APP_ORIGIN, NODE_ENV, PORT } from "./constants/env";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: APP_ORIGIN,
    credentials: true,
  })
);

app.use(cookieParser());

app.get("/", (req: any, res: any, next: any) => {
  return res.status(OK).json({
    status: "success",
  });
});

// auth routes
app.use("/auth", authRoutes);

//protected Routes
app.use("/user",authenticate, userRoutes);
app.use("/sessions",authenticate, sessionRoutes);

app.use(errorHandler);

app.listen(PORT, async () => {
  console.log(`Server is running on PORT ${PORT} in ${NODE_ENV} environment`);
  await connectToDatabase();
});
