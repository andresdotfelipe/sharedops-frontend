import React, { Fragment, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { updateUserFavoriteOpinions  } from '../actions/users';
import { setOpinion, getOpinion } from '../actions/opinions';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ConfirmationModal from '../components/ConfirmationModal';

const Random = () => {

    const [showConfirmation, setShowConfirmation] = useState(false);

    const history = useHistory();

    const { session, darkTheme, user, opinion } = useSelector(state => ({    
        session: state.UserReducer.session,
        darkTheme: state.UserReducer.darkTheme,         
        user: state.UserReducer.user,
        opinion: state.OpinionReducer.opinion
    }));

    const dispatch = useDispatch();

    const handleClickOpinion = opinion => {
        dispatch(setOpinion(opinion));
        history.push(`/comments/${opinion._id}/${opinion.title}`);
    };

    const handleShowConfirmation = () => {
        setShowConfirmation(!showConfirmation);
    };

    const handleFavorites = (e, opinion, confirmation = undefined) => {        
        e.stopPropagation();
        if (!session) {
            window.location = `/signin`
        } else {                                    
            dispatch(setOpinion(opinion));
            handleShowConfirmation();
            if (confirmation) dispatch(updateUserFavoriteOpinions(opinion._id));
            handleShowConfirmation();
        } 
    };

    useEffect(() => {
        dispatch(getOpinion('random'));
    }, [dispatch]);

    return (
        <Fragment>
            <Header />
            <Container className="opinions-container">
                <Row className={`${darkTheme ? 'dark' : 'light'}`}>
                    <Col xs={12} className="initial-message">
                        <span>Random opinion delivered!</span>
                    </Col>
                    <Col xs={12}>
                        <Button className="random" onClick={() => dispatch(getOpinion('random')) }>
                            Gimme another one
                        </Button>
                    </Col>
                    {
                        opinion ?
                        <Row className="opinions-grid">                                                                                        
                            <Col 
                                key={opinion._id} 
                                xs={12} tabIndex={'0'} 
                                className="opinion-box"
                                onClick={() => handleClickOpinion(opinion)}>
                                <Row>
                                    <Col xs={12} className="details">
                                        <span className="name">
                                            Opinion by <Link 
                                                to="/signup" 
                                                onClick={e => e.stopPropagation()}>
                                                    {opinion.author.name}
                                                    <img 
                                                        src={opinion.author.profilePicUrl}                                                    
                                                        alt={opinion.author.name}
                                                        className="profile-pic"
                                                    /> 
                                            </Link>
                                        </span>                                                                                                       
                                        <span className="date">
                                            on {opinion.createdAt}
                                        </span>
                                    </Col>
                                    <Col xs={12} className="title">
                                        <Link to={`/comments/${opinion._id}/${opinion.title}`}>
                                            {opinion.title}
                                        </Link>
                                    </Col>
                                    {
                                        opinion.opinionImageUrl &&
                                        <Col xs={12}>
                                            <img 
                                                src={opinion.opinionImageUrl}
                                                alt={opinion.title}
                                                className="opinion-img"
                                            />
                                        </Col>
                                    }                                                
                                    <Col xs={12} className="body">
                                        {opinion.body}
                                    </Col>
                                    <Col xs={12} className="options">
                                        {
                                            user ?
                                            <Button 
                                                className={`${user.favoriteOpinions.some(e => e === opinion._id) ? 
                                                    'favorite-checked' : 'favorite-unchecked'}`
                                                }
                                                onClick={e => handleFavorites(e, opinion)}>
                                                <i className="fas fa-star"></i>
                                            </Button> :
                                            <Button 
                                                className="favorite-unchecked"
                                                onClick={handleFavorites}>
                                                <i className="fas fa-star"></i>
                                            </Button>
                                        }                                                    
                                        <Button className="comment">
                                            <i className="fas fa-comments"></i>
                                        </Button>
                                    </Col>                                                                                       
                                </Row>                                                                                                                        
                            </Col>                                                                                        
                        </Row> :
                        <Col xs={12} className="resource-not-found">
                            <span>No opinion</span>
                        </Col>
                    }                    
                    {
                        showConfirmation &&
                        <ConfirmationModal 
                            title={'Remove favorite opinion'} 
                            msg={`Remove favorite opinion "${opinion.title}"?`} 
                            confirmation={(e, confirmation) => handleFavorites(e, opinion, confirmation)} 
                            show={showConfirmation} 
                            onHide={handleShowConfirmation} 
                        />                 
                    }                
                </Row>
            </Container>
            <Footer />
        </Fragment>
    );
};

export default Random;