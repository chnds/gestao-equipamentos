const express = require("express");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

let equipments = [
  { id: 1, name: "Máquina 1", status: "Operacional" },
  { id: 2, name: "Máquina 2", status: "Em Manutenção" },
];

// Lista de equipamentos (protegida)
router.get("/equipments", authMiddleware, (req, res) => {
  res.json(equipments);
});

module.exports = router;
