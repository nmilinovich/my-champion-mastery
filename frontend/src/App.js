import React, { useState } from 'react';
import Navbar from './Navbar';
import MastData from './pages/MastData';
import './App.css';
import Home from './pages/Home';

function App() {
  const [champMastData, setChampMastData] = useState()
  const [username, setUsername] = useState('')
  const [region, setRegion] = useState('NA1')

  // const didUserWin = async () => {
  //   let res = await axios.get(`http://localhost:3001/?username=${username}`)
  //   console.log(res.data)
  //   if (res.data === 'You won your last game') {
  //     setWinState("You Won")
  //   } else {
  //     setWinState("You Lost")
  //   }
  // }

  

  return (
    <div className="App">
      <Navbar
        champMastData={champMastData}
        setChampMastData={setChampMastData}
        username={username}
        setUsername={setUsername}
        region={region}
        setRegion={setRegion}
      />
      {champMastData && !champMastData?.err ? (
        <MastData
          champMastData={champMastData}
          setChampMastData={setChampMastData}
          username={username}
          setUsername={setUsername}
          region={region}
          setRegion={setRegion}
        />
      ) : (
        <Home/>
      )}   
    </div>
  );
}

export default App;
