import React, { Component } from 'react';
import { Redirect } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button} from 'react-bootstrap';


class Login extends Component {
    constructor (props) {
        super(props);
        this.state = {
            loggedIn: false
        };
        this.login = this.login.bind(this);
    }

    login() {
        let username = this.refs.username.value,
            password = this.refs.password.value;
        if (username.length && password.length) {
            let users = JSON.parse(localStorage.getItem("users")) || {},
                doesUserExist = false;
            for(let key in users) {
                if (users[key].username === username && users[key].password === password) {
                    doesUserExist = true;
                    localStorage.setItem("activeUserId", users[key].id);
                }
            }
            if (!doesUserExist) {
                let newUser = {
                    id: Object.keys(users).length,
                    username: username,
                    password: password,
                };
                users[newUser["id"]] = newUser;
                localStorage.setItem("users", JSON.stringify(users));
                localStorage.setItem("activeUserId", newUser.id);
            }
            this.setState({loggedIn: true});
        }
    }

    render() {
        if (this.state.loggedIn) {
            return (
                <Redirect to="movies" />

            )
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="flex">
                        <input type="text" ref="username" className="form-control" placeholder="Login"/>
                        <input type="password" ref="password" className="form-control" placeholder="Password"/>
                        <Button bsStyle="primary" onClick={this.login}>Login</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
