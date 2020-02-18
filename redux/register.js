import { baseUrl } from '../constants/BaseUrl'

export const REGISTER_ACCOUNT_SUCCESS = 'bould/redux/login/REGISTER_ACCOUNT_SUCCESS';
export const REGISTER_ACCOUNT_FAIL = 'bould/redux/login/REGISTER_ACCOUNT_FAIL';
export const REGISTER_ACCOUNT_PENDING = 'bould/redux/login/REGISTER_ACCOUNT_PENDING';


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
