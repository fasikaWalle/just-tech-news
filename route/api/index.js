
const router=require('express').Router()

const userRoute=require('./user-route.js')
const postRoute=require('./Post-route.js')
router.use('/users',userRoute)
router.use('/posts',postRoute)

module.exports= router


