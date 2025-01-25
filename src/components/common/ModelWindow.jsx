import React, { useState } from 'react'
import { Modal , ModalBody , ModalHeader } from 'reactstrap'
function ModelWindow(props) {
    const [modal , setModal] = useState(true)
    const [msg , setMsg] = useState(props.message)
    const backdrop = props.backdrop ? props.backdrop : true;

  const  toggleModal = () => {
        setModal(!modal);
        props.toggleModal();
    }
  return (
    <div>
        <Modal style={{maxWidth:"600px"}} isOpen={modal} toggle={toggleModal} className={props.className} backdrop={backdrop} >
                <ModalHeader toggle={toggleModal}>{props.title}</ModalHeader>
                <ModalBody>{props.children}</ModalBody>      
            </Modal>
    </div>
  )
}

export default ModelWindow
