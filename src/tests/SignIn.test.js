import React from 'react';
import configureStore from 'redux-mock-store';
import * as reactRedux from 'react-redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { signIn } from '../actions/users';
import { mount } from 'enzyme';
import InputForm from '../components/InputForm';
import SignIn from '../pages/SignIn';

const submitSignIn = jest.fn();
const handleSubmit = jest.fn();
const defaultProps = {
    submitSignIn,
    handleSubmit    
};

describe('SignIn component', () => {
    const mockStore = configureStore();
    let store, wrapper;

    beforeEach(() => {
        store = mockStore({ unauthenticated: true, submitting: false });
        jest
            .spyOn(reactRedux, 'useSelector')
            .mockImplementation(state => store.getState());
        jest
            .spyOn(reactRedux, 'useDispatch')
            .mockImplementation(() => store.dispatch);
        store.clearActions();
        store.dispatch = jest.fn();
        wrapper = mount(
            <Provider store={store}>
                <BrowserRouter>
                    <SignIn />
                </BrowserRouter>
            </Provider>
        );
        wrapper.setProps({ children: <BrowserRouter> <SignIn {...defaultProps} /> </BrowserRouter> });
    });

    it('has Sign in as title for SignInForm', () => {        
        expect(wrapper.find('FormText').at(0).text()).toEqual('Sign in');
    });

    it('has a name field for SignInForm', () => {        
        const nameField = wrapper.find('Field').filterWhere(field => {
            return field.prop('name') === 'name';
        }).at(0);      
        expect(nameField.prop('name')).toEqual('name');
        expect(nameField.prop('ph')).toEqual('Username');
        expect(nameField.prop('type')).toEqual('text');
        expect(nameField.prop('component')).toEqual(InputForm);
    });

    it('has a password field for SignInForm', () => {        
        const passwordField = wrapper.find('Field').filterWhere(field => {
            return field.prop('name') === 'password';
        }).at(0);      
        expect(passwordField.prop('name')).toEqual('password');
        expect(passwordField.prop('ph')).toEqual('Password');
        expect(passwordField.prop('type')).toEqual('password');
        expect(passwordField.prop('component')).toEqual(InputForm);
    });

    it('disables SignInForm Submit button while submitting', () => {
        store = mockStore({ unauthenticated: true, submitting: true });    
        wrapper = mount(
            <Provider store={store}> 
                <BrowserRouter> 
                    <SignIn /> 
                </BrowserRouter> 
            </Provider>
        );        
        const submitButton = wrapper.find({ type: 'submit' }).at(0);
        expect(submitButton.prop('disabled')).toBe(true);        
    });

    it('signs in user on SignInForm submit', () => {        
        const data = {};                
        const submitButton = wrapper.find({ type: 'submit' }).at(0);
        submitButton.simulate('click');        
        expect(store.dispatch).toHaveBeenCalledWith(signIn(data));        
    });
});