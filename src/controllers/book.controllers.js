const router = require("express").Router();
const { validateId } = require("../midderwares");
const bookSevices = require("../services/book.services");

// Add author
router.post("/create", bookSevices.create);
router.get("/", bookSevices.getAll);
router.get("/:id", validateId, bookSevices.getById);
router.put("/update/:id", validateId, bookSevices.update);
router.delete("/remove/:id", validateId, bookSevices.remove);

module.exports = router;
