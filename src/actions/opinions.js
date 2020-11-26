import { actionTypes } from '../config/actionTypes';

export const setOpinions = opinions => ({
    type: actionTypes.SET_OPINIONS,
    opinions
});

export const setOpinion = opinion => ({
    type: actionTypes.SET_OPINION,
    opinion
});

export const setOpinionPageCount = opinionPageCount => ({
    type: actionTypes.SET_OPINION_PAGE_COUNT,
    opinionPageCount
});

export const setCurrentOpinionCount = currentOpinionCount => ({
    type: actionTypes.SET_CURRENT_OPINION_COUNT,
    currentOpinionCount
});

export const setTotalOpinionCount = totalOpinionCount => ({
    type: actionTypes.SET_TOTAL_OPINION_COUNT,
    totalOpinionCount
});

export const getOpinions = filter => ({
    type: actionTypes.GET_OPINIONS,
    filter
});

export const getOpinion = id => ({
    type: actionTypes.GET_OPINION,
    id
});

export const createOpinion = data => ({
    type: actionTypes.CREATE_OPINION,
    data
});