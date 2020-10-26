import React from 'react';
import './slide-counter.css';

const SlideCounter = ({currentDataIndex, data}) => {
  return(
    <div className="slide-counter">
      <p>{currentDataIndex + 1}/{data.length}</p>
    </div>
  )
}

export default SlideCounter;