import { statement } from "@babel/template";

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from "react-router-dom";
import './Search.css';
import cities from './city.list.json';
import fuzzyFilterFactory from "react-fuzzy-filter";

// these components share state and can even live in different components
const { InputFilter, FilterResults } = fuzzyFilterFactory();


class Search extends React.Component {
    // cilck ℃, which can highlighten ℃, also default temp unit
    constructor(props) {
        super(props);
        this.state = {
            cities: null,
            showResults: null,
            text: null
        };
        // this.text = this.text.bind(this);
    }

    componentDidMount() {
        const locations = require('./city.list.json');

        this.setState({cities: locations});
    }


    render() {
        if (this.state.cities == null) {
            return (
                <div></div>
            );
        }
        const items = this.state.cities;
        const fuseConfig = {
        keys: ["name"],
        };
        // const setInputText = () => onChangeInputValue("hello");        
        
        return (
            <div id="search">
                <div>
                    <span id="searchead">Enter city, zip code, or airport location</span>
                </div>
                <div>
                    <InputFilter id="mysearch" debounceTime={0} onChange={(e)=>
                        {
                            if (e) {
                                this.setState({text: e, showResults: true});                                
                            }else{
                                this.setState({text: e, showResults: false});
                            }
                            return this.state.text;
                        }
                    } />
                    
                    <span>
                        <Link to="/Locations/" id="add" onClick={() => window.location.refresh()} style={{ textDecoration: 'none', color: 'grey' }}>
                            &nbsp;&nbsp;Cancel
                        </Link>
                    </span>
                    <div id="filterResults" style={{visibility: (this.state.showResults) ? 'visible' : 'hidden' }}>
                        <FilterResults items={items} fuseConfig={fuseConfig}>
                            {filteredItems => {
                                return (
                                    <div>
                                        {filteredItems.map(item => (
                                            <div>{item.name}</div>
                                        ))}
                                    </div>
                                );
                            }}
                        </FilterResults>
                    </div>

                </div>                
            </div>
        );
    }
}


export default Search