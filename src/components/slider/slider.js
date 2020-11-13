import React from 'react';
import { Component } from 'react';
import './slider.css';
import SlideList from './slide-list/slide-list';
import SlideRenderSetting from './slide-render-setting/slide-render-setting';
import ImgSubmitForm from './img-submit-form/img-submit-form';
import SlideSwitcher from './slide-switcher/slide-switcher';
import SlideCounter from './slide-counter/slide-counter';
import Toolkit from './toolkit/toolkit';
import Pointer from './pointer/pointer';
import leftArrow from '../../assets/icons/left-arrow.svg';
import rightArrow from '../../assets/icons/right-arrow.svg';

export default class Slider extends Component {

  state = {
    data: [
      ['image', 'https://images.unsplash.com/photo-1440582096070-fa5961d9d682?ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80'],
      ['image', 'https://images.unsplash.com/photo-1446482932150-b7ff60bab8e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80'],
      ['image', 'https://images.unsplash.com/photo-1539191863632-8caef441bfc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80'],
      ['image', 'https://images.unsplash.com/photo-1588095938732-5463642ce960?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'],
      ['image', 'https://images.unsplash.com/photo-1550934172-beb213c78c11?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'],
      ['image', 'https://images.unsplash.com/photo-1568164651648-d90699a5182d?ixlib=rb-1.2.1&auto=format&fit=crop&w=966&q=80'],
      ['image', 'https://images.unsplash.com/photo-1604599340287-2042e85a3802?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80'],
      ['image', 'https://images.unsplash.com/photo-1588343710499-948bbeb14ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=1189&q=80'],
    ],
    currentDataIndex: 3,
    slide: -100,
    transitionXstyle: 0,
    inputValue: '',
    slideValue: '',
    switchToSlideX: false,
    multipleSlides: false,
    toolkit: true,
    slideDifference: 0,
    direction: '',
    mousePressed: false,
    swipeStart: 0,
    contentLoaded: 0,
    showSlides: false,
    disabledInput: false,
    pointerPositionX: 0,
    pointerPositionY: 0
  }

  contentLoading = (data) => {
    for (let i = 0; i < data.length; i++) {
      let newImg = new Image();
      newImg.src = data[i][1];
      newImg.onload = () => { 
        if (this.state.contentLoaded === data.length - 1) {
          this.setState( (state) => ({

            showSlides: true
          }) ) 
        }
        else {
          this.setState( (state) => ({contentLoaded : state.contentLoaded + 1}) ) 
        }
      }
    }
  }

  componentDidMount() {
    const sliderBlock = document.getElementById('slider')
    sliderBlock.addEventListener('transitionend', this.newSliderPosition)    
  }

  componentDidUpdate(prevPorps, prevState) {
    if (this.state.switchToSlideX && this.state.switchToSlideX !== prevState.switchToSlideX) {
      const value = this.state.slideValue - 1;
      if (this.state.currentDataIndex - value > 0) {
        this.moveLeft()
      }
      else if (this.state.currentDataIndex - value < 0) {
        this.moveRight()
      }
    }
  }

  moveLeft = () => {
    this.setState((state) => ({
      mousePressed: false,
      direction: '',
      slide: state.multipleSlides ? state.slideDifference > 1 ? 0 : -50 : 0,
      transitionXstyle: 0.5,
      disabledInput: true
    }))
  }

  moveRight = () => {
    this.setState((state) => ({
      mousePressed: false,
      direction: '',
      slide: state.multipleSlides ? state.slideDifference < -1 ? -200 : -150 : -200,
      transitionXstyle: 0.5,
      disabledInput: true
    }))
  }

  prevSlide = () => {
    if (this.state.data.length > 1) {
      this.setState( (state) => ({
        currentDataIndex : state.currentDataIndex > 0 ? state.currentDataIndex - 1 : state.data.length - 1,
        slide: -100,
        switchToSlideX: false,
        transitionXstyle: 0,
        disabledInput: false
      }) ) 
    }
  }

  nextSlide = () => {
    if (this.state.data.length > 1) {
      this.setState( (state) => ({
        currentDataIndex : state.currentDataIndex < state.data.length - 1 ? state.currentDataIndex + 1 : 0,
        slide: -100,
        switchToSlideX: false,
        transitionXstyle: 0,
        disabledInput: false
      }) ) 
    }
  }

