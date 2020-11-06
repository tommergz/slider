import React from 'react';

export default class SlideRenderingService {
  makeSlides = (data, currentDataIndex, multipleSlides, switchToSlideX, slideValue, slideDifference) => {
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
      const i = Number(slideValue);

////////////////////// MOVE TO SLIDE X ////////////////////////////////////
   
  // MULTI    

      if (switchToSlideX && addExtraSlides) {
        const nextSlides = allData.slice(i - 1, i + 1);
        if (slideDifference < -1) {
          newData = allData.slice(currentDataIndex, currentDataIndex + 2);
          if (!currentDataIndex) newData.unshift(...allData.slice(-1));
          if (currentDataIndex) newData.unshift(currentDataIndex - 1);
          if (i === length) {
            newData.push(allData[length - 1])
            newData.push(allData[0])
          } else {
            newData.push(...nextSlides);
          }       
          return slidesMap(newData)
        } 
        else if (slideDifference > 1) {
          newData = allData.slice(currentDataIndex, currentDataIndex + 2);
          newData.unshift(...nextSlides)
        }
      }

  //\\ MULTI

      if (switchToSlideX && !addExtraSlides) {
        newData = allData.slice(currentDataIndex, currentDataIndex + 1);
        newData.unshift(allData[i - 1]);
        newData.push(allData[i - 1]);
        return slidesMap(newData)
      }

//\\\\\\\\\\\\\\\\\\\\\\\\\\ MOVE TO SLIDE X \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\
      
      if (currentDataIndex === 0) {
        newData = allData.slice(0, extraSlides);
        newData.unshift(allData[allData.length-1]);
        if (addExtraSlides) {
          newData.push(allData[0])
        }
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