const express = require('express')
const router = express.Router()
const fs = require('fs')
const path = require('path')
const f = require('../scripts/scripts')

let friendsList = []

// get friends from file on server startup
f.getFriendsFromFile()
    .then(data => {
        friendsList = data
    })


// get the entire array of friends
router.get('/api/friends', (req, res) => {
    // read data in from file
    f.getFriendsFromFile()
        .then(data => {
            friendsList = data
            res.send(data)
        })
})

// add a new user to the list and find the closest match to them and return it
router.post('/api/friends', (req, res) => {
    // get new user info from POST body
    const newUser = req.body

    if (!newUser) {
        res.send('data sent was null... aborting operation')
    }

    // convert answers array to numbers
    newUser.answers = newUser.answers.map(val => Number(val))

    // search for compatible friend before adding newUser to friendsList
    const match = f.findClosestMatch(friendsList, newUser)

    // add new user to friends list
    friendsList = friendsList.concat(newUser)


    // write friends list to file for storage
    f.writeFriendsToFile(friendsList)
        .catch(err => {
            throw err
        })

    // send compatible friend back to client
    res.json(match)
})

module.exports = router