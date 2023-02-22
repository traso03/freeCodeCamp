const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server.js');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  suite('POST /api/translate/{project}', function () {
    test('Translation with text and locale fields', function (done) {
      const strText = 'Mangoes are my favorite fruit.';
      const strLocale = 'american-to-british';
      const strTranslated =
        'Mangoes are my <span class="highlight">favourite</span> fruit.';
      chai
        .request(server)
        .keepOpen()
        .post('/api/translate')
        .send({
          text: strText,
          locale: strLocale,
        })
        .end(function (err, res) {
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.property(
            res.body,
            'text',
            'Response should contain propertie text'
          );
          assert.equal(
            res.body.text,
            strText,
            'Response text should be equal: "' + strText + '"'
          );
          assert.property(
            res.body,
            'translation',
            'Response should contain propertie translation'
          );
          assert.equal(
            res.body.translation,
            strTranslated,
            'Response translation should be equal: "' + strTranslated + '"'
          );
          done();
        });
      //
    });

    test('Translation with text and invalid locale field', function (done) {
      const strText = 'Mangas são a minha fruta favorita.';
      const strLocale = 'portuguese-to-british';
      chai
        .request(server)
        .keepOpen()
        .post('/api/translate')
        .send({
          text: strText,
          locale: strLocale,
        })
        .end(function (err, res) {
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.property(
            res.body,
            'error',
            'Response should contain propertie error'
          );
          assert.equal(
            res.body.error,
            'Invalid value for locale field',
            'Response error should be equal: "Invalid value for locale field"'
          );
          done();
        });
      //
    });

    test('Translation with missing text field', function (done) {
      const strLocale = 'american-to-british';
      chai
        .request(server)
        .keepOpen()
        .post('/api/translate')
        .send({
          locale: strLocale,
        })
        .end(function (err, res) {
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.property(
            res.body,
            'error',
            'Response should contain propertie error'
          );
          assert.equal(
            res.body.error,
            'Required field(s) missing',
            'Response error should be equal: "Required field(s) missing"'
          );
          done();
        });
      //
    });

    test('Translation with missing locale field', function (done) {
      const strText = 'Mangoes are my favorite fruit.';
      chai
        .request(server)
        .keepOpen()
        .post('/api/translate')
        .send({
          text: strText,
        })
        .end(function (err, res) {
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.property(
            res.body,
            'error',
            'Response should contain propertie error'
          );
          assert.equal(
            res.body.error,
            'Required field(s) missing',
            'Response error should be equal: "Required field(s) missing"'
          );
          done();
        });
      //
    });

    test('Translation with empty text', function (done) {
      const strText = '';
      const strLocale = 'american-to-british';
      chai
        .request(server)
        .keepOpen()
        .post('/api/translate')
        .send({
          text: strText,
          locale: strLocale,
        })
        .end(function (err, res) {
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.property(
            res.body,
            'error',
            'Response should contain propertie error'
          );
          assert.equal(
            res.body.error,
            'No text to translate',
            'Response error should be equal: "No text to translate"'
          );
          done();
        });
      //
    });

    test('Translation with text that needs no translation', function (done) {
      const strText = 'We watched the footie match for a while.';
      const strLocale = 'american-to-british';
      chai
        .request(server)
        .keepOpen()
        .post('/api/translate')
        .send({
          text: strText,
          locale: strLocale,
        })
        .end(function (err, res) {
          assert.equal(res.status, 200, 'response status should be 200');
          assert.equal(res.type, 'application/json', 'Response should be json');
          assert.property(
            res.body,
            'text',
            'Response should contain propertie text'
          );
          assert.equal(
            res.body.text,
            strText,
            'Response text should be equal: "' + strText + '"'
          );
          assert.property(
            res.body,
            'translation',
            'Response should contain propertie translation'
          );
          assert.equal(
            res.body.translation,
            'Everything looks good to me!',
            'Response translation should be equal "Everything looks good to me!"'
          );
          done();
        });
      //
    });
  });
});
