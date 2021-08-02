import React from 'react';
import configureStore from 'redux-mock-store';
import * as reactRedux from 'react-redux';
import { shallow } from 'enzyme';
import { getOpinion } from '../actions/opinions';
import { users, opinions } from './utils/constants';
import Random from '../pages/Random';

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
  
    return {
      ...originalModule,
      useHistory: jest.fn(() => {
        return { push: jest.fn(), location : { pathname: '/random' } };
      }),
      useRouteMatch: jest.fn(() => {
        return { url: '/entry' };
      }),
    };
});

describe('Random component', () => {
    const mockStore = configureStore();    
    let store, wrapper;

    store = mockStore({ session: true, opinion: opinions[0] });
    jest
        .spyOn(reactRedux, 'useSelector')
        .mockImplementation(state => store.getState());
    jest
        .spyOn(reactRedux, 'useDispatch')
        .mockImplementation(() => store.dispatch);
    store.clearActions();
    store.dispatch = jest.fn();
    wrapper = shallow(<Random />);    

    it('has a button that dispatches a new random opinion on click', () => {                 
        wrapper.find('Button.random').simulate('click');
        expect(store.dispatch).toHaveBeenCalledWith(getOpinion('random'));
    });
});