import React from 'react'
import Modal from 'react-modal'
import { Container, Button, Form, Input, Label } from 'semantic-ui-react'

const SaveModal = ({ data, modalIsOpen, openModal, closeModal, handleCatChange, handleTitleChange, handleSaveImg }) => {
  return (
    <Container className='save-drawing'>
      <Button onClick={openModal}>Save</Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
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
              onChange={handleTitleChange}
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
              onChange={handleCatChange}
            />
            <Label>Body</Label>
            <Input
              type='radio'
              value='Body'
              checked={data.category === 'Body'}
              onChange={handleCatChange}
            />
            <Label>Feet</Label>
            <Input
              type='radio'
              value='Feet'
              checked={data.category === 'Feet'}
              onChange={handleCatChange}
            />
          </div>
          <Button type='submit' onClick={handleSaveImg}>Save</Button>
        </Form>
      </Modal>
    </Container>
  )
}

export default SaveModal
