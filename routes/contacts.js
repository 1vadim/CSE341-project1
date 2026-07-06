const router = require("express").Router();

const usersController = require("../controllers/contacts");

router.get("/", usersController.getAll);
router.get("/:id", usersController.getSingle);

module.exports = router;