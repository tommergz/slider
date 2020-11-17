import React from 'react';
import './toolkit.css';
import settingsIcon from '../../../assets/icons/settings.svg';

const ToolKit = ({setting, allSvgsLoaded}) => {
  return(
    <div className="toolkit">
      <button className="toolkit-button button setting-button" onClick={setting}>
        <img src={settingsIcon} alt="Settings" className={"svg-element setting-svg" + allSvgsLoaded}></img>
      </button>
    </div>
  )
}

export default React.memo(ToolKit);