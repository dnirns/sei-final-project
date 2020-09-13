import React from 'react'
import { Image, Stage, Layer } from 'react-konva'
import { SketchPicker } from 'react-color'
import Slider from 'react-input-slider'
import reactCSS from 'reactcss'
import { Container, Button } from 'semantic-ui-react'


class Drawing extends React.Component {

  state = {
    isDrawing: false,
    eraser: false,
    size: 5,
    globalCompositeOperation: 'source-over',
    cursor: '',
    displayColorPicker: false,
    color: '#000000',
    brushSlider: 5
  }


  componentDidMount() {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = 700
    canvas.height = 700
    this.setState({ canvas, context })
  }


  handleSave = () => {

    console.log('save')
  }

  //? MOUSE EVENT HANDERS
  handleMouseDown = () => {
    this.setState({ isDrawing: true })
    const stage = this.image.getStage()
    this.lastPointerPosition = stage.getPointerPosition()
  }

  handleMouseUp = () => {
    this.setState({ isDrawing: false })
  }

  handleMouseMove = () => {
    const { context, isDrawing } = this.state
    if (!isDrawing) {
      return
    } else {
      const stage = this.image.getStage()
      const pos = stage.getPointerPosition()
      context.beginPath()
      let localPos = {
        x: this.lastPointerPosition.x - this.image.x(),
        y: this.lastPointerPosition.y - this.image.y()
      }
      context.moveTo(localPos.x, localPos.y)
      localPos = {
        x: pos.x - this.image.x(),
        y: pos.y - this.image.y()
      }
      //* BRUSH STYLES
      context.strokeStyle = this.state.color
      context.lineJoin = 'round'
      context.lineWidth = this.state.brushSlider
      context.globalCompositeOperation = 'this.state.globalCompositeOperation'
      //* DRAW
      context.lineTo(localPos.x, localPos.y)
      context.closePath()
      context.stroke()
      this.lastPointerPosition = pos //? RESET POINTER POSITION
      this.image.getLayer().batchDraw() //? ADD LAYER AND DRAW
    }
  }

    changeSize = (e) => {
      this.setState({ size: e.target.value })
    }

    handleWheel = () => {
      console.log('wheel spinning')
      const size = Math.floor(Math.random() * 50)
      const r = Math.floor(Math.random() * 255)
      const g = Math.floor(Math.random() * 255)
      const b = Math.floor(Math.random() * 255)
      const randomColor = `rgb(${r},${g},${b})`
      this.setState({ color: randomColor, brushSlider: size })
    }

    handleButtonSelection = (e) => {
      const paint = 'source-over'
      const erase = 'destination-out'
      const eraserIcon = 'url(http://www.rw-designer.com/cursor-extern.php?id=72976), auto'
      const paintIcon = 'url(http://www.rw-designer.com/cursor-extern.php?id=125360), auto'

      if (e.target.value === 'eraser') {
        this.setState({
          globalCompositeOperation: erase,
          cursor: eraserIcon
        })
      } else {
        this.setState({
          globalCompositeOperation: paint,
          cursor: paintIcon
        })
      }
    }

    handlePaint =  () => {
      console.log('paint')
    }

    //? COLOR PICKER FUNCTIONS

    handleColorClick = () => {
      this.setState({ displayColorPicker: !this.state.displayColorPicker, cursor: 'url(http://www.rw-designer.com/cursor-extern.php?id=125360), auto', globalCompositeOperation: 'source-over' })
    }
    handleColorClose = () => {
      this.setState({ displayColorPicker: false })
    }
    handleColorChange = (color) => {
      this.setState({ color: color.hex })
    }
    handleChangeComplete = (color) => {
      this.setState({ background: color.hex })
    }


    render() {
      const { canvas } = this.state

      const styles = reactCSS({
        'default': {
          color: {
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            background: this.state.color
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
        <Container text>
          <div className="drawing-wrapper">
            <div onContextMenu={e => e.preventDefault()}>
              <Stage width={700} height={700}>
                <Layer>
                  <Image
                    image={ canvas }
                    ref={node => (this.image = node)}
                    width={700}
                    height={700}
                    onMouseEnter={e => {
                      const container = e.target.getStage().container()
                      container.style.cursor = this.state.cursor
                    }}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                    onMouseMove={this.handleMouseMove}
                    onWheel={this.handleWheel}
                  />
                </Layer>
              </Stage>
            </div>
            <Container basic>
              <div className='color-swatch'>
                <div style={ styles.swatch } onClick={ this.handleColorClick }>
                  <div style={ styles.color } />
                </div>
                {this.state.displayColorPicker ? <div style={ styles.popover }>
                  <div
                    style={ styles.cover }
                    onClick={ this.handleColorClose }
                  />
                  <SketchPicker
                    color={ this.state.color }
                    onChange={ this.handleColorChange }
                  />
                </div> : null }
              </div>
              <div className={''}>
                <Slider
                  axis="x"
                  xstep={1}
                  xmin={5}
                  xmax={50}
                  x={this.state.brushSlider}
                  onChange={({ x }) => this.setState({ brushSlider: parseInt(x.toFixed(100)) })}
                  styles={{
                    active: {
                      backgroundColor: this.state.color
                    },
                    thumb: {
                      width: 15,
                      height: 15,
                      opacity: 0.8
                    }
                  }}
                />
              </div>
              <Button icon size='big' value="eraser" onClick={this.handleButtonSelection}>Eraser</Button>
              <Button icon size='big' value="paintBrush" onClick={this.handleButtonSelection}>Paint</Button>
              <Button icon size='big' onClick={this.handleSave}>Save</Button>
            </Container>
          </div>
        </Container>
      )
    }
}

export default Drawing
