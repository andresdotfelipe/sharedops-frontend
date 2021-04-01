import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OpinionsContainer from '../components/OpinionsContainer';

const Search = () => {

    const params = useParams();    

    const { session, searchOpinions, searchOpinionsPageCount, searchOpinionsCurrentCount, searchOpinionsTotalCount } = useSelector(state => ({                        
        session: state.UserReducer.session,
        searchOpinions: state.OpinionReducer.searchOpinions,
        searchOpinionsPageCount: state.OpinionReducer.searchOpinionsPageCount,
        searchOpinionsCurrentCount: state.OpinionReducer.searchOpinionsCurrentCount,
        searchOpinionsTotalCount: state.OpinionReducer.searchOpinionsTotalCount
    }));    

    let initialMessage = 'No opinions found';
    
    switch (params.type) {
        case 'all':
            initialMessage = `${searchOpinionsTotalCount} opinions for "${params.title}" search in all opinions`;
            break;
        case 'my-opinions':
            if (session)
                initialMessage = `${searchOpinionsTotalCount} opinions for "${params.title}" search in my opinions`;
            break;
        case 'favorites':
            if (session)
                initialMessage = `${searchOpinionsTotalCount} opinions for "${params.title}" search in favorite opinions`;
            break;
        default:        
            break;
            
    }
    
    const props = {
        initialMessage,        
        opinions: searchOpinions,
        pageCount: searchOpinionsPageCount,
        currentCount: searchOpinionsCurrentCount,
        totalCount: searchOpinionsTotalCount,
        type: params.type,
        title: params.title
    };

    return (
        <Fragment>            
            <OpinionsContainer {...props} />            
        </Fragment>
    );
};

export default Search;