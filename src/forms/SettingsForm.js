import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import { Button, Col, Form, Image, Row, Spinner } from 'react-bootstrap';
import InputForm from '../components/InputForm';

let userProp;

const SettingsForm = ({ user, submitSettings, handleSubmit }) => {

    userProp = user;

    const { submitting, darkTheme } = useSelector(state => ({
        submitting: state.UserReducer.submitting,
        darkTheme: state.UserReducer.darkTheme
    }));

    return (                
        <Fragment>
            <Row className="justify-content-center justify-content-lg-start">                                
                <Col className="form">
                    <Form className={`${darkTheme ? 'dark' : 'light'}`}>
                        <Form.Text className="form-title">Settings</Form.Text>
                        <Form.Row>                            
                            {
                                user &&
                                <>                                    
                                    <div className="image-container">                                        
                                        <Image
                                            alt={`${user.name}`}
                                            src={user.profilePicUrl}
                                            thumbnail
                                        />
                                    </div>
                                    <Field name={'file'} label={'Profile picture'}  component={InputForm} type={'file'} />
                                </> 
                            }
                        </Form.Row> 
                        <Form.Row>                                                                                                                       
                            <Field name={'name'} label={'Username'} type={'text'} component={InputForm}  />                                                                                                                      
                        </Form.Row>          
                        <Form.Row>
                            <Field name={'description'} label={'Description (optional)'} as={'textarea'} rows={4} component={InputForm}/>
                        </Form.Row>
                        <Form.Row>
                            <Field name={'password'} label={'Current password'} type={'password'} component={InputForm}/>
                        </Form.Row>
                        <Form.Row>
                            <Field name={'newPassword'} label={'New password'} type={'password'} component={InputForm}/>
                        </Form.Row> 
                        <Form.Row>
                            <Field name={'confirmNewPassword'} label={'Confirm new password'} type={'password'} component={InputForm}/>
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
                            <Button type="submit" onClick={handleSubmit(submitSettings)}>Update</Button>                
                        }                                                                      
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
        errors.name = 'Username must not be longer than 50 characters';
    }

    if (values.description) {
        if (values.description.length > 280) {
            errors.description = 'Description must not be longer than 280 characters';
        }
    }

    if (values.password) {
        if (values.password.trim().length > 0) {
            if (values.password.length < 6) {
                errors.password = 'Password must be at least 6 characters long';
            } 
            if (!values.newPassword || !values.newPassword.trim().length === 0) {
                errors.newPassword = 'New password is required';
            } else if (values.newPassword.length < 6) {
                errors.newPassword = 'New password must be at least 6 characters long';
            } 
            if (!values.confirmNewPassword || !values.confirmNewPassword.trim().length === 0) {
                errors.confirmNewPassword = 'New password confirmation is required';
            } else if (values.confirmNewPassword.length < 6) {
                errors.conFirmNewPassword = 'New password confirmation must be at least 6 characters long';
            }        
        }
    }   
    
    return errors;
};

export default reduxForm({ form: 'SettingsForm', validate })(SettingsForm);