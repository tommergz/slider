import React from 'react';
import './img-submit-form.css';
import click from '../../../assets/icons/click.svg';

const ImgSubmitForm = ({handleSubmit, handleChange, inputValue, toolkit}) => {
  const visibility = toolkit ? '' : ' invisible';
  return(
    <div className={"form-wrapper" + visibility}>
      <form className="form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Add img URL" 
          className="img-url-input input" 
          onChange={handleChange}
          value={inputValue}
        />
        <button className="add-img-button button" type="type">
          <img src={click} alt="Click" className="click"></img>
        </button>
      </form>
    </div>
  )
}

export default ImgSubmitForm;