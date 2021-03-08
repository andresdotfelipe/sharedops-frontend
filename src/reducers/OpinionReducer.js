import { actionTypes } from '../config/actionTypes';

const initialState = {
    allOpinions: [],
    allOpinionsPageCount: 0,
    allOpinionsCurrentCount: 0,
    myOpinions: [],
    myOpinionsPageCount: 0,
    myOpinionsCurrentCount: 0,
    favoriteOpinions: [],
    favoriteOpinionsPageCount: 0,
    favoriteOpinionsCurrentCount: 0    
};

export const OpinionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_ALL_OPINIONS:
            return { ...state, allOpinions: [...state.allOpinions, ...action.allOpinions] }
        case actionTypes.SET_MY_OPINIONS:
            return { ...state, myOpinions: [...state.myOpinions, ...action.myOpinions] }
        case actionTypes.SET_FAVORITE_OPINIONS:
            return { ...state, favoriteOpinions: action.favoriteOpinions }
        case actionTypes.SET_OPINION:
            return { ...state, opinion: action.opinion }        
        case actionTypes.SET_ALL_OPINIONS_PAGE_COUNT:
            return { ...state, allOpinionsPageCount: action.allOpinionsPageCount }
        case actionTypes.SET_ALL_OPINIONS_CURRENT_COUNT:
            return { ...state, allOpinionsCurrentCount: action.allOpinionsCurrentCount }
        case actionTypes.SET_ALL_OPINIONS_TOTAL_COUNT:
            return { ...state, allOpinionsTotalCount: action.allOpinionsTotalCount }
        case actionTypes.SET_MY_OPINIONS_PAGE_COUNT:
            return { ...state, myOpinionsPageCount: action.myOpinionsPageCount }
        case actionTypes.SET_MY_OPINIONS_CURRENT_COUNT:
            return { ...state, myOpinionsCurrentCount: action.myOpinionsCurrentCount }
        case actionTypes.SET_MY_OPINIONS_TOTAL_COUNT:
            return { ...state, myOpinionsTotalCount: action.myOpinionsTotalCount }
        case actionTypes.SET_FAVORITE_OPINIONS_PAGE_COUNT:
            return { ...state, favoriteOpinionsPageCount: action.favoriteOpinionsPageCount }
        case actionTypes.SET_FAVORITE_OPINIONS_CURRENT_COUNT:
            return { ...state, favoriteOpinionsCurrentCount: action.favoriteOpinionsCurrentCount }
        case actionTypes.SET_FAVORITE_OPINIONS_TOTAL_COUNT:
            return { ...state, favoriteOpinionsTotalCount: action.favoriteOpinionsTotalCount }
        default:
            return state;
    }
};