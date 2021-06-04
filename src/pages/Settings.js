import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';
import { updateUser } from '../actions/users';
import SettingsForm from '../forms/SettingsForm';

const Settings = () => {

    const { session, user } = useSelector(state => ({
        session: state.UserReducer.session,
        user: state.UserReducer.user     
    }));
    

    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const handleSubmitSettings = data => {        
        dispatch(updateUser(data));
        // window.location = '/settings';
    };

    if (!session) return <Redirect to={{ pathname: '/' }} />

    return (
        <>
            <Container className="settings">
                {
                    user &&
                    <Row className="justify-content-center">
                        <Col xs={12} className="settings-form">
                          <SettingsForm
                                initialValues={{ name: user.name, description: user.description }}
                                user={user}
                                submitSettings={handleSubmitSettings}
                            />
                        </Col>
                    </Row>                    
                }                
            </Container>
        </>
    );
};

export default Settings;