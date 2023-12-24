import Modal from 'react-modal'
Modal.setAppElement('#app');

const DeleteUserModal = ({user, isOpen, onConfirmation, onDismiss})=> {
    console.log(user)
    const customStyles = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            //width:'800px'
        },
    };
    return <>
        <Modal isOpen={isOpen}
               style={customStyles}
        >
            <div className="card border border-danger">
                <div className="card-header">Confirmation</div>
                <div className="card-body">
                    Veuillez confirmer la suppression de {user.full_name}
                </div>
                <div className="card-footer text-end">
                    <button className="btn btn-secondary me-2" onClick={onDismiss}>Annuler</button>
                    <button className="btn btn-outline-danger " onClick={()=>onConfirmation(user)}>Confirmer</button>

                </div>
            </div>
        </Modal>
    </>
}
export default DeleteUserModal
