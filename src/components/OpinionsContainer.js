import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { updateUserFavoriteOpinions } from '../actions/users';
import { setOpinion, getOpinions, getSearchOpinions } from '../actions/opinions';
import ConfirmationModal from './ConfirmationModal';

const OpinionsContainer = ({ initialMessage, opinions, pageCount, currentCount, totalCount, type, title = '', userId = undefined }) => {

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

    // Fetches upcoming opinions as the user scrolls down.
    const loadOnScroll = useCallback(
        e => {
            window.pageYOffset > 3572 ? setIsHalfPage(true) : setIsHalfPage(false);
            // If currentCount equals totalCount it means all opinions have been fetched.
            if (currentCount === totalCount) return;     
            const opinionsEnd = document.getElementById('opinions-end');            
            const rect = opinionsEnd.getBoundingClientRect();
            const isAtEnd = (
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
                rect.right <= (window.innerWidth || document.documentElement.clientWidth) 
            ); 
            // If user has reached the bottom of the page then start fetching opinions.
            if (isAtEnd) {                
                if (isFetching) return;                  
                setIsFetching(true);
                const data = {
                    filter: `page=${pageCount}`,
                    type
                };
                /*
                    If there's a title, it means it's a search opinions request.
                    Otherwise, first checks if there's userId. If there's userId it means
                    it's a user's opinions request. If there's no userId, then it searches for
                    opinions with just page filter.
                */
                if (title !== '') {
                    data.filter = `page=${pageCount}&title=${title}`;
                    dispatch(getSearchOpinions(data));
                } else {
                    if (userId) data.filter = `userId=${userId}&page=${pageCount}`;
                    dispatch(getOpinions(data));
                } 
                // Once fetching is done.               
                setIsFetching(false);
            }            
        },
        [dispatch, pageCount, type, title, userId, totalCount, currentCount, isFetching]
    );

    // Redirects to clicked opinion.
    const handleClickOpinion = opinion => {
        dispatch(setOpinion(opinion));
        history.push(`/comments/${opinion._id}/${opinion.title}`);
    };

    // Shows or closes user's selected favorite opinion delete confirmation modal.
    const handleShowConfirmation = () => {
        setShowConfirmation(!showConfirmation);
    };
    
    const handleFavorites = (e, opinion, confirmation = undefined) => {        
        e.stopPropagation(); 
        // If there's no session, redirect to sign in page.
        if (!session) {            
            history.push('/signin');            
        } else {                        
            /* 
                Deletes selected favorite opinion throug confirmation modal if user is in favorites page 
                and confirms to delete it.
                Otherwise, just add or remove favorite opinion without confirmation.
            */
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
                filter: `page=${pageCount}`,
                type
            };            
            if (title !== '') {
                data.filter = `page=${pageCount}&title=${title}`;
                dispatch(getSearchOpinions(data));
            } else {
                if (userId) data.filter = `userId=${userId}&page=${pageCount}`;
                dispatch(getOpinions(data));
            }                
        } else {                   
            window.addEventListener('scroll', loadOnScroll);
        }                       
        return () => {                        
            window.removeEventListener('scroll', loadOnScroll);            
        };
    }, [dispatch, pageCount, type, title, userId, opinions, loadOnScroll]);
    
    return (        
        <Container className="opinions-container">
            <Row className={`${darkTheme ? 'dark' : 'light'}`}>                
                {
                    opinions.length > 0 &&
                    <>
                        <Col xs={12} className="initial-message">
                            <span>{initialMessage}</span>
                        </Col>
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
                                                            to={`/user/${opinion.author._id}`}
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
                                                        /*
                                                            If opinion's id is in user's favorite opinions,
                                                            check the favorite button. Otherwise, uncheck it.
                                                            If there's no user signed in, uncheck the
                                                            favorite button.
                                                        */
                                                    }
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
                                                    {
                                                        /*
                                                            Check comment button if there are one or more
                                                            comments in opinion.
                                                        */
                                                    }                                             
                                                    <Button className={`${opinion.comments.length > 0 ? 'comment-checked' : 'comment'}`}>
                                                        {opinion.comments.length} 
                                                        <i className="fas fa-comments"></i>
                                                    </Button>
                                                </Col>                                                                                       
                                            </Row>                                                                                                                        
                                        </Col>
                                    );
                                })
                            }
                        </Row> 
                    </>    
                }                    
                {
                    /*
                        If opinions fetching is done and there are not opinions, show 'No opinions' text.
                    */
                    (currentCount === totalCount && opinions.length < 1) &&
                    <Col xs={12} className="resource-not-found">
                        <span>No opinions</span>
                    </Col> 
                }                                    
                {
                    /*
                        Show loading spinner if there are opinions to fetch.
                    */
                    currentCount !== totalCount &&
                    <Col xs={12} id="opinions-end">
                        <Spinner
                            as="span"
                            animation="grow"                        
                            role="status"
                            aria-hidden="true"
                        />
                    </Col>
                }
                {
                    /*
                        If user has scrolled down too much, show up arrow that scrolls to the top on click.
                    */
                    isHalfPage &&
                    <Col xs={12} className="up-arrow">                        
                        <i className="fas fa-arrow-circle-up" onClick={handleBackToTop}></i>                    
                    </Col>
                }
                {                    
                    opinion &&
                    <ConfirmationModal
                        darkTheme={darkTheme}
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