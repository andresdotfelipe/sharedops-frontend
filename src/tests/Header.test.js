import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import { shallow } from 'enzyme';
import Header from '../components/Header';
import { setSession } from '../actions/users';

describe('Header component (user signed out)', () => {
    const mockStore = configureStore();
    let store, wrapper;    
    beforeEach(() => {
        store = mockStore({ session: false });
        jest
            .spyOn(redux, 'useSelector')
            .mockImplementation(state => store.getState());
        jest
            .spyOn(redux, 'useDispatch')
            .mockImplementation(() => store.dispatch);
        wrapper = shallow(<Header/>);
    });    
    
    it('has a brand link that redirects to homepage', () => {                
        expect(wrapper.find('Link.brand').prop('to')).toEqual('/');
        // expect(wrapper.find('Link').filterWhere(link => {
        //     return link.prop('to') === '/' && link.text() === 'Sharedops';
        // })).toHaveLength(1);        
    });

    it('has links to Opinions page and Random page', () => {
        expect(wrapper.find('Link').filterWhere(link => {
            return link.prop('to') === '/' && link.text() === 'Opinions';
        })).toHaveLength(1);
        expect(wrapper.find('Link').filterWhere(link => {
            return link.prop('to') === '/random' && link.text() === 'Random';
        })).toHaveLength(1);
    });

    it('has Sign in and Sign up links', () => {
        expect(wrapper.find('Link').filterWhere(link => {
            return link.prop('to') === '/signin' && link.text() === 'Sign in';
        })).toHaveLength(1);
        expect(wrapper.find('Link').filterWhere(link => {
            return link.prop('to') === '/signup' && link.text() === 'Sign up';
        })).toHaveLength(1);
    });
});

// describe('Header component (user signed in)', () => {
//     const mockStore = configureStore();
//     let store, wrapper;    
//     beforeEach(() => {
//         store = mockStore({ session: true });
//         jest
//             .spyOn(redux, 'useSelector')
//             .mockImplementation(state => store.getState());
//         jest
//             .spyOn(redux, 'useDispatch')
//             .mockImplementation(() => store.dispatch);
//         wrapper = shallow(<Header/>);
//     });    
    
//     it('has a brand link that redirects to homepage', () => {
//         console.log(wrapper.debug());        
//         expect(wrapper.find('Link.brand').prop('className')).toEqual('brand');
//         // expect(wrapper.find('Link').filterWhere(link => {
//         //     return link.prop('to') === '/' && link.text() === 'Sharedops';
//         // })).toHaveLength(1);        
//     });    
// });