const { Book, Author } = require("../models/index");

const authorSevices = {
  // Add author
  create: async (req, res) => {
    try {
      const newAuthor = new Author(req.body);
      const saveAuthor = await newAuthor.save();
      res.status(200).json(saveAuthor);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //Get all author
  getAll: async (req, res) => {
    try {
      const authors = await Author.find();
      res.status(200).json(authors);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  //Get author by id
  getById: async (req, res) => {
    try {
      const author = await Author.findById(req.params.id).populate("books");
      res.status(200).json(author);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // update author
  update: async (req, res) => {
    try {
      const author = await Author.findById(req.params.id);
      await author.updateOne({ $set: req.body });
      res.status(200).json(author);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // remove author
  remove: async (req, res) => {
    try {
      const authorId = await Author.findById(req.params.id);
      if (authorId) {
        await Author.findByIdAndDelete(req.params.id);
        await Book.updateMany({ author: req.params.id }, { author: null });
        res.status(200).json("Deleted Successfully.");
      } else {
        res.status(400).json({ error: "Invalid Author ID" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = authorSevices;
