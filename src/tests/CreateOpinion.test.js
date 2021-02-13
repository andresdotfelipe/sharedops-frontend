import React from 'react';
import configureStore from 'redux-mock-store';
import * as reactRedux from 'react-redux';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { createOpinion } from '../actions/opinions';
import { reset } from 'redux-form';
import { mount } from 'enzyme';
import InputForm from '../components/InputForm';
import CreateOpinion from '../pages/CreateOpinion';

const submitOpinion = jest.fn();
const handleSubmit = jest.fn();
const defaultProps = {    
    submitOpinion,
    handleSubmit
};

describe('CreateOpinion component', () => {
    const mockStore = configureStore();
    let store, wrapper;    

    beforeEach(() => {
        store = mockStore({ session: true, submitting: false });    
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
                    <CreateOpinion /> 
                </BrowserRouter> 
            </Provider>
        );        
        wrapper.setProps({ children: <BrowserRouter> <CreateOpinion {...defaultProps} /> </BrowserRouter>});
    });

    it('has Create new opinion as title for OpinionForm', () => {        
        expect(wrapper.find('FormText').text()).toEqual('Create new opinion');
    });

    it('has a title field for OpinionForm', () => {        
        const titleField = wrapper.find('Field').filterWhere(field => {
            return field.prop('name') === 'title';
        }).at(0);      
        expect(titleField.prop('name')).toEqual('title');
        expect(titleField.prop('label')).toEqual('Title');
        expect(titleField.prop('type')).toEqual('text');
        expect(titleField.prop('component')).toEqual(InputForm);
    });    

    it('has a body field for OpinionForm', () => {        
        const bodyField = wrapper.find('Field').filterWhere(field => {
            return field.prop('name') === 'body';
        }).at(0);
        expect(bodyField.prop('name')).toEqual('body');
        expect(bodyField.prop('label')).toEqual('Opinion');
        expect(bodyField.prop('as')).toEqual('textarea');
        expect(bodyField.prop('rows')).toEqual(10);
        expect(bodyField.prop('component')).toEqual(InputForm);
    });

    it('has a file field for OpinionForm', () => {        
        const fileField = wrapper.find('Field').filterWhere(field => {
            return field.prop('name') === 'file';
        }).at(0);      
        expect(fileField.prop('name')).toEqual('file');
        expect(fileField.prop('label')).toEqual('Opinion image (optional)');
        expect(fileField.prop('type')).toEqual('file');        
        expect(fileField.prop('component')).toEqual(InputForm);
    });

    it('disables OpinionForm Submit button while submitting', () => {
        store = mockStore({ session: true, submitting: true });    
        wrapper = mount(
            <Provider store={store}> 
                <BrowserRouter> 
                    <CreateOpinion /> 
                </BrowserRouter> 
            </Provider>
        );        
        const submitButton = wrapper.find({ type: 'submit' }).at(0);
        expect(submitButton.prop('disabled')).toBe(true);        
    });

    it('creates new opinions on OpinionForm submit', () => {        
        const data = {};                
        const submitButton = wrapper.find({ type: 'submit' }).at(0);
        submitButton.simulate('click');        
        expect(store.dispatch).toHaveBeenCalledWith(createOpinion(data));
        expect(store.dispatch).toHaveBeenCalledWith(reset('OpinionForm'));
    });
});