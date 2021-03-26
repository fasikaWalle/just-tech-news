const router=require('express').Router()
const apiRoutes=require('./api')
const homeRoute=require('./home-routes.js')
const dashboardRoute=require('./dashboard-routes')
router.use('/dashboard',dashboardRoute)
router.use('/api',apiRoutes)
router.use('/',homeRoute)


router.use((req,res)=>{
    res.status(404).end();
})

module.exports=router;