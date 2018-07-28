import React, { Component } from 'react';
import { Switch, Route } from 'react-router';
import Login from "../login/Login";
import Movies from "../movies/Movies";
import Favorits from "../movies/Favorits";

class Router extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Login}/>
                <Route path="/movies/favorits" component={Favorits}/>
                <Route path="/movies" component={Movies}/>
            </Switch>
        );
    }
}

export default Router;
