import React from 'react';
import './pointer.css';
import leftSwipe from '../../../../assets/icons/left-swipe.svg';
import rightSwipe from '../../../../assets/icons/right-swipe.svg';
import arrows from '../../../../assets/icons/arrows.svg';

const Pointer = ({direction, mouseUpAction, handleMouseMove, handleTouchMove, swipeStart, pointerPositionX, pointerPositionY}) => {

  const handleMouseUp = (e) => {
    if (e.type === 'mouseup') e.preventDefault();
    const x = e.type === 'touchend' ? e.touches[0].pageX : e.clientX;
    const swipeLength = x - swipeStart;
    mouseUpAction(swipeLength)
  }
  
  const pointerPositionStyles = {
    left: `${pointerPositionX - 50}px`,
    top: `${pointerPositionY - 50}px`
  }

  const rightSwipeVisibility = direction === 'right' ?  {display: 'block'} : {display: 'none'};
  const leftSwipeVisibility = direction === 'left' ?  {display: 'block'} : {display: 'none'};
  const arrowsVisibility = direction === 'center' ?  {display: 'block'} : {display: 'none'};
  return(
    <div className="pointer" onMouseMove={handleMouseMove} onTouchMove={handleTouchMove} onMouseUp={handleMouseUp} onTouchEnd={handleMouseUp} style={pointerPositionStyles}>
      <img src={leftSwipe} alt="Swipe" className="swipe-arrow" style={leftSwipeVisibility}></img>
      <img src={rightSwipe} alt="Swipe" className="swipe-arrow" style={rightSwipeVisibility}></img>
      <img src={arrows} alt="Swipe" className="swipe-arrow" style={arrowsVisibility}></img>
    </div>
  )
}

export default Pointer;