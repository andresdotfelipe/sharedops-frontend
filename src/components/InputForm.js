import React from 'react';
import { Col, Form } from 'react-bootstrap';

const adaptFileEventToValue = handler =>  async ({ target: { files } }) => {    
    try {
        if (files[0]) {
            const header = await getFileHeader(files[0]);
            handler({ file: files[0], name: files[0].name, header });
        }
    } catch (e) {
        console.warn(e.message)
        handler(null);
    }        
};

const getFileHeader = blob => {    
    let fileReader = new FileReader();
    return new Promise((resolve, reject) => {    
        fileReader.onloadend = e => {
            /*                
                The array buffer created by the FileReader instance
                is a generic way to represent a binary buffer. So
                a TypedArray is necessary, in this case, a
                a Uint8Array with the first 4 elements. 
            */
            let arr = (new Uint8Array(e.target.result)).subarray(0, 4);
            let header = '';            
            //  Retrieves every byte and transforms it to hexadecimal.            
            for (let i = 0; i < arr.length; i++) {
                header += arr[i].toString(16);
            }
            resolve(header);
        };
        fileReader.readAsArrayBuffer(blob);
    });        
};

const InputForm = ({
    meta: { error, touched },
    input: { name, value, onChange, onBlur },
    label, type, ph, as, rows, disabled
}) => {                
    
    return (
        <>  
            <Form.Group as={Col} md="12">
                {
                    label &&
                    <Form.Label>
                        {label}
                    </Form.Label>
                }                                                                                                      
                {
                    type === 'file' ?
                    <Form.Control
                        isInvalid={error && touched}
                        isValid={!error && touched}
                        name={name} 
                        type={type}                            
                        onChange={adaptFileEventToValue(onChange)}        
                        onBlur={adaptFileEventToValue(onBlur)}
                    /> :
                    <Form.Control
                        isInvalid={error && touched}
                        isValid={!error && touched}
                        name={name} 
                        type={type}
                        value={value}
                        placeholder={ph}
                        as={as}
                        rows={rows}
                        disabled={disabled}
                        onChange={onChange}        
                        onBlur={onBlur}
                    />     
                }                                                                   
                <Form.Control.Feedback type="invalid">
                    {error}
                </Form.Control.Feedback>  
            </Form.Group>
        </>
    );
};

export default InputForm;