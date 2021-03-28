import React, { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { updateUserFavoriteOpinions } from '../actions/users';
import { getOpinion } from '../actions/opinions';
import { getComments } from '../actions/comments';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Comments = () => {

    const { session, darkTheme, user, opinion } = useSelector(state => ({
        session: state.UserReducer.session,
        darkTheme: state.UserReducer.darkTheme,
        user: state.UserReducer.user,
        opinion: state.OpinionReducer.opinion       
    }));
    
    const history = useHistory();    

    const { opinionId } = useParams();

    const dispatch = useDispatch();

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
                    <Row className={`${darkTheme ? 'dark' : 'light'} opinions-grid`}>
                        <Col xs={12} className="opinion-box">
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
                                    {opinion.title}
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
                    </Row>
                }                
            </Container>
            <Footer />
        </Fragment>
    )
};

export default Comments;