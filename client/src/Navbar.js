import React from 'react';
import './index.css';
import Emblem from './emblem.svg';

export const Navbar = () => {
  return(
    <div>
        <header>
            <img src ={Emblem} width="100px" height = "100px"/>
                Election Commission of India
        </header>
    </div>
  )  
}

export default Navbar;