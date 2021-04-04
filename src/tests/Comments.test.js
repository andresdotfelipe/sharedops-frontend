import React from 'react';
import configureStore from 'redux-mock-store';
import * as reactRedux from 'react-redux';
import { shallow } from 'enzyme';
import { updateUserFavoriteOpinions } from '../actions/users';
import Comments from '../pages/Comments';

const users = [
    {
        _id: '0',
        name: 'User 0',
        profilePicUrl: 'https://profilepictures.com/user0',
        favoriteOpinions: ['3', '8', '15'],
        createdAt: '02/04/21',
        modifiedAt: '03/04/21'
    },
    {
        _id: '1',
        name: 'User 1',
        profilePicUrl: 'https://profilepictures.com/user1',
        favoriteOpinions: ['2', '0', '12'],
        createdAt: '02/03/21',
        modifiedAt: '01/04/21'
    },
    {
        _id: '2',
        name: 'User 2',
        profilePicUrl: 'https://profilepictures.com/user2',
        favoriteOpinions: ['31', '2', '5'],
        createdAt: '10/03/21',
        modifiedAt: '18/03/21'
    }
];

const opinion = {
    _id: '0',
    title: 'Opinion 0',
    body: 'Body 0',
    opinionImageUrl: 'https://images.com/0',
    author: users[2],
    createdAt: '18/03/21',
    modifiedAt: '18/03/21'
};

const comments = [
    {
        author: users[0],
        opinion,
        body: 'User 0\'s comment'
    },
    {
        author: users[1],
        opinion,
        body: 'User 1\'s comment'
    },
    {
        author: users[2],
        opinion,
        body: 'User 2\'s comment'
    }
];

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
        store = mockStore({ session: false, darkTheme: true, user: null, opinion, comments });
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

    it('has opinions with details (author\'s name, author\'s profile picture and date of publication', () => { 
        expect(wrapper.find('span.name')).toHaveLength(1);
        expect(wrapper.find('img.profile-pic')).toHaveLength(1);
        expect(wrapper.find('span.date')).toHaveLength(1);
    });

    it('has opinions with title', () => {        
        expect(wrapper.find('Col.title')).toHaveLength(1);        
    });

    it('has opinions with image', () => { 
        expect(wrapper.find('img.opinion-img')).toHaveLength(1);        
    });

    it('has opinions with body', () => { 
        expect(wrapper.find('Col.body')).toHaveLength(1);        
    });

    it('has opinions with options (favorite unchecked and comment)', () => { 
        expect(wrapper.find('Button.favorite-unchecked')).toHaveLength(1);
        expect(wrapper.find('Button.comment')).toHaveLength(1);
    });

    it('has a banner asking for sign in/up to post comment', () => {
        expect(wrapper.find('.authenticate-to-comment')).toHaveLength(1);
    });

    it('shows comments with author, profile picture, date of comment and comment body', () => {
        const commentContainer = wrapper.find('.comment-container');
        expect(commentContainer.find('.author')).toHaveLength(3);
        expect(commentContainer.find('.profile-picture')).toHaveLength(3);
        expect(commentContainer.find('.date')).toHaveLength(3);
        expect(commentContainer.find('.body')).toHaveLength(3);
    });
});

describe('Comments component (user signed in)', () => {
    const mockStore = configureStore();
    let store, wrapper;

    beforeEach(() => {
        store = mockStore({ session: true, darkTheme: true, user: users[1], opinion, comments });
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

    it('has opinions with options (favorite checked or unchecked and comment)', () => {
        expect(wrapper.find('Button.favorite-checked')).toHaveLength(1);
        expect(wrapper.find('Button.favorite-unchecked')).toHaveLength(0);
        expect(wrapper.find('Button.comment')).toHaveLength(1);
    });

    it('updates user\'s favorite opinions after clicking favorite button', () => {        
        wrapper.find('Button.favorite-checked').at(0).simulate('click', { stopPropagation() {} });
        expect(store.dispatch).toHaveBeenCalledWith(updateUserFavoriteOpinions(opinion._id));
    });

    it('has a message that notifies the user is commenting', () => {
        wrapper.find('.warn-message').toHaveLength(1);
    });

    it('has a post comment form showing author, profile picture, textarea and submit button', () => {
        const commentForm = wrapper.find('.comment-form');
        wrapper.find('.comment-form').toHaveLength(1);
        commentForm.find('.author').toHaveLength(1);
        commentForm.find('.profile-picture').toHaveLength(1);
        commentForm.find('.comment-area').toHaveLength(1);
        commentForm.find('Button.post-comment').toHaveLength(1);
    });

    it('posts a new comment on "Comment" button click', () => {
        const data = {
            body: 'User 1\'s second comment',
            opinionId: opinion._id,            
        };
        wrapper.find('Button.post-comment').at(0).simulate('click');        
        expect(store.dispatch).toHaveBeenCalledWith(createComment(data));
    });
});