const router=require('express').Router()
const userRoute=require('./user-route')
router.use('/',userRoute)

module.exports=router