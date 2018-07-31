import React, { Component } from 'react';
import './App.css';
import Router from "./router/Router";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { SaveMoviesReducer, Favorites } from "./reducer";
import {applyMiddleware, combineReducers, createStore, compose} from "redux";
import thunkMiddleware from 'redux-thunk';

let reducers = combineReducers({
    SaveMoviesReducer,
    Favorites
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter >
                    <Router />
                </BrowserRouter >
            </Provider>
        );
    }
}

export default App;
