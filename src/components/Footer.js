import React from 'react';
import { useSelector } from 'react-redux';
import { Col, Container, Row } from 'react-bootstrap';

const Footer = () => {
    
    const darkTheme = useSelector(state => state.UserReducer.darkTheme);

    return (
        <Container className="footer">
            <Row className={`${darkTheme ? 'dark' : 'light'}`}>
                <Col>
                    <a href={'https://github.com/andresdotfelipe'} target={'_blank'} rel={'noopener noreferrer'}>
                        <span>Created by Andrés Felipe Pérez Rodríguez</span>
                        <i className="fas fa-external-link-alt"></i>
                    </a>
                </Col>            
            </Row>   
        </Container>            
    );
};

export default Footer;