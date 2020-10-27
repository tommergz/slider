import React from 'react';
import './slide-render-setting.css';

const SlideRenderSetting = ({multipleSlides, slideRenderSwitcher}) => {

  return(
    <div className="slide-render-setting-wrapper">
      <p>Show multiple slides on the screen</p>
      <div className="slide-render-setting-buttons">
        <button disabled={multipleSlides} className="slide-render-setting-button" onClick={slideRenderSwitcher}>YES</button>
        <button disabled={!multipleSlides} className="slide-render-setting-button" onClick={slideRenderSwitcher}>NO</button>
      </div>
    </div>
  )
}

export default SlideRenderSetting;