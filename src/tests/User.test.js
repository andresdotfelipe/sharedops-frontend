import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import * as reactRedux from 'react-redux';
import { users } from './utils/constants';
import User from '../pages/User';

jest.mock('react-router-dom', () => {    
    const originalModule = jest.requireActual('react-router-dom');
  
    return {
        ...originalModule,
        useHistory: jest.fn(() => {        
            return { push: jest.fn(), location: { pathname: '/pathname' } };
        }),
        useParams: jest.fn(() => {
            return { userId: '0' }
        }),
        useRouteMatch: jest.fn(() => {
            return { url: '/entry' };
        }),
    };
});

describe('User component', () => {
    const mockStore = configureStore();
    let store, wrapper;

    beforeEach(() => {
        store = mockStore({ userProfile: users[0] });
        jest
            .spyOn(reactRedux, 'useSelector')
            .mockImplementation(state => store.getState());
        jest
            .spyOn(reactRedux, 'useDispatch')
            .mockImplementation(() => store.dispatch);
        store.clearActions();
        store.dispatch = jest.fn();
        wrapper = shallow(<User />);
    });

    it('has user\'s profile picture', () => {
        const profilePicture = wrapper.find('.profile-picture').find('img');
        expect(profilePicture).toHaveLength(1);
        expect(profilePicture.prop('src')).toEqual(users[0].profilePicUrl);
    });

    it('has user\'s details (name, description and registration date)', () => {        
        expect(wrapper.find('.name').text()).toEqual(users[0].name);
        expect(wrapper.find('.description').text()).toEqual(users[0].description);
        expect(wrapper.find('.registration-date').text()).toEqual(`Joined on ${users[0].createdAt}`);
    });
});