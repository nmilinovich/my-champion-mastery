const express = require('express')
const cors = require('cors');
const axios = require('axios')

const app = express()
app.use(cors())

const API_KEY = 'RGAPI-10cc7c89-c7b3-4713-bc60-8de833ffb63a'


// let thePromise = axios.get(`https://na1.api.riotgames.com/lol/summoner/v4/summoners/by-name/h8ritospolicies?api_key=${API_KEY}`)
// let puuid = null
// let mostRecentMatchID = null
// let participants = null

// thePromise.then(res => {
//     console.log(res.data)
//     puuid = res.data.puuid
//     console.log(puuid)
//    return axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?api_key=${API_KEY}`)
// }).then(res => {
//     console.log(res.data)
//     mostRecentMatchID = res.data[0]
//     return axios.get(`https://americas.api.riotgames.com/lol/match/v5/matches/${mostRecentMatchID}?api_key=${API_KEY}`)
// }).then(res => {
//     participants = res.data.info.participants
//     for (participant of participants) {
//         if (participant.puuid === puuid) {
//             console.log(participant.win)
//         }
//     }
// })



async function getEncryptedAccountId(summonerName, region) {
    let res = await axios.get(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`)
    let encryptedSummonerId = res.data.id
    console.log(`https://${region}.api.riotgames.com/lol/summoner/v4/summoners/by-name/${summonerName}?api_key=${API_KEY}`)
    console.log(encryptedSummonerId)
    res = await axios.get(`https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-summoner/${encryptedSummonerId}?api_key=${API_KEY}`)
    let championMasteryData = res.data
    
    return championMasteryData
}


app.get('/api/getMastery', async function (req, res) {
    console.log(req.query)

    try {
        res.send(await getEncryptedAccountId(req.query.summonerName, req.query.region))
    } catch (err) {
        if (err.response.status === 404) {
            res.send({ err: true, msg: 'Summoner name does not exist!' })
        } else if (err.response.status === 403) {
            console.log(err, '\nError change the API key dipshit')
            res.send({ err: true, msg: "Bad API Key" })
        } else {
            console.log(err, "\nError number: " + err.response.status)
            res.send({err: true, msg: "\nError number: " + err.response.status })
        }
    }
})
app.listen(3001)

