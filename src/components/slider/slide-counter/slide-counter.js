import React from 'react';
import './slide-counter.css';

const SlideCounter = ({currentDataIndex, data, multipleSlides, toolkit}) => {
  const windowWidth = window.innerWidth;
  const counterPosition = !toolkit ? ' counter-position' : '';
  const slideCounterStyles = windowWidth < 800 && !toolkit ? {top: '100px', bottom: 'auto'} : {}
  let secondSlide;

  if (multipleSlides) {
    secondSlide = currentDataIndex === data.length - 1 ? 1 : currentDataIndex + 2
  }
  return(
    <div className={"slide-counter" + counterPosition} style={slideCounterStyles}>
      {multipleSlides && data.length > 1 ?
        <p>{currentDataIndex + 1},{secondSlide}/{data.length}</p> :
        <p>{currentDataIndex + 1}/{data.length}</p>
      }   
    </div>
  )
}

export default SlideCounter;