const router = require("express").Router();

const usersController = require("../controllers/contacts");

router.get("/", usersController.getAll);
router.get("/:id", usersController.getSingle);
router.post("/", usersController.createSingle);
router.put('/:id', usersController.updateSingle);
router.delete('/:id', usersController.deleteSingle);

module.exports = router;