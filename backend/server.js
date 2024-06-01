require("dotenv").config();
const express = require("express");
const path = require("path");
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("MONGODB_URI is not defined in the environment variables");
  process.exit(1);
}

mongoose.connect(mongoUri);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

 const liveReloadServer = livereload.createServer();
 liveReloadServer.watch(path.join(__dirname, "../public"));

 app.use(connectLiveReload());
 liveReloadServer.server.once("connection", () => {
   setTimeout(() => {
     liveReloadServer.refresh("/");
  }, 100);
 });

// Import routes from the controllers
const abilityRoutes = require("./controllers/abilityController");
const characterRoutes = require("./controllers/characterController");
const equipmentRoutes = require("./controllers/equipmentController");
const featureRoutes = require("./controllers/featureController");
const savingThrowRoutes = require("./controllers/savingThrowController");
const skillRoutes = require("./controllers/skillController");
const spellRoutes = require("./controllers/spellController");
const characterNoteRoutes = require("./controllers/characterNoteController");

// Middleware
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"]
  })
);
app.options("*", cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use('/abilities', abilityRoutes);
app.use('/characters', characterRoutes);
app.use('/equipment', equipmentRoutes);
app.use('/features', featureRoutes);
app.use('/saving-throws', savingThrowRoutes);
app.use('/skills', skillRoutes);
app.use('/spells', spellRoutes);
app.use('/character-notes', characterNoteRoutes);

// Basic route for homepage
app.get("/", (req, res) => {
  res.send("Welcome to the D&D Character Sheet App!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});