import React  from 'react';
import { Button, Col, Container, Form, Modal, Row } from 'react-bootstrap';

const SearchModal = ({ darkTheme, title, session, onChangeSearch, checkedSearchOption, search, searchOpinion, show, onHide }) => {            

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
                                <Form>
                                    {
                                        session &&
                                        <Row>                                            
                                            {
                                                ['All', 'My opinions', 'Favorites'].map((type, index) => (
                                                    <div key={index} className="mb-3">                                                    
                                                        <Form.Check
                                                            inline 
                                                            label={type}
                                                            checked={type === checkedSearchOption}
                                                            name={'options'} 
                                                            type={'radio'} 
                                                            id={type}
                                                            onChange={onChangeSearch} 
                                                        />                                                              
                                                    </div>
                                                ))
                                            }                                                                                                                                            
                                        </Row>
                                    }
                                    <Row>
                                        <Form.Control 
                                            type={'text'}
                                            placeholder={'Type something...'}
                                            value={search}
                                            id={'searchInput'}
                                            onChange={onChangeSearch}
                                        />
                                    </Row>
                                </Form>
                            </Col>                                                    
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" disabled={search === ''} onClick={searchOpinion}>
                        Search
                    </Button>                    
                </Modal.Footer> 
            </div>       
        </Modal>
    );
};

export default SearchModal;