import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './MastData.css'


function MastData(props) {
    const [ champData, setChampData ] = useState({})

    function buildProgress(champ) {
        if (champ.championLevel === 5)
            return champ.tokensEarned + "/2 tokens"
        if (champ.championLevel === 6)
            return champ.tokensEarned + "/3 tokens"
        if (champ.championLevel === 7)
            return "Mastered"
        return parseInt(100 * champ.championPointsSinceLastLevel / (champ.championPointsSinceLastLevel + champ.championPointsUntilNextLevel)) + "%" 
    }

    async function getChampionData() {
        let currentGameVersion = (await axios.get('https://ddragon.leagueoflegends.com/api/versions.json')).data[0]
        let championData = (await axios.get(`https://ddragon.leagueoflegends.com/cdn/${currentGameVersion}/data/en_US/champion.json`)).data.data
        championData = Object.values(championData).reduce((c, champ) => ({ ...c, [champ.key]: champ }), championData)
        setChampData(championData)
        
    }

    useEffect(() => getChampionData, [])

    return (
        <div id='table-div' className='my-class-1 my-class-2'>
            <h1>
                {props.username} ({props.region})
            </h1>
            <br></br>
            <table className='my-table'>
                <thead className='thead'>
                    <tr>
                        <th>Champion</th>
                        <th>Champion Level</th>
                        <th>Champion Points</th>
                        <th>Chest Earned</th>
                        <th>Date Last Played</th>
                        <th>Progress</th>
                        <th>Points to Next Level</th>
                    </tr>
                </thead>
                <tbody>
                    {props.champMastData.map(champ => (
                        <tr key={champ.championId}>
                            <td>{champData[champ.championId]?.name}</td>
                            
                            <td>{champ.championLevel}</td>
                            <td>{champ.championPoints.toLocaleString()}</td>
                            <td>{champ.chestGranted ? "✓" : "✗"}</td>
                            <td>{new Date(champ.lastPlayTime).toDateString()}</td>
                            <td>{buildProgress(champ)}</td>
                            <td>{champ.championLevel > 4 ? "N/A" : champ.championPointsUntilNextLevel.toLocaleString()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
export default MastData