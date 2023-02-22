const chaiHttp = require('chai-http');
const chai = require('chai');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function () {
  let testId;
  test('POST for each field', (done) => {
    chai
      .request(server)
      .post('/api/issues/apitest')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        issue_title: 'test',
        issue_text: 'test',
        created_by: 'test',
        assigned_to: 'test',
        status_text: 'test',
        open: 'true',
      })
      .end((err, res, body) => {
        if (err) {
          done(err);
        } else {
          testId = res.body._id;
          assert.equal(res.status, 200);
          done();
        }
      });
  });

  test('POST only required field', (done) => {
    chai
      .request(server)
      .post('/api/issues/apitest')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        issue_title: 'test',
        issue_text: 'test',
        created_by: 'test',
      })
      .end((err, res, body) => {
        if (err) {
          done(err);
        } else {
          assert.equal(res.status, 200);
          done();
        }
      });
  });

  test('POST missing required field', (done) => {
    chai
      .request(server)
      .post('/api/issues/apitest')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        assigned_to: 'test',
        status_text: 'test',
        open: 'true',
      })
      .end((err, res, body) => {
        if (err) {
          done(err);
        } else {
          let respText = JSON.parse(res.text);
          assert.equal(res.status, 200);
          assert.equal(respText.error, 'required field(s) missing');
          done();
        }
      });
  });

  test('GET project issues', (done) => {
    chai
      .request(server)
      .get('/api/issues/apitest')
      .end((err, res, body) => {
        if (err) {
          done(err);
        } else {
          assert.equal(res.status, 200);
          done();
        }
      });
  });

  test('GET project issues with one filter', (done) => {
    chai
      .request(server)
      .get('/api/issues/apitest?open=false')
      .end((err, res, body) => {
        if (err) {
          done(err);
        } else {
          assert.equal(res.status, 200);
          done();
        }
      });
  });

  test('GET project issues with multiple filter', (done) => {
    chai
      .request(server)
      .get('/api/issues/apitest?open=false&issue_text=test')
      .end((err, res, body) => {
        if (err) {
          done(err);
        } else {
          assert.equal(res.status, 200);
          done();
        }
      });
  });

  test('PUT update one field on one issue', (done) => {
    chai
      .request(server)
      .put('/api/issues/apitest')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        _id: testId,
        issue_title: 'test',
      })
      .end((err, res, body) => {
        if (err) {
          done(err);
        } else {
          let respText = JSON.parse(res.text);
          assert.equal(res.status, 200);
          assert.equal(respText.result, 'successfully updated');
          assert.equal(respText._id, testId);
          done();
        }
      });
  });

  test('PUT update multiple fields on one issue', (done) => {
    chai
      .request(server)
      .put('/api/issues/apitest')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        _id: testId,
        issue_title: 'test',
        created_by: 'test',
      })
      .end((err, res, body) => {
        if (err) {
          done(err);
        } else {
          let respText = JSON.parse(res.text);
          assert.equal(res.status, 200);
          assert.equal(respText.result, 'successfully updated');
          assert.equal(respText._id, testId);
          done();
        }
      });
  });

  test('PUT update with missing _id', (done) => {
    chai
      .request(server)
      .put('/api/issues/apitest')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        issue_title: 'test',
        created_by: 'test',
      })
      .end((err, res, body) => {
        if (err) {
          done(err);
        } else {
          let respText = JSON.parse(res.text);
          assert.equal(res.status, 200);
          assert.equal(respText.error, 'missing _id');
          done();
        }
      });
  });

  test('PUT update with no fields on one issue', (done) => {
    chai
      .request(server)
      .put('/api/issues/apitest')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        _id: testId,
      })
      .end((err, res, body) => {
        if (err) {
          done(err);
        } else {
          let respText = JSON.parse(res.text);
          assert.equal(res.status, 200);
          assert.equal(respText.error, 'no update field(s) sent');
          assert.equal(respText._id, testId);
          done();
        }
      });
  });

  test('PUT update with invalid id', (done) => {
    chai
      .request(server)
      .put('/api/issues/apitest')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        _id: 'invalidId',
        issue_text: 'test',
      })
      .end((err, res, body) => {
        if (err) {
          done(err);
        } else {
          let respText = JSON.parse(res.text);
          assert.equal(res.status, 200);
          assert.equal(respText.error, 'could not update');
          done();
        }
      });
  });

  test('DELETE one issue', (done) => {
    chai
      .request(server)
      .delete('/api/issues/apitest')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        _id: testId,
      })
      .end((err, res, body) => {
        if (err) {
          done(err);
        } else {
          let respText = JSON.parse(res.text);
          assert.equal(res.status, 200);
          assert.equal(respText.result, 'successfully deleted');
          done();
        }
      });
  });

  test('DELETE issue with invalid id', (done) => {
    chai
      .request(server)
      .delete('/api/issues/apitest')
      .set('content-type', 'application/x-www-form-urlencoded')
      .send({
        _id: 'invalidId',
      })
      .end((err, res, body) => {
        if (err) {
          done(err);
        } else {
          let respText = JSON.parse(res.text);
          assert.equal(res.status, 200);
          assert.equal(respText.error, 'could not delete');
          done();
        }
      });
  });

  test('DELETE issue with missing id', (done) => {
    chai
      .request(server)
      .delete('/api/issues/apitest')
      .set('content-type', 'application/x-www-form-urlencoded')
      .end((err, res, body) => {
        if (err) {
          done(err);
        } else {
          let respText = JSON.parse(res.text);
          assert.equal(res.status, 200);
          assert.equal(respText.error, 'missing _id');
          done();
        }
      });
  });
});
