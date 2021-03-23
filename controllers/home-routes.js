const router = require('express').Router();
const sequelize = require('../config/connection');
const {User,Comment,Post}=require('../models')

router.get('/', (req, res) => {
  Post.findAll({
    attributes:[
      'id',
      'post_url',
      'title',
      'createdAt',
      [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id =vote.post_id)'),'vote_count']
    ],
    include:[{
        model:Comment,
        attributes:['id','comment_text','post_id','user_id','createdAt'],
        include:{
          model:User,
          attributes:['username']
        }
        
      },
      {
        model:User,
        attributes:['username']
      }
  ]
  }).then(dbPostData=>{
    // console.log(dbPostData[0])
    const posts=dbPostData.map(post=>post.get({palin:true}))
    console.log({posts})
    res.render('homepage',{posts})
  }).catch(err=>{
    console.log(err)
    res.status(500).json(err);
  })
  
  
  
});

module.exports = router;