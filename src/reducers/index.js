import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { UserReducer } from './UserReducer';
import { OpinionReducer } from './OpinionReducer';

const mainReducer = combineReducers({
    form,
    UserReducer,
    OpinionReducer
});

export default mainReducer;