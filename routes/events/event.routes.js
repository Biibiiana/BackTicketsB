const router = require("express").Router();
const Event = require("../../models/Event.model");

// POST "/api/events" => Crear un nuevo evento
router.post("/newevent", async (req, res, next) => {
  const {
    tourName, artist, genre, seatCount, seatPrice, generalAdmissionCount, 
    generalAdmissionPrice, city, address, date, poster
  } = req.body;

  // Validaciones
  if (!tourName || !artist || !genre || !seatCount || !seatPrice || 
      !generalAdmissionCount || !generalAdmissionPrice || !city || 
      !address || !date || !poster) {
    res.status(400).json({ errorMessage: "Todos los campos son obligatorios" });
    return;
  }

  try {
    const newEvent = await Event.create({
      tourName,
      artist,
      musicalGenre: genre,
      trackQuantity: generalAdmissionCount,
      seatQuantity: seatCount,
      trackPrice: generalAdmissionPrice,
      seatPrice,
      avaliableSites: generalAdmissionCount, 
      avaliableSeats: seatCount,
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
router.get("/:id", async (req, res, next) => {
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

// GET "/api/events/artist/:artist" => Obtener eventos por artista
router.get("/:artist", async (req, res, next) => {
  const { artist } = req.params;
  try {
    const events = await Event.find({ artist });
    res.json(events);
  } catch (error) {
    next(error);
  }
});

// GET "/api/events/genre/:genre" => Obtener eventos por género musical
router.get("/:genre", async (req, res, next) => {
  const { genre } = req.params;
  try {
    const events = await Event.find({ musicalGenre: genre });
    res.json(events);
  } catch (error) {
    next(error);
  }
});

// GET "/api/events/city/:city" => Obtener eventos por ciudad
router.get("/:city", async (req, res, next) => {
  const { city } = req.params;
  try {
    const events = await Event.find({ city });
    res.json(events);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
