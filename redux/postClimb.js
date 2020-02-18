import { baseUrl } from '../constants/BaseUrl'

// export const POST_CLIMB = 'bould/redux/climbs/GET_CLIMBS';
export const POST_CLIMB_SUCCESS = 'bould/redux/climbs/POST_CLIMB_SUCCESS';
export const POST_CLIMB_FAIL = 'bould/redux/climbs/POST_CLIMB_FAIL';
export const POST_CLIMB_PENDING = 'bould/redux/climbs/POST_CLIMB_PENDING';

export default function reducer(state = { climbs: [] }, action) {
  switch (action.type) {
    case POST_CLIMB_PENDING:
      return { ...state, loading: true };
    case POST_CLIMB_SUCCESS:
      return { ...state, loading: false, climbs: action.payload };
    case POST_CLIMB_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching repositories'
      };
    default:
      return state;
  }
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
