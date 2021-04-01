import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container } from 'react-bootstrap';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Layer from './components/Layer';
import Home from './pages/Home';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import MyOpinions from './pages/MyOpinions';
import Favorites from './pages/Favorites';
import Random from './pages/Random';
import Search from './pages/Search';
import CreateOpinion from './pages/CreateOpinion';
import Comments from './pages/Comments';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './scss/Styles.scss';

const App = () => {

    const darkTheme = useSelector(state => state.UserReducer.darkTheme);

    useEffect(() => {
        const body = document.getElementsByTagName('body');   
        if (darkTheme) {
            body[0].style.color = '#FFFFFF';
            body[0].style.backgroundColor = '#26182D';
        } else {
            body[0].style.color = '#000000';
            body[0].style.backgroundColor = '#FBF2FF';
        }
    }, [darkTheme]);    

    return (
        <Container fluid>            
            <BrowserRouter>
                <Switch>
                    <Layer>
                        <Route exact path={'/'} component={Home} />
                        <Route exact path={'/signin'} component={SignIn} />
                        <Route exact path={'/signup'} component={SignUp} />
                        <Route exact path={'/my-opinions'} component={MyOpinions} />
                        <Route exact path={'/favorites'} component={Favorites} />
                        <Route exact path={'/random'} component={Random} />
                        <Route exact path={'/search/:type/:title'} component={Search} />
                        <Route exact path={'/create-opinion'} component={CreateOpinion} />
                        {/* <Route exact path={'/profile'} component={Profile} /> */}
                        {/* <Route exact path={'/user/:userName'} component={User} /> */}
                        <Route exact path={'/comments/:opinionId/:opinionTitle?'} component={Comments} />
                    </Layer>
                </Switch>
            </BrowserRouter>            
        </Container>
    );
};

export default App;