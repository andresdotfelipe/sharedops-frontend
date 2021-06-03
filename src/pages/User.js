import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getUserProfile } from '../actions/users';
import { setUserOpinions, setUserOpinionsPageCount, setUserOpinionsCurrentCount, setUserOpinionsTotalCount } from '../actions/opinions';
import { Container, Row } from 'react-bootstrap';
import OpinionsContainer from '../components/OpinionsContainer';

const User = () => {   
    
    const dispatch = useDispatch();

    const { userId } = useParams();

    const { userProfile, userOpinions, userOpinionsPageCount, userOpinionsCurrentCount, userOpinionsTotalCount } = useSelector(state => ({                        
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
                {
                    userProfile &&
                    <Row>
                        <span>{userProfile._id}</span>
                        <span>{userProfile.name}</span>
                    </Row>
                }                       
                <OpinionsContainer {...props} />                 
            </Container>                      
        </>
    );
};

export default User;