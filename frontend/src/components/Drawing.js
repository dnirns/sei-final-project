import React from 'react'
import { Image, Stage, Layer } from 'react-konva'
import { Container, Button, Form, Input, Label } from 'semantic-ui-react'
import { saveDrawing } from '../lib/api'
import { ToastContainer } from 'react-toastify'
import { drawingNotAuthorized } from '../lib/notifications'
import Modal from 'react-modal'
import ColorPicker from './drawing-components/ColorPicker'
import SizeSlider from './drawing-components/Slider'

Modal.setAppElement('#root')

class Drawing extends React.Component {

  state = {
    drawingURL: null,
    isDrawing: false,
    eraser: false,
    size: 5,
    globalCompositeOperation: 'source-over',
    cursor: '',
    displayColorPicker: false,
    color: '#000000',
    brushSlider: 8,
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
      //* BRUSH STYLES
      context.strokeStyle = this.state.color
      context.lineJoin = 'round'
      context.lineWidth = this.state.brushSlider
      context.globalCompositeOperation = this.state.globalCompositeOperation
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

    handleSlider = (x) => {
      this.setState({ brushSlider: parseInt(x.toFixed(100)) })
    }


    //RANDOM SIZE/COLOR ON WHEEL SPIN
    // handleWheel = () => {
    //   console.log('wheel spinning')
    //   const size = Math.floor(Math.random() * 50)
    //   const r = Math.floor(Math.random() * 255)
    //   const g = Math.floor(Math.random() * 255)
    //   const b = Math.floor(Math.random() * 255)
    //   const randomColor = `rgb(${r},${g},${b})`
    //   this.setState({ color: randomColor, brushSlider: size })
    // }

    handleButtonSelection = (e) => {
      const paint = 'source-over'
      const erase = 'destination-out'
      const eraserIcon = 'url(http://www.rw-designer.com/cursor-extern.php?id=72976), auto'
      const paintIcon = 'url(./assets/icons/paint-brush-32.png)'

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
        await saveDrawing({ data, url: dataURL, category: this.state.data.category, title: this.state.data.title })
        this.props.history.push('/corpse')
      } catch (err) {
        drawingNotAuthorized('Please log in to save your drawing')
      }
    }

    openModal = () => {
      this.setState({ modalIsOpen: true })
    }
    closeModal = ()=> {
      this.setState({ modalIsOpen: false })
    }

    render() {
      const { canvas, data , modalIsOpen } = this.state


      return (
        <Container text>
          <h1>Draw a head, body or legs...</h1>
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
          </div>
          <Container basic>
            <ColorPicker
              color={this.state.color}
              handleColorClick={this.handleColorClick}
              displayColorPicker={this.state.displayColorPicker}
              handleColorClose={this.handleColorClose}
              handleColorChange={this.handleColorChange}
            />

            <SizeSlider
              brushSlider={this.state.brushSlider}
              onChange={({ x }) => this.setState({ brushSlider: parseInt(x.toFixed(100)) })}
            />
            {/* <div className={''}>
              <Slider
                axis="x"
                xstep={1}
                xmin={5}
                xmax={35}
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
            </div> */}
            <Button value="eraser" onClick={this.handleButtonSelection}>Eraser</Button>
            <Button value="paintBrush" onClick={this.handleButtonSelection}>Paint</Button>
          </Container>

          <Container className='save-drawing'>
            <Button onClick={this.openModal}>Save</Button>
            <Modal
              isOpen={modalIsOpen}
              onRequestClose={this.closeModal}
              style={
                {
                  overlay: {
                    backgroundColor: 'rgba(255, 255, 255, 0.75)'

                  }
                }
              }
            >

              <Form>
                <Form.Field>
                  {
                    data.category === '' ? <h4>Give them a name..</h4> : null
                  }
                  {
                    data.category === 'Head' ? <h4>First name:</h4> : null
                  }
                  {
                    data.category === 'Body' ? <h4>Middle name:</h4> : null
                  }
                  {
                    data.category === 'Feet' ? <h4>Last name</h4> : null
                  }
                  <Form.Input
                    placeholder='Name'
                    type='text'
                    name='title'
                    value={data.title}
                    onChange={this.handleTitleChange}
                    width={8}
                  />
                </Form.Field>

                <div className='radio-buttons'>
                  <h4>Corpse part: <b>{data.category}</b></h4>
                  <Label>Head</Label>
                  <Input
                    type='radio'
                    value='Head'
                    checked={data.category === 'Head'}
                    onChange={this.handleCatChange}
                  />
                  <Label>Body</Label>
                  <Input
                    type='radio'
                    value='Body'
                    checked={data.category === 'Body'}
                    onChange={this.handleCatChange}
                  />
                  <Label>Feet</Label>
                  <Input
                    type='radio'
                    value='Feet'
                    checked={data.category === 'Feet'}
                    onChange={this.handleCatChange}
                  />
                </div>
                <Button type='submit' onClick={this.handleSaveImg}>Save</Button>
              </Form>

            </Modal>
          </Container>

          <ToastContainer style={{ textAlign: 'center' }}/>

        </Container>
      )
    }
}

export default Drawing
