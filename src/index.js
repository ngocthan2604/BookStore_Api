const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
var bodyParser = require("body-parser");
const connectDb = require("./db");
const authorRouter = require("./controllers/author.controllers");
const bookRouter = require("./controllers/book.controllers");

const app = express();

app.use(cors());
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/v1/author", authorRouter);
app.use("/v1/book", bookRouter);

connectDb()
  .then(() => {
    console.log("Connected to Database");
    app.listen(3000, () => console.log("Server started at 3000"));
  })
  .catch((error) => {
    console.log(error);
  });
