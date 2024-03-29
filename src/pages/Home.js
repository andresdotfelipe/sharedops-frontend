import React from 'react';
import { useSelector } from 'react-redux';
import OpinionsContainer from '../components/OpinionsContainer';

const Home = () => {    

    const { allOpinions, allOpinionsPageCount, allOpinionsCurrentCount, allOpinionsTotalCount } = useSelector(state => ({                        
        allOpinions: state.OpinionReducer.allOpinions,
        allOpinionsPageCount: state.OpinionReducer.allOpinionsPageCount,
        allOpinionsCurrentCount: state.OpinionReducer.allOpinionsCurrentCount,
        allOpinionsTotalCount: state.OpinionReducer.allOpinionsTotalCount
    }));
    
    const props = {
        initialMessage: 'Sharedops helps you to share what you think, just like other people have done below.',
        opinions: allOpinions,
        pageCount: allOpinionsPageCount,
        currentCount: allOpinionsCurrentCount,
        totalCount: allOpinionsTotalCount,
        type: 'allOpinions'
    };

    return (
        <>            
            <OpinionsContainer {...props} />            
        </>
    );
};

export default Home;