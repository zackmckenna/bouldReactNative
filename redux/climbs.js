import { baseUrl } from '../constants/BaseUrl'
import { tokenToString } from 'typescript';

export const GET_CLIMBS = 'bould/redux/climbs/GET_CLIMBS';
export const GET_CLIMBS_SUCCESS = 'bould/redux/climbs/GET_CLIMBS_SUCCESS';
export const GET_CLIMBS_FAIL = 'bould/redux/climbs/GET_CLIMBS_FAIL';
export const GET_CLIMBS_PENDING = 'bould/redux/climbs/GET_CLIMBS_PENDING';

export const POST_CLIMB_SUCCESS = 'bould/redux/climbs/POST_CLIMB_SUCCESS';
export const POST_CLIMB_FAIL = 'bould/redux/climbs/POST_CLIMB_FAIL';
export const POST_CLIMB_PENDING = 'bould/redux/climbs/POST_CLIMB_PENDING';

export default function reducer(state = { climbs: [] }, action) {
  switch (action.type) {
    case POST_CLIMB_PENDING:
      return { ...state, postClimbPending: true };
    case POST_CLIMB_SUCCESS:
      return { ...state, postClimbPending: false };
    case POST_CLIMB_FAIL:
      return {
        ...state,
        postClimbPending: false,
        error: 'Error posting'
      };
    case GET_CLIMBS:
      return { ...state, loading: true };
    case GET_CLIMBS_SUCCESS:
      return { ...state, loading: false, climbs: action.payload };
    case GET_CLIMBS_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching repositories'
      };
    default:
      return state;
  }
}

export const postClimbPending = () => {
  return {
    type: POST_CLIMB_PENDING
  }
}

export const postClimbSuccess = climb => {
  return {
    type: POST_CLIMB_SUCCESS,
    payload: climb
  }
}

export const postClimbFail = error => {
  return {
    type: POST_CLIMB_FAIL,
    error: error
  }
}

export const postClimb = () => dispatch => {
  dispatch(postClimbPending())
  return fetch(baseUrl + 'api/climbs', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      personalDifficulty: personalDifficulty,
      setDifficulty: setDifficulty,
      result: result,
      note: note,
      completed: completed,
      token: token
    }),
  })
  .then(response => response.json())
  .then(climb => {
    dispatch(postClimbSuccess(climb))
  })
  .catch(error => dispatch(postClimbError(error)))
}


export const getClimbsPending = () => {
  return {
    type: GET_CLIMBS_PENDING
  }
}

export const getClimbsSuccess = climbs => {
  return {
    type: GET_CLIMBS_SUCCESS,
    payload: climbs
  }
}

export const getClimbsError = error => {
  return {
    type: GET_CLIMBS_ERROR,
    error: error
  }
}

export const getClimbs = () => dispatch => {
    dispatch(getClimbsPending())
    return fetch(baseUrl + 'api/climbs', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(climbs => {
      dispatch(climbsInit(climbs))
    })
    .catch(error => dispatch(getClimbsError(error)))
}

export const climbsInit = climbs => ({
  type: GET_CLIMBS_SUCCESS,
  payload: climbs
});

export function listClimbs() {
  return {
    type: GET_CLIMBS,
    payload: {
      request: {
        url: `https://mighty-escarpment-01611.herokuapp.com/api/climbs`
      }
    }
  };
}
