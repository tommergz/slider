import React from 'react';
import './slide-switcher.css';

const SlideSwitcher = ({handleSlideValueChange, goToSlideX, slideValue, toolkit}) => {
  const visibility = toolkit ? '' : ' invisible';
  return(
    <div className={"slide-switcher-wrapper" + visibility}>
      <form className="form" onSubmit={goToSlideX}>
        <input 
          type="text" 
          placeholder="Type slide number" 
          className="slide-number-input input" 
          onChange={handleSlideValueChange}
          value={slideValue}
        />
        <button className="slide-number-button button" type="type">Choose</button>
      </form>
    </div>
  )
}

export default SlideSwitcher;