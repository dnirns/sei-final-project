import React from 'react'
import Modal from 'react-modal'
import { Container, Button, Form, Input, Label, Divider, Grid } from 'semantic-ui-react'

const SaveModal = ({ data, modalIsOpen, openModal, closeModal, handleCatChange, handleTitleChange, handleSaveImg }) => {
  return (
    <Container textAlign='center' className='save-drawing'>
      <Button onClick={openModal}><h3 className='crimson-s'>Save</h3></Button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={
          {
            content: {
              top: '30%',
              left: '30%',
              right: '30%',
              bottom: '30%'
            },
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.75)'
            }
          }
        }
      >
        <Grid verticalAlign='middle' columns={1} centered>
          <Grid.Column textAlign='center'>
            <Form className='modal-form'>
              <h3 className='crimson-s-form'>What did you draw?</h3>
              <div className='radio-buttons'>
                <h4 className='crimson-s-form'>...<b className='crimson-s-form'>{data.category}</b></h4>
                <Label size='large'><p className='crimson-s-form'>Head</p></Label>
                <Input
                  type='radio'
                  value='Head'
                  checked={data.category === 'Head'}
                  onChange={handleCatChange}
                />
                <Label size='large'><p className='crimson-s-form'>Body</p></Label>
                <Input
                  type='radio'
                  value='Body'
                  checked={data.category === 'Body'}
                  onChange={handleCatChange}
                />
                <Label size='large'><p className='crimson-s-form'>Feet</p></Label>
                <Input
                  type='radio'
                  value='Feet'
                  checked={data.category === 'Feet'}
                  onChange={handleCatChange}
                />
              </div>
              <Divider horizontal section>&</Divider>
              <Form.Field>
                {
                  data.category === '' ? <h4 className='crimson-s-form'>Give them a name..</h4> : null
                }
                {
                  data.category === 'Head' ? <h4 className='crimson-s-form'>Give them their First name:</h4> : null
                }
                {
                  data.category === 'Body' ? <h4 className='crimson-s-form'>Give them their Middle name:</h4> : null
                }
                {
                  data.category === 'Feet' ? <h4 className='crimson-s-form'>Give them their Last name</h4> : null
                }
                <Form.Input
                  type='text'
                  name='title'
                  value={data.title}
                  onChange={handleTitleChange}
                />
              </Form.Field>

              <Button type='submit' onClick={handleSaveImg}><p className='crimson-s-form'>Save</p></Button>

            </Form>
          </Grid.Column>
        </Grid>
      </Modal>
    </Container>
  )
}

export default SaveModal
