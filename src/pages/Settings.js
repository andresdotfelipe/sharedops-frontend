import React, { useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { updateUser } from '../actions/users';
import SettingsForm from '../forms/SettingsForm';

const Settings = () => {

    const { session, user } = useSelector(state => ({
        session: state.UserReducer.session,
        user: state.UserReducer.user     
    }));
    
    const history = useHistory();

    const dispatch = useDispatch();    

    const handleCheckProfileClick = () => {
        history.push(`/user/${user._id}`);
    };
    
    const handleSubmitSettings = data => {        
        dispatch(updateUser(data));
        window.location = '/settings';
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

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
                    </Row>                    
                }                
            </Container>
        </>
    );
};

export default Settings;