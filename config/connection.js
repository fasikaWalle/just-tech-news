// import the Sequelize constructor from the library
const Sequelize =require('sequelize')
require('dotenv').config()
// create connection to our database, pass in your MySQL information for username and password
if(process.env.JAWSDB_URL){
    sequelize=new sequelize(process.env.JAWSDB_URL)
}else{
    const sequelize=new Sequelize(process.env.DB_NAME,process.env.DB_USER,process.env.DB_PW,{
        host:'localhost',
        dialect:'mysql',
        port:3306
    }) 
}


//RESTful APIs isn't a language or library to learn like JavaScript or Sequelize, but rather a pattern that developers put to use when building an API.
module.exports=sequelize