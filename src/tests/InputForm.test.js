import React from 'react';
import renderer from 'react-test-renderer';
import InputForm from '../components/InputForm';

describe('InputForm component', () => {    
    
    const defaultProps = {
        meta: {
            error: false,
            touched: false
        },
        input: {
            name: 'name',
            value: 'value',
            onChange: jest.fn(),
            onBlur: jest.fn()
        },
        label: 'label',                
        disabled: false
    }    

    it('renders correctly when input is text', () => {
        const inputTextProps = {
            ...defaultProps, 
            type: 'text',
            ph: 'placeholder',
            disabled: false
        }
        const tree = renderer.create(<InputForm {...inputTextProps} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when input is textarea', () => {
        const inputTextAreaProps = {
            ...defaultProps, 
            as: 'textarea',
            rows: 10,
            ph: 'placeholder',
            disabled: false
        }
        const tree = renderer.create(<InputForm {...inputTextAreaProps} />).toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('renders correctly when input is file', () => {
        const inputFileProps = {
            ...defaultProps, 
            type: 'file',                        
            disabled: false
        }
        const tree = renderer.create(<InputForm {...inputFileProps} />).toJSON();
        expect(tree).toMatchSnapshot();
    });
});