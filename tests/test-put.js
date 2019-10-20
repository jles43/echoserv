'use strict';

var
  assert = require('assert'),
  should = require('should'),
  got = require('got');

const port = '9201';
const url = 'http://localhost:'+port;

const empty_body = function(url, meth) {
  return function() {
    return got(url, {method: meth, body: ''})
    .then(function(resp) {
      resp.body.should.be.equal('');
      resp.statusCode.should.be.equal(200);
    });
  };
};

const filled_body = function(url, meth, data) {
  return function() {
    return got(url, {method: meth, body: data})
    .then(function(resp) {
      resp.body.should.be.equal(data);
      resp.statusCode.should.be.equal(200);
    });
  };
};

const error_less_300 = function(url, meth, data, code) {
  return function() {
    code.should.be.within(200, 299);
    return got(url+'/error/'+code, {method: meth, body: data, retry: 0})
    .then(function(resp) {
      resp.body.should.be.equal(data);
      resp.statusCode.should.be.equal(code);
    });
  };
};

const error_300_and_above = function(url, meth, data, code) {
  return function() {
    code.should.be.above(299);
    return got(url+'/error/'+code, {method: meth, body: data, retry: 0})
    .then(function(resp) {
      throw new Error('should fail');
    })
    .catch(function(err) {
      err.statusCode.should.be.equal(code);
    });
  };
};

describe('PUT method', function() {
  it('should return no data for empty input', empty_body(url, 'PUT'));
  it('should return data', filled_body(url, 'PUT', 'abcdef'));
  it('should return data for error<300', error_less_300(url, 'PUT', 'abcdef', 201));
  it('should return no data for error>=300', error_300_and_above(url, 'PUT', 'abcdef', 500));
});

describe('POST method', function() {
  it('should return no data for empty input', empty_body(url, 'POST'));
  it('should return data', filled_body(url, 'POST', 'abcdef'));
  it('should return data for error<300', error_less_300(url, 'POST', 'abcdef', 201));
  it('should return no data for error>=300', error_300_and_above(url, 'POST', 'abcdef', 500));
});
