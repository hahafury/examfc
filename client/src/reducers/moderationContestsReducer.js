import ACTION from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  error: null,
  isContestVerdict: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.MODERATION_CONTEST_VERDICT: {
      return {
          ...state,
          isFetching: true,
          error: null,
      };
    }
    case ACTION.MODERATION_CONTEST_SUCCEED: {
        return {
          isFetching: false,
          error: null,
          isContestVerdict: true,
        };
    }
    case ACTION.MODERATION_CONTEST_ERROR: {
        return {
          ...state,
          isFetching: false,
          error: action.error,
        };
    }
    case ACTION.MODERATION_CONTEST_ERROR_CLEAR: {
        return {
          isFetching: false,
          error: null,
        };
      }
    default:
      return state;
  }
}
