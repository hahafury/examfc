import { put } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController'

export function* moderationVerdictSaga(action) {
    try {
      console.log(action.data)
      yield restController.moderationVerdict(action.data);
      console.log(action.data)
      yield put({ type: ACTION.MODERATION_CONTEST_SUCCEED });
    } catch (err) {
      yield put({ type: ACTION.MODERATION_CONTEST_ERROR, error: err.response });
    }
};
