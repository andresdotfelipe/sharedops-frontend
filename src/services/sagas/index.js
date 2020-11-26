import { all } from 'redux-saga/effects';
import { userSaga } from './userSaga';
import { opinionSaga } from './opinionSaga';
import { commentSaga } from './commentSaga';

export default function* mainSaga() {
    yield all([
        userSaga(),
        opinionSaga(),
        commentSaga()
    ]);
}
