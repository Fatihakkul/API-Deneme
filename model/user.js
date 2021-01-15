const Sequlize = require('sequelize')

const sequlize = require('../database/database')

const User = sequlize.define('user',{
    id : {
        type : Sequlize.INTEGER,
        autoIncrement : true,
        allowNull : false,
        primaryKey : true
    },
    name : Sequlize.STRING,
    email : {
        type : Sequlize.STRING,
        allowNull : false,
        unique : true
    },
    password : {
        type : Sequlize.STRING,
        allowNull :  false 
    }
})

module.exports = User