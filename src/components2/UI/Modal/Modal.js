import React from "react";
import './Modal.css';
import Backdrop from "../BackDrop/BackDrop";

const Modal = (props)=>{
    return(
        <React.Fragment>
            <Backdrop show={props.show} modalClosed={props.modalClosed}/>
            <div className="Modal" style={{transform:props.show?'translateY(0)':'translateY(-50vw)',
                                        opacity:props.show?'1':'0'}}>
            {props.children}
        </div>
        </React.Fragment>
    )
}
export default React.memo(Modal);