import { call, put, select, takeLatest } from 'redux-saga/effects';
import { stopSubmit, clearSubmitErrors } from 'redux-form';
import OpinionProvider from '../providers/OpinionProvider';
import UserProvider from '../providers/UserProvider';
import { setFavoriteOpinions } from '../../actions/opinions';
import { setSession, setUnauthenticated, setUser, getUser, setSubmitting, setError, signOut } from '../../actions/users';
import { actionTypes } from '../../config/actionTypes';

function* signInGenerator(action) {
    try {
        yield put(setSubmitting(true));
        const session = yield call(UserProvider.signIn, action.data);
        window.localStorage.setItem('session', JSON.stringify(session));
        yield put(setSession(session));
        yield put(setUnauthenticated(false));
        yield put(getUser);
        yield put(setSubmitting(false));        
    } catch (error) {        
        yield put(setSubmitting(false));
        yield put(stopSubmit('SignInForm', error.response.data.error));
    }
}

function* signUpGenerator(action) {    
    try {                
        yield put(setSubmitting(true));
        const session = yield call(UserProvider.signUp, action.data);
        window.localStorage.setItem('session', JSON.stringify(session));                
        yield put(setSession(session));
        yield put(setUnauthenticated(false));
        yield put(getUser);
        yield put(setSubmitting(false));
    } catch (error) {
        yield put(setSubmitting(false));
        yield put(stopSubmit('SignUpForm', error.response.data.error));
    }
}

function* getSessionGenerator(action) {
    try {        
        let session = window.localStorage.getItem('session');        
        session = session ? JSON.parse(session) : null;
        const user = yield select(state => state.UserReducer.user);    
        if (!session & !!user) {            
            yield put(signOut);
        } else {
            yield put(setSession(session));
        } 
    } catch (error) {
        console.log('Something\'s gone wrong:', error);
    }
}


function* removeSessionGenerator(action) {
    try {
        window.localStorage.removeItem('session');
        yield put(setSession(null));        
    } catch (error) {
        console.log('Something\'s gone wrong:', error);
    }
}

function* getUserGenerator(action) {
    try {
        const session = yield select(state => state.UserReducer.session);
        if (session) {
            const user = yield call(UserProvider.getUser);
            yield put(setUser(user));
        }
    } catch (error) {
        console.log('Something\'s gone wrong:', error); 
        yield put(setUser(null));
    }
}

function* updateUserGenerator(action) {
    try {
        const session = yield select(state => state.UserReducer.session);
        if (session) {
            yield put(clearSubmitErrors('UpdateUserForm'));
            yield put(setSubmitting(true));
            const data = {};
            if (action.name) data.name = action.name;
            if (action.data.file) {
                let formData = new FormData();
                formData.append('image', action.data.file, action.data.name);
                formData.append('folder', 'sharedops/profile-pics');
                formData.append('upload_preset', process.env.REACT_APP_IMAGES_UPLOAD_PRESET);
                const image = yield call(UserProvider.uploadUserProfilePic, formData);
                data.imageURL = image.secure_url;
            }
            yield call(UserProvider.updateUser, data);
            yield put(setSubmitting(false));                        
        }
    } catch (error) {
        yield put(setSubmitting(false));
        yield put(stopSubmit('UpdateUserForm', error.response.data.error));
        yield put(setError(error.response.data.error)); 
    }
}

function* updateUserFavoriteOpinions(action) {
    try {
        const session = yield select(state => state.UserReducer.session);
        if (session) {
            const favoriteOpinions = yield select(state => state.OpinionReducer.favoriteOpinions);
            if (favoriteOpinions.length > 0) {
                const opinion = yield call(OpinionProvider.getOpinion, action.opinionId);
                if (favoriteOpinions.some(e => e._id === action.opinionId)) {
                    favoriteOpinions.forEach(favoriteOpinion => {
                        if (favoriteOpinion._id === action.opinionId) {
                            favoriteOpinions.splice(favoriteOpinions.indexOf(favoriteOpinion), 1);
                        }
                    });                              
                } else {                
                    favoriteOpinions.unshift(opinion);
                }            
                yield put(setFavoriteOpinions(favoriteOpinions));
            }
            const data = { opinionId: action.opinionId };
            yield call(UserProvider.updateUserFavoriteOpinions, data);
            yield put(getUser);                        
        }
    } catch (error) {        
        yield put(setError(error.response.data.error)); 
    }
};

export function* userSaga() {
    yield takeLatest(actionTypes.SIGN_IN, signInGenerator);
    yield takeLatest(actionTypes.SIGN_UP, signUpGenerator);
    yield takeLatest(actionTypes.GET_SESSION, getSessionGenerator);
    yield takeLatest(actionTypes.REMOVE_SESSION, removeSessionGenerator);
    yield takeLatest(actionTypes.GET_USER, getUserGenerator);
    yield takeLatest(actionTypes.UPDATE_USER, updateUserGenerator);
    yield takeLatest(actionTypes.UPDATE_USER_FAVORITE_OPINIONS, updateUserFavoriteOpinions);
}