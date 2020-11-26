import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { Col, Container, Row } from 'react-bootstrap';
import { getOpinion } from '../actions/opinions';
import { getComments } from '../actions/comments';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Comments = () => {

    const opinion = useSelector(state => state.OpinionReducer.opinion);
    const history = useHistory();    

    const { opinionId } = useParams();

    const dispatch = useDispatch();

    useEffect(() => {
        if (!opinion) {
            dispatch(getOpinion(opinionId));            
        } else {
            history.replace(`/comments/${opinion._id}/${opinion.title}`, undefined);
        }                
    }, [dispatch, opinion, opinionId, history]);

    return (
        <Fragment>
            <Header />
            <Container className="comments">                
                {
                    opinion &&
                    <Row className="justify-content-center">                        
                        <Col xs={12}>
                            {opinion.title}
                        </Col>
                        <Col xs={12}>
                            {opinion.body}
                        </Col>                             
                    </Row>
                }                
            </Container>
            <Footer />
        </Fragment>
    )
};

export default Comments;