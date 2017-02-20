import queryString from 'query-string'

function handleResponse (promise) {
  return promise.then(response => response.json())
  .then(response => {
    if (response.error) {
      throw response.error
    }

    return response
  })
}

function query (path, method, data) {
  const params = {
    method: method,
    headers: { 'Content-type': 'application/json; charset=UTF-8' }
  }

  if (data) {
    if (method === 'get') {
      path += '?' + queryString.stringify(data)
    } else {
      params.body = JSON.stringify(data)
    }
  }

  return handleResponse(fetch('/api/' + path, params))
}

const users = {
  upload (file) {
    return handleResponse(fetch('/api/users/upload', {
      method: 'POST',
      body: file
    }))
  },

  list (params) {
    return query('users', 'get', params)
  }
}

export default {
  users
}
