import React from 'react';
import configureStore from 'mock-redux-store';
import * as redux from 'react-redux';
import { shallow } from 'enzyme';
import Header from '../components/Header';

describe('Header component', () => {
    const mockStore = configureStore();
    let store, wrapper;    
    beforeEach(() => {
        store = mockStore({});
        jest
            .spyOn(redux, 'useSelector')
            .mockImplementation(state => store.getState());
        wrapper = shallow(<Header/>);
    })
});