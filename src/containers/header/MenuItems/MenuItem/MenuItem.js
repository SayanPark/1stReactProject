import React from "react";
import './MenuItem.css';
import { NavLink } from "react-router-dom";

const MenuItem =(props)=>{

    return(
        <li className="MenuItem">
            <NavLink to={props.link}>{props.children}</NavLink>
        </li>
    )
}
export default MenuItem;
