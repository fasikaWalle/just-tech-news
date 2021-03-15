
const router=require('express').Router()
const userRoute=require('./user-route.js')

router.use('/users',userRoute)
module.exports=router


