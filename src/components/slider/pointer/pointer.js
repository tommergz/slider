import React from 'react';
import './pointer.css';
import leftSwipe from '../../../assets/icons/left-swipe.svg';
import rightSwipe from '../../../assets/icons/right-swipe.svg';
import arrows from '../../../assets/icons/arrows.svg';

const Pointer = ({direction, mouseUpAction, handleMouseMove, swipeStart}) => {

  const handleMouseUp = (e) => {
    e.preventDefault();
    const swipeLength = e.clientX - swipeStart;
    mouseUpAction(swipeLength)
  }

  const rightSwipeVisibility = direction === 'right' ?  {display: 'block'} : {display: 'none'};
  const leftSwipeVisibility = direction === 'left' ?  {display: 'block'} : {display: 'none'};
  const arrowsVisibility = direction === 'center' ?  {display: 'block'} : {display: 'none'};
  return(
    <div className="direction" onMouseMove={handleMouseMove} onMouseUp={handleMouseUp}>
      <img src={leftSwipe} alt="Settings" className="swipe-arrow" style={leftSwipeVisibility}></img>
      <img src={rightSwipe} alt="Settings" className="swipe-arrow" style={rightSwipeVisibility}></img>
      <img src={arrows} alt="Settings" className="swipe-arrow" style={arrowsVisibility}></img>
    </div>
  )
}

export default Pointer;