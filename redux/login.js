import { baseUrl } from '../constants/BaseUrl'

export const LOGIN_AUTH_SET= 'bould/redux/login/LOGIN_AUTH_SET';
export const LOGIN_AUTH_SUCCESS = 'bould/redux/login/LOGIN_AUTH_SUCCESS';
export const LOGIN_AUTH_FAIL = 'bould/redux/login/LOGIN_AUTH_FAIL';
export const LOGIN_AUTH_PENDING = 'bould/redux/login/LOGIN_AUTH_PENDING';


export default function reducer(state = { user: [] }, action) {
  switch (action.type) {
    case LOGIN_AUTH_PENDING:
      return { ...state, loading: true };
    case LOGIN_AUTH_SUCCESS:
      return { ...state, loading: false, user: action.payload };
    case LOGIN_AUTH_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while authenticating user'
      };
    default:
      return state;
  }
}

export const loginAuthPending = () => {
  return {
    type: LOGIN_AUTH_PENDING
  }
}

export const loginAuthSuccess = user => {
  console.log('auth success user:', user)
  return {
    type: LOGIN_AUTH_SUCCESS,
    payload: user
  }
}

export const loginAuthError = error => {
  return {
    type: LOGIN_AUTH_ERROR,
    error: error
  }
}

export const loginUser = (username, password) => dispatch => {
    dispatch(loginAuthPending())
    console.log('login user:', username, password)
    return fetch(baseUrl + 'api/login', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    })
    .then(response => response.json())
    .then(user => {
      dispatch(loginAuthSuccess(user))
    })
    .catch(error => dispatch(getClimbsError(error)))
}

// export const addClimbs = climbs => ({
//   type: GET_CLIMBS_SUCCESS,
//   payload: climbs
// });

// export function listClimbs() {
//   return {
//     type: GET_CLIMBS,
//     payload: {
//       request: {
//         url: `https://mighty-escarpment-01611.herokuapp.com/api/climbs`
//       }
//     }
//   };
// }
