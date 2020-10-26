import React from 'react';
import './form.css';

const Form = ({handleSubmit, handleChange, inputValue}) => {
  return(
    <div className="form-wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Add img URL" 
          className="img-url-input" 
          onChange={handleChange}
          value={inputValue}
        />
        <button className="add-task-button" type="type">Add</button>
      </form>
    </div>
  )
}

export default Form;