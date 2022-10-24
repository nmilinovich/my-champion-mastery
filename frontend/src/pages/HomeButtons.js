import React, { useState } from 'react';
import axios from 'axios';
import './HomeButtons.css';

function HomeButtons(props) {

    const sendUsernameRegionToServer = async () => {
        let res = await axios.get(`http://localhost:3001/api/getMastery?summonerName=${props.username}&region=${props.region}`)
        console.log(res.data)
        props.setChampMastData(res.data)
        if (res.data.err)
            alert(res.data.msg)
    }
    
    return (
        <div className="home-buttons">
            <input 
                className='usernameBox'
                type='text'
                placeholder='Summoner Name'
                onChange={(e) => props.setUsername(e.target.value)}
            />
            {props.myProp}
            <select 
                name="region" 
                id="region"
                onChange={(e) => props.setRegion(e.target.value)}
            >
                <option value="NA1">NA</option>
                <option value="EUW1">EUW</option>
                <option value="EUN1">EUNE</option>
                <option value="BR1">BR</option>
                <option value="OC1">OCE</option>
                <option value="KR">KR</option>
                <option value="TR1">TR</option>
                <option value="LA2">LAS</option>
                <option value="LA1">LAN</option>
                <option value="RU">RU</option>
                <option value="JP1">JP</option>
            </select>
            <button id="lookup-button"
                onClick={(e) => sendUsernameRegionToServer()}
            >Lookup</button>
        </div>
    );
}
export default HomeButtons;
