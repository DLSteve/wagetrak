import React, {useState, useCallback} from "react";
import {Modal, Button, Delete} from "rbx";

export default function OptionsModalManager({onOpen, onClose, onSave, children}) {
  const [active, setActive] = useState(false);
  const handleOpen = useCallback(() => {
    onOpen()
    setActive(true)
  }, [onOpen])

  const handleClose = useCallback(() => {
    onClose()
    setActive(false)
  }, [onClose])

  const handleSave = useCallback(() => {
    onSave()
    setActive(false)
  }, [onSave])

  return (
      <div>
        <Modal active={active} onClose={handleClose}>
          <Modal.Background />
          <Modal.Card>
            <Modal.Card.Head>
              <Modal.Card.Title>Options</Modal.Card.Title>
              <Delete onClick={handleClose} />
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
        <Button color="primary" onClick={handleOpen}>Options</Button>
      </div>
  )
}