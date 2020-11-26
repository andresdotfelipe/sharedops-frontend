import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import { getOpinions } from '../actions/opinions';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Home = () => {    

    window.onunload = () => {
        window.scrollTo(0, 0);
    };    

    const [isFetching, setIsFetching] = useState(false);
    const [isHalfPage, setIsHalfPage] = useState(false);    

    const { session, darkTheme, opinions, opinionPageCount, totalOpinionCount, currentOpinionCount } = useSelector(state => ({
        session: state.UserReducer.session,
        darkTheme: state.UserReducer.darkTheme,
        opinions: state.OpinionReducer.opinions,
        opinionPageCount: state.OpinionReducer.opinionPageCount,
        totalOpinionCount: state.OpinionReducer.totalOpinionCount,
        currentOpinionCount: state.OpinionReducer.currentOpinionCount,
    }));    

    const dispatch = useDispatch();    

    const loadOnScroll = useCallback(
        e => {
            window.pageYOffset > 3572 ? setIsHalfPage(true) : setIsHalfPage(false);
            if (currentOpinionCount === totalOpinionCount) return;            
            const opinionsEnd = document.getElementById('opinions-end');            
            const rect = opinionsEnd.getBoundingClientRect();
            const isAtEnd = (
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && 
                rect.right <= (window.innerWidth || document.documentElement.clientWidth) 
            );            
            if (isAtEnd) {                
                if (isFetching) return;                  
                setIsFetching(true);                
                dispatch(getOpinions(`page=${opinionPageCount}`));
                setIsFetching(false);
            }            
        },
        [dispatch, totalOpinionCount, currentOpinionCount, isFetching, opinionPageCount]
    );

    const handleAddFavorite = () => {
        if (!session) window.location = `/signin`;        
    };
    
    const handleBackToTop = () => {
        window.scrollTo(0, 0);
    };

    useEffect(() => {        
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {               
        if (opinions.length === 0) {            
            dispatch(getOpinions(`page=${opinionPageCount}`));            
            //setIsFetching(false);                                  
        } else {                   
            window.addEventListener('scroll', loadOnScroll);
        }                       
        return () => {            
            window.removeEventListener('scroll', loadOnScroll);            
        };
    }, [dispatch, opinions, opinionPageCount, loadOnScroll]);    

    return (
        <Fragment>
            <Header />
            <Container className="home">
                <Row className={`${darkTheme ? 'dark' : 'light'}`}>
                    <Col xs={12} className="initial-message">
                        <span>Sharedops helps you to share what you think, just like other people have done below.</span>
                    </Col>
                    {
                        opinions ?
                        <Row className="opinions-grid">
                            {
                                opinions.map((opinion, index) => {
                                    return (
                                        <Col key={opinion._id} xs={12} tabIndex={'0'} className="opinion-box">
                                            <Row>
                                                <Col xs={12} className="details">
                                                    <span className="name">
                                                        Opinion by <b>{opinion.author.name}</b>
                                                    </span>
                                                    <img 
                                                        src={opinion.author.profilePicUrl}                                                    
                                                        alt={opinion.author.name}
                                                        className="profile-pic"
                                                    />                                                    
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
                                                        className="favorite"
                                                        onClick={handleAddFavorite}>
                                                        <i className="fas fa-star"></i>
                                                    </Button>
                                                    <Button className="comment">
                                                        <i className="fas fa-comments"></i>
                                                    </Button>
                                                </Col>                                            
                                            </Row>
                                        </Col>
                                    );
                                })
                            }
                        </Row> :
                        <Col xs={12} className="resource-not-found">
                            <span>No opinions</span>
                        </Col>

                    }
                    {
                        (currentOpinionCount !== totalOpinionCount) ?
                        <Col xs={12} id="opinions-end">
                            <Spinner
                                as="span"
                                animation="grow"                        
                                role="status"
                                aria-hidden="true"
                            />
                        </Col> : null
                    }
                    {
                        isHalfPage &&
                        <Col xs={12} className="up-arrow">                        
                            <i className="fas fa-arrow-circle-up" onClick={handleBackToTop}></i>                    
                        </Col>
                    }                                     
                </Row>                
            </Container>
            <Footer />
        </Fragment>
    );
};

export default Home;