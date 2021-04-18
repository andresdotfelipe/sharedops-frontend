import { actionTypes } from '../config/actionTypes';

export const createComment = data => ({
    type: actionTypes.CREATE_COMMENT,
    data
});