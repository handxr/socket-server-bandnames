const express = require("express");
const http = require("http");
const socketio = require("socket.io");
const path = require("path");
const Sockets = require("./sockets");
const cors = require("cors");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    this.server = http.createServer(this.app);

    this.io = socketio(this.server, {
      /* options */
    });

    this.sockets = new Sockets(this.io);
  }

  middlewares() {
    this.app.use(express.static(path.resolve(__dirname, "../public")));

    this.app.use(cors());

    this.app.get("/tickets", (req, res) => {
      res.json({
        ok: true,
        result: this.sockets.ticketList.last13,
      });
    });
  }

  // socketsConfig() {
  //   new Sockets(this.io);
  // }

  execute() {
    this.middlewares();

    // this.socketsConfig();

    this.server.listen(this.port, () => {
      console.log("Server is running on port 8080");
    });
  }
}

module.exports = Server;
