import express from "express";

// Development server

var app = express();

app.use(express.static("."));

var server = app.listen(3000, function() {
  var port = server.address().port;
  console.log("Server running on localhost:%s", port);
});
