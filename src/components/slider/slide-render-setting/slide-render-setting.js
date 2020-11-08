import React from 'react';
import './slide-render-setting.css';
import slide from '../../../assets/icons/slide.svg';
import slides from '../../../assets/icons/slides.svg';

const SlideRenderSetting = ({multipleSlides, slideRenderSwitcher, toolkit}) => {
  const pressedYesButton = multipleSlides ? ' disabled' : '';
  const pressedNoButton = !multipleSlides ? ' disabled' : '';
  const visibility = toolkit ? '' : ' invisible';
  return(
    <div className={"slide-render-setting-wrapper" + visibility}>
      <div className="slide-render-setting-buttons">
        <button disabled={multipleSlides} className={"slide-render-setting-button button" + pressedYesButton} onClick={slideRenderSwitcher}>
          <img src={slides} alt="Slides"></img>
        </button>
        <button disabled={!multipleSlides} className={"slide-render-setting-button button" + pressedNoButton} onClick={slideRenderSwitcher}>
          <img src={slide} alt="Slide"></img>
        </button>
      </div>
    </div>
  )
}

export default SlideRenderSetting;