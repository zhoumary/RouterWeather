import { statement } from "@babel/template";

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from "react-router-dom";
import './Search.css';
import cities from './city.list.json';



class Search extends React.Component {
    // cilck ℃, which can highlighten ℃, also default temp unit
    constructor(props) {
        super(props);
        this.state = {
            cities: null
        };
    }

    search() {

    }

    componentDidMount() {
        let cities = cities.cities.map((city, key) => {
            return (
                <li
                    key={city.id}
                    name={city.name}
                    country={city.country}
                />
            )
        })
        this.setState({cities: cities});  // <--
        //or just this.setState({ topbarLinks });
    }


    render() {
        return (
            <div id="search">
                <div>
                    <span id="searchead">Enter city, zip code, or airport location</span>
                </div>
                <div>
                    <input id="mysearch" type="search" />
                    <span>
                        <Link to="/Locations/" id="add" onClick={() => window.location.refresh()} style={{ textDecoration: 'none', color: 'grey' }}>
                            &nbsp;&nbsp;Cancel
                        </Link>
                    </span>
                </div>
            </div>
        );
    }
}


export default Search