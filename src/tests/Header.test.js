import React from 'react';
import configureStore from 'redux-mock-store';
import * as redux from 'react-redux';
import { shallow } from 'enzyme';
import Header from '../components/Header';
import { signOut, removeSession, setDarkTheme } from '../actions/users';

jest.mock('react-router-dom', () => {    
    const originalModule = jest.requireActual('react-router-dom');
  
    return {
      ...originalModule,
      useHistory: jest.fn(() => {        
        return { push: jest.fn(), location: { pathname: '/pathname' } };
      }),
      useRouteMatch: jest.fn(() => {
        return { url: '/entry' };
      }),
    };
});

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
        store.clearActions();
        store.dispatch = jest.fn();
        wrapper = shallow(<Header/>);
    });    
    
    it('has a brand link that redirects to Homepage', () => {                
        expect(wrapper.find('Link.brand').prop('to')).toEqual('/');               
    });

    it('has a theme toggler', () => {
        expect(wrapper.find('Toggle')).toHaveLength(1);
    });

    it('has a search button', () => {
        expect(wrapper.find('.search-button')).toHaveLength(1);
    });

    it('should change web theme on theme toggler click', () => {        
        wrapper.find('Toggle').simulate('change', { target: { checked: true }});
        expect(store.dispatch).toHaveBeenCalledWith(setDarkTheme(true));
        wrapper.find('Toggle').simulate('change', { target: { checked: false }});
        expect(store.dispatch).toHaveBeenCalledWith(setDarkTheme(false));  
    });

    it('has links to Opinions page (Homepage) and Random page', () => {
        expect(wrapper.find('Link').filterWhere(link => {
            return link.prop('to') === '/' && link.text() === 'Opinions';
        })).toHaveLength(1);
        expect(wrapper.find('Link').filterWhere(link => {
            return link.prop('to') === '/random';
        })).toHaveLength(1);
    });

    it('has Sign in and Sign up links', () => {
        expect(wrapper.find('Link').filterWhere(link => {
            return link.prop('to') === '/signin';
        })).toHaveLength(1);
        expect(wrapper.find('Link').filterWhere(link => {
            return link.prop('to') === '/signup';
        })).toHaveLength(1);
    });
});

describe('Header component (user signed in)', () => {
    const mockStore = configureStore();
    let store, wrapper;    
    
    beforeEach(() => {
        store = mockStore({ session: true, user: { name: 'user' } });
        jest
            .spyOn(redux, 'useSelector')
            .mockImplementation(state => store.getState());
        jest
            .spyOn(redux, 'useDispatch')
            .mockImplementation(() => store.dispatch);
        store.clearActions();
        store.dispatch = jest.fn();
        wrapper = shallow(<Header/>);
    });        
    
    it('has Opinions dropdown with All (Homepage), My Opinions and Favorites options', () => {
        const opinionsDropdown = wrapper.find('#basic-nav-dropdown');        
        expect(opinionsDropdown).toHaveLength(1);
        expect(opinionsDropdown.find('DropdownItem').at(0).text()).toEqual('All');
        expect(opinionsDropdown.find('DropdownItem').at(1).text()).toEqual('My opinions');
        expect(opinionsDropdown.find('DropdownItem').at(2).text()).toEqual('Favorites');        
    });

    it('has a link to Create Opinion page', () => {
        expect(wrapper.find('Link').filterWhere(link => {
            return link.prop('to') === '/create-opinion';
        }));
    });

    it('has a link to Profile page', () => {
        expect(wrapper.find('Link').filterWhere(link => {
            return link.prop('to') === '/profile';
        }));
    });

    it('has a Sign Out button that works correctly', () => {
        const signOutButton = wrapper.find('Button.sign-out-button');
        expect(signOutButton).toHaveLength(1);
        signOutButton.simulate('click');
        expect(store.dispatch).toHaveBeenCalledWith(removeSession);
        expect(store.dispatch).toHaveBeenCalledWith(signOut);
    });
});