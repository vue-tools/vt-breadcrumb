export function toPath({path, hash = '', query}, location) {
  if (isAbsolute(path)) {
    return `${path}?${query2Array(query).join('&')}${hash}`
  } else {
    let {pathname, search} = location
    let queryArray = query2Array(query)
    pathname = pathname.slice(-1) === '/' ? `${pathname}${path}` : `${pathname}/${path}`
  
    return queryArray.length
      ? `${pathname}${search ? `${search}&` : '?'}${queryArray.join('&')}${hash}`
      : `${pathname}${search ? `${search}` : ''}${hash}`
  }
}
function query2Array(query) {
  var r = []
  for (var i in query) {
    r.push(`${i}=${encodeURIComponent(query[i])}`)
  }
  return r
}
function isAbsolute(path) {
  if (/^https?/.test(path)) {
    return true
  } else {
    return /^\//.test(path)
  }
}