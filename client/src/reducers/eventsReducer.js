import ACTION from '../actions/actionTypes';
import CONSTANTS from '../constants';

const initialState = {
  eventsModeView: CONSTANTS.EVENTS_INFO_MODE,
  isFetching: false,
  isEventAdded: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ACTION.CHANGE_EVENTS_MODE_VIEW: {
      return {
        eventsModeView: action.data,
        error: null,
        isEventAdded: false,
      };
    }
    case ACTION.CHANGE_ADD_EVENTS_MODE_ON_EVENTS_PAGE: {
      return {
        isAddEvent: action.data,
        error: null,
      };
    }
    case ACTION.CREATE_EVENT: {
      return {
        ...state,
        isFetching: true,
        error: null,
      };
    }
    case ACTION.CREATE_EVENT_SUCCESSFUL: {
      return {
        isFetching: false,
        error: null,
        isEventAdded: true
      };
    }
    case ACTION.CREATE_EVENT_ERROR: {
      return {
        isFetching: false,
        isEventAdded: false,
        error: action.error,
      };
    }
    case ACTION.EVENT_CLEAR_ERROR: {
      return {
        ...state,
        isFetching: false,
        error: null,
      };
    }
    default:
      return state;
  }
};
