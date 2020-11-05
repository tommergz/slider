import React from 'react';
import './toolkit.css';

const ToolKit = ({setting, toolkit}) => {
  const toolkitLighting = toolkit ? ' toolkit-lighting' : '';
  return(
    <div className="toolkit">
      <button className={"toolkit-button button" + toolkitLighting} onClick={setting}>Toolkit</button>
    </div>
  )
}

export default ToolKit;