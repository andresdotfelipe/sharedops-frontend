import { actionTypes } from '../config/actionTypes';

const initialState = {
    comments: []
};

export const CommentReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_COMMENTS:
            return { ...state, comments: action.comments }
        default:
            return state;
    }
};