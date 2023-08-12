const express = require("express");
const router = express.Router();

const { checkRole } = require("../middlewares/role");
const { createOrder, getUserAllOrder, updateOrderedStatus } = require("../controllers/order.controller");
const { checkAuthentication } = require("../middlewares/authentication");

router.post("/", createOrder);
router.get("/:userId", getUserAllOrder);
router.patch("/:orderId", updateOrderedStatus);

module.exports = router;

