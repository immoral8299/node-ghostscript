var exec = require('child_process').exec;

var create = function() {
  return new gs();
};

var gs = function() {
  this.options = [];
  this._input = null;
  this._path = null
};

gs.prototype.batch = function() {
  this.options.push('-dBATCH');
  return this;
};

gs.prototype.device = function(device) {
  device = device || 'jpeg';
  this.options.push('-sDEVICE=' + device);
  return this;
};

gs.prototype.executePath = function(path) {
  this._path = path
};

gs.prototype.exec = function(callback) {
  var self = this;

  if (!this._input) return callback("Please specify input");

  var args = this.options.concat([this._input]).join(' ');
  var executePath = this._path ? this._path + '/' : ''
  exec(`${executePath}gs ` + args, function(err, stdout, stderr) {
    callback(err, stdout, stderr);
  });
};

gs.prototype.input = function(file) {
  this._input = file;
  return this;
};

gs.prototype.jpegq = function(value) {
  value = value || 75;
  this.options.push('-dJPEGQ=' + value);
  return this;
};

gs.prototype.nopause = function() {
  this.options.push('-dNOPAUSE');
  return this;
};

gs.prototype.output = function(file) {
  file = file || '-';
  this.options.push('-sOutputFile=' + file);
  if (file === '-') return this.quiet();
  return this;
};

gs.prototype.q = gs.prototype.quiet;

gs.prototype.quiet = function() {
  this.options.push('-dQUIET');
  return this;
};

gs.prototype.resolution = function(xres, yres) {
  this.options.push('-r' + xres + (yres ? 'x' + yres : ''));
  return this;
};

gs.prototype.r = gs.prototype.res = gs.prototype.resolution;

module.exports = create;
