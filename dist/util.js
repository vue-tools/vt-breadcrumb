'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toPath = toPath;
function toPath(_ref, location) {
  var path = _ref.path,
      _ref$hash = _ref.hash,
      hash = _ref$hash === undefined ? '' : _ref$hash,
      query = _ref.query;

  if (isAbsolute(path)) {
    return path + '?' + query2Array(query).join('&') + hash;
  } else {
    var pathname = location.pathname,
        search = location.search;

    var queryArray = query2Array(query);
    pathname = pathname.slice(-1) === '/' ? '' + pathname + path : pathname + '/' + path;

    return queryArray.length ? '' + pathname + (search ? search + '&' : '?') + queryArray.join('&') + hash : '' + pathname + (search ? '' + search : '') + hash;
  }
}
function query2Array(query) {
  var r = [];
  for (var i in query) {
    r.push(i + '=' + encodeURIComponent(query[i]));
  }
  return r;
}
function isAbsolute(path) {
  if (/^https?/.test(path)) {
    return true;
  } else {
    return (/^\//.test(path)
    );
  }
}