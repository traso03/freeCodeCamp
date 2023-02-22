/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

'use strict';
const mongoose = require('mongoose');

module.exports = function (app) {
  const bookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    comments: [{ type: String }],
  });
  const Book = mongoose.model('Book', bookSchema);

  app
    .route('/api/books')
    .get(async function (req, res) {
      //response will be array of book objects
      //json res format: [{"_id": bookid, "title": book_title, "commentcount": num_of_comments },...]
      let books = await Book.find();

      var resp = books.map((d) => ({
        _id: d._id,
        title: d.title,
        commentcount: d.comments.length,
      }));

      res.json(resp);
      return;
    })

    .post(async function (req, res) {
      //response will contain new book object including atleast _id and title
      let title = req.body.title;

      if (!title) {
        res.json('missing required field title');
        return;
      }

      try {
        let myBook = new Book({ title: title, comments: [] });
        let book = await Book.create(myBook);
        res.json(book);
        return;
      } catch (error) {
        res.json({ error: error });
        return;
      }
    })

    .delete(async function (req, res) {
      //if successful response will be 'complete delete successful'
      await Book.deleteMany({});
      res.json('complete delete successful');
    });

  app
    .route('/api/books/:id')
    .get(async function (req, res) {
      let bookid = req.params.id;
      //json res format: {"_id": bookid, "title": book_title, "comments": [comment,comment,...]}
      let book = await Book.findById(bookid).exec();
      if (!book) {
        res.json('no book exists');
        return;
      } else {
        res.json(book);
        return;
      }
    })

    .post(async function (req, res) {
      let bookid = req.params.id;
      let comment = req.body.comment;
      //json res format same as .get

      if (!comment || comment == '') {
        res.json('missing required field comment');
        return;
      }

      let book = await Book.findById(bookid).exec();
      if (!book) {
        res.json('no book exists');
        return;
      } else {
        book.comments.push(comment);
        await book.save().then((savedDoc) => {
          savedDoc.commentcount = savedDoc.comments.length;
          res.json(savedDoc);
        });
        return;
      }
    })

    .delete(async function (req, res) {
      let bookid = req.params.id;
      //if successful response will be 'delete successful'
      const book = await Book.findOneAndDelete({ _id: bookid });
      if (!book) {
        res.json('no book exists');
        return;
      }
      res.json('delete successful');
      return;
    });
};
