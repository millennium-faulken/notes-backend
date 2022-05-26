const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const noteRoutes = require("./noteRoutes");

const server = express();

server.use(express.json());
server.use(cors({}));
server.use("/notes", noteRoutes);

var uri =
  "mongodb+srv://justin:newPassword@cluster0.toc1z.mongodb.net/Note?retryWrites=true&w=majority";

mongoose
  .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true })
  .then(() => console.log("==connected=="))
  .catch(() => console.log("==error connecting=="));

server.get("/", (req, res) => {
  res.json("=Server is connected=");
});

const port = process.env.PORT || 3333;
server.listen(port, (err) => {
  if (err) console.log(err);
  console.log(`==Running on ${port}==`);
});