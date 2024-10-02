import React from "react";
import './hamburger.css';
import reacthamburger from '../../assets/images/icons8-hamburger-menu-50.png'

const hamburger = ()=>{
    return(
        <div className="hamburger">
            <img src={reacthamburger} alt="reactapp.ir"/>
        </div>
    )
}
export default React.memo(hamburger);