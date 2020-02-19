import axios from 'axios'

const url = 'https://mighty-escarpment-01611.herokuapp.com/api/climbs'
let token = null

const setToken = newToken => {
  console.log('newToken:', newToken)
  token = `bearer ${newToken}`
  console.log('token created:', token)
}

const getAll = () => {
  return axios.get(url)
}

const create = async newObject => {
  console.log('create:', newObject)
  console.log('token:', token)
  const config = {
    headers: { Authorization: token },
  }
  const response = await axios.post(url, newObject, config)
  return response.data
}

const update = (id, newObject) => {
  const request = axios.put(`${url} /${id}`, newObject)
  return request.then(response => response.data)
}

export default {
  getAll: getAll,
  create: create,
  update: update,
  setToken: setToken
}
