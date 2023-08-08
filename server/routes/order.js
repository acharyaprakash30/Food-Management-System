const express = require("express");
const router = express.Router();

const { checkRole } = require("../middlewares/role");
const { createOrder, getUserAllOrder } = require("../controllers/order.controller");

router.post("/", createOrder);
router.get("/:userId", getUserAllOrder);

module.exports = router;

