var
  assert = require('assert'),
  should = require('should'),
  got = require('got');

const
  url = 'http://localhost:9009';

describe('GET method', function() {
  it('should return "/" with empty path', function() {
    return got(url)
    .then(function(resp) {
      resp.body.should.be.equal('/');
    });
  });
  it('should return "/" for /', function() {
    return got(url+'/')
    .then(function(resp) {
      resp.body.should.be.equal('/');
    });
  });
  it('should return "/" for ////', function() {
    return got(url+'////')
    .then(function(resp) {
      resp.body.should.be.equal('////');
    })
  });
  it('should return "/abc" for /abc', function() {
    return got(url+'/abc')
    .then(function(resp) {
      resp.body.should.be.equal('/abc');
    });
  });
  it('should return "/abc/" for /abc/', function() {
    return got(url+'/abc/')
    .then(function(resp) {
      resp.body.should.be.equal('/abc/');
    });
  });
  it('should return "/abc///def" for /abc///def', function() {
    return got(url+'/abc///def')
    .then(function(resp) {
      resp.body.should.be.equal('/abc///def');
    });
  });
  it('should return no query (empty path)', function() {
    return got(url+'?p1=v1&p2=v2&p3')
    .then(function(resp) {
      resp.body.should.be.equal('/');
    });
  });
  it('should return no query (path is /abc)', function() {
    return got(url+'/abc?p1=v1&p2=v2&p3')
    .then(function(resp) {
      resp.body.should.be.equal('/abc');
    });
  });
});
