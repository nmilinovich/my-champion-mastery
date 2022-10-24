import React, { useState } from 'react';
import axios from 'axios';
import HomeButtons from './pages/HomeButtons';

function Navbar(props) {
    
    return (
        <div className="home">
          <HomeButtons
            champMastData={props.champMastData}
            setChampMastData={props.setChampMastData}
            username={props.username}
            setUsername={props.setUsername}
            region={props.region}
            setRegion={props.setRegion}
          />
        </div>
    );
}
export default Navbar;
