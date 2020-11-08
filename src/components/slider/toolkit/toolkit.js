import React from 'react';
import './toolkit.css';
import settingsIcon from '../../../assets/icons/settings.svg';

const ToolKit = ({setting, toolkit}) => {
  const toolkitLighting = toolkit ? ' toolkit-lighting' : '';
  return(
    <div className="toolkit">
      <button className={"toolkit-button button" + toolkitLighting} onClick={setting}>
        <img src={settingsIcon} alt="Settings"></img>
      </button>
    </div>
  )
}

export default ToolKit;