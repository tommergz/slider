import React, { Component } from 'react';
import './app.css';
import Slider from '../slider/slider';


export default class App extends Component {
  
  state = {
    data: [
      'https://images.unsplash.com/photo-1440582096070-fa5961d9d682?ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80',
      'https://images.unsplash.com/photo-1446482932150-b7ff60bab8e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80',
      'https://images.unsplash.com/photo-1539191863632-8caef441bfc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80',
      'https://images.unsplash.com/photo-1588095938732-5463642ce960?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      'https://images.unsplash.com/photo-1550934172-beb213c78c11?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80',
      'https://images.unsplash.com/photo-1568164651648-d90699a5182d?ixlib=rb-1.2.1&auto=format&fit=crop&w=966&q=80'
    ],
    currentDataIndex: 3,
    openSlider: true,
    slide: 0,
    slideWay: 0
  }

  prevSlide = () => {
    this.setState( (state) => ({
      currentDataIndex : state.currentDataIndex > 0 ? state.currentDataIndex - 1 : state.data.length - 1,
      slide: 100,
      slideWay: -200
    }) ) 
  }

  nextSlide = () => {
    this.setState( (state) => ({
      currentDataIndex : state.currentDataIndex < state.data.length - 1 ? state.currentDataIndex + 1 : 0,
      slide: -100,
      slideWay: 0
    }) ) 
  }

  getWidth = () => window.innerWidth;

  getSlideWidth = () => {
    this.setState({
      slideWay: -100
    })
    
  }

  render() {
    const {data, currentDataIndex, openSlider, slide, slideWay} = this.state;
    return(
      <div>
        <Slider 
          data={data}
          currentDataIndex={currentDataIndex}
          openSlider={openSlider}
          prevSlide={this.prevSlide}
          nextSlide={this.nextSlide}
          slide={slide}
          slideWay={slideWay}
          getSlideWidth={this.getSlideWidth}
        />
      </div>
    )
  }
}