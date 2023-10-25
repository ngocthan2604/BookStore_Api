const { isValidObjectId } = require("mongoose");

const validateId = (req, res, next) => {
  if (isValidObjectId(req.params.id) == false) {
    res.status(400).json({ error: "Given object id is not valid." });
  } else {
    next();
  }
};

module.exports = { validateId };
