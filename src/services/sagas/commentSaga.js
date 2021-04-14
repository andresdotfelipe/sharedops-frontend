import { call, put, select, takeLatest } from 'redux-saga/effects';
import { stopSubmit } from 'redux-form';
import CommentProvider from '../providers/CommentProvider';
import  { getComments, setComments } from '../../actions/comments';
import { getSession, setLoading, setSubmitting, setError } from '../../actions/users';
import { actionTypes } from '../../config/actionTypes';

function* getCommentsGenerator(action) {
    try {
        yield put(getSession);        
        const comments = yield call(CommentProvider.getComments, action.opinionId);
        yield put(setComments(comments));
        yield put(setLoading(false));    
    } catch (error) {
        console.log('Something\'s gone wrong:', error);        
        yield put(setComments(null));
        yield put(setLoading(false));
    }
}

function* createCommentGenerator(action) {
    try {
        yield put(getSession);        
        yield call(CommentProvider.createComment, action.data);        
        yield put(getComments(action.data.opinionId));
        yield put(setSubmitting(false));        
    } catch (error) {
        yield put(setSubmitting(false));
        yield put(stopSubmit('CreateCommentForm', error.response.data.error));
        yield put(setError(error.response.data.error));
    }    
}

export function* commentSaga() {
    yield takeLatest(actionTypes.GET_COMMENTS, getCommentsGenerator);
    yield takeLatest(actionTypes.CREATE_COMMENT, createCommentGenerator);
}