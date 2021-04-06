import React, { Fragment, useState, useEffect, useCallback, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory, useParams, Link } from 'react-router-dom';
import { Col, Container, Button, Nav, Navbar, NavDropdown, Row } from 'react-bootstrap';
import { getSession, getUser, removeSession, signOut, setDarkTheme } from '../actions/users';
import { setSearchOpinions, setSearchOpinionsPageCount, setSearchOpinionsCurrentCount, setSearchOpinionsTotalCount } from '../actions/opinions';
import Toggle from 'react-toggle';
import SearchModal from './SearchModal';
import 'react-toggle/style.css';
import SunIcon from '../assets/icons/sun.svg';
import MoonIcon from '../assets/icons/moon.svg';
import Logo from '../assets/images/sharedops-logo.svg';
import LogoPhones from '../assets/images/sharedops-logo-phones.svg';

const Header = () => {   
    
    const [search, setSearch] = useState('');
    const [checkedSearchOption, setCheckedSearchOption] = useState('All');
    const [showSearch, setShowSearch] = useState(false);
    const [isPhoneView, setIsPhoneView] = useState(false);
    const [expandedNavbar, setExpandedNavbar] = useState(false); 
    
    const navbar = useRef(); 
    
    const history = useHistory();    

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

    const handleClickOutsideNavbar = e => {
        if ((e.clientX) >= e.target.clientWidth) return;
        if (!navbar.current.contains(e.target)) setExpandedNavbar(false);
    };

    const changeTheme = e => {
        const { checked } = e.target;        
        localStorage.removeItem('darkTheme');
        localStorage.setItem('darkTheme', checked);             
        dispatch(setDarkTheme(checked));        
    }

    const handleShowSearch = () => {
        setShowSearch(!showSearch);        
    };

    const handleOnChangeSearch = e => {
        const { id, value } = e.target;
        id === 'searchInput' ? setSearch(value) : setCheckedSearchOption(id);
    };

    const resetSearchOpinions = () => {
        dispatch(setSearchOpinions([]));   
        dispatch(setSearchOpinionsPageCount(0));     
        dispatch(setSearchOpinionsCurrentCount(0));        
        dispatch(setSearchOpinionsTotalCount(null));
    };

    const handleSearchOpinion = () => {
        resetSearchOpinions();
        switch (checkedSearchOption) {            
            case 'My opinions':
                history.push(`/search/my-opinions/${search}`);
                break;
            case 'Favorites':
                history.push(`/search/favorites/${search}`);
                break;
            default:
                history.push(`/search/all/${search}`);
                break;
        }        
        handleShowSearch();
    };

    const handleNavDropdownItemClick = to => {
        history.push(to);
    };

    const handleSignOut = () => {
        window.localStorage.removeItem('session');
        window.location = '/';
    };

    useEffect(() => {
        window.innerWidth <= 575.98 ? setIsPhoneView(true) : setIsPhoneView(false);        
    }, []);

    useEffect(() => {
        dispatch(getSession);
        dispatch(getUser);        
        const { pathname } = history.location;
        if (pathname.startsWith('/search/all/')) {
            resetSearchOpinions();
            setCheckedSearchOption('All');
            setSearch(pathname.slice(12));
        }
        if (session) {
            if (pathname.startsWith('/search/my-opinions/')) {
                resetSearchOpinions();
                setCheckedSearchOption('My opinions');
                setSearch(pathname.slice(20));
            } else if (pathname.startsWith('/search/favorites/')) {
                resetSearchOpinions();
                setCheckedSearchOption('Favorites');
                setSearch(pathname.slice(18));
            }
        }
        window.addEventListener('resize', handlePhoneView);
        window.addEventListener('mousedown', handleClickOutsideNavbar);
        return () => {
            window.removeEventListener('resize', handlePhoneView);
            window.removeEventListener('mousedown', handleClickOutsideNavbar);
        };
        //eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, history.location.pathname]);

    return (
        <Fragment>
            <Container className="header">
                <Row className={`${darkTheme ? 'dark' : 'light'}`}>
                    <Col xs={12}>
                        <Navbar 
                            expand="lg" 
                            fixed="top"
                            ref={navbar} 
                            expanded={expandedNavbar}                                
                            onToggle={() => setExpandedNavbar(!expandedNavbar)}>
                            <Row className="align-items-center">                                
                                <Col>
                                    <Link to="/" className="brand">
                                        {
                                            isPhoneView ?
                                            <img width="60px" height="43px" src={LogoPhones} alt={'Sharedops'}/> :
                                            <img width="200px" height="43px" src={Logo} alt={'Sharedops'}/>
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
                                        onClick={handleShowSearch}>
                                        <i className="fas fa-search"></i>
                                    </Button>
                                    <SearchModal
                                        darkTheme={darkTheme}
                                        title={'Search opinion'}
                                        session={session}
                                        onChangeSearch={handleOnChangeSearch}
                                        checkedSearchOption={checkedSearchOption}
                                        search={search}
                                        searchOpinion={handleSearchOpinion}
                                        show={showSearch}
                                        onHide={handleShowSearch}
                                    />                                    
                                </Col>
                            </Row>                       
                            <Navbar.Toggle aria-controls="basic-navbar-nav" />
                            <Navbar.Collapse id="basic-navbar-nav">                                
                                <Nav className="ml-auto">
                                    {
                                        session ?
                                        <NavDropdown title="Opinions" id="basic-nav-dropdown">
                                            <NavDropdown.Item onClick={() => handleNavDropdownItemClick('/')}>
                                                All
                                            </NavDropdown.Item>
                                            <NavDropdown.Item onClick={() => handleNavDropdownItemClick('/my-opinions')}>
                                                My opinions
                                            </NavDropdown.Item>
                                            <NavDropdown.Item onClick={() => handleNavDropdownItemClick('/favorites')}>
                                                Favorites
                                            </NavDropdown.Item>
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