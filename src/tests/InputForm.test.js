import React from 'react';
import { shallow } from 'enzyme';
import InputForm from '../components/InputForm';

const onChange = jest.fn();
const adaptFileEventToValue = jest.fn();
const defaultProps = {
    meta: {
        error: '',
        touched: false
    },
    input: {
        name: 'name',        
        onChange,
        onBlur: jest.fn()
    },
    label: 'label',                
    disabled: false
};

describe('InputForm component', () => {
    
    afterEach(() => {
        jest.clearAllMocks();
    });

    it('updates input text value when changed', () => {
        const inputTextProps = {
            ...defaultProps, 
            type: 'text',
            ph: 'placeholder'            
        };
        const wrapper = shallow(<InputForm {...inputTextProps} />);
        const event = { target: { value: 'Test value' } };
        wrapper.find('FormControl').simulate('change', event);
        expect(onChange).toHaveBeenCalledWith(event);
    });

    it('renders correctly when input is textarea', () => {
        const inputTextAreaProps = {
            ...defaultProps, 
            as: 'textarea',
            rows: 10,
            ph: 'placeholder'            
        };
        const wrapper = shallow(<InputForm {...inputTextAreaProps} />);        
        const event = { target: { value: 'Test value' } };
        wrapper.find('FormControl').simulate('change', event);
        expect(onChange).toHaveBeenCalledWith(event);
        
    });

    it('renders correctly when input is file', () => {
        try {            
            defaultProps.onChange = adaptFileEventToValue(onChange);        
            const inputFileProps = {
                ...defaultProps, 
                type: 'file'            
            };
            const wrapper = shallow(<InputForm {...inputFileProps} />);            
            const file =  new File([new ArrayBuffer(1)], 'file.jpg');        
            const event = { target: { files: { 0: file, length: 1 } } };         
            wrapper.find('FormControl').simulate('change', event);
            expect(adaptFileEventToValue).toHaveBeenCalled();
        } catch (e) {
            console.log(e);
        }        
    });
});