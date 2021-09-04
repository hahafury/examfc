import { put } from 'redux-saga/effects';
import ACTION from '../actions/actionTypes';
import * as restController from '../api/rest/restController';

export function* createEvent(action){
    try{
        yield restController.createEvent(action.data);
        yield put({ type: ACTION.CREATE_EVENT_SUCCESSFUL});
    } catch(e){
        yield put({type: ACTION.CREATE_EVENT_ERROR, error: e.response})
    }
}