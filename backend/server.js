require("dotenv").config();
const express = require("express");
const router = express.Router();
const path = require("path");
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3001;
const db = require("./models");


const blank = require("null");



 liveReloadServer.watch(path.join(__dirname, "../public"));

 app.use(connectLiveReload());
 liveReloadServer.server.once("connection", () => {
   setTimeout(() => {
    liveReloadServer.refresh("/");
  }, 100);
 });


app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173",]
  })
);
app.options("*", cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan("dev"));

app.use("/null", null);


// Basic route for homepage
app.get("/", (req, res) => {
  res.send("Welcome to MusicDB!");
});


console.log(`Server running on port ${PORT}`);