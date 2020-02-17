export const GET_CLIMBS = 'bould/redux/climbs/LOAD';
export const GET_CLIMBS_SUCCESS = 'bould/redux/climbs/LOAD_SUCCESS';
export const GET_CLIMBS_FAIL = 'bould/redux/climbs/LOAD_FAIL';

export default function reducer(state = { climbs: [] }, action) {
  switch (action.type) {
    case GET_CLIMBS:
      return { ...state, loading: true };
    case GET_CLIMBS_SUCCESS:
      return { ...state, loading: false, climbs: action.payload.data };
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
