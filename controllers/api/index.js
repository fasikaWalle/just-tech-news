
const router=require('express').Router()

const userRoute=require('./user-route.js')
const postRoute=require('./Post-route.js')
const commentRoute=require('./Comment-route.js')
router.use('/users',userRoute)
router.use('/posts',postRoute)
router.use('/comments',commentRoute)
module.exports= router


