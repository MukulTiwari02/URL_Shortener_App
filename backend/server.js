const express = require("express");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const urlRoutes = require("./routes/urlRoutes");
const userRoutes = require("./routes/userRoutes");
const { redirectToURL } = require("./controllers/urlControllers");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: ["https://url-shortener-app-two.vercel.app/"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use("/api/url", urlRoutes);
app.use("/api/user", userRoutes);

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/:shortURL", redirectToURL);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  connectDB();
  console.log("Server running on PORT " + PORT);
});
