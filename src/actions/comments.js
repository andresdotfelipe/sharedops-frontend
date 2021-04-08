import { actionTypes } from '../config/actionTypes';

export const setComments = comments => ({
    type: actionTypes.SET_COMMENTS,
    comments
});

export const getComments = opinionId => ({
    type: actionTypes.GET_COMMENTS,
    opinionId
});

export const createComment = data => ({
    type: actionTypes.CREATE_COMMENT,
    data
});