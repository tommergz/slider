import React from 'react';
import './slide-counter.css';

const SlideCounter = ({currentDataIndex, data, multipleSlides}) => {
  let secondSlide;
  if (multipleSlides) {
    secondSlide = currentDataIndex === data.length - 1 ? 1 : currentDataIndex + 2
  }
  return(
    <div className="slide-counter">
      {multipleSlides && data.length > 1 ?
        <p>{currentDataIndex + 1},{secondSlide}/{data.length}</p> :
        <p>{currentDataIndex + 1}/{data.length}</p>
      }   
    </div>
  )
}

export default SlideCounter;