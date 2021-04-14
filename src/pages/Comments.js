import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { updateUserFavoriteOpinions } from '../actions/users';
import { getOpinion } from '../actions/opinions';
import { getComments, createComment } from '../actions/comments';
import { Form } from 'react-bootstrap';

const Comments = () => {
    
    const [commentBody, setCommentBody] = useState('');

    const { session, darkTheme, user, opinion, comments } = useSelector(state => ({
        session: state.UserReducer.session,
        darkTheme: state.UserReducer.darkTheme,
        user: state.UserReducer.user,
        opinion: state.OpinionReducer.opinion,
        comments: state.CommentReducer.comments       
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

    const onChangeCommentBody = e => {
        setCommentBody(e.target.value);
    };

    const postComment = e => {
        e.preventDefault();
        const data = { body: commentBody, opinionId: opinion._id };
        dispatch(createComment(data));
        setCommentBody('');
    };

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        if (!opinion) {
            dispatch(getOpinion(opinionId));            
        } else {
            history.replace(`/comments/${opinion._id}/${opinion.title}`, undefined);
            dispatch(getComments(opinion._id));
        }        
    }, [dispatch, opinion, opinionId, history]);

    return (
        <>            
            <Container className="comments">      
                <Row className={`${darkTheme ? 'dark' : 'light'} justify-content-center`}>             
                    {
                        opinion &&
                        <Col>
                            <Row className="opinions-grid">
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
                            {
                                session ?
                                <Row className="comment-form mx-auto">
                                    <Col xs={12}>
                                        <span className="warning-message">
                                            {`Warning! You are commenting as "${user.name}"`}
                                        </span>                                        
                                    </Col>                                    
                                    <Col xs={12}>
                                        <Form>
                                            <Form.Row>
                                                <Form.Control
                                                    as={'textarea'}
                                                    placeholder={'Write your comment here...'}
                                                    value={commentBody}
                                                    id={'comment-textarea'}
                                                    onChange={onChangeCommentBody}>
                                                </Form.Control>
                                            </Form.Row>
                                            <Form.Row className="justify-content-center">
                                                <Button 
                                                    type="submit"                                                    
                                                    className="post-comment-button"
                                                    disabled={commentBody === ''}
                                                    onClick={postComment}>
                                                    Post comment
                                                </Button>
                                            </Form.Row>
                                        </Form>
                                    </Col>
                                </Row> :
                                <Row className="authenticate-banner justify-content-center mx-auto">
                                    <span>
                                        If you want to post comments, please <Link to="/signin">sign in</Link> or <Link to="/signup">sign up</Link>.
                                    </span>
                                </Row> 
                            }                            
                            <Row className="divider mx-auto">                                
                                <hr className="my-auto flex-grow-1" />
                                <div className="px-4">{`Comments (${comments.length})`}</div>
                                <hr className="my-auto flex-grow-1" />
                            </Row>
                            {
                                comments.length > 0 ?
                                <Row className="comments-list mx-auto">
                                    {
                                        comments.map(comment => {
                                            return (
                                                <span>{comment.body}</span>
                                            )
                                        })
                                    }
                                </Row> : 
                                <Row className="mx-auto mt-3">
                                    No comments
                                </Row>
                            }
                        </Col>
                    }
                </Row>                               
            </Container>            
        </>
    )
};

export default Comments;