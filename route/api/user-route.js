
const router=require('express').Router()
const {User}=require('../../models')
//Sequelize is a JavaScript Promise-based library
// GET /api/users
router.get('/', (req, res) => {
      // Access our User model and run .findAll() method equivalen to SELECT * FROM users;)
      User.findAll({
        attributes: { exclude: ['password'] }
      }).then(dbUserData=>{res.json(dbUserData)}).catch(err=>{
          console.log(err)
          res.status(500).json(err)
      });
});

// GET /api/users/1
router.get('/:id', (req, res) => {
    //similar to SELECT * FROM users WHERE id = 1
    User.findOne({
       attribtes:{
           exclude:['password']
       },
        where:{
        id:req.params.id}
    }).then(dbUserData=>{if(!dbUserData){
            res.status(404).json({message:'there is no user with this id'})
            return;
        }
        res.json(dbUserData)
    }).catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
    
});

// POST /api/users

router.post('/', (req, res) => {
    // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
    User.create({
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    })
      .then(dbUserData => res.json(dbUserData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
// PUT /api/users/1
router.put('/:id', (req, res) => {
    User.update(req.body,{
        individualHooks:true,
        where:{
            id:req.params.id
        }
    }).then(dbUserData=>{if(!dbUserData[0]){
        res.status(404).json({message:'No user found with this id'})
        return;
    }
    res.json(dbUserData);
}).catch(err=>{
    console.log(err)
    res.status(500).json(err)
});
});

//
router.post('/login',(req,res)=>{
    User.findOne({
        where:{
            email:req.body.email
        }
})
.then(dbUserData=>{
    if (!dbUserData) {
        res.status(400).json({ message: 'No user with that email address!' });
        return;
      }
      const validPassword=dbUserData.checkUserPassword(req.body.password)
      if(!validPassword){
        res.status(400).json({message:'incorrect password'})  
        return;
      }
   res.json({ user: dbUserData ,message:'you are now logged in'});
   })
})




// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
        where:{
            id:req.params.id
        }
    }).then(dbUserData=>{
        if(!dbUserData){
            res.status(404).json({message:'id not found'})
        }
        res.json(dbUserData)
    }).catch(err=>{
        console.log(err)
        res.status(500).json(err)
    })
    
});

module.exports = router