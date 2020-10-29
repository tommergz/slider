import React from 'react';

export default class SlideRenderingService {
  makeSlides = (data, currentDataIndex, multipleSlides) => {
    const slideStyle = multipleSlides ? 'multi-slide' : 'slide';
    const slidesMap = (arr) => {
      return arr.map((item, index) => {
        return (
          <div key={+Date.now().toString() + index} className={slideStyle}>
            <img className="image" src={item} />
          </div>
        )
      })
    }

    const allData = [...data];
    let newData = [];
    const length = allData.length;
    const addExtraSlides = multipleSlides;
    const extraSlides = addExtraSlides ? 3 : 2
    if (length) {
      if (length === 1) return slidesMap(allData);
      if (currentDataIndex === 0) {
        newData = allData.slice(0, extraSlides);
        newData.unshift(allData[allData.length-1]);
        if (addExtraSlides) newData.push(allData[0])
      } else if (currentDataIndex === allData.length - 1) {
        newData = allData.slice(-2)
        newData.push(allData[0])
        if (addExtraSlides) newData.push(allData[1])
      } else {
        if (currentDataIndex === length - 2 && addExtraSlides) {
          newData = allData.slice(currentDataIndex - 1, currentDataIndex + 2)
          newData.push(allData[0])
        } else {
          newData = allData.slice(currentDataIndex - 1, currentDataIndex + extraSlides)
        }        
      }       
      return slidesMap(newData);
    } else {
      return slidesMap(newData);
    }
  }
}