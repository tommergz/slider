import React, { Component } from 'react';
import './app.css';
import Slider from '../slider/slider';
import ImgSubmitForm from '../img-submit-form/img-submit-form';
import SlideSwitcher from '../slide-switcher/slide-switcher';
import SlideCounter from '../slide-counter/slide-counter';

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
    slide: 0,
    slideWay: 0,
    inputValue: '',
    slideValue: '',
    switchToSlideX: false
  }

  prevSlide = () => {
    this.setState( (state) => ({
      currentDataIndex : state.currentDataIndex > 0 ? state.currentDataIndex - 1 : state.data.length - 1,
      slide: 100,
      slideWay: -200,
      switchToSlideX: false
    }) ) 
  }

  nextSlide = () => {
    this.setState( (state) => ({
      currentDataIndex : state.currentDataIndex < state.data.length - 1 ? state.currentDataIndex + 1 : 0,
      slide: -100,
      slideWay: 0,
      switchToSlideX: false
    }) ) 
  }

  getWidth = () => window.innerWidth;

  getSlideWidth = () => {
    this.setState({
      slideWay: -100
    })
  }

  handleChange = (e) => {
    this.setState({inputValue: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const link = this.state.inputValue;
    this.setState(({data}) => {
      const newData = [
        ...data,
        link
      ];
      return {
        data: newData,
        inputValue: ''
      }
    })
  }

  handleSlideValueChange = (e) => {
    this.setState({slideValue: e.target.value});   
  }

  goToSlideX = (e) => {
    e.preventDefault();
    const x = Number(this.state.slideValue) - 1;
    if (x > -1 && x < this.state.data.length) {
      this.setState({
        currentDataIndex: x,
        slideWay: -100,
        slideValue: '',
        switchToSlideX: true
      })
    }
  }

  render() {
    const {data, currentDataIndex, slide, slideWay, inputValue, slideValue, switchToSlideX} = this.state;
    return(
      <div className="app-wrapper">
        <ImgSubmitForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          inputValue={inputValue}
        />
        <SlideSwitcher 
          handleSlideValueChange={this.handleSlideValueChange}
          goToSlideX={this.goToSlideX}
          slideValue={slideValue}
        />
        <Slider 
          data={data}
          currentDataIndex={currentDataIndex}
          prevSlide={this.prevSlide}
          nextSlide={this.nextSlide}
          slide={slide}
          slideWay={slideWay}
          getSlideWidth={this.getSlideWidth}
          switchToSlideX={switchToSlideX}
        />
        <SlideCounter 
          currentDataIndex={currentDataIndex}
          data={data}
        />
      </div>
    )
  }
}