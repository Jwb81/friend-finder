const fs = require('fs')
const path = require('path')

module.exports = {
    writeFriendsToFile: list => {
        return new Promise((resolve, reject) => {
            fs.writeFile(path.join(__dirname, '..', 'data', 'friends.js'), JSON.stringify(list), err => {
                if (err) {
                    reject(err)
                }
                resolve()
            })
        })

    },

    findClosestMatch: (list, user) => {
        let matchDiff
        let matchObj 

        const userScore = user.answers.reduce((acc, cur) => acc + cur, 0)
        console.log(userScore)

        // search existing users to find the closest match
        list.forEach((x, index) => {
            if (!index) {
                matchDiff = Math.abs((userScore - x.answers.reduce((acc, cur) => acc + cur, 0)))
                matchObj = x
                return
            }

            tempDiff = Math.abs((userScore - x.answers.reduce((acc, cur) => acc + cur, 0)))

            if (tempDiff < matchDiff) {
                matchDiff = tempDiff
                matchObj = x
            }
            
        })

        return {
            name: matchObj.name,
            photo: matchObj.photo
        }

    },

    getFriendsFromFile: () => {
        return new Promise((resolve, reject) => {
            // read in data from friends.js
            fs.readFile(path.join(__dirname, '..', 'data', 'friends.js'), 'utf8', (err, data) => {
                if (err) {
                    console.log(err)
                }

                resolve(JSON.parse(data))
            })
        })

    }
}