import React from 'react';
import { Component } from 'react';
import './slider.css';
import SlideList from './slide-list/slide-list';
import SlideRenderSetting from './slide-render-setting/slide-render-setting';
import ImgSubmitForm from './img-submit-form/img-submit-form';
import SlideSwitcher from './slide-switcher/slide-switcher';
import SlideCounter from './slide-counter/slide-counter';
import Toolkit from './toolkit/toolkit';
import Pointer from './pointers/pointer/pointer';
import FollowingPointer from './pointers/following-pointer/following-pointer';
import SwipeSetting from './swipe-setting/swipe-setting';

import leftArrow from '../../assets/icons/left-arrow.svg';
import rightArrow from '../../assets/icons/right-arrow.svg';
import leftSwipe from '../../assets/icons/left-swipe.svg';
import rightSwipe from '../../assets/icons/right-swipe.svg';
import arrows from '../../assets/icons/arrows.svg';

import svgs from '../../assets/collections/icons';

export default class Slider extends Component {

  static getDerivedStateFromProps(props, state){
    const newData = props.children;
    if( props.children !== state.reicievedContent){
        return {
          ...state, ...{reicievedContent: newData, data: newData}
        }
    }
    return null;
  }

  state = {
    reicievedContent: [],
    data: [],
    allSvgsLoaded: '',
    svgsLoaded: 0,
    currentDataIndex: 5,
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
    disabledInput: false,
    pointerPositionX: 0,
    pointerPositionY: 0,
    slideSwiping: false,
    moving: true
  }

