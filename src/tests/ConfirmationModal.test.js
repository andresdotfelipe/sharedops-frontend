import React from 'react';
import configureStore from 'redux-mock-store';
import * as reactRedux from 'react-redux';
import { shallow } from 'enzyme';
import ConfirmationModal from '../components/ConfirmationModal';

const props = {
    title: 'Modal',
    msg: 'Modal message',
    confirmation: jest.fn(),
    show: true,
    onHide: jest.fn()
};

describe('ConfirmationModal component', () => {
    const mockStore = configureStore();    
    let store, wrapper;   

    beforeEach(() => {
        store = mockStore({});
        jest
            .spyOn(reactRedux, 'useSelector')
            .mockImplementation(state => store.getState());        
        wrapper = shallow(<ConfirmationModal {...props} />);
    });

    it('has a close button', () => {               
        expect(wrapper.find('ModalHeader').prop('closeButton')).toBe(true);
    });

    it('has a title', () => {
        expect(wrapper.find('ModalTitle')).toHaveLength(1);
        expect(wrapper.find('ModalTitle').text()).toEqual(props.title);
    });

    it('has a body message', () => {
        expect(wrapper.find('ModalBody')).toHaveLength(1);
        expect(wrapper.find('ModalBody').text()).toEqual(props.msg);
    });

    it('submits modal on submit click', () => {
        const e = { stopPropagation() {} };
        wrapper.find({ type: 'submit' }).simulate('click', e);
        expect(props.confirmation).toHaveBeenCalledWith(e, true);
    });

    it('closes modal on cancel click', () => {        
        wrapper.find({ variant: 'secondary' }).simulate('click');
        expect(props.onHide).toHaveBeenCalled();
    });

});