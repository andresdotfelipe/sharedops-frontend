import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import OpinionsContainer from '../components/OpinionsContainer';

const Favorites = () => {    

    const { session, favoriteOpinions, favoriteOpinionsPageCount, favoriteOpinionsCurrentCount, favoriteOpinionsTotalCount } = useSelector(state => ({
        session: state.UserReducer.session,
        favoriteOpinions: state.OpinionReducer.favoriteOpinions,
        favoriteOpinionsPageCount: state.OpinionReducer.favoriteOpinionsPageCount,
        favoriteOpinionsCurrentCount: state.OpinionReducer.favoriteOpinionsCurrentCount,
        favoriteOpinionsTotalCount: state.OpinionReducer.favoriteOpinionsTotalCount
    }));
    
    const props = {
        initialMessage: 'These are the opinions you like the most.',
        opinions: favoriteOpinions,
        pageCount: favoriteOpinionsPageCount,
        currentCount: favoriteOpinionsCurrentCount,
        totalCount: favoriteOpinionsTotalCount,
        type: 'favorites'
    };

    if (!session) return <Redirect to={{ pathname: '/' }} />

    return (
        <Fragment>            
            <OpinionsContainer {...props} />            
        </Fragment>
    );
};

export default Favorites;