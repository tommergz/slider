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
      'https://images.unsplash.com/photo-1568164651648-d90699a5182d?ixlib=rb-1.2.1&auto=format&fit=crop&w=966&q=80',
      'https://images.unsplash.com/photo-1604599340287-2042e85a3802?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80',
      'https://images.unsplash.com/photo-1588343710499-948bbeb14ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=1189&q=80'
    ],
    currentDataIndex: 4,
    slide: -100,
    transitionXstyle: 0,
    inputValue: '',
    slideValue: '',
    switchToSlideX: false,
    multipleSlides: false,
    toolkit: true,
    slideDifference: 0
  }

  moveLeft = () => {
    this.setState((state) => ({
      slide: state.multipleSlides ? state.slideDifference > 1 ? 0 : -50 : 0,
      transitionXstyle: 0.5
    }))
  }

  moveRight = () => {
    this.setState((state) => ({
      slide: state.multipleSlides ? state.slideDifference < -1 ? -200 : -150 : -200,
      transitionXstyle: 0.5
    }))
  }

  prevSlide = () => {
    if (this.state.data.length > 1) {
      this.setState( (state) => ({
        currentDataIndex : state.currentDataIndex > 0 ? state.currentDataIndex - 1 : state.data.length - 1,
        slide: -100,
        switchToSlideX: false,
        transitionXstyle: 0
      }) ) 
    }
  }

  nextSlide = () => {
    if (this.state.data.length > 1) {
      this.setState( (state) => ({
        currentDataIndex : state.currentDataIndex < state.data.length - 1 ? state.currentDataIndex + 1 : 0,
        slide: -100,
        switchToSlideX: false,
        transitionXstyle: 0
      }) ) 
    }
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

  moveToSlideX = (e) => {
    e.preventDefault();
    const x = Number(this.state.slideValue) - 1;
    if (x > -1 && x < this.state.data.length && x !== this.state.currentDataIndex) {
      const difference = this.state.currentDataIndex - (Number(this.state.slideValue) - 1)
      this.setState({
        switchToSlideX: true,
        slideDifference: difference
      })
    }
  }

  goToSlideX = () => {
    const x = Number(this.state.slideValue) - 1;
    this.setState((state) => ({
      currentDataIndex: x,
      slide: -100,
      slideValue: '',
      switchToSlideX: false,
      transitionXstyle: 0,
      slideDifference: 0
    }))
  }

  slideRenderSwitcher = () => {
    this.setState(({multipleSlides}) => {
      return {
        multipleSlides: !multipleSlides
      }
    })
  }

  setting = () => {
    this.setState(({toolkit}) => {
      return {
        toolkit: !toolkit
      }
    })
  }

  render() {
    const {
      data, 
      currentDataIndex, 
      slide, 
      transitionXstyle,
      inputValue, 
      slideValue, 
      switchToSlideX,
      multipleSlides,
      toolkit,
      slideDifference } = this.state;
    return(
      <div className="app-wrapper">
        <Slider 
          data={data}
          currentDataIndex={currentDataIndex}
          moveLeft={this.moveLeft}
          moveRight={this.moveRight}
          prevSlide={this.prevSlide}
          nextSlide={this.nextSlide}
          slide={slide}
          transitionXstyle={transitionXstyle}
          getSlideWidth={this.getSlideWidth}
          setting={this.setting}
          multipleSlides={multipleSlides}
          slideRenderSwitcher={this.slideRenderSwitcher}
          switchToSlideX={switchToSlideX}
          multipleSlides={multipleSlides}
          handleSlideValueChange={this.handleSlideValueChange}
          goToSlideX={this.goToSlideX}
          slideValue={slideValue}
          toolkit={toolkit}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          inputValue={inputValue}
          currentDataIndex={currentDataIndex}
          multipleSlides={multipleSlides}

          moveToSlideX={this.moveToSlideX}
          slideDifference={slideDifference}
        />
      </div>
    )
  }
}