import classes from './Modal.module.css';

// children is a reserved prop name, children always refer to children's certain body prop
// in PostsList, the children of Modal component is NewPost component
function Modal({children,onClose}){
    return (
      <>
        {/*render a background*/}
        <div className={classes.backdrop} onClick={onClose}/>
        <dialog open className={classes.modal}>{children}</dialog>
      </>
    );
}

export default Modal;