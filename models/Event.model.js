const { Schema, model } = require("mongoose");

const eventSchema = new Schema(
  {
    tourName: {
      type: String,
      required: [true, "Tour name es obligatorio."],
      trim: true,
    },
    artist: {
      type: String,
      required: [true, "El artista es obligatorio."],
      trim: true,
    },
    musicalGenre: {
      type: String,
      required: [true, "El género musical es obligatorio."],
      enum: [
        'Rock', 'Jazz', 'Pop', 'Classical', 'Hip-Hop', 'Electronic', 
        'Country', 'Reggae', 'K-Pop', 'J-Pop', 'Pop/Rock', 'Bachata', 
        'Salsa', 'Urbano'
      ]
    },
    trackQuantity: {
      type: Number,
      required: [true, "El aforo de pista es obligatorio."],
    },
    seatQuantity: {
      type: Number,
      required: [true, "La cantidad de asientos es obligatoria."],
    },
    trackPrice: {
      type: Number,
      required: [true, "El precio en pista es obligatorio."],
    },
    seatPrice: {
      type: Number,
      required: [true, "El precio por asiento es obligatorio."],
    },
    avaliableSites: {
      type: Number,
      required: true,
    },
    avaliableSeats: {
      type: Number,
      required: true,
    },
    city: {
      type: [String],
      required: [true, "La ciudad es obligatoria."],
    },
    address: {
      type: String,
      required: [true, "La dirección es obligatoria."],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, "La fecha es obligatoria"],
    },
    poster: {
      type: String,
      required: [true, "La url del póster es obligatoria."],
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Event = model("Event", eventSchema);

module.exports = Event;
