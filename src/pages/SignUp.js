import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { signUp } from '../actions/users';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SignUpForm from '../forms/SignUpForm';
import OpinionsImg from '../assets/images/opinions.jpg';

const SignUp = () => {

    const unauthenticated = useSelector(state => state.UserReducer.unauthenticated);

    const dispatch = useDispatch();

    const handleSubmitSignUp = data => {                
        dispatch(signUp(data));
    };

    if (!unauthenticated) return <Redirect to={{ pathname: '/' }} />            

    return (
        <Fragment>
            <Header />
            <Container className="sign-up">
                <Row className="justify-content-center">
                    <Col xs={12} md={6} className="hero">
                        <h2>Join Sharedops</h2>
                        <p>When you join Sharedops you can share what you think, see other people
                           thoughts and opine about them.
                        </p>
                        <div className="opinions-img">
                            <img src={OpinionsImg} alt="Opinions" />
                        </div>                        
                    </Col>
                    <Col xs={12} md={6} className="sign-up-form">
                        <SignUpForm submitSignUp={handleSubmitSignUp} />
                    </Col>                    
                </Row>            
            </Container>
            <Footer />            
        </Fragment>
    );
};

export default SignUp;