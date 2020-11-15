import React, { Component } from 'react';
import './app.css';
import Slider from '../slider/slider';

export default class App extends Component {
  render() {
    const sliderContent = [
      ['image', 'https://images.unsplash.com/photo-1440582096070-fa5961d9d682?ixlib=rb-1.2.1&auto=format&fit=crop&w=1055&q=80'],
      ['image', 'https://images.unsplash.com/photo-1446482932150-b7ff60bab8e1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80'],
      ['image', 'https://images.unsplash.com/photo-1539191863632-8caef441bfc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=1051&q=80'],
      ['image', 'https://images.unsplash.com/photo-1588095938732-5463642ce960?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'],
      ['image', 'https://images.unsplash.com/photo-1550934172-beb213c78c11?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80'],
      ['image', 'https://images.unsplash.com/photo-1568164651648-d90699a5182d?ixlib=rb-1.2.1&auto=format&fit=crop&w=966&q=80'],
      ['image', 'https://images.unsplash.com/photo-1604599340287-2042e85a3802?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=967&q=80'],
      ['image', 'https://images.unsplash.com/photo-1588343710499-948bbeb14ba0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjF9&auto=format&fit=crop&w=1189&q=80'],
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