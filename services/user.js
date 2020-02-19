import axios from 'axios'

const url = 'https://mighty-escarpment-01611.herokuapp.com/api/users'

const getAll = () => {
  return axios.get(url)
}

const create = newObject => {
  return axios.post(url, newObject)
}

const update = (id, newObject) => {
  return axios.put(`${url}/${id}`, newObject)
}

export default {
  getAll: getAll,
  create: create,
  update: update
}
