import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import * as reactRedux from 'react-redux';
import { userProfile } from './utils/constants';
import User from '../pages/User';

describe('User component', () => {
    const mockStore = configureStore();
    let store, wrapper;

    beforeEach(() => {
        store = mockStore({ userProfile });
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
        const profilePicture = wrapper.find('.profile-picture');
        expect(profilePicture).toHaveLength(1);
        expect(profilePicture.prop('src')).toEqual(userProfile.user.profilePicUrl);
    });

    it('has user\'s details (name, description and registration date)', () => {        
        expect(wrapper.find('.name')).toEqual(userProfile.user.name);
        expect(wrapper.find('.description')).toEqual(userProfile.user.description);
        expect(wrapper.find('.registration-date')).toEqual(userProfile.user.createdAt);
    });
});