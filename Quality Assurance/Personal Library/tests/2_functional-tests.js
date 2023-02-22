/*
 *
 *
 *       FILL IN EACH FUNCTIONAL TEST BELOW COMPLETELY
 *       -----[Keep the tests in the same order!]-----
 *
 */

const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  /*
   * ----[EXAMPLE TEST]----
   * Each test should completely test the response of the API end-point including response status code!
   */
  // test('#example Test GET /api/books', function (done) {
  //   chai
  //     .request(server)
  //     .get('/api/books')
  //     .end(function (err, res) {
  //       assert.equal(res.status, 200);
  //       assert.isArray(res.body, 'response should be an array');
  //       assert.property(
  //         res.body[0],
  //         'commentcount',
  //         'Books in array should contain commentcount'
  //       );
  //       assert.property(
  //         res.body[0],
  //         'title',
  //         'Books in array should contain title'
  //       );
  //       assert.property(
  //         res.body[0],
  //         '_id',
  //         'Books in array should contain _id'
  //       );
  //       done();
  //     });
  // });
  /*
   * ----[END of EXAMPLE TEST]----
   */

  suite('Routing tests', function () {
    let testid;
    suite(
      'POST /api/books with title => create book object/expect book object',
      function () {
        test('Test POST /api/books with title', function (done) {
          chai
            .request(server)
            .keepOpen()
            .post('/api/books')
            .send({
              title: 'Test',
            })
            .end(function (err, res) {
              testid = res.body._id;
              assert.equal(res.status, 200);
              assert.isObject(res.body, 'response should be an object');
              assert.property(
                res.body,
                'title',
                'Book in response should contain title'
              );
              assert.property(
                res.body,
                '_id',
                'Book in response should contain _id'
              );
              done();
            });
        });

        test('Test POST /api/books with no title given', function (done) {
          chai
            .request(server)
            .keepOpen()
            .post('/api/books')
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.isString(res.body, 'missing required field title');
              done();
            });
        });
      }
    );

    suite('GET /api/books => array of books', function () {
      test('Test GET /api/books', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get('/api/books')
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isArray(res.body, 'response should be an array');
            assert.property(
              res.body[0],
              'commentcount',
              'Books in array should contain commentcount'
            );
            assert.property(
              res.body[0],
              'title',
              'Books in array should contain title'
            );
            assert.property(
              res.body[0],
              '_id',
              'Books in array should contain _id'
            );
            done();
          });
      });
    });

    suite('GET /api/books/[id] => book object with [id]', function () {
      test('Test GET /api/books/[id] with id not in db', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get(`/api/books/63ef8482d164a07f5c92f6c7`)
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isString(res.body, 'no book exists');
            done();
          });
      });

      test('Test GET /api/books/[id] with valid id in db', function (done) {
        chai
          .request(server)
          .keepOpen()
          .get(`/api/books/${testid}`)
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isObject(res.body, 'response should be an object');
            assert.property(
              res.body,
              'comments',
              'Book should contain comments'
            );
            assert.property(res.body, 'title', 'Book should contain title');
            assert.property(res.body, '_id', 'Book should contain _id');
            done();
          });
      });
    });

    suite(
      'POST /api/books/[id] => add comment/expect book object with id',
      function () {
        test('Test POST /api/books/[id] with comment', function (done) {
          chai
            .request(server)
            .keepOpen()
            .post(`/api/books/${testid}`)
            .send({
              comment: 'Commento esempio',
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.isObject(res.body, 'response should be an object');
              assert.property(
                res.body,
                'comments',
                'Book should contain comments'
              );
              assert.property(res.body, 'title', 'Book should contain title');
              assert.property(res.body, '_id', 'Book should contain _id');
              done();
            });
        });

        test('Test POST /api/books/[id] without comment field', function (done) {
          chai
            .request(server)
            .keepOpen()
            .post(`/api/books/${testid}`)
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.isString(res.body, 'missing required field comment');
              done();
            });
        });

        test('Test POST /api/books/[id] with comment, id not in db', function (done) {
          chai
            .request(server)
            .keepOpen()
            .post(`/api/books/63ef8482d164a07f5c92f6c7`)
            .send({
              comment: 'Commento esempio',
            })
            .end(function (err, res) {
              assert.equal(res.status, 200);
              assert.isString(res.body, 'no book exists');
              done();
            });
        });
      }
    );

    suite('DELETE /api/books/[id] => delete book object id', function () {
      test('Test DELETE /api/books/[id] with valid id in db', function (done) {
        chai
          .request(server)
          .keepOpen()
          .delete(`/api/books/${testid}`)
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isString(res.body, 'delete successful');
            done();
          });
      });

      test('Test DELETE /api/books/[id] with  id not in db', function (done) {
        chai
          .request(server)
          .keepOpen()
          .delete(`/api/books/63ef8482d164a07f5c92f6c7`)
          .end(function (err, res) {
            assert.equal(res.status, 200);
            assert.isString(res.body, 'delete successful');
            done();
          });
      });
    });
  });
});
