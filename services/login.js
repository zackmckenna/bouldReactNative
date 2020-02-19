import axios from 'axios'

const url = 'https://mighty-escarpment-01611.herokuapp.com/api/login'

const login = credentials => {
  return axios.post(url)
}

// return fetch(baseUrl + 'api/login', {
//   method: 'POST',
//   headers: {
//     Accept: 'application/json',
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify({
//     username: username,
//     password: password,
//   }),
// })
// .then(response => response.json())
// .then(user => {
//   dispatch(loginAuthSuccess(user))
// })
// .catch(error => dispatch(loginAuthError(error)))

export default {
  login: login,

}
