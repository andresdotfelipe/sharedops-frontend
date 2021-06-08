import { call, put, select, takeLatest } from 'redux-saga/effects';
import { stopSubmit, clearSubmitErrors } from 'redux-form';
import OpinionProvider from '../providers/OpinionProvider';
import UserProvider from '../providers/UserProvider';
import { setFavoriteOpinions } from '../../actions/opinions';
import { setSession, setUnauthenticated, setUser, setUserProfile, getSession, getUser, setSubmitting, setSuccess, setError } from '../../actions/users';
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

function* getSessionGenerator() {
    try {        
        let storageSession = window.localStorage.getItem('session');        
        const stateSession = yield select(state => state.UserReducer.session);
        const user = yield select(state => state.UserReducer.user);        
        if ((!storageSession | (storageSession !== stateSession)) & !!user) {            
            window.localStorage.removeItem('session');
            window.location = '/';
        } else {
            yield put(setSession(storageSession));            
        } 
    } catch (error) {
        console.log('Something\'s gone wrong:', error);
    }
}

function* getUserGenerator() {
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

function* getUserProfileGenerator(action) {
    try {        
        const userProfile = yield call(UserProvider.getUserProfile, action.id);
        userProfile.createdAt = String(new Date(userProfile.createdAt));
        yield put(setUserProfile(userProfile));        
    } catch (error) {
        console.log('Something\'s gone wrong:', error); 
        yield put(setUserProfile(null));
    }
}

function* updateUserGenerator(action) {
    try {        
        yield put(getSession);
        yield put(clearSubmitErrors('SettingsForm'));
        yield put(setSubmitting(true));    
        console.log(action);                    
        if (action.data.file) {
            let formData = new FormData();
            formData.append('file', action.data.file.file, action.data.file.name);
            formData.append('folder', 'sharedops/profile-pics');
            formData.append('upload_preset', process.env.REACT_APP_PROFILE_PICS_UPLOAD_PRESET);
            const image = yield call(UserProvider.uploadUserProfilePic, formData);
            action.data.profilePicUrl = image.secure_url;
            delete action.data.file;
        }
        yield call(UserProvider.updateUser, action.data);            
        yield put(getUser);        
        yield put(setSubmitting(false));        
        yield put(setError(false));
        yield put(setSuccess('Settings successfully updated'));                           
    } catch (error) {
        console.log(error);
        yield put(setSubmitting(false));
        yield put(setSuccess(false));
        yield put(stopSubmit('SettingsForm', error.response.data.error));
        yield put(setError(error.response.data.error)); 
    }
}

function* updateUserFavoriteOpinions(action) {
    try {
        yield put(getSession);
        const favoriteOpinions = yield select(state => state.OpinionReducer.favoriteOpinions);        
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
        const data = { opinionId: action.opinionId };
        yield call(UserProvider.updateUserFavoriteOpinions, data);
        yield put(getUser);                                
    } catch (error) {        
        yield put(setError(error.response.data.error)); 
    }
};

export function* userSaga() {
    yield takeLatest(actionTypes.SIGN_IN, signInGenerator);
    yield takeLatest(actionTypes.SIGN_UP, signUpGenerator);
    yield takeLatest(actionTypes.GET_SESSION, getSessionGenerator);
    yield takeLatest(actionTypes.GET_USER, getUserGenerator);
    yield takeLatest(actionTypes.GET_USER_PROFILE, getUserProfileGenerator);
    yield takeLatest(actionTypes.UPDATE_USER, updateUserGenerator);
    yield takeLatest(actionTypes.UPDATE_USER_FAVORITE_OPINIONS, updateUserFavoriteOpinions);
}