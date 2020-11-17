import React from 'react';
import './swipe-setting.css';
import swipeIcon from '../../../assets/icons/swipe.svg';
import motionless from '../../../assets/icons/motionless.svg';

const SwipeSetting = ({swipeSetting, moving, allSvgsLoaded}) => {
  const swiping = moving ? swipeIcon : motionless;
  return(
    <div className="swipe-setting">
      <button className="swipe-setting-button button setting-button" onClick={swipeSetting}>
        <img src={swiping} alt="Swipe settings" className={"swipe-setting-image svg-element setting-svg" + allSvgsLoaded}></img>
      </button>
    </div>
  )
}

export default React.memo(SwipeSetting);