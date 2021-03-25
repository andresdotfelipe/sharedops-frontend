import React, { Fragment, useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Container, Button, FormControl, InputGroup, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { getSession, getUser, removeSession, signOut, setDarkTheme } from '../actions/users';
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import SunIcon from '../assets/icons/sun.svg';
import MoonIcon from '../assets/icons/moon.svg';

const Header = () => {   
    
    const [search, setSearch] = useState(undefined);
    const [isPhoneView, setIsPhoneView] = useState(false);

    const { session, user, darkTheme } = useSelector(
        state => ({
            session: state.UserReducer.session,
            user: state.UserReducer.user,
            darkTheme: state.UserReducer.darkTheme
        })
    );

    const dispatch = useDispatch();
    
    const handlePhoneView = useCallback(
        e => {
            window.innerWidth <= 575.98 ? setIsPhoneView(true) : setIsPhoneView(false);
        },
        []
    );

    const changeTheme = e => {
        const { checked } = e.target;        
        localStorage.removeItem('darkTheme');
        localStorage.setItem('darkTheme', checked);             
        dispatch(setDarkTheme(checked));        
    }

    const handleSearchOpinion = () => {
        
    };

    const handleSignOut = () => {
        dispatch(removeSession);
        dispatch(signOut);
        window.location = '/';
    };

    useEffect(() => {
        window.innerWidth <= 575.98 ? setIsPhoneView(true) : setIsPhoneView(false);        
    }, []);

    useEffect(() => {
        dispatch(getSession);
        dispatch(getUser);
        if (!user & session) handleSignOut();
        window.addEventListener('resize', handlePhoneView);
        return () => {
            window.removeEventListener('resize', handlePhoneView);
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch]);

    return (
        <Fragment>
            <Container className="header">
                <Row className={`${darkTheme ? 'dark' : 'light'}`}>
                    <Col xs={12}>
                        <Navbar expand="lg" fixed="top">
                            <Row className="align-items-center">                                
                                <Col>
                                    <Link to="/" className="brand">
                                        {
                                            isPhoneView ?
                                            <i className="fas fa-bullhorn"></i> :
                                            'Sharedops'
                                        }                                        
                                    </Link>
                                </Col>                                                                                           
                                <Col>
                                    <Toggle 
                                        checked={darkTheme}
                                        onChange={changeTheme}
                                        icons={{                                    
                                            checked: <img src={MoonIcon} alt={'Moon'}/>,
                                            unchecked: <img src={SunIcon} alt={'Sun'}/>
                                        }}
                                        aria-label="Dark theme"
                                    />                                    
                                </Col>                                                                                                                        
                                <Col>
                                    <Button 
                                        className="input-group-text search-button"                                        
                                        onClick={handleSearchOpinion}>
                                        <i className="fas fa-search"></i>
                                    </Button>
                                </Col>
                            </Row>                       
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">
                                <Nav className="ml-auto">
                                    {
                                        session ?
                                        <NavDropdown title="Opinions" id="basic-nav-dropdown">
                                            <Link className="dropdown-item" to="/">All</Link>
                                            <Link className="dropdown-item" to="/my-opinions">My opinions</Link>
                                            <Link className="dropdown-item" to="/favorites">Favorites</Link>                    
                                        </NavDropdown> :
                                        <Link className="nav-link" to="/">Opinions</Link>                                
                                    }                            
                                    <Link className="nav-link" to="/random">Random</Link>                                                        
                                </Nav>                            
                                {
                                    session && user ?
                                    <Fragment>
                                        <Nav className="align-items-lg-center">
                                            <Link 
                                                className="nav-link" 
                                                to="/create-opinion" >
                                                <i className="fas fa-plus-square"></i> New opinion
                                            </Link>
                                            <Link className="nav-link profile-pic" to="/profile">
                                                <img src={user.profilePicUrl}  alt={user.name} />
                                                { user.name }                                        
                                            </Link>          
                                            <Button 
                                                className="sign-out-button"
                                                onClick={handleSignOut}>                                        
                                                Sign out
                                            </Button>                                                       
                                        </Nav>                                
                                    </Fragment> :
                                    <Fragment>
                                        <Link className="btn sign-in-button" to="/signin">Sign in</Link><br />
                                        <Link className="btn sign-up-button" to="/signup">Sign up</Link>                        
                                    </Fragment>
                                }                                                
                            </Navbar.Collapse>
                        </Navbar>
                    </Col>                    
                </Row>
            </Container>
        </Fragment>
    );
};

export default Header;