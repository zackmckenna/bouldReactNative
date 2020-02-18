import { baseUrl } from '../constants/BaseUrl'

export const REGISTER_ACCOUNT_SUCCESS = 'bould/redux/login/REGISTER_ACCOUNT_SUCCESS';
export const REGISTER_ACCOUNT_FAIL = 'bould/redux/login/REGISTER_ACCOUNT_FAIL';
export const REGISTER_ACCOUNT_PENDING = 'bould/redux/login/REGISTER_ACCOUNT_PENDING';


export default function reducer(state = {}, action) {
  switch (action.type) {
    case REGISTER_ACCOUNT_PENDING:
      return { ...state, loading: true };
    case REGISTER_ACCOUNT_SUCCESS:
      return { ...state, error: null, loading: false, registered: true };
    case REGISTER_ACCOUNT_FAIL:
      return {
        ...state,
        loading: false,
        registered: false,
        error: `Error while registering account: ${action.error}`
      };
    default:
      return state;
  }
}

export const registerAccountPending = () => {
  return {
    type: REGISTER_ACCOUNT_PENDING
  }
}

export const registerAccountSuccess = account => {
  console.log('auth success user:', account)
  return {
    type: REGISTER_ACCOUNT_SUCCESS,
    payload: account
  }
}

export const registerAccountFail = error => {
  return {
    type: REGISTER_ACCOUNT_FAIL,
    error: error
  }
}

export const registerAccount = (username, password, email) => dispatch => {
    dispatch(registerAccountPending())
    console.log('register user:', username, password, email)
    return fetch(baseUrl + 'api/users', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username: username,
        password: password,
        email: email
      }),
    })
    .then(response => {
      if (response.status === 200) {
        dispatch(registerAccountSuccess())
      } else if (response.status === 400) {
        dispatch(registerAccountFail(response))
      }
    })
    // .then(account => {
    //   dispatch(registerAccountSuccess(account))
    // })
    .catch(error => dispatch(registerAccountFail(error)))
}
