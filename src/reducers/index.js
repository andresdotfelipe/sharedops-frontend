import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { UserReducer } from './UserReducer';
import { OpinionReducer } from './OpinionReducer';
import { CommentReducer } from './CommentReducer';
import { actionTypes } from '../config/actionTypes';

const appReducers = combineReducers({
    form,
    UserReducer,
    OpinionReducer,
    CommentReducer
});

const mainReducer = (state, action) => {
    if (action.type === actionTypes.SIGN_OUT) {
        //state = undefined;
    }
    return appReducers(state, action);
};

export default mainReducer;