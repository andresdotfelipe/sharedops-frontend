import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { signIn } from '../actions/users';
import SignInForm from '../forms/SignInForm';

const SignIn = () => {
    
    const unauthenticated = useSelector(state => state.UserReducer.unauthenticated);

    const dispatch = useDispatch();

    const handleSubmitSignIn = data => {
        dispatch(signIn(data));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!unauthenticated) return <Redirect to={{ pathname: '/' }} />

    return (
        <>            
            <Container className="sign-in">
                <Row className="justify-content-center">
                    <Col xs={12} className="sign-in-form">
                        <SignInForm submitSignIn={handleSubmitSignIn} />
                    </Col>
                </Row>            
            </Container>                       
        </>
    );
};

export default SignIn;