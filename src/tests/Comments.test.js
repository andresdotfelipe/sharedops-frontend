import React from 'react';
import configureStore from 'redux-mock-store';
import * as reactRedux from 'react-redux';
import { shallow } from 'enzyme';
import { updateUserFavoriteOpinions } from '../actions/users';
import { createComment } from '../actions/comments';
import { users, opinions } from './utils/constants';
import Comments from '../pages/Comments';

jest.mock('react-router-dom', () => {    
    const originalModule = jest.requireActual('react-router-dom');
  
    return {
        ...originalModule,
        useHistory: jest.fn(() => {        
            return { push: jest.fn(), location: { pathname: '/pathname' } };
        }),
        useParams: jest.fn(() => {
            return { opinionId: '0' }
        }),
        useRouteMatch: jest.fn(() => {
            return { url: '/entry' };
        }),
    };
});

describe('Comments component (user signed out)', () => {
    const mockStore = configureStore();
    let store, wrapper;

    beforeEach(() => {
        store = mockStore({ session: false, darkTheme: true, user: null, opinion: opinions[2] });
        jest
            .spyOn(reactRedux, 'useSelector')
            .mockImplementation(state => store.getState());
        jest
            .spyOn(reactRedux, 'useDispatch')
            .mockImplementation(() => store.dispatch);
        store.clearActions();
        store.dispatch = jest.fn();
        wrapper = shallow(<Comments />);
    });

    it('has opinion with details (author\'s name, author\'s profile picture and date of publication', () => { 
        const opinionsGrid = wrapper.find('.opinions-grid');
        expect(opinionsGrid.find('.name')).toHaveLength(1);
        expect(opinionsGrid.find('.profile-pic')).toHaveLength(1);
        expect(opinionsGrid.find('.date')).toHaveLength(1);
    });

    it('has opinion with title', () => {        
        expect(wrapper.find('.opinions-grid').find('.title')).toHaveLength(1);        
    });

    it('has opinion with image', () => { 
        expect(wrapper.find('.opinions-grid').find('.opinion-img')).toHaveLength(1);        
    });

    it('has opinion with body', () => { 
        expect(wrapper.find('.opinions-grid').find('.body')).toHaveLength(1);        
    });

    it('has opinion with favorite (unchecked) option', () => { 
        expect(wrapper.find('Button.favorite-unchecked')).toHaveLength(1);        
    });

    it('has a comments divider with the number of comments in the middle', () => {
        expect(wrapper.find('.divider')).toHaveLength(1);
        expect(wrapper.find('.divider').text()).toEqual(`Comments (${opinions[2].comments.length})`)
    });

    it('has a banner asking for sign in/up to post comment', () => {
        expect(wrapper.find('.authenticate-banner')).toHaveLength(1);
    });

    it('shows comments with profile picture, author (with Original Poster tag in case this is also the opinion\'s author), date of comment and comment body', () => {
        expect(wrapper.find('.comment-box')).toHaveLength(3);
        const commentBox = wrapper.find('.comment-box').at(0);        
        expect(commentBox.find('.author')).toHaveLength(1);        
        expect(commentBox.find('.original-poster')).toHaveLength(1);
        expect(commentBox.find('.profile-picture')).toHaveLength(1);
        expect(commentBox.find('.date')).toHaveLength(1);
        expect(commentBox.find('.body')).toHaveLength(1);
    });
});

describe('Comments component (user signed in)', () => {
    const mockStore = configureStore();
    let store, wrapper;

    beforeEach(() => {
        store = mockStore({ session: true, darkTheme: true, user: users[1], opinion: opinions[1] });
        jest
            .spyOn(reactRedux, 'useSelector')
            .mockImplementation(state => store.getState());
        jest
            .spyOn(reactRedux, 'useDispatch')
            .mockImplementation(() => store.dispatch);
        store.clearActions();
        store.dispatch = jest.fn();        
        wrapper = shallow(<Comments />);
    });

    it('has opinion with favorite (checked or unchecked) option', () => {
        expect(wrapper.find('Button.favorite-checked')).toHaveLength(1);
        expect(wrapper.find('Button.favorite-unchecked')).toHaveLength(0);        
    });

    it('updates user\'s favorite opinions after clicking favorite button', () => {        
        wrapper.find('Button.favorite-checked').simulate('click', { stopPropagation() {} });
        expect(store.dispatch).toHaveBeenCalledWith(updateUserFavoriteOpinions(opinions[1]._id));
    });

    it('has a message that notifies the user that he is commenting', () => {
        expect(wrapper.find('.warning-message')).toHaveLength(1);
        expect(wrapper.find('.warning-message').text()).toEqual(`Warning! You are commenting as "${users[1].name}"`)
    });

    it('has a post comment form with textarea and submit button', () => {
        const commentForm = wrapper.find('.comment-form');
        expect(wrapper.find('.comment-form')).toHaveLength(1);        
        expect(commentForm.find('#comment-textarea')).toHaveLength(1);
        expect(commentForm.find('Button.post-comment-button')).toHaveLength(1);
    });

    it('posts a new comment on "Post comment" button click', () => {
        const data = {
            body: 'User 1\'s comment in Opinion 1',
            opinionId: opinions[1]._id,            
        };
        const e = { target: { value: 'User 1\'s comment in Opinion 1' } };
        wrapper.find('.comment-form').find('#comment-textarea').simulate('change', e);
        wrapper.find('Button.post-comment-button').simulate('click', { preventDefault() {} });        
        expect(store.dispatch).toHaveBeenCalledWith(createComment(data));
    });
});