var
  assert = require('assert'),
  should = require('should'),
  got = require('got');

const
  port = '9201';
  url = 'http://localhost:'+port;

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
  it('should return error 555 for /error/555', function() {
    return got(url+'/error/555')
    .then(function(resp) {
      throw new Error('should fail');
    })
    .catch(function(err) {
      err.statusCode.should.be.equal(555);
    });
  });
});
