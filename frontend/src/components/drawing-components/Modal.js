import React from 'react'
import Modal from 'react-modal'
import { Container, Button, Form, Input, Label, Divider, Grid} from 'semantic-ui-react'

const SaveModal = ({ data, modalIsOpen, openModal, closeModal, handleCatChange, handleTitleChange, handleSaveImg }) => {
  return (
    <Container textAlign='center' className='save-drawing'>
      <Button onClick={openModal}>Save</Button>
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
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
            }
          }
        }
      >
        <Grid verticalAlign='middle' columns={1} centered>
          <Grid.Column textAlign='center'>
            <Form>
              <h3>Which part did you draw?</h3>
              <div className='radio-buttons'>
                <h4>Corpse - <b>{data.category}</b></h4>
                <Label size='large'>Head</Label>
                <Input
                  type='radio'
                  value='Head'
                  checked={data.category === 'Head'}
                  onChange={handleCatChange}
                />
                <Label size='large'>Body</Label>
                <Input
                  type='radio'
                  value='Body'
                  checked={data.category === 'Body'}
                  onChange={handleCatChange}
                />
                <Label size='large'>Feet</Label>
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
                  data.category === '' ? <h4>Give them a name..</h4> : null
                }
                {
                  data.category === 'Head' ? <h4>Give them a First name:</h4> : null
                }
                {
                  data.category === 'Body' ? <h4>Give them a Middle name:</h4> : null
                }
                {
                  data.category === 'Feet' ? <h4>Give them a Last name</h4> : null
                }
                <Form.Input
                  type='text'
                  name='title'
                  value={data.title}
                  onChange={handleTitleChange}
                />
              </Form.Field>

              <Button type='submit' onClick={handleSaveImg}>Save</Button>

            </Form>
          </Grid.Column>
        </Grid>
      </Modal>
    </Container>
  )
}

export default SaveModal
