const { Book, Author } = require("../models/index");

const bookSevices = {
  // Add Book
  create: async (req, res) => {
    try {
      const newBook = new Book(req.body);
      const saveBook = await newBook.save();
      if (req.body.author) {
        const author = Author.findById(req.body.author);
        await author.updateOne({ $push: { books: saveBook._id } });
      }
      res.status(200).json(saveBook);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Get All Book
  getAll: async (req, res) => {
    try {
      const books = await Book.find();
      res.status(200).json(books);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // Get By Id
  getById: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // update book
  update: async (req, res) => {
    try {
      const book = await Book.findById(req.params.id);
      const oldAuthorId = book.author;
      if (req.body.author && req.body.author !== oldAuthorId) {
        await Author.findByIdAndUpdate(oldAuthorId, {
          $pull: { books: book._id },
        });

        await Author.findByIdAndUpdate(req.body.author, {
          $push: { books: book._id },
        });
      }
      await book.updateOne({ $set: req.body });
      res.status(200).json(book);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  // delete book
  remove: async (req, res) => {
    try {
      const bookId = await Book.findById(req.params.id);
      if (bookId) {
        await Book.findByIdAndDelete(req.params.id);
        await Author.updateMany(
          { books: req.params.id },
          { $pull: { books: req.params.id } }
        );
        res.status(200).json("Deleted book sucessfully");
      } else {
        res.status(400).json({ error: "Invalid Book ID" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  },
};

module.exports = bookSevices;
