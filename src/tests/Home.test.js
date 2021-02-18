import React from 'react';
import configureStore from 'redux-mock-store';
import * as reactRedux from 'react-redux';
import { shallow } from 'enzyme';
import Home from '../pages/Home';

describe('Home component (user signed out)', () => {
    const mockStore = configureStore();
    const initialState = {
        session: false,
        opinions: [
            {
                _id: 0,
                title: 'Opinion 0',
                body: 'Body 0',
                opinionImageUrl: 'https://images.com/0',
                author: {
                    _id: 0,
                    name: 'User 0',
                    createdAt: '01/01/01',
                    modifiedAt: '01/01/01'
                },
                createdAt: '01/02/03',
                modifiedAt: '01/02/03'
            },
            {
                _id: 1,
                title: 'Opinion 1',
                body: 'Body 1',
                opinionImageUrl: 'https://images.com/1',
                author: {
                    _id: 0,
                    name: 'User 0',
                    createdAt: '01/01/01',
                    modifiedAt: '01/01/01'
                },
                createdAt: '02/02/03',
                modifiedAt: '02/02/03'
            },
            {
                _id: 2,
                title: 'Opinion 2',
                body: 'Body 2',
                opinionImageUrl: 'https://images.com/2',
                author: {
                    _id: 1,
                    name: 'User 1',
                    createdAt: '02/01/01',
                    modifiedAt: '02/01/01'
                },
                createdAt: '03/02/03',
                modifiedAt: '02/02/03'
            },
        ],
        opinionPageCount: 2,
        currentOpinionCount: 2,
        totalOpinionCount: 3
    };
    let store, wrapper;    

    beforeEach(() => {
        store = mockStore(initialState);
        jest
            .spyOn(reactRedux, 'useSelector')
            .mockImplementation(state => store.getState());
        jest
            .spyOn(reactRedux, 'useDispatch')
            .mockImplementation(() => store.dispatch);
        store.clearActions();
        store.dispatch = jest.fn();
        wrapper = shallow(<Home/>);
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

    it('has opinions with options (favorite and comment)', () => { 
        expect(wrapper.find('Button.favorite')).toHaveLength(3);
        expect(wrapper.find('Button.comment')).toHaveLength(3);
    });
});