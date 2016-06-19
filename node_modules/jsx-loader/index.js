var jstransform = require('jstransform/simple');
var loaderUtils = require('loader-utils');

module.exports = function(source) {
  this.cacheable && this.cacheable();

  var sourceFilename = loaderUtils.getRemainingRequest(this);
  var current = loaderUtils.getCurrentRequest(this);

  var query = loaderUtils.parseQuery(this.query);
  if (query.insertPragma) {
    source = '/** @jsx ' + query.insertPragma + ' */' + source;
  }

  var transform = jstransform.transform(source, {
    react: true,
    harmony: query.harmony,
    stripTypes: query.stripTypes,
    es5: query.es5,
    sourceMap: this.sourceMap
  });
  if (transform.sourceMap) {
    transform.sourceMap.sources = [sourceFilename];
    transform.sourceMap.file = current;
    transform.sourceMap.sourcesContent = [source];
  }
  this.callback(null, transform.code, transform.sourceMap);
};
