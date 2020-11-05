import React from 'react';
import './slide-render-setting.css';

const SlideRenderSetting = ({multipleSlides, slideRenderSwitcher, toolkit}) => {
  const pressedYesButton = multipleSlides ? ' disabled' : '';
  const pressedNoButton = !multipleSlides ? ' disabled' : '';
  const visibility = toolkit ? '' : ' invisible';
  return(
    <div className={"slide-render-setting-wrapper" + visibility}>
      <p>Show multiple slides on the screen</p>
      <div className="slide-render-setting-buttons">
        <button disabled={multipleSlides} className={"slide-render-setting-button button" + pressedYesButton} onClick={slideRenderSwitcher}>YES</button>
        <button disabled={!multipleSlides} className={"slide-render-setting-button button" + pressedNoButton} onClick={slideRenderSwitcher}>NO</button>
      </div>
    </div>
  )
}

export default SlideRenderSetting;