import React from "react";
import './spinner.css';
import ThemeContextProvider from "../../../context/Theme/themeContext";

const Spinner =()=>(
    <ThemeContextProvider>
        <div className="loader">

        </div>
    </ThemeContextProvider>
    

)

export default Spinner;