const Sequlize = require('sequelize')

const sequlize = require('../database/database')

const User = sequlize.define('user',{
    id : {
        type : Sequlize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    message : Sequlize.STRING,
    senderId : Sequlize.INTEGER,
    recevierId : Sequlize.INTEGER
})

module.exports = User