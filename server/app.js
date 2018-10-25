import express from "express";
import bodyParser from "body-parser";

import router from './routes/index.js';
import Note from "./note";

const SERVER_PORT = 3001;

const server = express();


server.use(bodyParser.json());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
});

server.use(router);

// Setup listener
server.listen(SERVER_PORT, () => {
  console.log(`Notes server is listening on port ${SERVER_PORT}`);
});
