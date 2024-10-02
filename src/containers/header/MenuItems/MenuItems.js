import React from "react";
import './MenuItems.css';
import MenuItem from "./MenuItem/MenuItem";

const MenuItems =()=>{
    return(
        <ul className="MenuItems">
            <MenuItem link="/">
                صفحه اصلی
            </MenuItem>
            <MenuItem link={{
                pathname:"/add-student",
                search:"?sort-name",
                hash:"#the-hash",
                state:{fromDashboard:true}
                }} >
                اضافه کردن دانش آموز
            </MenuItem>
        </ul>
    )
}
export default MenuItems;
