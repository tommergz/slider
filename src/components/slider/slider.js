import React from 'react';
import './slider.css';
import { Component } from 'react';

const Slider = ({data, currentDataIndex, openSlider, prevSlide, nextSlide, slide}) => {
  return(
    <div className="slider-wrapper">
      <div className="slide">
        <img className="image" src={data[currentDataIndex]} />
      </div>
      <button className="button prev-button" onClick={prevSlide}>PREV</button>
      <button className="button next-button" onClick={nextSlide}>NEXT</button>
    </div>
  )
}

export default Slider;

// export default class App extends Component {

//   state = {
//     slideWay: null
//   }

//   // static getDerivedStateFromProps(props, state) {
//   //   if (props.currentDataIndex !== state.currentDataIndex) {
//   //     return {
//   //       slideWay: null,
//   //       currentDataIndex: props.currentDataIndex
//   //     };
//   //   } 
//   // }

//   shouldComponentUpdate(nextProps, nextState) {
//     return this.props.currentDataIndex !== nextProps.currentDataIndex ||
//      this.state.slideWay === null 
//   }

//   componentDidUpdate() {
//     let slideSide = this.props.slide === 0 ? '' : this.props.slide < 0 ? 'right-slide' : 'left-slide';
//     if (slideSide !== this.state.slideWay) {
//       setTimeout(() => {
//         this.setState({
//           slideWay: slideSide
//         })
//       })
//     } else {
//       this.setState({
//         slideWay: null
//       })
//     }
//   }

//   makeSlides = (data, currentDataIndex) => {

//     const slidesMap = (arr) => {
//       return arr.map((item, index) => {
//         return (
//           <div key={+Date.now().toString() + index} className="slide">
//             <img className="image" src={item} />
//           </div>
//         )
//       })
//     }

//     const allData = [...data];
//     let newData = [];
//     const length = allData.length;
//     if (length) {
//       if (currentDataIndex === 0) {
//         newData = allData.slice(0, 2);
//       } else if (currentDataIndex === allData.length - 1) {
//         newData = allData.slice(-2)
//       } else {
//         if (this.props.slide === 0) {
//           newData = allData.slice(currentDataIndex - 1, currentDataIndex + 2 )
//         } else {
//           newData = allData.slice(currentDataIndex - 2, currentDataIndex + 1 )
//         }
//       }       
//       return slidesMap(newData);
//     } else {
//       return slidesMap(newData);
//     }
//   }

//   render() {
//     const {data, currentDataIndex, openSlider, prevSlide, nextSlide, slide} = this.props;
//     const slides = this.makeSlides(data, currentDataIndex);

//     console.log(slide)
//     return(
      
//       <div>
//         <div className="slider-wrapper">
//           <div className={"slider " + this.state.slideWay}>
//           {/* <div className={"slider " + slideSide}> */}
//             {slides}
//           </div>
//           <button className="button prev-button" onClick={prevSlide}>PREV</button>
//           <button className="button next-button" onClick={nextSlide}>NEXT</button>
//         </div>
//       </div>
//     )
//   }
// }
