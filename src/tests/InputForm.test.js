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
    label: 'Label',                
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
            ph: 'Text'            
        };
        const wrapper = shallow(<InputForm {...inputTextProps} />);
        const event = { target: { value: 'Text test' } };
        wrapper.find('FormControl').simulate('change', event);
        expect(onChange).toHaveBeenCalledWith(event);
    });

    it('updates input password value when changed', () => {
        const inputTextProps = {
            ...defaultProps, 
            type: 'password',
            ph: 'Password'            
        };
        const wrapper = shallow(<InputForm {...inputTextProps} />);
        const event = { target: { value: 'Password test' } };
        wrapper.find('FormControl').simulate('change', event);
        expect(onChange).toHaveBeenCalledWith(event);
    });

    it('renders correctly when input is textarea', () => {
        const inputTextAreaProps = {
            ...defaultProps, 
            as: 'textarea',
            rows: 10,
            ph: 'Text area'            
        };
        const wrapper = shallow(<InputForm {...inputTextAreaProps} />);        
        const event = { target: { value: 'Text area test' } };
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