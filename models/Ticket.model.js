const { Schema, model } = require("mongoose");

const ticketSchema = new Schema(
  {
    eventId: {
      type: Schema.Types.ObjectId,
      ref: "Event",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    quantitySites: {
      type: Number,
      required: true,
    },
    quantitySeats: {
      type: Number,
      required: true,
    },
    pricePayload: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Ticket = model("Ticket", ticketSchema);

module.exports = Ticket;