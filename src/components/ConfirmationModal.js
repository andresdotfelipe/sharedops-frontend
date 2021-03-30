import React from 'react';
import { Button, Col, Container, Modal, Row } from 'react-bootstrap';

const ConfirmationModal = ({ darkTheme, title, msg, confirmation, show, onHide }) => {    

    const modalProps = {
        show,
        onHide
    };

    return (
        <Modal {...modalProps} className="modal" size="lg" show={show} aria-labelledby="contained-modal-title-vcenter" centered>            
            <div className={`${darkTheme && 'dark'}`}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="show-grid">
                            <Col>
                                <span>{msg}</span>
                            </Col>                                                    
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" onClick={e => confirmation(e, true)}>Confirm</Button>
                    <Button variant="secondary" onClick={onHide}>Cancel</Button>
                </Modal.Footer> 
            </div>       
        </Modal>
    );
};

export default ConfirmationModal;