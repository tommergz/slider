import React from 'react';
import './img-submit-form.css';

const ImgSubmitForm = ({handleSubmit, handleChange, inputValue}) => {
  return(
    <div className="form-wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Add img URL" 
          className="img-url-input input" 
          onChange={handleChange}
          value={inputValue}
        />
        <button className="add-img-button button" type="type">Add</button>
      </form>
    </div>
  )
}

export default ImgSubmitForm;