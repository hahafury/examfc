import { put } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';


export function* recoverySaga(action) {
    yield put({ type: ACTION.RECOVERY_PASSWORD_REQUEST });
    try {
      yield restController.recoveryPasswordRequest(action.data);
      action.history.replace('/recovery');
      yield put({ type: ACTION.RECOVERY_PASSWORD_SEND_BY_MAIL });
    } catch (err) {
      yield put({ type: ACTION.RECOVERY_PASSWORD_ERROR, error: err.response });
    }
};

export function* changePassword(action){
  yield put({ type: ACTION.CHANGE_PASSWORD_REQUEST });
    try {
      yield restController.changePassword(action.data);
      action.history.replace('/recovery/:token');
      yield put({ type: ACTION.CHANGE_PASSWORD_SUCCEED });
    } catch (err) {
      yield put({ type: ACTION.CHANGE_PASSWORD_ERROR, error: err.response });
    }
};
