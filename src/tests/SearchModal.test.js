import React from 'react';
import { shallow } from 'enzyme';
import SearchModal from '../components/SearchModal';

const props = {
    darkTheme: true,
    title: 'Modal',    
    onChangeSearch: jest.fn(),
    checkedSearchOption: 'All',
    search: 'Search',
    searchOpinion: jest.fn(),
    show: true,
    onHide: jest.fn()
};

describe('Search Modal component (user signed out)', () => {    
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<SearchModal session={false} {...props} />);
    });

    it('doesn\'t have three radio buttons for All, My Opinions and Favorites', () => {        
        expect(wrapper.find('FormCheck').at(0)).toHaveLength(0);
        expect(wrapper.find('FormCheck').at(1)).toHaveLength(0);
        expect(wrapper.find('FormCheck').at(2)).toHaveLength(0);
    });

    it('has an input text field', () => {
        expect(wrapper.find('#searchInput')).toHaveLength(1);
        expect(wrapper.find('#searchInput').prop('placeholder')).toEqual('Type something...');
    });
});

describe('SearchModal component (user signed in)', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<SearchModal session={true} {...props} />);
    });

    it('has a close button', () => {               
        expect(wrapper.find('ModalHeader').prop('closeButton')).toBe(true);
    });

    it('has a title', () => {
        expect(wrapper.find('ModalTitle')).toHaveLength(1);
        expect(wrapper.find('ModalTitle').text()).toEqual(props.title);
    });

    it('has three radio buttons for All, My Opinions and Favorites', () => {
        expect(wrapper.find('FormCheck').at(0).prop('label')).toEqual('All');
        expect(wrapper.find('FormCheck').at(1).prop('label')).toEqual('My opinions');
        expect(wrapper.find('FormCheck').at(2).prop('label')).toEqual('Favorites');
    });

    it('has All radio button checked for default', () => {
        expect(wrapper.find('FormCheck').at(0).prop('checked')).toBe(true);
        expect(wrapper.find('FormCheck').at(1).prop('checked')).toBe(false);
        expect(wrapper.find('FormCheck').at(2).prop('checked')).toBe(false);
    });

    it('has an input text field', () => {
        expect(wrapper.find('#searchInput')).toHaveLength(1);
        expect(wrapper.find('#searchInput').prop('placeholder')).toEqual('Type something...');
    });

    it('submits modal on search click', () => {        
        wrapper.find({ type: 'submit' }).simulate('click');
        expect(props.searchOpinion).toHaveBeenCalled();
    });    
});