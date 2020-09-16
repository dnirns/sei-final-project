import React from 'react'
import Slider from 'react-input-slider'

const SizeSlider = ({ brushSlider, color }) => {
  return (
    <div className={''}>
      <Slider
        axis="x"
        xstep={1}
        xmin={5}
        xmax={35}
        x={brushSlider}
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
