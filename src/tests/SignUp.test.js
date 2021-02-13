import React from 'react';
import configureStore from 'redux-mock-store';
import * as reactRedux from 'react-redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { signUp } from '../actions/users';
import { mount } from 'enzyme';
import InputForm from '../components/InputForm';
import SignUp from '../pages/SignUp';

const submitSignUp = jest.fn();
const handleSubmit = jest.fn();
const defaultProps = {
    submitSignUp,
    handleSubmit    
};

describe('SignUp component', () => {
    const mockStore = configureStore();
    let store, wrapper;

    beforeEach(() => {
        store = mockStore({ submitting: false });
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
                    <SignUp />
                </BrowserRouter>
            </Provider>
        );
        wrapper.setProps({ children: <BrowserRouter> <SignUp {...defaultProps} /> </BrowserRouter> });
    });

    it('has Sign In as title for SignUpForm', () => {        
        expect(wrapper.find('FormText').at(0).text()).toEqual('Sign Up');
    });

    it('has a name field for SignUpForm', () => {        
        const nameField = wrapper.find('Field').filterWhere(field => {
            return field.prop('name') === 'name';
        }).at(0);      
        expect(nameField.prop('name')).toEqual('name');
        expect(nameField.prop('ph')).toEqual('Username');
        expect(nameField.prop('type')).toEqual('text');
        expect(nameField.prop('component')).toEqual(InputForm);
    });

    it('has a password field for SignUpForm', () => {        
        const passwordField = wrapper.find('Field').filterWhere(field => {
            return field.prop('name') === 'password';
        }).at(0);      
        expect(passwordField.prop('name')).toEqual('password');
        expect(passwordField.prop('ph')).toEqual('Password');
        expect(passwordField.prop('type')).toEqual('password');
        expect(passwordField.prop('component')).toEqual(InputForm);
    });

    it('has a confirm password field for SignUpForm', () => {        
        const passwordField = wrapper.find('Field').filterWhere(field => {
            return field.prop('name') === 'confirmPassword';
        }).at(0);      
        expect(passwordField.prop('name')).toEqual('confirmPassword');
        expect(passwordField.prop('ph')).toEqual('Confirm password');
        expect(passwordField.prop('type')).toEqual('password');
        expect(passwordField.prop('component')).toEqual(InputForm);
    });

    it('disables SignUpForm Submit button while submitting', () => {
        store = mockStore({ submitting: true });    
        wrapper = mount(
            <Provider store={store}> 
                <BrowserRouter> 
                    <SignUp /> 
                </BrowserRouter> 
            </Provider>
        );        
        const submitButton = wrapper.find({ type: 'submit' }).at(0);
        expect(submitButton.prop('disabled')).toBe(true);        
    });

    it('signs in user on SignUpForm submit', () => {        
        const data = {};                
        const submitButton = wrapper.find({ type: 'submit' }).at(0);
        submitButton.simulate('click');        
        expect(store.dispatch).toHaveBeenCalledWith(signUp(data));        
    });
});