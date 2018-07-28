import React, {Component} from 'react';
import {connect} from 'react-redux';
import "./movie.css";
import {Col} from 'react-bootstrap';
import {Link} from "react-router-dom";
import download from './download.svg';
import ReactPaginate from 'react-paginate';
import 'bootstrap/dist/css/bootstrap.min.css';


class Movies extends Component {
    constructor(props) {
        super(props);
        // localStorage.setItem('data', '[{"a":"1"}]');this.state = {results: []};
        this.state = {results: []};
        localStorage.setItem('data', '[{"a":"1"}]');
        this.search = this.search.bind(this);

    }

    search(event) {
        if (!event.target.value.trim()) {
            this.getData(1)
        }

        let val = event.target.value.replace(/\s+/g, '+');
        this.request("http://api.themoviedb.org/3/search/movie?api_key=418a2c57e3a40a68638d0017f189fca9&query=" + val);
    }


    componentDidMount() {
        this.request("https://api.themoviedb.org/3/movie/top_rated?api_key=418a2c57e3a40a68638d0017f189fca9");
    }

    request(url) {
        fetch(url).then((response) => {
            return response.json();
        }).then((data) => {
            if (!data.results) {
                return
            }
            this.pageConunt = data.total_pages;
            let aa = JSON.stringify(data.results);
            localStorage.setItem('data', aa);
            this.setState({results: []});
        }).catch((err) => {

        });
    }

    static pageConunt = 0;
    static selected = 0;

    handlePageClick = (data) => {
        this.selected = data.selected;

        this.getData(this.selected);
    };

    getData(page) {
        this.request("https://api.themoviedb.org/3/movie/top_rated?api_key=418a2c57e3a40a68638d0017f189fca9&page=" + page);
    }

    like(object) {
        let user_id = localStorage.getItem("activeUserId");
        let a = JSON.parse(localStorage.getItem("favorits"));
        if (!(a instanceof Array)) {
            a = [];
        }
        let item = a.find((item) => {
            return item.user_id === user_id;
        });
        let index = -1;
        if (!item) {

            a.push({
                user_id: user_id,
                fave: [object]
            });


        } else {
            index = item.fave.findIndex((item) => {
                return item.id === object.id;
            });
            if (index != -1) {

                item.fave.splice(index, 1);
            } else {
                item.fave.push(object);
            }
        }
        localStorage.setItem("favorits", JSON.stringify(a));
        this.setState({fave: []});
    }

    isliked(object) {

        let favorits = JSON.parse(localStorage.getItem("favorits"));
        let user_id = JSON.parse(localStorage.getItem("activeUserId"));
        let item = favorits.find((item) => {
            return item.user_id == user_id;
        });

        if (item) {

            let elem = item.fave.find((elem)=>{
                return elem.id == object.id;
            });

            return !!elem;
        }

        return false;
    }

    render() {
        return (
            <div>
                <nav className={"navbar navbar-inverse mb-5"}>
                    <div className="container">
                        <div className="header">
                            <a href="/movies" className="navbar-brand">
                                <Col lg={4} xs={4} md={4} sm={12}><span className={"moviebox"}>MovieBox</span>
                                    <img src={download} alt="TMDb"/>
                                </Col>
                            </a>
                            <ul>
                                <li><Link to="/movies/favorits">Favorits list </Link></li>
                                <li onClick={this.logOut}><Link to="/">Log Out</Link></li>
                                <li><input
                                    type="text"
                                    placeholder="Enter text"
                                    onChange={this.search}
                                />
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div>
                    <div className="container">
                        <div className="row">
                            {JSON.parse(localStorage.getItem('data')).map((object) =>
                                <div className={"col-md-6 col-lg-6 col-sm-12 col-xs-12 center"}>
                                    <div className="card">
                                        <div className="img-content">
                                            <img src={'http://image.tmdb.org/t/p/w185/' + object.poster_path} alt="alt"
                                                 className="img-responsive rounded"/>
                                        </div>
                                        <div className="info">
                                            <div className="wrapper">
                                                <div className="title">
                                                    {object.title}
                                                </div>
                                            </div>
                                            <div className="overview">
                                                {object.overview}
                                            </div>
                                            <hr/>
                                            <div className="footer_cart">
                                                <div className="vote_count">
                                                    <span>Vote count  - {object.vote_count}</span>
                                                </div>
                                                <div className="vote_average">
                                                    <span>Vote average  - {object.vote_average}</span>
                                                </div>
                                                <button onClick={this.like.bind(this, object)} type="button"
                                                        className="like btn btn-default btn-lg">
                                                    {(this.isliked.bind(this)(object)) ? <span className="glyphicon glyphicon-star liked" aria-hidden="true"
                                                                                               aria-hidden="true"></span>:
                                                        <span className="glyphicon glyphicon-star"
                                                              aria-hidden="true"></span>}
                                                </button>
                                            </div>
                                        </div>

                                    </div>

                                </div>)}
                        </div>
                        <nav aria-label="Page navigation example">
                            <ReactPaginate previousLabel={"previous"}
                                           nextLabel={"next"}
                                           breakLabel={<a href="">...</a>}
                                           breakClassName={"break-me"}
                                           pageCount={this.pageCount}
                                           marginPagesDisplayed={2}
                                           pageRangeDisplayed={5}
                                           onPageChange={this.handlePageClick}
                                           containerClassName={"pagination"}
                                           subContainerClassName={"pages pagination"}
                                           activeClassName={"active"}/>
                        </nav>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        movies: state.movies
    }
};

export default connect(mapStateToProps)(Movies);
