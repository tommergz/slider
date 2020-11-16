import React from 'react';
import './toolkit.css';
import settingsIcon from '../../../assets/icons/settings.svg';

const ToolKit = ({setting}) => {
  return(
    <div className="toolkit">
      <button className="toolkit-button button setting-button" onClick={setting}>
        <img src={settingsIcon} alt="Settings"></img>
      </button>
    </div>
  )
}

export default ToolKit;