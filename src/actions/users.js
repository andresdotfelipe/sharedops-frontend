import { actionTypes } from '../config/actionTypes';

export const signUp = data => ({
    type: actionTypes.SIGN_UP,
    data
});

export const signIn = data => ({
    type: actionTypes.SIGN_IN,
    data
});

export const signOut = {
    type: actionTypes.SIGN_OUT
};

export const setSession = session => ({
    type: actionTypes.SET_SESSION,
    session
});

export const getSession = {
    type: actionTypes.GET_SESSION
};

export const removeSession = {
    type: actionTypes.REMOVE_SESSION
};

export const setUser = user => ({
    type: actionTypes.SET_USER,
    user
});

export const getUser = {
    type: actionTypes.GET_USER
};

export const updateUser = data => ({
    type: actionTypes.UPDATE_USER,
    data
});

export const setLoading = loading => ({
    type: actionTypes.SET_LOADING,
    loading
});

export const setSubmitting = submitting => ({
    type: actionTypes.SET_SUBMITTING,
    submitting
});

export const setSuccess = success => ({
    type: actionTypes.SET_SUCCESS,
    success
});

export const setError = error => ({
    type: actionTypes.SET_ERROR,
    error
});

export const setDarkTheme = darkTheme => ({
    type: actionTypes.SET_DARK_THEME,
    darkTheme
});