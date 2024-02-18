const mongoose = require('mongoose')

module.exports = () => {
    mongoose.connect('mongodb+srv://cluster0.u60utzk.mongodb.net/', {
        dbName: 'Artwork_Platform',
        user: 'vonhatnam',
        pass: 'vonhatnam',
    })
        .then(() => {
            console.log('Mongodb is successfully connected.')
        })
        .catch(err => console.log(err.message))

    mongoose.connection.on('connected', () => {
        console.log("Mongoose connected to database...")
    })

    mongoose.connection.on('error', (err) => {
        console.log(err.message)
    })

    mongoose.connection.on('disconnected', () => {
        console.log("Mongoose is disconnected.")
    })

    process.on('SIGINT', () => {
        mongoose.connection.close()
    })
}