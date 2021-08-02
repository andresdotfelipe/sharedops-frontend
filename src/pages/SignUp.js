import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { signUp } from '../actions/users';
import SignUpForm from '../forms/SignUpForm';
import OpinionsImg from '../assets/images/opinions.svg';
import OpinionsImgDarkTheme from '../assets/images/opinions-dark-theme.svg';

const SignUp = () => {

    const { unauthenticated, darkTheme } = useSelector(state => ({
        unauthenticated: state.UserReducer.unauthenticated,
        darkTheme: state.UserReducer.darkTheme
    }));    

    const dispatch = useDispatch();

    const handleSubmitSignUp = data => {                
        dispatch(signUp(data));
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    if (!unauthenticated) return <Redirect to={{ pathname: '/' }} />            

    return (
        <Fragment>            
            <Container className="sign-up">
                <Row className={`${darkTheme && 'dark'} justify-content-center`}>                                    
                    <Col xs={12} md={6} className="hero">
                        <h2>Join Sharedops</h2>
                        <p>When you join Sharedops you can share what you think, see other people
                        thoughts and opine about them.
                        </p>                            
                        <div className="opinions-img">
                            <img src={darkTheme ? OpinionsImgDarkTheme : OpinionsImg} alt="Opinions" />
                        </div>                                                    
                    </Col>
                    <Col xs={12} md={6} className="sign-up-form">
                        <SignUpForm submitSignUp={handleSubmitSignUp} />
                    </Col>                     
                </Row>
            </Container>                     
        </Fragment>
    );
};

export default SignUp;