const Sequlize = require('sequelize')

const sequlize = new Sequlize('example','root','root',{dialect  :'mysql',host : 'localhost' ,port :'3306'})

module.exports = sequlize