import React from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import NotFoundSVG from '../assets/images/not-found.svg';
import NotFoundDarkSVG from '../assets/images/not-found-dark.svg';

const NotFound = () => {

    const { darkTheme } = useSelector(state => ({
        darkTheme: state.UserReducer.darkTheme
    }));

    const history = useHistory();

    const handleOnClick = () => {
        history.push('/');        
    };

    return (
        <>        
            <Container className="not-found">
                <Row>
                    <Col>
                        <Row>
                            <Col xs={12}>
                                {
                                    darkTheme ?
                                    <img width="150px" height="150px" src={NotFoundDarkSVG} alt={'Not Found'}/>
                                    :
                                    <img width="150px" height="150px" src={NotFoundSVG} alt={'Not Found'}/>
                                }                                
                            </Col>
                            <Col xs={12}>
                                <span>NOT FOUND</span>
                            </Col>                            
                            <Col xs={12}>
                                <p>This page does not exist</p>
                            </Col>
                            <Col xs={12}>
                                <Button onClick={handleOnClick}>Go to main page</Button>
                            </Col>
                        </Row>                                                                                                
                    </Col>
                </Row>                                                    
            </Container>
        </>        
    );
};

export default NotFound;