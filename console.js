const fetch = require('node-fetch')

let info = {
    "x-api-key": "cfdfac5e-8e45-496f-8d4e-181c191a923a"
};

const wallet = '7dPTaep2m8CAJ5X1BskbqS4ALzZMvHt2SFNZLUAz7U8t'
const amount = "1"

// CLAIM 
// fetch(`https://connect.mindfolk.art/.netlify/functions/reward-claim?publicKey=${wallet}&claim=${amount}`, {
//          method: 'GET',
//          headers: { 
//              'Content-Type': 'application/json',
//               'x-api-key': 'cfdfac5e-8e45-496f-8d4e-181c191a923a'
//             }
//      }).then(res => res.json()).then(a => console.log(a))

// USER
// fetch(`https://connect.mindfolk.art/.netlify/functions/reward-user?publicKey=${wallet}&reward=${amount}`, {
//          method: 'GET',
//          headers: { 
//              'Content-Type': 'application/json',
//               'x-api-key': 'cfdfac5e-8e45-496f-8d4e-181c191a923a'
//             }
//      }).then(res => res.json()).then(a => console.log(a))

// LEADERBOARD
// fetch('https://connect.mindfolk.art/.netlify/functions/reward-leaderboard', {
//          method: 'GET',
//          headers: { 
//              'Content-Type': 'application/json',
//               'x-api-key': 'cfdfac5e-8e45-496f-8d4e-181c191a923a'
//             }
//      }).then(res => res.json()).then(a => console.log(a)) 