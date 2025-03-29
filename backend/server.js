const express = require("express");
require("dotenv").config();
const connectDB = require("./config/connectDB");
const urlRoutes = require("./routes/urlRoutes");
const userRoutes = require("./routes/userRoutes");
const { redirectToURL } = require("./controllers/urlControllers");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

const corsOptions = {
  origin: 'https://url-shortener-app-two.vercel.app', // Your frontend URL
  credentials: true, // Allow cookies/auth headers
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
};

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors(corsOptions));

app.options('*', cors(corsOptions));

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
