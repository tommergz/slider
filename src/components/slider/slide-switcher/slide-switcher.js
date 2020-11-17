import React from 'react';
import './slide-switcher.css';
import goToSlideXsvg from '../../../assets/icons/go-to-slide-x.svg';

const SlideSwitcher = ({handleSlideValueChange, slideValue, toolkit, moveToSlideX, disabledInput, allSvgsLoaded}) => {
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
          disabled={disabledInput}
        />
        <button className="slide-number-button button" type="type">
          <img src={goToSlideXsvg} alt="Slide switcher" className={"slide-switcher-button svg-element" + allSvgsLoaded}></img>
        </button>
      </form>
    </div>
  )
}

export default React.memo(SlideSwitcher);