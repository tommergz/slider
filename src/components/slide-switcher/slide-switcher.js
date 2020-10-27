import React from 'react';
import './slide-switcher.css';

const SlideSwitcher = ({handleSlideValueChange, goToSlideX, slideValue}) => {
  return(
    <div className="slide-switcher-wrapper">
      <form className="form" onSubmit={goToSlideX}>
        <input 
          type="text" 
          placeholder="Type slide number" 
          className="slide-number-input" 
          onChange={handleSlideValueChange}
          value={slideValue}
        />
        <button className="add-task-button" type="type">Choose</button>
      </form>
    </div>
  )
}

export default SlideSwitcher;