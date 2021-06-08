import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import { shallow } from 'enzyme';
import NotFound from '../pages/NotFound';

const mockHistoryPush = jest.fn();

jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useHistory: () => ({
        push: mockHistoryPush,
    })
}));

describe('Not found component', () => {
    const mockStore = configureStore();
    let store, wrapper;    

    beforeEach(() => {
        store = mockStore({ darkTheme: false });
        jest
            .spyOn(redux, 'useSelector')
            .mockImplementation(state => store.getState());
        jest
            .spyOn(redux, 'useDispatch')
            .mockImplementation(() => store.dispatch);
        store.clearActions();
        store.dispatch = jest.fn();
        wrapper = shallow(<NotFound />);
    });    

    it('has a 404 error image', () => {
        expect(wrapper.find('img').prop('src')).toEqual('not-found.svg');
        expect(wrapper.find('img').prop('alt')).toEqual('Not Found');
    });
    
    it('has a span with "NOT FOUND" text', () => {
        expect(wrapper.find('span').text()).toEqual('NOT FOUND');
    });

    it('has a paragraph with "This page does not exist" text', () => {
        expect(wrapper.find('p').text()).toEqual('This page does not exist');
    });

    it('has a go to main page button that works correctly', () => {                
        const goToMainPageButton = wrapper.find('Button');
        expect(goToMainPageButton).toHaveLength(1);
        expect(goToMainPageButton.text()).toEqual('Go to main page');
        goToMainPageButton.simulate('click');                          
        expect(mockHistoryPush).toHaveBeenCalledWith('/');
    });
});