import { statement } from "@babel/template";

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from "react-router-dom";
import './Locations.css';
import WeatherLink from './pics/weatherlogo.png';
import AddLocation from './pics/add.png';


class Locations extends React.Component {
    // cilck ℃, which can highlighten ℃, also default temp unit
    constructor(props) {
        super(props);
        this.state = {
            cStyle : null,
            fStyle : null
        };
        this.clickC = this.clickC.bind(this);
        this.clickF = this.clickF.bind(this);
    }


    clickC() {
        this.setState({
            cStyle : {
                color: "black"
            },
            fStyle: {
                color: "grey"
            }
        })
        
    }
    
    // cilck F, which can highlighten F
    clickF() {
        this.setState({
            fStyle : {
                color: "black"
            },
            cStyle: {
                color: "grey"
            }
        })        
    }
    
    render() {
        return (
             <div id="localist">
                <footer>
                    <div>
                        <tabel id="tempunitchoose">
                            <thead>
                                <th id="unit">
                                    <span class="tempUnit" onClick={this.clickC} style={this.state.cStyle}>&#8451;</span>
                                    <span class="tempUnit"> &frasl; </span>
                                    <span class="tempUnit" onClick={this.clickF} style={this.state.fStyle}>&#8457;</span>  
                                </th>
                                <th id="addlocal">
                                    <Link to="/Search/" id="add" onClick={() => window.location.refresh()}>
                                        <img src={AddLocation} id="addlocation" />
                                    </Link>
                                </th>
                            </thead>
                        </tabel>
                    </div>
                    <div>
                        <a href="https://weather.com/" id="weatherlink" target="_blank">
                            <img src={WeatherLink} id="weatherlink" />
                        </a>
                    </div>
                </footer>
             </div>
        );
    }
}


export default Locations