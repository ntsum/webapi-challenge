const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");

const project = require("./data/helpers/project.js");
const action = require("./data/helpers/action.js");

const server = express();

server.use(express.json());
server.use(helmet());
server.use(morgan("dev"));
server.use(cors());
server.use("/api/projects", project);
server.use("/api/actions", action);
server.use(updater);

server.get("/", (req, res) => {
  res.send("API IS RUNNING!");
});

function updater(req, res, next) {
  console.log("UPDATED!");
  next();
}

module.exports = server;
