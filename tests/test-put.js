'use strict';

var
  assert = require('assert'),
  should = require('should'),
  got = require('got');

const port = '9201';
const url = 'http://localhost:'+port;

describe('PUT method', function() {
  it('should return no data for empty input', function() {
    return got(url, {method: 'PUT', body: ''})
    .then(function(resp) {
      resp.body.should.be.equal('');
      resp.statusCode.should.be.equal(200);
    });
  });
  it('should return data', function() {
    return got(url, {method: 'PUT', body: 'abcdef'})
    .then(function(resp) {
      resp.body.should.be.equal('abcdef');
      resp.statusCode.should.be.equal(200);
    });
  });
  it('should return data for error<300', function() {
    return got(url+'/error/201', {method: 'PUT', body: 'abcdef'})
    .then(function(resp) {
      resp.body.should.be.equal('abcdef');
      resp.statusCode.should.be.equal(201);
    });
  });
  /*it('should return no data for error>=300', function() {
    return got(url+'/error/500', {method: 'PUT', body: 'abcdef'})
    .then(function(resp) {
      resp.body.should.be.equal('');
      resp.statusCode.should.be.equal(500);
    });
  });*/
});
