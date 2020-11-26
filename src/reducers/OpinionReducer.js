import { actionTypes } from '../config/actionTypes';

const initialState = {
    opinions: [],
    opinionPageCount: 0,
    currentOpinionCount: 0  
};

export const OpinionReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.SET_OPINIONS:
            return { ...state, opinions: [...state.opinions, ...action.opinions] }
        case actionTypes.SET_OPINION:
            return { ...state, opinion: action.opinion }        
        case actionTypes.SET_OPINION_PAGE_COUNT:
            return { ...state, opinionPageCount: action.opinionPageCount }
        case actionTypes.SET_CURRENT_OPINION_COUNT:
            return { ...state, currentOpinionCount: action.currentOpinionCount }
        case actionTypes.SET_TOTAL_OPINION_COUNT:
            return { ...state, totalOpinionCount: action.totalOpinionCount }
        default:
            return state;
    }
};