import React from 'react';
import configureStore from 'redux-mock-store';
import * as reactRedux from 'react-redux';
import { shallow } from 'enzyme';
import { updateUserFavoriteOpinions } from '../actions/users';
import { setOpinion } from '../actions/opinions';
import OpinionsContainer from '../components/OpinionsContainer';

const users = [
    {
        _id: '0',
        name: 'User 0',
        favoriteOpinions: ['0', '2'],
        createdAt: '01/01/01',
        modifiedAt: '01/01/01'
    },
    {
        _id: '1',
        name: 'User 1',
        favoriteOpinions: ['1'],
        createdAt: '02/01/01',
        modifiedAt: '02/01/01'
    }
];

const opinions = [
    {
        _id: '0',
        title: 'Opinion 0',
        body: 'Body 0',
        opinionImageUrl: 'https://images.com/0',
        author: users[0],
        createdAt: '01/02/03',
        modifiedAt: '01/02/03'
    },
    {
        _id: '1',
        title: 'Opinion 1',
        body: 'Body 1',
        opinionImageUrl: 'https://images.com/1',
        author: users[0],
        createdAt: '02/02/03',
        modifiedAt: '02/02/03'
    },
    {
        _id: '2',
        title: 'Opinion 2',
        body: 'Body 2',
        opinionImageUrl: 'https://images.com/2',
        author: users[1],
        createdAt: '03/02/03',
        modifiedAt: '02/02/03'
    },
];

const props = {
    initialMessage: 'Initial message',
    opinions,
    pageCount: 2,
    currentCount: 2,
    totalCount: 3,
    type: 'type'
};

jest.mock('react-router-dom', () => {
    const originalModule = jest.requireActual('react-router-dom');
  
    return {
      ...originalModule,
      useHistory: jest.fn(() => {
        return { push: jest.fn(), location : { pathname: '/pathname' } };
      }),
      useRouteMatch: jest.fn(() => {
        return { url: '/entry' };
      }),
    };
});

describe('OpinionsContainer component (user signed out)', () => {
    const mockStore = configureStore();    
    let store, wrapper;   

    beforeEach(() => {
        store = mockStore({ session: false });
        jest
            .spyOn(reactRedux, 'useSelector')
            .mockImplementation(state => store.getState());
        jest
            .spyOn(reactRedux, 'useDispatch')
            .mockImplementation(() => store.dispatch);
        store.clearActions();
        store.dispatch = jest.fn();
        wrapper = shallow(<OpinionsContainer {...props} />);
    });

    it('has an initial message', () => {
        expect(wrapper.find('Col.initial-message')).toHaveLength(1);
    });

    it('has opinions with details (author\'s name, author\'s profile picture and date of publication', () => { 
        expect(wrapper.find('span.name')).toHaveLength(3);
        expect(wrapper.find('img.profile-pic')).toHaveLength(3);
        expect(wrapper.find('span.date')).toHaveLength(3);
    });

    it('has opinions with title', () => {        
        expect(wrapper.find('Col.title')).toHaveLength(3);        
    });

    it('has opinions with image', () => { 
        expect(wrapper.find('img.opinion-img')).toHaveLength(3);        
    });

    it('has opinions with body', () => { 
        expect(wrapper.find('Col.body')).toHaveLength(3);        
    });

    it('has opinions with options (favorite unchecked and comment)', () => { 
        expect(wrapper.find('Button.favorite-unchecked')).toHaveLength(3);
        expect(wrapper.find('Button.comment')).toHaveLength(3);
    });

    it('sets opinion on click', () => {        
        wrapper.find('Col.opinion-box').at(0).simulate('click');
        expect(store.dispatch).toHaveBeenCalledWith(setOpinion(opinions[0]));        
    });    
});

describe('OpinionsContainer component (user signed in)', () => {
    const mockStore = configureStore();    
    let store, wrapper;    

    beforeEach(() => {
        store = mockStore({ session: true, user: users[0] });
        jest
            .spyOn(reactRedux, 'useSelector')
            .mockImplementation(state => store.getState());
        jest
            .spyOn(reactRedux, 'useDispatch')
            .mockImplementation(() => store.dispatch);
        store.clearActions();
        store.dispatch = jest.fn();
        wrapper = shallow(<OpinionsContainer {...props} />);
    });

    it('has opinions with options (favorite checked or unchecked and comment)', () => {
        expect(wrapper.find('Button.favorite-checked')).toHaveLength(2);
        expect(wrapper.find('Button.favorite-unchecked')).toHaveLength(1);
        expect(wrapper.find('Button.comment')).toHaveLength(3);
    });

    it('updates user\'s favorite opinions after clicking favorite button', () => {        
        wrapper.find('Button.favorite-checked').at(0).simulate('click', { stopPropagation() {} });
        expect(store.dispatch).toHaveBeenCalledWith(updateUserFavoriteOpinions(opinions[0]._id));
    });
});