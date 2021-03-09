import React from 'react';
import { useSelector } from 'react-redux';
import { Button, Container, Modal, Row } from 'react-bootstrap';

const ConfirmationModal = ({ title, msg, confirmation, show, onHide }) => {

    const darkTheme = useSelector(state => state.UserReducer.darkTheme);

    const modalProps = {
        show,
        onHide
    };

    return (
        <Modal {...modalProps} className="confirmation-modal" size="lg" show={show} aria-labelledby="contained-modal-title-vcenter" centered>            
            <div className={`${darkTheme && 'dark'}`}>
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className="show-grid justify-content-center">                        
                            <span>{msg}</span>
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