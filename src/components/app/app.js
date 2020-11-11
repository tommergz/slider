import React, { Component } from 'react';
import './app.css';
import Slider from '../slider/slider';

export default class App extends Component {
  render() {
    return(
      <div className="app-wrapper">
        <Slider />
      </div>
    )
  }
}