const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const { ExpressPeerServer } = require("peer");
const mongoose = require("mongoose");
// const config = require("config");


const URI = "mongodb+srv://tonystark:0OAgDGhfmYx0E1MH@cluster0.qbrbf.mongodb.net/test?retryWrites=true&w=majority"

const app = express();

const server = http.createServer(app);
const io = socketio(server).sockets;

//** Peer Server */
const customGenerationFunction = () =>
  (Math.random().toString(36) + "0000000000000000000").substr(2, 16);

const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: "/",
  generateClientId: customGenerationFunction,
});

app.use("/mypeer", peerServer);

// //** Config */
// const db = URI;

//Connecting to the db
mongoose.connect(URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(() => console.log("mongoose db connected."))
.catch(e => console.log(e.message))


//* Websocket *//
io.on("connection", function (socket) {});

const port = process.env.PORT || 5000;
server.listen(port, () => console.log(`Server started on port ${port}`))