import React from 'react';
import { useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import InputForm from '../components/InputForm';

const OpinionForm = ({ submitOpinion, handleSubmit }) => {

    const { submitting, darkTheme } = useSelector(state => ({
        submitting: state.UserReducer.submitting,
        darkTheme: state.UserReducer.darkTheme
    }));

    return (
        <>
            <Row>
                <Col xs={12} className="form">
                    <Form className={`${darkTheme ? 'dark' : 'light'}`}>
                        <Form.Text className="form-title">Create new opinion</Form.Text>
                        <Form.Row>
                            <Field name={'title'} label={'Title'} type={'text'} component={InputForm} />
                        </Form.Row>
                        <Form.Row>
                            <Field 
                                name={'body'} 
                                label={'Opinion'}                                
                                as={'textarea'}
                                rows={10}
                                component={InputForm} 
                            />
                        </Form.Row>
                        <Form.Row>
                            <Field name={'file'} label={'Opinion image (optional)'} type={'file'} component={InputForm} />
                        </Form.Row>
                        {
                            submitting ?                                
                            <Button type="submit" disabled style={{ cursor: 'default' }}>
                                <Spinner
                                    as="span"
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />
                            </Button> :
                            <Button type="submit" onClick={handleSubmit(submitOpinion)}>Submit</Button>
                        }   
                    </Form>
                </Col>
            </Row>
        </>
    );

};

const validate = values => {

    const errors = {};

    if (!values.title || values.title.trim().length === 0) {
        errors.title = 'Opinion title is required';
    } else if (values.title.length > 100) {
        errors.title = 'Opinion title must be at most 100 characters long';
    }

    if (!values.body || values.body.trim().length === 0) {
        errors.body = 'Opinion body is required';
    }

    if (values.file) {
        let type = '';
        switch (values.file.header) {
            case '89504e47':
                type = 'image/png';  
                break;
            case '47494638':
                type = 'image/gif';
                break;
            case 'ffd8ffe0':
            case 'ffd8ffe1':
            case 'ffd8ffe2':
            case 'ffd8ffe3':
            case 'ffd8ffe8':
                type = 'image/jpeg';                               
                break;
            default:
                type = 'unknown';                
                break;
        }        
        if (type === 'unknown') {
            errors.file = 'Invalid image extension';
        }
    }
    
    return errors;
};

export default reduxForm({ form: 'OpinionForm', validate })(OpinionForm);