import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import InputForm from '../components/InputForm';

const SignUpForm = ({ submitSignUp, handleSubmit }) => {

    const { submitting, darkTheme } = useSelector(state => ({
        submitting: state.UserReducer.submitting,
        darkTheme: state.UserReducer.darkTheme
    }));

    return (                
        <Fragment>
            <Row className="justify-content-center justify-content-lg-start">                                
                <Col className="form">
                    <Form className={`${darkTheme ? 'dark' : 'light'}`}>
                        <Form.Text className="form-title">Sign up</Form.Text>
                        <Form.Row>                                                                                                                       
                            <Field name={'name'} component={InputForm} ph={'Username'} type={'text'} />                                                                                                                      
                        </Form.Row>          
                        <Form.Row>
                            <Field name={'password'} component={InputForm} ph={'Password'} type={'password'} />
                        </Form.Row>
                        <Form.Row>
                            <Field name={'confirmPassword'} component={InputForm} ph={'Confirm password'} type={'password'} />
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
                            <Button type="submit" onClick={handleSubmit(submitSignUp)}>Next</Button>                
                        }                                              
                        <Form.Text className="text-link">Already have an account? <Link to="/signin">Sign in</Link> </Form.Text>
                    </Form>                                                        
                </Col>                
            </Row>            
        </Fragment>
    );
};

const validate = values => {
    
    const errors = {};    
    
    if (!values.name || values.name.trim().length === 0) {
        errors.name = 'Username is required';
    } else if (values.name.length > 50) {
        errors.name = 'Username must not be longer than 50 characters'
    }

    if (!values.password || values.password.trim().length === 0) {
        errors.password = 'Password is required';
    } else if (values.password.length < 6) {
        errors.password = 'Password must be at least 6 characters long';
    }

    if (!values.confirmPassword || !values.confirmPassword.trim().length === 0) {
        errors.confirmPassword = 'Password confirmation is required';
    }
    
    return errors;
};

export default reduxForm({ form: 'SignUpForm', validate })(SignUpForm);