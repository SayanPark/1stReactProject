import React from "react";
import './logo.css';
import reactlogo from '../../assets/images/reactapp-logo.png'

const Logo = (props)=>{
    return(
        <div className="Logo" style={{height:props.height}}>
            <img src={reactlogo} alt="reactapp.ir"/>
        </div>
    )
}
export default React.memo(Logo);