const router = require("express").Router();
const authorSevices = require("../services/author.services");

// Add author
router.post("/create", authorSevices.create);
router.get("/", authorSevices.getAll);
router.get("/:id", authorSevices.getById);
router.put("/update/:id", authorSevices.update);
router.delete("/remove/:id", authorSevices.remove);

module.exports = router;
