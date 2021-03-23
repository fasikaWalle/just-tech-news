
const router=require('express').Router()
const sequelize = require('../../config/connection');
const {User,Post, Vote,Comment}=require('../../models')
//Sequelize is a JavaScript Promise-based library
// GET /api/users
router.get('/', (req, res) => {
  if(!req.session.views){
    req.session.views=1
  }else{
    req.session.views++;
    console.log(`you have visisted ${req.session.views} timess`)
  }
  
      // Access our User model and run .findAll() method equivalen to SELECT * FROM users;)
      User.findAll({
        attributes: { exclude: ['password'] }
      
      }).then(dbUserData=>{res.json(dbUserData)}).catch(err=>{
          console.log(err)
          res.status(500).json(err)
      });
});


// // GET /api/users/1
 //similar to SELECT * FROM users WHERE id = 1
router.get('/:id', (req, res) => {
    User.findOne({
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      },
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'post_url', 'createdAt']
        },
        {
          model: Post,
          attributes: ['title'],
          through: Vote,
          as: 'voted_posts'
        },{
            model:Comment,
            attributes:["id","comment_text","createdAt"],
            include:{
                model:Post,
                attributes:["title"]
            }
            
        }
      ]
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

 

   

// POST /api/users


router.post('/', (req, res) => {
  // expects {username: 'Lernantino', email: 'lernantino@gmail.com', password: 'password1234'}
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
  
        res.json(dbUserData);
      });
    })
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
      console.log(dbUserData)
      req.session.save(()=>{
        req.session.user_id=dbUserData.id;
        req.session.username=dbUserData.username;
        req.session.loggedIn=true
      })
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
router.get('/logout',(req,res)=>{
  if(req.session.loggedIn){
    req.session.destroy(()=>{
      res.status(204).end()
    })
  }else{
    res.status(404).end()
  }
})
module.exports = router