const BandList = require("./band-list");
const TicketList = require("./ticket-list");

class Sockets {
  constructor(io) {
    this.io = io;
    this.bandList = new BandList();
    this.ticketList = new TicketList();
    this.socketEvents();
  }

  socketEvents() {
    this.io.on("connection", (socket) => {
      console.log("Client connected");

      socket.emit("current-bands", this.bandList.getBands());

      socket.on("vote-band", (id) => {
        this.bandList.increaseVotes(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("remove-band", (id) => {
        this.bandList.removeBand(id);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("change-band-name", ({ id, newName }) => {
        this.bandList.changeName(id, newName);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("add-band", ({ name }) => {
        this.bandList.addBand(name);
        this.io.emit("current-bands", this.bandList.getBands());
      });

      socket.on("create-ticket", (_, callback) => {
        const newTicket = this.ticketList.createTicket();
        callback(newTicket);
      });

      socket.on("next-ticket", ({ agent, desk }, callback) => {
        const myTicket = this.ticketList.assignTicket(agent, desk);
        callback(myTicket);

        this.io.emit("last13", this.ticketList.last13);
      });
    });
  }
}

module.exports = Sockets;
