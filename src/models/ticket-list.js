const Ticket = require("./ticket");

class TicketList {
  constructor() {
    this.lastNumber = 0;
    this.pendingTickets = [];
    this.assignedTickets = [];
  }

  get nextNumber() {
    this.lastNumber++;
    return this.lastNumber;
  }

  get last13() {
    return this.assignedTickets.slice(0, 13);
  }

  createTicket() {
    const newTicket = new Ticket(this.nextNumber);
    this.pendingTickets.push(newTicket);
    return newTicket;
  }

  assignTicket(agent, desktop) {
    if (this.pendingTickets.length === 0) {
      return null;
    }

    const nextTicket = this.pendingTickets.shift();
    nextTicket.agent = agent;
    nextTicket.desktop = desktop;

    this.assignedTickets.unshift(nextTicket);

    return nextTicket;
  }
}

module.exports = TicketList;