  handleChange = (e) => {
    this.setState({inputValue: e.target.value});
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const link = this.state.inputValue;
    const newItem = ['image', link]
    this.setState(({data}) => {
      const newData = [
        ...data,
        newItem
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
      slideDifference: 0,
      disabledInput: false
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


  newSliderPosition = () => {
    if (this.state.switchToSlideX) {
      this.goToSlideX()
    } else {
      if (this.state.slide === 0 || this.state.slide === -50) setTimeout(() => this.prevSlide())
      else if (this.state.slide < -100) {
        setTimeout(() => this.nextSlide())
      }
    }
  }

  swipeFunction = (swipeLength) => {
    if (swipeLength > 0) {
      this.moveLeft()
    } else {
      this.moveRight()
    }
  }

  handleMouseDown = (e) => {
    e.preventDefault();
    if (this.state.slide === -100) {
      this.setState({
        mousePressed: true,
        direction: 'center',
        swipeStart: e.clientX
      })
    }
  }

  getCoords = (x, y) => {
    if (this.state.slide === -100) {
      this.setState({
        pointerPositionX: x,
        pointerPositionY: y
      })
    }
  }

  pointMove = (swipeLength) => {
    if (Math.abs(swipeLength) > 150) {
      if (swipeLength > 0) {
        this.setState({
          direction: 'left',
        })
      } else {
        this.setState({
          direction: 'right',
        })
      }
    } else {
      this.setState({
        direction: 'center',
      })    
    }
  }

  handleMouseMove = (e) => {
    e.preventDefault();
    this.getCoords(e.clientX, e.clientY);
    if (this.state.mousePressed) {
      const swipeLength = e.clientX - this.state.swipeStart;
      this.pointMove(swipeLength)
    }
  }

  mouseUpAction = (swipeLength) => {
    if (Math.abs(swipeLength) > 150) {
      this.swipeFunction(swipeLength)
    } else {
      this.setState({
        mousePressed: false,
        direction: ''
      })  
    }
  }

  handleMouseUp = (e) => {
    e.preventDefault();
    const swipeLength = e.clientX - this.state.swipeStart;
    if (this.state.mousePressed) this.mouseUpAction(swipeLength)
  }

  handleMouseLeave = (e) => {
    if (this.state.mousePressed) {
      const x = e.clientX;
      const y = e.clientY;
      const xCenter = window.innerWidth/2;
      const yCenter = window.innerHeight/2;
      
      if (x < xCenter - 60 || x > xCenter + 60 || y < yCenter - 60 || y > yCenter + 60) {
        this.setState({
          mousePressed: false,
          direction: ''
        })  
      }
    }
  }
  
  handleTouchStart = (e) => {
    const x = e.touches[0];
    this.state.swipeStart = x.pageX
  }

  handleTouchEnd = (e) => {
    const x = e.changedTouches[0].pageX;
    const swipeLength = x - this.state.swipeStart;
    if (Math.abs(swipeLength) > 50) this.swipeFunction(swipeLength)
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
      slideDifference,
      direction,   
      showSlides,
      disabledInput,
      pointerPositionX,
      pointerPositionY } = this.state;

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
          onTouchMove={this.handleTouchMove}
          onTouchEnd={this.handleTouchEnd}
          onMouseDown={this.handleMouseDown}
          onMouseMove={this.handleMouseMove}
          onMouseUp={this.handleMouseUp}
          onMouseLeave={this.handleMouseLeave}
        >
          <SlideList 
            data={data}
            currentDataIndex={currentDataIndex}
            multipleSlides={multipleSlides}
            switchToSlideX={switchToSlideX}
            slideValue={slideValue}
            slideDifference={slideDifference}
            transitionXstyle={transitionXstyle}

            contentLoading={this.contentLoading}
            showSlides={showSlides}
          />
        </div>
        <Pointer 
          direction={direction}
          pointerMouseUp={this.pointerMouseUp}
          mouseUpAction={this.mouseUpAction}
          handleMouseMove={this.handleMouseMove}
          handleTouchMove={this.handleTouchMove}
          swipeStart={this.state.swipeStart}
          pointerPositionX={pointerPositionX}
          pointerPositionY={pointerPositionY}
        />
        <button className="button prev-button slide-button" onClick={this.moveLeft}>
          <img src={leftArrow} alt="Left arrow" className="arrow"></img>
        </button>
        <button className="button next-button slide-button" onClick={this.moveRight}>
          <img src={rightArrow} alt="Righ arrow" className="arrow"></img>
        </button>
        <Toolkit 
          setting={this.setting}
          toolkit={toolkit}
        />
        <SlideRenderSetting 
          multipleSlides={multipleSlides}
          slideRenderSwitcher={this.slideRenderSwitcher}
          toolkit={toolkit}
        />
        <ImgSubmitForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          inputValue={inputValue}
          toolkit={toolkit}
        />
        <div className="slide-switcher-and-counter-block">
          <SlideCounter 
            currentDataIndex={currentDataIndex}
            data={data}
            multipleSlides={multipleSlides}
            toolkit={toolkit}
          />
          <SlideSwitcher 
            handleSlideValueChange={this.handleSlideValueChange}
            slideValue={slideValue}
            toolkit={toolkit}
            moveToSlideX={this.moveToSlideX}
            disabledInput={disabledInput}
          />
        </div>
      </div>
    )
  }
}