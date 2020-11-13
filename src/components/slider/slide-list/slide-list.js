import React from 'react';
import { Component, useEffect, useMemo } from 'react';
import './slide-list.css';
import videoIcon from '../../../assets/icons/video.svg';
import Loading from './loading/loading';

const SlideList = ({
  data, 
  contentLoading, 
  currentDataIndex, 
  multipleSlides,
  switchToSlideX,
  slideValue, 
  slideDifference, 
  transitionXstyle, 
  showSlides
}) => {

  useEffect(() => {
    contentLoading(data)
  }, []);

  useEffect(() => {

  }, [currentDataIndex, multipleSlides, switchToSlideX, showSlides] )

  const slidesMap = (arr) => {
    return arr.map((item, index) => {
      const slideStyle = multipleSlides ? 'multi-slide' : 'slide';
      let content;
      if (item[0] === 'image') {
        content = <img className="image" src={item[1]} />
      }
      return (
        <div key={+Date.now().toString() + index} className={slideStyle}>
          {content}
        </div>
      )
    })
  }

  const makeSlides = (data, currentDataIndex, multipleSlides, switchToSlideX, slideValue, slideDifference, transitionXstyle, showSlides) => {
    // const slideStyle = multipleSlides ? 'multi-slide' : 'slide';


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
        if (Math.abs(slideDifference) > 1) { 

          if (currentDataIndex === length - 1) {
            newData.push(allData[length - 1])
            newData.push(allData[0])
          } else {
            newData = allData.slice(currentDataIndex, currentDataIndex + 2);
          }               

          if (i === length) {
            newData.unshift(allData[length - 1])
            newData.unshift(allData[0])     
            newData.push(allData[length - 1])
            newData.push(allData[0])
          } else {
            newData.unshift(...nextSlides);
            newData.push(...nextSlides);
          }       
          
          return slidesMap(newData)

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
        if (addExtraSlides) {
          newData.unshift(...allData.slice(-2));
        } else {
          newData.unshift(allData[allData.length-1]);
        }
        if (addExtraSlides) {
          newData.push(allData[0])
        }
      } else if (currentDataIndex === length - 1) {
        newData = allData.slice(-2)
        newData.push(allData[0])
        if (addExtraSlides) {
          newData.push(allData[1])
          if (length > 2) newData.unshift(currentDataIndex - 2)
          else newData.unshift(allData[length - 1])
        }
      }  else {
        if (currentDataIndex === length - 2 && addExtraSlides) {
          newData = allData.slice(currentDataIndex, currentDataIndex + 2)
          newData.push(allData[0])
          if (length === 2) {
            newData.unshift(...allData.slice(-2))
          }
          else if (length === 3) {
            newData.unshift(allData[0])
            newData.unshift(...allData.slice(-1))
          }
          else {
            newData.unshift(...allData.slice(currentDataIndex - 2, currentDataIndex))
          }
        }
        else if (currentDataIndex === 1 && addExtraSlides) {
          newData = allData.slice(currentDataIndex - 1, currentDataIndex + extraSlides);
          newData.unshift(allData[length - 1])
        } else {
          newData = allData.slice(currentDataIndex - 1, currentDataIndex + extraSlides)
          if (addExtraSlides) newData.unshift(allData[currentDataIndex - 2])
        }        
      }       
      return slidesMap(newData);
    } else {
      return slidesMap(newData);
    }
  }

  const allSlides = useMemo(() => slidesMap(data), [data]);
  const slides = makeSlides(data, currentDataIndex, multipleSlides, switchToSlideX, slideValue, slideDifference, transitionXstyle, showSlides);
  
  const content = showSlides ? 
  <div>
    <div className="slide-list">
      {slides}
    </div>  
    <div className="full-slide-list">
      {allSlides}
    </div> 
  </div> :
  <div>
    <Loading />
    <div className="full-slide-list">
      {allSlides}
    </div> 
  </div>

  return(
    content
  )

}

export default SlideList;
