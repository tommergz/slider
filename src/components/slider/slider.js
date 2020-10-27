import React from 'react';
import './slider.css';
import { Component } from 'react';

export default class App extends Component {

  state = {
    way: 0
  }

  swipe = 0;

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.currentDataIndex !== nextProps.currentDataIndex ||
     this.props.slideWay !== nextProps.slideWay || 
     this.props.multipleSlides !== nextProps.multipleSlides ||
     this.props.data !== nextProps.data ||
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

  getWidth = () => window.innerWidth;

  makeSlides = (data, currentDataIndex) => {
    const slideStyle = this.props.multipleSlides ? 'multi-slide' : 'slide'
    const slidesMap = (arr) => {
      return arr.map((item, index) => {
        return (
          <div key={+Date.now().toString() + index} className={slideStyle}>
            <img className="image" src={item} />
          </div>
        )
      })
    }
    console.log(currentDataIndex)
    const allData = [...data];
    let newData = [];
    const length = allData.length;
    const addExtraSlides = this.props.multipleSlides;
    const extraSlides = addExtraSlides ? 3 : 2
    if (length) {
      if (length === 1) return slidesMap(allData);
      if (currentDataIndex === 0) {
        newData = allData.slice(0, extraSlides);
        newData.unshift(allData[allData.length-1]);
        if (addExtraSlides) newData.push(allData[0])
      } else if (currentDataIndex === allData.length - 1) {
        newData = allData.slice(-2)
        newData.push(allData[0])
        if (addExtraSlides) newData.push(allData[1])
      } else {
        if (currentDataIndex === length - 2 && addExtraSlides) {
          newData = allData.slice(currentDataIndex - 1, currentDataIndex + 2)
          newData.push(allData[0])
        } else {
          newData = allData.slice(currentDataIndex - 1, currentDataIndex + extraSlides)
        }        
      }       
      return slidesMap(newData);
    } else {
      return slidesMap(newData);
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
    const {data, currentDataIndex, prevSlide, nextSlide, slideWay, switchToSlideX, slideRenderChange} = this.props;
    const {way} = this.state;
    const slides = this.makeSlides(data, currentDataIndex);
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
    // console.log(this.multipleSlides)
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
        <button className="button prev-button" onClick={prevSlide}>PREV</button>
        <button className="button next-button" onClick={nextSlide}>NEXT</button>
      </div>
    )
  }
}
