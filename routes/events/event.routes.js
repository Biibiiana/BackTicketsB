const router = require("express").Router();
const Event = require("./../../models/Event.model");

// POST "/api/events" => Crear un nuevo evento
router.post("/newevent", async (req, res, next) => {
  const {
    tourName, artist, musicalGenre, trackQuantity, seatQuantity, trackPrice, 
    seatPrice, avaliableSites, avaliableSeats, city, address, date, poster
  } = req.body;

  // Validaciones
  if (!tourName || !artist || !musicalGenre || trackQuantity == null || seatQuantity == null || 
      trackPrice == null || seatPrice == null || avaliableSites == null || 
      avaliableSeats == null || !city || !address || !date || !poster) {
    res.status(400).json({ errorMessage: "Todos los campos son obligatorios" });
    return;
  }

  try {
    // Crear nuevo evento
    const newEvent = await Event.create({
      tourName,
      artist,
      musicalGenre,
      trackQuantity,
      seatQuantity,
      trackPrice,
      seatPrice,
      avaliableSites,
      avaliableSeats,
      city,
      address,
      date,
      poster
    });

    res.status(201).json(newEvent);
  } catch (error) {
    next(error);
  }
});

// GET "/api/events" => Obtener todos los eventos
router.get("/allevents", async (req, res, next) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch (error) {
    next(error);
  }
});

// GET "/api/events/:id" => Obtener un evento por ID
router.get("/event/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const event = await Event.findById(id);
    if (!event) {
      res.status(404).json({ errorMessage: "Evento no encontrado" });
      return;
    }
    res.json(event);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
