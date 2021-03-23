const router=require('express').Router()
const apiRoutes=require('./api')
const homeRoute=require('./home-routes.js')

router.use('/',homeRoute)
router.use('/api',apiRoutes)

router.use((req,res)=>{
    res.status(404).end();
})

module.exports=router;