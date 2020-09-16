import React from 'react'
import Slider from 'react-input-slider'

const SizeSlider = ({ brushSlider, color, handleSlider }) => {
  return (

    <div className={''}>
      <button onClick={handleSlider}>Button</button>
      <Slider
        axis='x'
        xstep={1}
        xmin={5}
        xmax={35}
        x={ brushSlider }
        // onChange={}
        onClick={({ x }) => console.log( x )}
        styles={{
          active: {
            backgroundColor: color
          },
          thumb: {
            width: 15,
            height: 15,
            opacity: 0.8
          }
        }}
      />
    </div>
  )
}

export default SizeSlider
