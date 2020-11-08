import React from 'react';
import './slide-switcher.css';
import goToSlideXsvg from '../../../assets/icons/go-to-slide-x.svg';

const SlideSwitcher = ({handleSlideValueChange, goToSlideX, slideValue, toolkit, moveToSlideX}) => {
  const visibility = toolkit ? '' : ' invisible';
  return(
    <div className={"slide-switcher-wrapper" + visibility}>
      <form className="form" onSubmit={moveToSlideX}>
        <input 
          type="text" 
          placeholder="Type slide number" 
          className="slide-number-input input" 
          onChange={handleSlideValueChange}
          value={slideValue}
        />
        <button className="slide-number-button button" type="type">
          <img src={goToSlideXsvg} alt="Slide switcher" className="slide-switcher-button"></img>
        </button>
      </form>
    </div>
  )
}

export default SlideSwitcher;