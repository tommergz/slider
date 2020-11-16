import React, { Component } from 'react';
import './app.css';
import Slider from '../slider/slider';

export default class App extends Component {
  render() {
    const sliderContent = [
      <img key={+Date.now().toString() * 1} className="image" src='https://images.unsplash.com/photo-1440582096070-fa5961d9d682?ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80'/>,
      <img key={+Date.now().toString() * 2} className="image" src='https://images.unsplash.com/photo-1446482932150-b7ff60bab8e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80'/>,
      <form key={+Date.now().toString() * 3} name="search" className="item-form" onSubmit={(e)=>e.preventDefault()}>
        <input type="text" name="key" className="item-input"></input>
        <input type="submit" name="send" value="Submit"></input>
      </form>,
      <img key={+Date.now().toString() * 4} className="image" src='https://images.unsplash.com/photo-1539191863632-8caef441bfc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80'/>,
      <img key={+Date.now().toString() * 5} className="image" src='https://images.unsplash.com/photo-1604599340287-2042e85a3802?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80'/>,
      <p key={+Date.now().toString() * 6} style={{width: '850px', color: 'rgb(255, 255, 255)', fontSize: '50px', textAlign: 'center'}}>
        Slider      
      </p>,
      <img key={+Date.now().toString() * 7} className="image" src='https://images.unsplash.com/photo-1550934172-beb213c78c11?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'/>,
    ]
    return(
      <div className="app-wrapper">
        <Slider>
          {sliderContent}
        </Slider>
      </div>
    )
  }
}