  componentDidMount() {
    const sliderBlock = document.getElementById('slider');
    sliderBlock.addEventListener('transitionend', this.newSliderPosition);
    this.contentLoading(svgs);
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

  contentLoading = (data) => {
    for (let i = 0; i < data.length; i++) {
      let newImg = new Image();
      newImg.src = data[i].default;
      newImg.onload = () => { 
        if (this.state.svgsLoaded === data.length - 2) {
          this.setState({
            allSvgsLoaded: ' visible-element'
          }) 
        }
        else {
          this.setState( (state) => ({svgsLoaded : state.svgsLoaded + 1}) ) 
        }
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

  swipeSetting = () => {
    this.setState(({moving}) => {
      return {
        moving: !moving
      }
    })
  }

  newSliderPosition = () => {
    this.setState({
      pointerPositionX: this.pointerPositionX,
      pointerPositionY: this.pointerPositionY
    })
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

  pointerPositionX = 0;
  pointerPositionY = 0;

  getCoords = (x, y) => {
    if (this.state.slide === -100) {
      this.setState({
        pointerPositionX: x,
        pointerPositionY: y
      })
    } else {
      this.pointerPositionX = x;
      this.pointerPositionY = y;
    }
  }

  pointMove = (swipeLength) => {
    if (Math.abs(swipeLength) > 150) {
      if (swipeLength > 0) {
        this.setState({
          direction: 'right',
          slideSwiping: true
        })
      } else {
        this.setState({
          direction: 'left',
          slideSwiping: true
        })
      }
    } else {
      this.setState({
        direction: 'center',
        slideSwiping: true
      })    
    }
  }

  mouseUpAction = (swipeLength) => {
    if (Math.abs(swipeLength) > 150) {
      this.swipeFunction(swipeLength)
    } else {
      this.setState({
        mousePressed: false,
        direction: '',
        slideSwiping: false
      })  
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

  handleMouseMove = (e) => {
    e.preventDefault();
    const x = e.clientX;
    const y = e.clientY;
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    this.getCoords(x, y);

    if (this.state.mousePressed) {
      const swipeLength = x - this.state.swipeStart;

      if (x < 50 || x > windowWidth - 50 || y < 50 || y > windowHeight - 50) {
        this.setState({
          mousePressed: false,
          direction: '',
          slideSwiping: false
        })  
      } else {
        this.pointMove(swipeLength)
      }
    }
  }

  
  pointerRef = React.createRef();
  followingPointerRef = React.createRef();
  pointerImageRef = React.createRef();
  followingPointerImageRef = React.createRef();
  
  pointerPosition = (x, y) => {
    this.pointerRef.current.style = `left: ${x - 50}px; top: ${y - 50}px`;
    this.followingPointerRef.current.style = `left: ${x - 50}px; top: ${y - 50}px`;
  }

  pointerDirection = (swipeLength) => {
    if (swipeLength < -50) {
      this.pointerImageRef.current.src = leftSwipe;
      this.followingPointerImageRef.current.src = leftSwipe;
    }      
    else if (swipeLength > 50) {
      this.pointerImageRef.current.src = rightSwipe;
      this.followingPointerImageRef.current.src = rightSwipe;
    }
    else {
      this.pointerImageRef.current.src = arrows;
      this.followingPointerImageRef.current.src = arrows;
    }
  }

  handleTouchStart = (e) => {
    const x = e.touches[0].pageX;
    const y = e.touches[0].pageY;
    this.state.swipeStart = x;
    if (this.state.slide === -100) {
      this.pointerPosition(x, y);
      this.pointerPosition(x, y);
      this.pointerImageRef.current.src = arrows;
      this.followingPointerImageRef.current.src = arrows;
    }
  }

  handleTouchMove = (e) => {
    if (this.state.slide === -100) {
      const x = e.changedTouches[0].pageX; 
      const y = e.changedTouches[0].pageY;

      this.pointerPosition(x, y);
      this.pointerPosition(x, y);
      let swipeLength = x - this.state.swipeStart;
      
      this.pointerDirection(swipeLength)
    }
  }

  handleTouchEnd = (e) => {
    const x = e.changedTouches[0].pageX;
    const swipeLength = x - this.state.swipeStart;
    document.getElementById("pointer").style.display = "none";
    document.getElementById("following-pointer").style.display = "none";
    if (Math.abs(swipeLength) > 50) this.swipeFunction(swipeLength);
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
      disabledInput,
      pointerPositionX,
      pointerPositionY,
      slideSwiping,
      moving,
      allSvgsLoaded } = this.state;

    const swipeStyles = {
      transform: `translateX(${slide}%)`,
      transition: `transform ease-out ${transitionXstyle}s`
    };

    const sliderStyle = multipleSlides ? ' multi-slider' : '';

    return(
      <div className="slider-wrapper">
        <div ref={this.pointerRef} id="pointer" style={{display: 'none'}} className="pointer">
          <img ref={this.pointerImageRef} src={arrows} alt="Swipe" id="swipe-pointer" className="swipe-arrow"></img>
        </div>
        <div ref={this.followingPointerRef} id="following-pointer" style={{display: 'none'}} className="following-pointer">
          <img ref={this.followingPointerImageRef} src={arrows} alt="Swipe" id="following-swipe-pointer" className="swipe-arrow"></img>
        </div>
        <div 
          id={"slider"}
          className={"slider" + sliderStyle} 
          style={swipeStyles} 
          onTouchStart={moving ? this.handleTouchStart : null}
          onTouchMove={moving ? this.handleTouchMove : null}
          onTouchEnd={moving ? this.handleTouchEnd : null}
          onMouseDown={moving ? this.handleMouseDown : null}
          onMouseMove={moving ? this.handleMouseMove : null}
          onMouseUp={moving ? this.handleMouseUp : null}
          onMouseLeave={moving ? this.handleMouseLeave : null}
        >
          <SlideList 
            data={data}
            currentDataIndex={currentDataIndex}
            multipleSlides={multipleSlides}
            switchToSlideX={switchToSlideX}
            slideValue={slideValue}
            slideDifference={slideDifference}
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
        <FollowingPointer 
          slide={slide}
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
          <img src={leftArrow} alt="Left arrow" className={"arrow svg-element" + allSvgsLoaded}></img>
        </button>
        <button className="button next-button slide-button" onClick={this.moveRight}>
          <img src={rightArrow} alt="Righ arrow" className={"arrow svg-element" + allSvgsLoaded}></img>
        </button>
        <Toolkit 
          setting={this.setting}
          allSvgsLoaded={allSvgsLoaded}
        />
        <SwipeSetting 
          swipeSetting={this.swipeSetting}
          moving={moving}
          allSvgsLoaded={allSvgsLoaded}
        />
        <SlideRenderSetting 
          multipleSlides={multipleSlides}
          slideRenderSwitcher={this.slideRenderSwitcher}
          toolkit={toolkit}
          allSvgsLoaded={allSvgsLoaded}
        />
        {/* <ImgSubmitForm
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          inputValue={inputValue}
          toolkit={toolkit}
        /> */}
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
            allSvgsLoaded={allSvgsLoaded}
          />
        </div>
      </div>
    )
  }
}
