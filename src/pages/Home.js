import React, { Fragment, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Header from '../components/Header';
import Footer from '../components/Footer';
import OpinionsContainer from '../components/OpinionsContainer';

const Home = () => {    

    window.onunload = () => {
        window.scrollTo(0, 0);
    };    

    const { opinions, opinionPageCount, totalOpinionCount, currentOpinionCount } = useSelector(state => ({                        
        opinions: state.OpinionReducer.opinions,
        opinionPageCount: state.OpinionReducer.opinionPageCount,
        totalOpinionCount: state.OpinionReducer.totalOpinionCount,
        currentOpinionCount: state.OpinionReducer.currentOpinionCount,
    }));
    
    const props = {
        initialMessage: 'Sharedops helps you to share what you think, just like other people have done below.',
        opinions,
        opinionPageCount,
        totalOpinionCount,
        currentOpinionCount
    };

    useEffect(() => {        
        window.scrollTo(0, 0);
    }, []);

    return (
        <Fragment>
            <Header />
            <OpinionsContainer {...props} />
            <Footer />
        </Fragment>
    );
};

export default Home;