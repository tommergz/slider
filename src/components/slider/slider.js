import React from 'react';
import './slider.css';
import { Component } from 'react';

// const Slider = ({data, currentDataIndex, openSlider, prevSlide, nextSlide, slide}) => {
//   return(
//     <div className="slider-wrapper">
//       <div className="slide">
//         <img className="image" src={data[currentDataIndex]} />
//       </div>
//       <button className="button prev-button" onClick={prevSlide}>PREV</button>
//       <button className="button next-button" onClick={nextSlide}>NEXT</button>
//     </div>
//   )
// }

// export default Slider;

export default class App extends Component {

  state = {
    way: 0
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props.currentDataIndex !== nextProps.currentDataIndex ||
     this.props.slideWay !== nextProps.slideWay || 
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

    const slidesMap = (arr) => {
      return arr.map((item, index) => {
        return (
          <div key={+Date.now().toString() + index} className="slide">
            <img className="image" src={item} />
          </div>
        )
      })
    }

    const allData = [...data];
    let newData = [];
    const length = allData.length;
    if (length) {
      if (currentDataIndex === 0) {
        newData = allData.slice(0, 2);
        newData.unshift(allData[allData.length-1])
      } else if (currentDataIndex === allData.length - 1) {
        newData = allData.slice(-2)
        newData.push(allData[0])
      } else {
        if (this.props.slide === 0) {
          newData = allData.slice(currentDataIndex - 1, currentDataIndex + 2 )
        } else {
          newData = allData.slice(currentDataIndex - 1, currentDataIndex + 2 )
        }
      }       
      return slidesMap(newData);
    } else {
      return slidesMap(newData);
    }
  }

  render() {
    const {data, currentDataIndex, openSlider, prevSlide, nextSlide, slide, slideWay} = this.props;
    const {way} = this.state;
    const slides = this.makeSlides(data, currentDataIndex);
    let swipeStyles = {
      transform: `translateX(${slideWay}%)`
    };
    if (way !== 0) {
      const swipeWidth = slideWay + way;
        swipeStyles = {
          transform: `translateX(${swipeWidth}%)`,
          transition: `transform ease-out 0.45s`
        }
    }
    console.log(currentDataIndex)
    return(
      <div>
        <div className="slider-wrapper">
          <div className={"slider "} style={swipeStyles}>
          {/* <div className={"slider " + slideSide}> */}
            {slides}
          </div>
          <button className="button prev-button" onClick={prevSlide}>PREV</button>
          <button className="button next-button" onClick={nextSlide}>NEXT</button>
        </div>
      </div>
    )
  }
}
