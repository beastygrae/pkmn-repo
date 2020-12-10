const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");

// Create an App.
const app = express();

//Vote route.
const vote=require("./routes/vote")

// Serve the static files from public.
app.use( express.static( path.join(__dirname, "public") ) );

// Include the body-parser middleware.
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { extended: false } ) );

// Enable CORS.
app.use( cors() );

// Set the port.
app.use("/vote", vote);

const port = process.env.port || 3000;

// Listen to incoming connections.
app.listen(port, () => {
  console.log(`Server started on port ${port}.`);
});