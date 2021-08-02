import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { updateUserFavoriteOpinions  } from '../actions/users';
import { setOpinion, getOpinion } from '../actions/opinions';

const Random = () => {    

    const history = useHistory();

    const { session, darkTheme, user, opinion } = useSelector(state => ({    
        session: state.UserReducer.session,
        darkTheme: state.UserReducer.darkTheme,         
        user: state.UserReducer.user,
        opinion: state.OpinionReducer.opinion
    }));

    const dispatch = useDispatch(); 

    // If there's no session, redirect to sign in page. Otherwise, update user's favorite opinions.
    const handleFavorites = (e, opinion) => {        
        e.stopPropagation();
        if (!session) {
            history.push('/signin');
        } else {                                                
            dispatch(updateUserFavoriteOpinions(opinion._id));            
        } 
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        dispatch(getOpinion('random'));
    }, [dispatch]);

    return (
        <>            
            <Container className="opinions-container">
                <Row className={`${darkTheme ? 'dark' : 'light'}`}>                    
                    {                        
                        opinion ?
                        <>
                            <Col xs={12} className="initial-message">
                                <span>Random opinion delivered!</span>
                            </Col>
                            <Col xs={12}>
                                <Button className="random" onClick={() => dispatch(getOpinion('random')) }>
                                    Gimme another one
                                </Button>
                            </Col>
                            <Row className="opinions-grid">                                                                                        
                                <Col xs={12}>
                                    <Link                                        
                                        to={`/comments/${opinion._id}/${opinion.title}`}
                                        onClick={() => dispatch(setOpinion(opinion))}
                                        className="opinion-link">
                                        <Row className="opinion-box">
                                            <Col xs={12} className="details">
                                                <span className="name">
                                                    Opinion by <object><Link 
                                                        to={`/user/${opinion.author._id}`} 
                                                        onClick={e => e.stopPropagation()}>
                                                            {opinion.author.name}
                                                            <img 
                                                                src={opinion.author.profilePicUrl}                                                    
                                                                alt={opinion.author.name}
                                                                className="profile-pic"
                                                            /> 
                                                    </Link></object>
                                                </span>                                                                                                       
                                                <span className="date">
                                                    on {opinion.createdAt}
                                                </span>
                                            </Col>
                                            <Col xs={12} className="title">
                                                <object>
                                                    <Link to={`/comments/${opinion._id}/${opinion.title}`}>
                                                        {opinion.title}
                                                    </Link>
                                                </object>
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
                                                <Button className={`${opinion.comments.length > 0 ? 'comment-checked' : 'comment'}`}>
                                                    {opinion.comments.length} 
                                                    <i className="fas fa-comments"></i>
                                                </Button>
                                            </Col>                                                                                       
                                        </Row>                                                                                                                        
                                    </Link>
                                </Col>                                                                                        
                            </Row> 
                        </> :
                        <Col xs={12} className="resource-not-found">
                            <span>No opinion</span>
                        </Col>
                    }
                </Row>
            </Container>            
        </>
    );
};

export default Random;