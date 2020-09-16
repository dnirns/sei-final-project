import React from 'react'
import { Image, Stage, Layer } from 'react-konva'
import { Container, Divider } from 'semantic-ui-react'
import { saveDrawing } from '../lib/api'
import { ToastContainer } from 'react-toastify'
import { drawingNotAuthorized } from '../lib/notifications'
import Modal from 'react-modal'
import ColorPicker from './drawing-components/ColorPicker'
import Slider from 'react-input-slider'
import SaveModal from './drawing-components/Modal'
import ColorSwatches from './drawing-components/ColorSwatches'


Modal.setAppElement('#root')

class Drawing extends React.Component {

  state = {
    drawingURL: null,
    isDrawing: false,
    eraser: false,
    size: 5,
    globalCompositeOperation: 'source-over',
    paintCursor: 'url(http://www.rw-designer.com/cursor-extern.php?id=125360), auto',
    eraserCursor: 'url(http://www.rw-designer.com/cursor-extern.php?id=72976), auto',
    cursor: '',
    displayColorPicker: false,
    color: '#000000',
    brushSlider: 4,
    data: {
      title: '',
      url: '',
      category: ''
    },
    modalIsOpen: false
  }

  componentDidMount() {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    canvas.width = 700
    canvas.height = 700
    this.setState({ canvas, context })
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
      // BRUSH STYLES
      context.strokeStyle = this.state.color
      context.lineJoin = 'round'
      context.lineWidth = this.state.brushSlider
      context.globalCompositeOperation = this.state.globalCompositeOperation
      // DRAW
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

    handleButtonSelection = (e) => {
      const paint = 'source-over'
      const erase = 'destination-out'

      console.log(e.target.value)
      if (e.target.value === 'eraser') {
        return this.setState({
          globalCompositeOperation: erase,
          cursor: this.state.eraserCursor
        })
      } else {
        return this.setState({
          globalCompositeOperation: paint,
          cursor: this.state.paintCursor
        })
      }
    }

    handleColorClick = () => {
      this.setState({
        displayColorPicker: !this.state.displayColorPicker,
        cursor: this.state.paintCursor,
        globalCompositeOperation: 'source-over' })
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

    handleColorSwatches = (e) => {
      this.setState({
        color: e.target.value,
        globalCompositeOperation: 'source-over',
        cursor: this.state.paintCursor
      })
    }

    handleTitleChange = e => {
      const data = { ...this.state.data, title: e.target.value }
      this.setState({ data })
    }

    handleCatChange = e => {
      const data = ({ ...this.state.data, category: e.target.value })
      this.setState({ data })
      console.log(this.state.data.category)
    }

    handleSaveImg = async () => {
      const stage = this.image.getStage()
      const dataURL = stage.toDataURL()
      const data = { ...this.state.data }
      this.setState({ data })
      try {
        await saveDrawing({
          data,
          url: dataURL,
          category: this.state.data.category,
          title: this.state.data.title })
        this.props.history.push('/corpse')
      } catch (err) {
        drawingNotAuthorized('Choose part and name to save...')
      }
    }

    openModal = () => {
      this.setState({ modalIsOpen: true })
    }
    closeModal = ()=> {
      this.setState({ modalIsOpen: false })
    }

    render() {
      const {
        canvas,
        color,
        brushSlider,
        displayColorPicker,
        data,
        modalIsOpen,
        cursor
      } = this.state

      return (
        <Container textAlign='center'>
          <h3>Draw a head, body or legs</h3>
          <Divider hidden />
          <div className="drawing-wrapper">
            <ColorSwatches handleColorSwatches={this.handleColorSwatches}/>
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
                      container.style.cursor = cursor
                    }}
                    onMouseDown={this.handleMouseDown}
                    onMouseUp={this.handleMouseUp}
                    onMouseMove={this.handleMouseMove}
                  />
                </Layer>
              </Stage>
            </div>
            <div className='controls-right'>
              <div className={'slider'}>
                <Slider
                  yreverse={true}
                  axis="y"
                  ystep={1}
                  ymin={2}
                  ymax={40}
                  y={brushSlider}
                  onChange={({ y }) => this.setState({ brushSlider: parseInt(y.toFixed(100)) })}
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
              <ColorPicker
                color={color}
                handleColorClick={this.handleColorClick}
                displayColorPicker={displayColorPicker}
                handleColorClose={this.handleColorClose}
                handleColorChange={this.handleColorChange}
              />
              <button value='eraser' onClick={this.handleButtonSelection} className='eraser draw-button'></button>
              <button value='paintBrush' onClick={this.handleButtonSelection} className='paint draw-button'></button>
            </div>
          </div>
          <Divider hidden/>
          <SaveModal
            data={data}
            modalIsOpen={modalIsOpen}
            handleCatChange={this.handleCatChange}
            openModal={this.openModal}
            closeModal={this.closeModal}
            handleTitleChange={this.handleTitleChange}
            handleSaveImg={this.handleSaveImg}
          />
          <ToastContainer style={{ textAlign: 'center' }}/>
        </Container>
      )
    }
}

export default Drawing
