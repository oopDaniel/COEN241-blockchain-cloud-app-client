const options = {
  cache: 'no-cache',
  headers: { 'Content-Type': 'application/json' }
}

export const get = url =>
  fetch(url, Object.assign({}, options, { method: 'GET' })).then(res =>
    res.json()
  )

export const post = (url, data) =>
  fetch(
    url,
    Object.assign({}, options, { method: 'POST', body: JSON.stringify(data) })
  ).then(res => res.json())
