import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { updateUserFavoriteOpinions } from '../actions/users';
import { setOpinion, getOpinions } from '../actions/opinions';
import ConfirmationModal from './ConfirmationModal';

const OpinionsContainer = ({ initialMessage, opinions, pageCount, currentCount, totalCount, type }) => {

    window.onunload = () => {
        window.scrollTo(0, 0);
    };        

    const [isFetching, setIsFetching] = useState(false);
    const [isHalfPage, setIsHalfPage] = useState(false);
    const [showConfirmation, setShowConfirmation] = useState(false);
    
    const history = useHistory();

    const { session, darkTheme, user, opinion } = useSelector(state => ({
        session: state.UserReducer.session,
        darkTheme: state.UserReducer.darkTheme,
        user: state.UserReducer.user, 
        opinion: state.OpinionReducer.opinion
    }));

    const dispatch = useDispatch();    

    const loadOnScroll = useCallback(
        e => {
            window.pageYOffset > 3572 ? setIsHalfPage(true) : setIsHalfPage(false);
            if (currentCount === totalCount) return;            
            const opinionsEnd = document.getElementById('opinions-end');            
            const rect = opinionsEnd.getBoundingClientRect();
            const isAtEnd = (
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
                rect.right <= (window.innerWidth || document.documentElement.clientWidth) 
            );            
            if (isAtEnd) {                
                if (isFetching) return;                  
                setIsFetching(true);
                const data = {
                    filter: `page=${pageCount}`,
                    type
                };                                
                dispatch(getOpinions(data));
                setIsFetching(false);
            }            
        },
        [dispatch, pageCount, type, totalCount, currentCount, isFetching]
    );

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
            history.push('/signin');            
        } else {                        
            if (history.location.pathname === '/favorites') {                
                dispatch(setOpinion(opinion));
                if (confirmation) dispatch(updateUserFavoriteOpinions(opinion._id));
                handleShowConfirmation();                    
            } else {
                dispatch(updateUserFavoriteOpinions(opinion._id));
            }            
        } 
    };
    
    const handleBackToTop = () => {
        window.scrollTo(0, 0);
    };

    useEffect(() => {        
        window.scrollTo(0, 0);        
    }, []);

    useEffect(() => {        
        if (opinions.length === 0) {
            const data = {
                filter: `page=${pageCount}&type=${type}`,
                type
            };            
            dispatch(getOpinions(data));
        } else {                   
            window.addEventListener('scroll', loadOnScroll);
        }                       
        return () => {                        
            window.removeEventListener('scroll', loadOnScroll);            
        };
    }, [dispatch, pageCount, type, opinions, loadOnScroll]);
    
    return (        
        <Container className="opinions-container">
            <Row className={`${darkTheme ? 'dark' : 'light'}`}>
                <Col xs={12} className="initial-message">
                    <span>{initialMessage}</span>
                </Col>
                {
                    opinions ?
                    <Row className="opinions-grid">
                        {
                            opinions.map(opinion => {
                                return (
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
                                                <Button 
                                                    className={
                                                        user ? 
                                                        `${user.favoriteOpinions.some(e => e === opinion._id) ? 
                                                            'favorite-checked' : 'favorite-unchecked'}` 
                                                        : 'favorite-unchecked'
                                                    }
                                                    onClick={e => handleFavorites(e, opinion)}>
                                                    <i className="fas fa-star"></i>
                                                </Button>                                                    
                                                <Button className="comment">
                                                    <i className="fas fa-comments"></i>
                                                </Button>
                                            </Col>                                                                                       
                                        </Row>                                                                                                                        
                                    </Col>
                                );
                            })
                        }
                    </Row> :
                    <Col xs={12} className="resource-not-found">
                        <span>No opinions</span>
                    </Col>

                }
                {
                    (currentCount !== totalCount) ?
                    <Col xs={12} id="opinions-end">
                        <Spinner
                            as="span"
                            animation="grow"                        
                            role="status"
                            aria-hidden="true"
                        />
                    </Col> : null
                }
                {
                    isHalfPage &&
                    <Col xs={12} className="up-arrow">                        
                        <i className="fas fa-arrow-circle-up" onClick={handleBackToTop}></i>                    
                    </Col>
                }
                {
                    opinion &&
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
    );
};

export default OpinionsContainer;