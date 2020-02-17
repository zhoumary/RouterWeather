import { statement } from "@babel/template";

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Link } from "react-router-dom";
import './Search.css';
import cities from './city.list.json';
import fuzzyFilterFactory from "react-fuzzy-filter";
import SWorker from "simple-web-worker";


// these components share state and can even live in different components
const { InputFilter, FilterResults } = fuzzyFilterFactory();
const host = "https://api.openweathermap.org/data/2.5/";
const apiKey = "b1ef2003fa0d11a58f659cb9deab88b0";

class Search extends React.Component {
  // cilck ℃, which can highlighten ℃, also default temp unit
  constructor(props) {
    super(props);
    this.state = {
      cities: null,
      showResults: null,
      text: null,
      currWeather: null
    };
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSearchChange(e) {
    if (e) {
      this.setState({ text: e, showResults: true });
    } else {
      this.setState({ text: e, showResults: false });
    }
    return e;
  }

  componentDidMount() {
    this.setState({ cities: cities });
  }

  getCurrWeather = (cityID) => {
    let queryParam = "weather?id=" + cityID + "&APPID=" + apiKey;
    let url = host + queryParam;
    if (url) {
      fetch(url)
        .then(response => {
          if (response.ok) {
            return response.json();
          }
          throw new Error('Request failed');
        }, networkError => console.log(networkError.message))
        .then(jsonResponse => {
          let currDate = new Date();
          let time = currDate.getHours() + ":" + currDate.getMinutes() + ":" + currDate.getSeconds();
          let temparature = jsonResponse.main;
          let tempConvered = tempConversion(temparature.temp);
          this.setState({
            currWeather: {
              currTime: time,
              cityName: jsonResponse.name,
              temp: tempConvered
            }
          });

          let newWeather = this.state.currWeather;
          if (newWeather) {
            // add the new weather into the weather table
            this.addWeather();
          }
        })
    }
  }

  addWeather = _ => {
    const { currWeather } = this.state;
    fetch(`http://localhost:4000/weather/add?time=${currWeather.time}&city=${currWeather.city}&temparature=${currWeather.temparature}`)
      .then(window.location.href = "http://localhost:3000/Locations/")
      .catch(err => console.log(err))
  }


  render() {
    // if (this.state.cities == null) {
    //   return <div></div>;
    // }
    const items = this.state.cities;
    const fuseConfig = {
      keys: ["name"]
    };

    return (
      <div id="search">
        <div>
          <span id="searchead">Enter city, zip code, or airport location</span>
        </div>
        <div>
          <InputFilter
            debounceTime={1000}
            onChange={this.handleSearchChange}
          />

          <span>
            <Link
              to="/Locations/"
              id="add"
              onClick={() => window.location.refresh()}
              style={{ textDecoration: "none", color: "grey" }}
            >
              &nbsp;&nbsp;Cancel
            </Link>
          </span>

          <div
            id="filterResults"
            style={{
              visibility: this.state.showResults ? "visible" : "hidden"
            }}
          >
            <FilterResults items={items} fuseConfig={fuseConfig}>
              {filteredItems => {
                if (items) {

                  return (
                    <div>
                      {filteredItems.map(item => (
                        <div onClick={this.getCurrWeather(item.id)}>{item.name}</div>
                      ))}
                    </div>
                  );
                }
              }}
            </FilterResults>
          </div>
        </div>
      </div>
    );
  }
}


function tempConversion(kTemp) {
  let cTemp
  if (kTemp) {
    cTemp = (kTemp - 273.15).toFixed();
    cTemp.toString();
    cTemp = cTemp + "℃";

  }

  return cTemp;
}


export default Search