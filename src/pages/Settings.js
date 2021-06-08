import React, { useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Alert, Button, Col, Container, Row } from 'react-bootstrap';
import { updateUser, setSuccess } from '../actions/users';
import SettingsForm from '../forms/SettingsForm';

const Settings = () => {

    const [showAlert, setShowAlert] = useState(false);

    const { session, user, success, error } = useSelector(state => ({
        session: state.UserReducer.session,
        user: state.UserReducer.user,
        success: state.UserReducer.success,
        error: state.UserReducer.error
    }));
    
    const history = useHistory();

    const dispatch = useDispatch();    

    const handleCheckProfileClick = () => {
        history.push(`/user/${user._id}`);
    };
    
    const handleSubmitSettings = data => {        
        dispatch(updateUser(data));                
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (success) {
            setShowAlert(true);
            const hideAlert = () => { setShowAlert(false); dispatch(setSuccess(false)); };
            setTimeout(function(){ hideAlert() }, 2700);            
        }
    }, [success, dispatch]);

    if (!session) return <Redirect to={{ pathname: '/' }} />

    return (
        <>
            <Container className="settings">
                {
                    user &&
                    <Row className="justify-content-center">
                        <Col xs={12}>
                            <Button className="check-profile" onClick={handleCheckProfileClick}>
                                Check profile
                            </Button>
                        </Col>                        
                        <Col xs={12} className="settings-form">
                            <SettingsForm
                                initialValues={{ name: user.name, description: user.description }}
                                user={user}
                                submitSettings={handleSubmitSettings}
                            />
                        </Col>
                        {
                            (success && !error && showAlert) &&
                            <Col xs={12} className="mt-5">
                                <Alert variant="success">
                                    {success}                                        
                                </Alert>
                            </Col>
                        }
                    </Row>                    
                }                
            </Container>
        </>
    );
};

export default Settings;