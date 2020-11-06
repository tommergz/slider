import React from 'react';
import { Component } from 'react';
import './slider.css';
import SlideRenderingService from './slider-services/slide-rendering-service';
import SlideRenderSetting from './slide-render-setting/slide-render-setting';
import ImgSubmitForm from './img-submit-form/img-submit-form';
import SlideSwitcher from './slide-switcher/slide-switcher';
import SlideCounter from './slide-counter/slide-counter';
import Toolkit from './toolkit/toolkit';

export default class Slider extends Component {

  swipe = 0;

  slideRenderingService = new SlideRenderingService();

  newSliderPosition = () => {
    if (this.props.switchToSlideX) {
      this.props.goToSlideX()
    } else {
      if (this.props.slide === 0 || this.props.slide === -50) setTimeout(() => this.props.prevSlide())
      else if (this.props.slide < -100) {
        setTimeout(() => this.props.nextSlide())
      }
    }
  }

  componentDidMount() {
    const sliderBlock = document.getElementById('slider')
    sliderBlock.addEventListener('transitionend', this.newSliderPosition)    
  }

  componentDidUpdate(prevProps) {
    if (this.props.switchToSlideX && this.props.switchToSlideX !== prevProps.switchToSlideX) {
      const value = this.props.slideValue - 1;
      if (this.props.currentDataIndex - value > 0) {
        this.props.moveLeft()
      }
      else if (this.props.currentDataIndex - value < 0) {
        this.props.moveRight()
      }
    }
  }
  
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
      slide,
      transitionXstyle,
      moveLeft,
      moveRight, 
      setting,
      slideRenderSwitcher,
      switchToSlideX, 
      handleSlideValueChange,
      goToSlideX,
      slideValue,
      toolkit,
      handleChange,
      handleSubmit,
      inputValue,
      multipleSlides,
      moveToSlideX,
      slideDifference } = this.props;

    const slides = this.slideRenderingService.makeSlides(data, currentDataIndex, this.props.multipleSlides, switchToSlideX, slideValue, slideDifference);
    
    let swipeStyles = {
      transform: `translateX(${slide}%)`,
      transition: `transform ease-out ${transitionXstyle}s`
    };

    return(
      <div className="slider-wrapper">
        <div 
          id={"slider"}
          className={"slider"} 
          style={swipeStyles} 
          onTouchStart={this.handleTouchStart}
          onTouchEnd={this.handleTouchEnd}
        >
          {slides}
        </div>
        <button className="button prev-button slide-button" onClick={moveLeft}>PREV</button>
        <button className="button next-button slide-button" onClick={moveRight}>NEXT</button>
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

          moveToSlideX={moveToSlideX}
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
