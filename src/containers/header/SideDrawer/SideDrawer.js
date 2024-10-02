import React from "react";
import './SideDrawer.css';
import Logo from "../../../components2/logo/logo";
import MenuItems from "../MenuItems/MenuItems";
import Button from "../../../components2/UI/Button/button";
import Backdrop from "../../../components2/UI/BackDrop/BackDrop";

const SideDrawer=(props)=>{
    let classes = ['SideDrawer','Close'];
    if(props.show){
        classes=['SideDrawer','Open']
    }
    return(
        <React.Fragment>
            <Backdrop show={props.show} modalClosed={props.closeDrawer}/>
            <div className={classes.join(' ')}>
                <Logo height="10%"/>
                <nav><MenuItems/></nav>
                <div className="boxButton">
                    <Button btnType='danger'>ورود/ثبت نام</Button>
                </div>
            </div>
        </React.Fragment>
    )
}

export default SideDrawer;