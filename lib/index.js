(function() {
  function list() {
    var _i;
    args = 1 <= arguments.length ? [].slice.call(arguments, 0, _i = arguments.length - 0) : (_i = 0, []);
    return [].concat(args);
  }
  var es, jisp, gutil, Buffer, path, merge;
  (es = require("event-stream"));
  (jisp = require("jisp"));
  (gutil = require("gulp-util"));
  (Buffer = require("buffer").Buffer);
  (path = require("path"));
  (merge = require("merge"));
  return (module.exports = (function(opt) {
    function modifyFile(file) {
      var str, dest, options, data, err, _ref, _ref0, _ref1;
      if (file.isNull()) {
        return _ref = this.emit("data", file);
      } else {
        _ref = undefined;
      }
      _ref;
      if (file.isStream()) {
        return _ref0 = this.emit("error", new Error("gulp-jisp: Streaming not supported"));
      } else {
        _ref0 = undefined;
      }
      _ref0;
      (str = file.contents.toString("utf8"));
      (dest = gutil.replaceExtension(file.path, ".js"));
      (options = merge(({
        wrap: true,
        filename: file.path,
        sourceFiles: list(path.basename(file.path)),
        generatedFile: path.basename(dest)
      }), opt));
      try {
        _ref1 = (data = jisp.compile(str, options));
      } catch (err) {
        return this.emit("error", new Error(err));
      }
      _ref1;
      (file.contents = new Buffer(data));
      (file.path = dest);
      return this.emit("data", file);
    }
    modifyFile;
    return es.through(modifyFile);
  }));
}).call(this);