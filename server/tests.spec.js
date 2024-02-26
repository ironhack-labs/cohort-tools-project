var app = require('./app.js');
var chai = require('chai');
var request = require('supertest');


var expect = chai.expect;

describe('API Tests', function() {
  it('should return version number', function(done) {
    request(app)
      .get('/api/cohorts')
      .end(function(err, res) {

        // Asserts that the response body contains a property named version that is truthy
        expect(res.body.version).to.be.ok;

        // Asserts that the response code is equal to 200 - it's OK
        expect(res.statusCode).to.equal(200);

        // Says that the block of testing is complete
        done();
      });
  });
});   