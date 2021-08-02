import React from 'react';
import configureStore from 'redux-mock-store';
import * as reactRedux from 'react-redux';
import { shallow } from 'enzyme';
import Footer from '../components/Footer';

describe('Footer component', () => {    
    const mockStore = configureStore();
    let store, wrapper;
    
    store = mockStore({});
    jest
        .spyOn(reactRedux, 'useSelector')
        .mockImplementation(state => store.getState());       
    wrapper = shallow(<Footer/>);    

    it('has a link to portfolio', () => {               
        expect(wrapper.find('a').prop('href')).toEqual('https://andresfelipedev.github.io/resume/');            
    });
});