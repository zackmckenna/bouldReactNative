import { baseUrl } from '../constants/BaseUrl'
import climbService from '../services/climb'

export const GET_CLIMBS = 'bould/redux/climbs/GET_CLIMBS';
export const GET_CLIMBS_SUCCESS = 'bould/redux/climbs/GET_CLIMBS_SUCCESS';
export const GET_CLIMBS_FAIL = 'bould/redux/climbs/GET_CLIMBS_FAIL';
export const GET_CLIMBS_PENDING = 'bould/redux/climbs/GET_CLIMBS_PENDING';

export const POST_CLIMB_SUCCESS = 'bould/redux/climbs/POST_CLIMB_SUCCESS';
export const POST_CLIMB_FAIL = 'bould/redux/climbs/POST_CLIMB_FAIL';
export const POST_CLIMB_PENDING = 'bould/redux/climbs/POST_CLIMB_PENDING';

export const SET_USER_CLIMBS_SUCCESS = 'bould/redux/climbs/SET_USER_CLIMBS_SUCCESS'
export const SET_USER_CLIMBS_FAIL = 'bould/redux/climbs/SET_USER_CLIMBS_FAIL'
export const SET_USER_CLIMBS_PENDING= 'bould/redux/climbs/SET_USER_CLIMBS_PENDING'
export const SET_USER_CLIMBS = 'bould/redux/climbs/SET_USER_CLIMBS'

export default function reducer(state = { climbs: [] }, action) {
  switch (action.type) {
    case SET_USER_CLIMBS_SUCCESS:
      return {...state, userClimbs: state.climbs.filter(climb => climb.user.id === action.payload)}
    case POST_CLIMB_PENDING:
      return { ...state, error: null, postClimbPending: true };
    case POST_CLIMB_SUCCESS:
      return { ...state, userClimbs: [...state.userClimbs, action.payload], climbs: [...state.climbs, action.payload], climbPosted: action.payload, postClimbPending: false };
    case POST_CLIMB_FAIL:
      return {
        ...state,
        postClimbPending: false,
        error: `Error posting: ${action.error}`
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

export const setUserClimbs = (userId) => dispatch => {
  console.log('user id located in setUserClimbs', userId)
  dispatch(setUserClimbsSuccess(userId))
}

export const setUserClimbsSuccess = (climbs) => {
  return {
    type: SET_USER_CLIMBS_SUCCESS,
    payload: climbs
  }
}

export const setUserClimbsPending = () => {
  return {
    type: SET_USER_CLIMBS_SUCCESS
  }
}

export const setUserClimbsFail = (error) => {
  return {
    type: SET_USER_CLIMBS_FAIL,
    error: error
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

export const postClimb = (climb) => dispatch => {
  console.log('climb', climb)
  dispatch(postClimbPending())
  climbService.create(climb)
  // return fetch(baseUrl + 'api/climbs', {
  //   method: 'POST',
  //   headers: {
  //     Accept: 'application/json',
  //     'Content-Type': 'application/json',
  //   },
  //   body: JSON.stringify({
  //     personalDifficulty: personalDifficulty,
  //     setDifficulty: setDifficulty,
  //     result: result,
  //     note: note ? note : '',
  //     completed: completed
  //   }),
  // })
  .then(response => response)
  .then(climb => {
    dispatch(postClimbSuccess(climb))
    return climb
  })
  .catch(error => dispatch(postClimbFail(error)))
}


export const getClimbsPending = () => {
  return {
    type: GET_CLIMBS_PENDING
  }
}

export const getClimbsSuccess = climbs => {
  console.log('get climbs success', climbs)
  return {
    type: GET_CLIMBS_SUCCESS,
    payload: climbs
  }
}

export const getClimbsFail = error => {
  return {
    type: GET_CLIMBS_FAIL,
    error: error
  }
}

export const getClimbs = () => dispatch => {
    dispatch(getClimbsPending())
    climbService.getAll()
      .then(response => response.data)
      .then(climbs => {
        dispatch(climbsInit(climbs))
      })
      .catch(error => dispatch(getClimbsFail(error)))
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
