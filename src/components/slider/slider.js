import React from 'react';
import { Component } from 'react';
import './slider.css';
import SlideRenderingService from './services/slide-rendering-service';
import SlideRenderSetting from './slide-render-setting/slide-render-setting';
import ImgSubmitForm from './img-submit-form/img-submit-form';
import SlideSwitcher from './slide-switcher/slide-switcher';
import SlideCounter from './slide-counter/slide-counter';
import Toolkit from './toolkit/toolkit';

export default class Slider extends Component {

  state = {
    way: 0
  }

  swipe = 0;

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.currentDataIndex !== nextProps.currentDataIndex ||
     this.props.slideWay !== nextProps.slideWay || 
     this.props.multipleSlides !== nextProps.multipleSlides ||
     this.props.data !== nextProps.data ||
     this.props.slideValue !== nextProps.slideValue ||
     this.props.inputValue !== nextProps.inputValue ||
     this.props.toolkit !== nextProps.toolkit || 
     nextState.way !== 0
  }

  componentDidMount() {
    this.props.getSlideWidth()
  }

  componentDidUpdate() {
    let slideSide = this.props.slide === 0 ? 0 : this.props.slide < 0 ? -100 : 100;
    if (slideSide !== this.state.way) {
      setTimeout(() => {
        this.setState({
          way: slideSide
        })
      })
    } else {
      this.setState({
        way: 0
      })
    }
  }

  slideRenderingService = new SlideRenderingService();
  
  handleTouchStart = (e) => {
    const x = e.touches[0];
    this.swipe = x.pageX
  }

  handleTouchEnd = (e) => {
    const x = e.changedTouches[0].pageX;
    const swipeLength = x - this.swipe;
    if (Math.abs(swipeLength) > 50) {
      if (swipeLength > 0) {
        this.props.prevSlide()
      } else {
        this.props.nextSlide()
      }
    }
  }

  render() {
    const {
      data, 
      currentDataIndex, 
      prevSlide, 
      nextSlide, 
      slideWay, 
      setting,
      slideRenderSwitcher,
      switchToSlideX, 
      slideRenderChange,
      handleSlideValueChange,
      goToSlideX,
      slideValue,
      toolkit,
      handleChange,
      handleSubmit,
      inputValue,
      multipleSlides } = this.props;
    const {way} = this.state;

    const slides = this.slideRenderingService.makeSlides(data, currentDataIndex, this.props.multipleSlides);
    
    const numberOfSlides = this.props.multipleSlides ? 2 : 1;
    let swipeStyles = {
      transform: `translateX(${slideWay/numberOfSlides}%)`
    };
    if (slideRenderChange && way === 0) {  
      swipeStyles = this.props.multipleSlides ? {transform: `translateX(-50%)`} : 
      {transform: `translateX(-100%)`}      
    }
    else if (way !== 0 && !switchToSlideX) {
      const swipeWidth = slideWay + way;
      swipeStyles = {
        transform: `translateX(${swipeWidth/numberOfSlides}%)`,
        transition: `transform ease-out 0.45s`
      }
    }
    if (data.length === 1) swipeStyles = {transform: `translateX(0)`} 

    return(
      <div className="slider-wrapper">
        <div 
          className={"slider"} 
          style={swipeStyles} 
          onTouchStart={this.handleTouchStart}
          onTouchEnd={this.handleTouchEnd}
        >
          {slides}
        </div>
        <button className="button prev-button slide-button" onClick={prevSlide}>PREV</button>
        <button className="button next-button slide-button" onClick={nextSlide}>NEXT</button>
        <Toolkit 
          setting={setting}
          toolkit={toolkit}
        />
        <SlideRenderSetting 
          multipleSlides={multipleSlides}
          slideRenderSwitcher={slideRenderSwitcher}
          toolkit={toolkit}
        />
        <ImgSubmitForm
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          inputValue={inputValue}
          toolkit={toolkit}
        />
        <SlideSwitcher 
          handleSlideValueChange={handleSlideValueChange}
          goToSlideX={goToSlideX}
          slideValue={slideValue}
          toolkit={toolkit}
        />
        <SlideCounter 
          currentDataIndex={currentDataIndex}
          data={data}
          multipleSlides={multipleSlides}
          toolkit={toolkit}
        />
      </div>
    )
  }
}
