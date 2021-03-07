import { call, put, select, takeLatest } from 'redux-saga/effects';
import { stopSubmit } from 'redux-form';
import OpinionProvider from '../providers/OpinionProvider';
import { setAllOpinions, setMyOpinions, setFavoriteOpinions, setOpinion, 
    setAllOpinionsPageCount, setAllOpinionsCurrentCount, setAllOpinionsTotalCount,
    setMyOpinionsPageCount, setMyOpinionsCurrentCount, setMyOpinionsTotalCount,
    setFavoriteOpinionsPageCount, setFavoriteOpinionsCurrentCount, setFavoriteOpinionsTotalCount } from '../../actions/opinions';
import { setLoading, setSubmitting, setError } from '../../actions/users';
import { actionTypes } from '../../config/actionTypes';

function* getOpinionsGenerator(action) {
    try {                                                   
        const allOpinionsPageCount = yield select(state => state.OpinionReducer.allOpinionsPageCount);               
        const allOpinionsCurrentCount = yield select(state => state.OpinionReducer.allOpinionsCurrentCount);
        const allOpinionsTotalCount = yield select(state => state.OpinionReducer.allOpinionsTotalCount);

        const myOpinionsPageCount = yield select(state => state.OpinionReducer.myOpinionsPageCount);               
        const myOpinionsCurrentCount = yield select(state => state.OpinionReducer.myOpinionsCurrentCount);
        const myOpinionsTotalCount = yield select(state => state.OpinionReducer.myOpinionsTotalCount);

        const favoriteOpinionsPageCount = yield select(state => state.OpinionReducer.favoriteOpinionsPageCount);               
        const favoriteOpinionsCurrentCount = yield select(state => state.OpinionReducer.favoriteOpinionsCurrentCount);
        const favoriteOpinionsTotalCount = yield select(state => state.OpinionReducer.favoriteOpinionsTotalCount);
        switch (action.data.type) {            
            case 'myOpinions':
                if (myOpinionsCurrentCount !== myOpinionsTotalCount) {                        
                    const res = yield call(OpinionProvider.getOpinions, action.data.filter);
                    res.opinions.forEach(opinion => {
                        opinion.createdAt = String(new Date(opinion.createdAt));
                        opinion.updatedAt = String(new Date(opinion.updatedAt));
                    });
                    yield put(setMyOpinions(res.opinions));        
                    yield put(setMyOpinionsTotalCount(res.opinionsCount));
                    yield put(setMyOpinionsCurrentCount(myOpinionsCurrentCount + res.opinions.length));
                    yield put(setMyOpinionsPageCount(myOpinionsPageCount + 1));
                }
                break;
            case 'favorites':
                if (favoriteOpinionsCurrentCount !== favoriteOpinionsTotalCount) {                        
                    const res = yield call(OpinionProvider.getOpinions, action.data.filter);
                    res.opinions.forEach(opinion => {
                        opinion.createdAt = String(new Date(opinion.createdAt));
                        opinion.updatedAt = String(new Date(opinion.updatedAt));
                    });
                    yield put(setFavoriteOpinions(res.opinions));        
                    yield put(setFavoriteOpinionsTotalCount(res.opinionsCount));
                    yield put(setFavoriteOpinionsCurrentCount(favoriteOpinionsCurrentCount + res.opinions.length));
                    yield put(setFavoriteOpinionsPageCount(favoriteOpinionsPageCount + 1));
                }
                break;
            default:
                if (allOpinionsCurrentCount !== allOpinionsTotalCount) {                        
                    const res = yield call(OpinionProvider.getOpinions, action.data.filter);
                    res.opinions.forEach(opinion => {
                        opinion.createdAt = String(new Date(opinion.createdAt));
                        opinion.updatedAt = String(new Date(opinion.updatedAt));
                    });
                    yield put(setAllOpinions(res.opinions));        
                    yield put(setAllOpinionsTotalCount(res.opinionsCount));
                    yield put(setAllOpinionsCurrentCount(allOpinionsCurrentCount + res.opinions.length));
                    yield put(setAllOpinionsPageCount(allOpinionsPageCount + 1));
                }
                break;
        }        
        yield put(setLoading(false));        
    } catch (error) {
        console.log('Something\'s gone wrong:', error);
        switch (action.data.type) {
            case 'myOpinions':
                yield put(setMyOpinions(null));
                break;
            case 'favorites':
                yield put(setFavoriteOpinions(null));
                break;
            default:
                yield put(setAllOpinions(null));
                break;
        }        
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