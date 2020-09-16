import React from 'react'

export const ColorSwatches = (props) => {
  return (
    <div className='color-options'>
      <button
        className='color-option black'
        value='#000000'
        onClick={props.handleColorSwatches}
      >
      </button>
      <button
        className='color-option grey'
        value='#7d7d7d'
        onClick={props.handleColorSwatches}
      >
      </button>
      <button
        className='color-option red'
        value='#ff2f2f'
        onClick={props.handleColorSwatches}
      >
      </button>
      <button
        className='color-option pink'
        value='#ff8ac1'
        onClick={props.handleColorSwatches}
      >
      </button>
      <button
        className='color-option yellow'
        value='#fce641'
        onClick={props.handleColorSwatches}
      >
      </button>
      <button
        className='color-option orange'
        value='#fa7731'
        onClick={props.handleColorSwatches}
      >
      </button>
      <button
        className='color-option turquoise'
        value='#8efaf0'
        onClick={props.handleColorSwatches}
      >
      </button>
      <button
        className='color-option light-blue'
        value='#5a91f0'
        onClick={props.handleColorSwatches}
      >
      </button>
      <button
        className='color-option dark-blue'
        value='#5a91f0'
        onClick={props.handleColorSwatches}
      >
      </button>
      <button
        className='color-option purple'
        value='#9142ff'
        onClick={props.handleColorSwatches}
      >
      </button>
      <button
        className='color-option light-green'
        value='#81f76a'
        onClick={props.handleColorSwatches}
      >
      </button>
      <button
        className='color-option dark-green'
        value='#24960e'
        onClick={props.handleColorSwatches}
      >
      </button>

    </div>
  )
}


export default ColorSwatches
