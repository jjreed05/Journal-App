const pg = require('pg')
const config = 'postgres://qvoldvoweajcmz:d48c38e38adaea162e827eb72f4f244cbfd3f0cf57e07cb3eb5808671d873a79@ec2-54-163-246-193.compute-1.amazonaws.com:5432/deq1s8sdg5mfhj'
const pool = new pg.Pool(config)

function getUser(req, res, next){
    console.log('Getting Credentials')
    pool.connect(function (err, client, done){
        if (err) {
            return console.log("Error fetching from pool")
        }
        console.log('Connected to the Database')
        client.query('SELECT * FROM users WHERE userName = $1', [req.body.username], function(err, result){
            done()
            if (err){
                return console.error('error running the query', err)
            }
            res.render('pages/journalPage')
        })
    })
    pool.end()
}

function getEntry(req, res, next){
    console.log('Getting Credentials')
    pool.connect(function (err, client, done){
        if (err) {
            return console.log("Error fetching from pool")
        }
        console.log('Connected to the Database')
        client.query('SELECT * FROM journals', function(err, result){
            done()
            if (err){
                return console.error('error running the query', err)
            }
            res.send(result)
        })
    })
    pool.end()
}

module.exports = {getUser: getUser, getEntry: getEntry}