import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../actions/users';
import { setUserOpinions, setUserOpinionsPageCount, setUserOpinionsCurrentCount, setUserOpinionsTotalCount } from '../actions/opinions';
import { Col, Container, Row } from 'react-bootstrap';
import OpinionsContainer from '../components/OpinionsContainer';

const User = () => {   
    
    const dispatch = useDispatch();

    const { userId } = useParams();

    const { darkTheme, userProfile, userOpinions, userOpinionsPageCount, userOpinionsCurrentCount, userOpinionsTotalCount } = useSelector(state => ({
        darkTheme: state.UserReducer.darkTheme,        
        userProfile: state.UserReducer.userProfile,
        userOpinions: state.OpinionReducer.userOpinions,
        userOpinionsPageCount: state.OpinionReducer.userOpinionsPageCount,
        userOpinionsCurrentCount: state.OpinionReducer.userOpinionsCurrentCount,
        userOpinionsTotalCount: state.OpinionReducer.userOpinionsTotalCount
    }));
    
    const props = {
        initialMessage: 'Shared opinions',
        opinions: userOpinions,
        pageCount: userOpinionsPageCount,
        currentCount: userOpinionsCurrentCount,
        totalCount: userOpinionsTotalCount,
        type: 'userOpinions',
        userId
    };

    useEffect(() => {                
        dispatch(getUserProfile(userId));          
        dispatch(setUserOpinions([]));
        dispatch(setUserOpinionsPageCount(0));
        dispatch(setUserOpinionsCurrentCount(0));
        dispatch(setUserOpinionsTotalCount(null));
    }, [userId]);

    return (
        <>  
            <Container className="user">
                <Row className={`${darkTheme ? 'dark' : 'light'}`}>                                    
                    {
                        userProfile &&
                        <Row className="profile mx-auto">
                            <Col xs="12" sm="auto" className="profile-picture">
                                <img src={userProfile.profilePicUrl} alt={userProfile.name} />
                            </Col>
                            <Col>
                                <Row>
                                    <Col xs={12} className="name">
                                        <span>{userProfile.name}</span>
                                    </Col>
                                    <Col xs={12} className="description">
                                        <span>{userProfile.description}</span>
                                    </Col>
                                    <Col xs={12} className="registration-date">
                                        <span>Joined on {userProfile.createdAt}</span>
                                    </Col>
                                </Row>                                                                                
                            </Col>                        
                        </Row>
                    }                       
                    <OpinionsContainer {...props} />                 
                </Row>
            </Container>                      
        </>
    );
};

export default User;