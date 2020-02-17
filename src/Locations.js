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
            cStyle: null,
            fStyle: null,
            locations: null,
            weatherList: []
        };
        this.clickC = this.clickC.bind(this);
        this.clickF = this.clickF.bind(this);
    }


    clickC() {
        this.setState({
            cStyle: {
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
            fStyle: {
                color: "black"
            },
            cStyle: {
                color: "grey"
            }
        })
    }

    componentDidMount() {
        this.getWeatherList();
    }

    getWeatherList = _ => {
        fetch('http://localhost:4000/weather')
            .then(response => response.json())
            .then(response => {
                this.setState({ weatherList: response.data })
            })
            .catch(err => console.log(err))
    }

    renderWeather = ({ id, time, city, temparature }) => <div key={id}>{city}</div>;

    renderWeatherTable = ({ id, time, city, temparature }) => <tr key={id}><th>{time}</th><th>{city}</th><th>{temparature}</th></tr>;

    render() {
        const weatherList = this.state.weatherList;
        if (weatherList === null) {
            return <div></div>
        }
        return (
            <div id="localist">
                <footer>
                    <div>
                        <tabel id="locationsAdded">
                            <tbody>

                            </tbody>
                        </tabel>
                    </div>
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
                        <table id="weatherList">
                            <tbody>
                                {weatherList.map(this.renderWeatherTable)}
                            </tbody>
                        </table>
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