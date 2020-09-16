import React from 'react'
import { SketchPicker } from 'react-color'
import reactCSS from 'reactcss'


const ColorPicker = ({ displayColorPicker, handleColorChange, handleColorClick, handleColorClose, color }) => {

  const styles = reactCSS({
    'default': {
      color: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: color
      },
      swatch: {
        padding: '5px',
        background: '#fff',
        display: 'inline-block',
        cursor: 'pointer'
      },
      popover: {
        position: 'absolute',
        zIndex: '2'
      },
      cover: {
        position: 'fixed',
        top: '0px',
        right: '0px',
        bottom: '0px',
        left: '0px'
      }
    }
  })

  return (
    <div className='color-swatch'>
      <div style={ styles.swatch } onClick={ handleColorClick }>
        <div style={ styles.color } />
      </div>
      {displayColorPicker ? <div style={ styles.popover }>
        <div
          style={ styles.cover }
          onClick={ handleColorClose }
        />

        <SketchPicker
          color={ color }
          onChange={ handleColorChange }
        />
      </div> : null }
    </div>
  )
}


export default ColorPicker
