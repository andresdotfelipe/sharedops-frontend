import React, { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { reset } from 'redux-form';
import { Col, Container, Row } from 'react-bootstrap';
import { createOpinion } from '../actions/opinions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OpinionForm from '../forms/OpinionForm';

const CreateOpinion = () => {

    const session = useSelector(state => state.UserReducer.session);

    const dispatch = useDispatch();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    
    const handleSubmitOpinion = data => {
        dispatch(createOpinion(data));
        dispatch(reset('OpinionForm'));
    };

    if (!session) return <Redirect to={{ pathname: '/' }} />

    return (
        <Fragment>
            <Header />
            <Container className="create-opinion">
                <Row className="justify-content-center">
                    <Col xs={12} className="create-opinion-form">
                        <OpinionForm submitOpinion={handleSubmitOpinion} />
                    </Col>
                </Row>
            </Container>            
            <Footer />
        </Fragment>
    );
};

export default CreateOpinion;