import React, { Component } from 'react';
import './App.css';
import Router from "./router/Router";
import { BrowserRouter } from 'react-router-dom';
import { Provider } from "react-redux";
import { SaveMoviesReducer } from "./reducer";
import {combineReducers, createStore} from "redux";

let reducers = combineReducers({
    SaveMoviesReducer
});
console.log(SaveMoviesReducer);
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
console.log();
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
