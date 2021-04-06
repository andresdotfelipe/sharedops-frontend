import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { UserReducer } from './UserReducer';
import { OpinionReducer } from './OpinionReducer';
import { CommentReducer } from './CommentReducer';
import { actionTypes } from '../config/actionTypes';

const mainReducer = combineReducers({
    form,
    UserReducer,
    OpinionReducer,
    CommentReducer
});

export default mainReducer;