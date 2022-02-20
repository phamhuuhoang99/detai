const express = require("express");
const router = express.Router();
const SchemeController = require("../controllers/scheme.controller");

router.get("/", SchemeController.findAll);
router.post("/create", SchemeController.create);
// router.get("/:id", UserController.findOne);
router.put("/:id", SchemeController.update);
// router.delete("/:id", PlanController.delete);

module.exports = router;
