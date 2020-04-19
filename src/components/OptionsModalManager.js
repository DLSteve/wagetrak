import React, {useState} from 'react'
import {Modal, Button, Delete, Icon} from 'rbx'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCog} from '@fortawesome/free-solid-svg-icons'

export default function OptionsModalManager({onOpen, onClose, onSave, children}) {
  const [active, setActive] = useState(false)

  const handleOpen = () => {
    onOpen()
    setActive(true)
  }

  const handleClose = () => {
    onClose()
    setActive(false)
  }

  const handleSave = () => {
    onSave()
    setActive(false)
  }

  return (
      <>
        <Button size="small" onClick={handleOpen}>
          <Icon size="small">
            <FontAwesomeIcon icon={faCog} />
          </Icon>
        </Button>
        {active && (
            <Modal active onClose={handleClose}>
              <Modal.Background/>
              <Modal.Card>
                <Modal.Card.Head>
                  <Modal.Card.Title>Options</Modal.Card.Title>
                  <Delete onClick={handleClose}/>
                </Modal.Card.Head>
                <Modal.Card.Body>
                  {children}
                </Modal.Card.Body>
                <Modal.Card.Foot>
                  <Button color="success" onClick={handleSave}>Save changes</Button>
                  <Button onClick={handleClose}>Cancel</Button>
                </Modal.Card.Foot>
              </Modal.Card>
            </Modal>
        )}
      </>
  )
}