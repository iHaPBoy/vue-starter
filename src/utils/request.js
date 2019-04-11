import { http } from './axios'

export default {
  get (url, params = {}, headers = {}) {
    return http.get(url, {
      params,
      headers
    })
  },
  getNoCache (url, params = {}, headers = {}) {
    params = { _t: (new Date()).getTime(), ...params }
    return this.get(url, params, headers)
  },
  post (url, data = null, headers = {}) {
    return http.post(url, data, {
      headers
    })
  },
  put (url, data = null, headers = {}) {
    return http.put(url, data, {
      headers
    })
  },
  patch (url, data = null, headers = {}) {
    return http.patch(url, data, {
      headers
    })
  },
  delete (url, data = null, headers = {}) {
    return http.delete(url, {
      data,
      headers
    })
  },
  file (url, formData = null, headers = {}) {
    return http.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        ...headers
      }
    })
  }
}
