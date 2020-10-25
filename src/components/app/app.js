import React, { Component } from 'react';
import './app.css';
import Slider from '../slider/slider';


export default class App extends Component {
  
  state = {
    data: [
      'https://images.unsplash.com/photo-1440582096070-fa5961d9d682?ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80',
      'https://images.unsplash.com/photo-1446482932150-b7ff60bab8e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80',
      'https://images.unsplash.com/photo-1459539235056-5045ca20e525?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI5MzI0fQ&auto=format&fit=crop&w=1050&q=80',
      'https://images.unsplash.com/photo-1599069134757-8eeea120398f?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      'https://images.unsplash.com/photo-1588095938732-5463642ce960?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      'https://images.unsplash.com/photo-1550934172-beb213c78c11?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      'https://images.unsplash.com/photo-1568164651648-d90699a5182d?ixlib=rb-1.2.1&auto=format&fit=crop&w=966&q=80'
    ],
    currentDataIndex: 2,
    openSlider: true,
    slide: 0
  }

  prevSlide = () => {
    const length = this.state.data.length - 1;
    this.setState( (state) => ({
      currentDataIndex : state.currentDataIndex ? state.currentDataIndex - 1 : length,
    }) ) 
  }

  nextSlide = () => {
    const length = this.state.data.length - 1;
    this.setState( (state) => ({
      currentDataIndex : state.currentDataIndex === length ? 0 : state.currentDataIndex + 1,
    }) ) 
  }
  
  render() {
    const {data, currentDataIndex, openSlider, slide} = this.state;
    return(
      <div>
        <Slider 
          data={data}
          currentDataIndex={currentDataIndex}
          openSlider={openSlider}
          prevSlide={this.prevSlide}
          nextSlide={this.nextSlide}
          slide={slide}
          slideWay={null}
        />
      </div>
    )
  }
}