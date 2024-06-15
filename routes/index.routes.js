const router = require("express").Router();
const isTokenValid = require("../middlewares/auth.middlewares");

router.get("/", (req, res, next) => {
  res.json("All good in here");
});

const authRoutes = require("./auth/auth.routes");
router.use("/auth", authRoutes);

const uploadRoutes = require("./upload.routes");
router.use("/upload", isTokenValid, uploadRoutes);

const ticketRoutes = require("./tickets/tickets.routes");
router.use("/tickets", isTokenValid, ticketRoutes);

const eventRoutes = require("./events/event.routes");
router.use("/events", isTokenValid, eventRoutes);

module.exports = router;
