import ACTION from '../actions/actionTypes';

const initialState = {
  isFetching: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.RECOVERY_PASSWORD_REQUEST: {
      return {
        isFetching: true,
        error: null,
      };
    }
    case ACTION.RECOVERY_PASSWORD_SEND_BY_MAIL: {
      return {
        isFetching: false,
        error: null,
      };
    }
    case ACTION.RECOVERY_PASSWORD_ERROR: {
      return {
        isFetching: false,
        error: action.error,
      };
    }
    case ACTION.RECOVERY_PASSWORD_CLEAR: {
      return {
        ...state,
        error: null,
      };
    }
    case ACTION.RECOVERY_ACTION_CLEAR: {
      return initialState;
    }
    case ACTION.CHANGE_PASSWORD: {
      return {
        isFetching: false,
        error: null,
      }
    }
    case ACTION.CHANGE_PASSWORD_REQUEST: {
      return {
        isFetching: true,
        error: null,
      }
    }
    case ACTION.CHANGE_PASSWORD_SUCCEED: {
      return {
        isFetching: false,
        error: null,
      }
    }
    case ACTION.CHANGE_PASSWORD_ERROR: {
      return {
        isFetching: false,
        error: action.error,
      };
    }
    case ACTION.CHANGE_PASSWORD_ERROR_CLEAR: {
      return {
        ...state,
        error: null,
      };
    };
    default:
      return state;
  }
};
