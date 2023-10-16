const chai = require('chai');
const chaiHttp = require('chai-http');
const assert = chai.assert;
const expect = chai.expect;
const app  = require('../app');
chai.use(chaiHttp);

describe('Integration Test', () => {
    it('Gets /docs endpoint', (done) => {
      chai
        .request(app)
        .get('/docs')
        .end((err, res) => {
            expect(res).to.have.status(200);
            done();
          });
    });

    it('Gets /api/cohorts endpoint', (done) => {
        chai
          .request(app)
          .get('/api/cohorts ')
          .end((err, res) => {
              expect(res).to.have.status(200);
              done();
            });
      });


    it('Gets /api/students endpoint', (done) => {
        chai
          .request(app)
          .get('/api/students ')
          .end((err, res) => {
              expect(res).to.have.status(200);
              assert.typeOf(res.body, 'array')
              done();
            });
      });

      it('Gets /api/students endpoint and an array as a response', (done) => {
        chai
          .request(app)
          .get('/api/students ')
          .end((err, res) => {
              expect(res).to.have.status(200);
              assert.typeOf(res.body, 'array')
              done();
            });
      });
      

      
  });
