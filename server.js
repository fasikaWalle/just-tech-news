//Create the Database Connection
const express=require('express')
const routes=require('./route')
const sequelize=require('./config/connection')
const app=express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes)

const PORT=process.env.PORT||3000
//turn on routes



//turn on connection to db and server
sequelize.sync({force:false}).then(()=>{
    app.listen(PORT,()=>console.log(`running on port ${PORT}`)) 
})





