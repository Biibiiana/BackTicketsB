const router = require("express").Router();
const Ticket = require("./../../models/Ticket.model");

// POST "/api/tickets" => Crear un nuevo ticket
router.post("/newticket", async (req, res, next) => {
  const { eventId, userId, quantitySites, quantitySeats, pricePayload } = req.body;

  // Validaciones
  if (!eventId || !userId || quantitySites == null || quantitySeats == null || pricePayload == null) {
    res.status(400).json({ errorMessage: "Todos los campos son obligatorios" });
    return;
  }

  try {
    // Crear nuevo ticket
    const newTicket = await Ticket.create({
      eventId,
      userId,
      quantitySites,
      quantitySeats,
      pricePayload
    });

    res.status(201).json(newTicket);
  } catch (error) {
    next(error);
  }
});

// GET "/api/tickets" => Obtener todos los tickets
router.get("/alltickets", async (req, res, next) => {
  try {
    const tickets = await Ticket.find().populate('eventId').populate('userId');
    res.json(tickets);
  } catch (error) {
    next(error);
  }
});

// GET "/api/tickets/:id" => Obtener un ticket por ID
router.get("/ticket/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    const ticket = await Ticket.findById(id).populate('eventId').populate('userId');
    if (!ticket) {
      res.status(404).json({ errorMessage: "Ticket no encontrado" });
      return;
    }
    res.json(ticket);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
