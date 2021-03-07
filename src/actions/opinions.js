import { actionTypes } from '../config/actionTypes';

export const setAllOpinions = allOpinions => ({
    type: actionTypes.SET_ALL_OPINIONS,
    allOpinions
});

export const setMyOpinions = myOpinions => ({
    type: actionTypes.SET_MY_OPINIONS,
    myOpinions
});

export const setFavoriteOpinions = favoriteOpinions => ({
    type: actionTypes.SET_FAVORITE_OPINIONS,
    favoriteOpinions
});

export const setOpinion = opinion => ({
    type: actionTypes.SET_OPINION,
    opinion
});

export const setAllOpinionsPageCount = allOpinionsPageCount => ({
    type: actionTypes.SET_ALL_OPINIONS_PAGE_COUNT,
    allOpinionsPageCount
});

export const setAllOpinionsCurrentCount = allOpinionsCurrentCount => ({
    type: actionTypes.SET_ALL_OPINIONS_CURRENT_COUNT,
    allOpinionsCurrentCount
});

export const setAllOpinionsTotalCount = allOpinionsTotalCount => ({
    type: actionTypes.SET_ALL_OPINIONS_TOTAL_COUNT,
    allOpinionsTotalCount
});

export const setMyOpinionsPageCount = myOpinionsPageCount => ({
    type: actionTypes.SET_MY_OPINIONS_PAGE_COUNT,
    myOpinionsPageCount
});

export const setMyOpinionsCurrentCount = myOpinionsCurrentCount => ({
    type: actionTypes.SET_MY_OPINIONS_CURRENT_COUNT,
    myOpinionsCurrentCount
});

export const setMyOpinionsTotalCount = myOpinionsTotalCount => ({
    type: actionTypes.SET_MY_OPINIONS_TOTAL_COUNT,
    myOpinionsTotalCount
});

export const setFavoriteOpinionsPageCount = favoriteOpinionsPageCount => ({
    type: actionTypes.SET_FAVORITE_OPINIONS_PAGE_COUNT,
    favoriteOpinionsPageCount
});

export const setFavoriteOpinionsCurrentCount = favoriteOpinionsCurrentCount => ({
    type: actionTypes.SET_FAVORITE_OPINIONS_CURRENT_COUNT,
    favoriteOpinionsCurrentCount
});

export const setFavoriteOpinionsTotalCount = favoriteOpinionsTotalCount => ({
    type: actionTypes.SET_FAVORITE_OPINIONS_TOTAL_COUNT,
    favoriteOpinionsTotalCount
});

export const getOpinions = data => ({
    type: actionTypes.GET_OPINIONS,
    data
});

export const getOpinion = id => ({
    type: actionTypes.GET_OPINION,
    id
});

export const createOpinion = data => ({
    type: actionTypes.CREATE_OPINION,
    data
});