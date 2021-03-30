import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import OpinionsContainer from '../components/OpinionsContainer';

const MyOpinions = () => {    

    const { session, myOpinions, myOpinionsPageCount, myOpinionsCurrentCount, myOpinionsTotalCount } = useSelector(state => ({
        session: state.UserReducer.session,
        myOpinions: state.OpinionReducer.myOpinions,
        myOpinionsPageCount: state.OpinionReducer.myOpinionsPageCount,
        myOpinionsCurrentCount: state.OpinionReducer.myOpinionsCurrentCount,
        myOpinionsTotalCount: state.OpinionReducer.myOpinionsTotalCount
    }));
    
    const props = {
        initialMessage: 'These are your opinions, the ones you have shared with the world.',
        opinions: myOpinions,
        pageCount: myOpinionsPageCount,
        currentCount: myOpinionsCurrentCount,
        totalCount: myOpinionsTotalCount,
        type: 'myOpinions'
    };

    if (!session) return <Redirect to={{ pathname: '/' }} />

    return (
        <Fragment>            
            <OpinionsContainer {...props} />            
        </Fragment>
    );
};

export default MyOpinions;