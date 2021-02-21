import { call, put, select, takeLatest } from 'redux-saga/effects';
import { stopSubmit } from 'redux-form';
import OpinionProvider from '../providers/OpinionProvider';
import { setOpinions, setOpinion, setOpinionPageCount, setCurrentOpinionCount, setTotalOpinionCount } from '../../actions/opinions';
import { setLoading, setSubmitting, setError } from '../../actions/users';
import { actionTypes } from '../../config/actionTypes';

function* getOpinionsGenerator(action) {
    try {                                                   
        const opinionPageCount = yield select(state => state.OpinionReducer.opinionPageCount);               
        const currentOpinionCount = yield select(state => state.OpinionReducer.currentOpinionCount);
        const totalOpinionCount = yield select(state => state.OpinionReducer.totalOpinionCount);      
        if (currentOpinionCount !== totalOpinionCount) {                        
            const res = yield call(OpinionProvider.getOpinions, action.filter);
            res.opinions.forEach(opinion => {
                opinion.createdAt = String(new Date(opinion.createdAt));
                opinion.updatedAt = String(new Date(opinion.updatedAt));
            });
            yield put(setOpinions(res.opinions));        
            yield put(setTotalOpinionCount(res.opinionsCount));
            yield put(setCurrentOpinionCount(currentOpinionCount + res.opinions.length));
            yield put(setOpinionPageCount(opinionPageCount + 1));
        } /*else {
            yield put(setOpinionPageCount(null));
        }   */                    
        yield put(setLoading(false));        
    } catch (error) {
        console.log('Something\'s gone wrong:', error);
        yield put(setOpinions(null));
        yield put(setLoading(false));        
    }
}

function* getOpinionGenerator(action) {
    try {                    
        const opinion = yield call(OpinionProvider.getOpinion, action.id);
        opinion.createdAt = String(new Date(opinion.createdAt));
        opinion.updatedAt = String(new Date(opinion.updatedAt));
        yield put(setOpinion(opinion));
        yield put(setLoading(false));        
    } catch (error) {
        console.log('Something\'s gone wrong:', error);
        yield put(setOpinion(null));
        yield put(setLoading(false));
    }
}

function* createOpinionGenerator(action) {
    try {
        const session = yield select(state => state.UserReducer.session);
        if (session) {
            yield put(setSubmitting(true));            
            const data = {
                title: action.data.title,
                body: action.data.body,
            };
            if (action.data.file) {
                let formData = new FormData();
                formData.append('file', action.data.file.file, action.data.file.name);
                formData.append('folder', 'sharedops/opinions-images');
                formData.append('upload_preset', process.env.REACT_APP_OPINIONS_IMAGES_UPLOAD_PRESET);
                const image = yield call(OpinionProvider.uploadOpinionImage, formData);
                data.opinionImageUrl = image.secure_url;                
            }
            const res = yield call(OpinionProvider.createOpinion, data);            
            window.location = `/comments/${res.opinion._id}/${res.opinion.title}`;            
        }
    } catch (error) {
        console.log(error);
        yield put(setSubmitting(false));
        yield put(stopSubmit('CreateOpinionForm', error.response.data.error));
        yield put(setError(error.response.data.error));
    }
}

export function* opinionSaga() {
    yield takeLatest(actionTypes.GET_OPINIONS, getOpinionsGenerator);
    yield takeLatest(actionTypes.GET_OPINION, getOpinionGenerator);
    yield takeLatest(actionTypes.CREATE_OPINION, createOpinionGenerator);
}