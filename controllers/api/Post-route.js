
const router =require('express').Router()
const {Post,User,Vote,Comment}=require('../../models');
const { sequelize } = require('../../models/User');
const { post } = require('./user-route');
console.log(post)

// get all users
router.get('/', (req, res) => {
    Post.findAll({
      attributes: ['id', 'post_url', 'title', 'createdAt',
    [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id=vote.post_id)'),'vote_count']],
      order: [['createdAt', 'DESC']],
      include: [
        {
          model:Comment,
          attributes:["id","comment_text","user_id","post_id","createdAt"],
          include:{
            model:User,
            attributes:["username"]
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
router.get('/:id',(req,res)=>{

  Post.findOne({
    where:{
      id:req.params.id
    },
  attributes:['id','title','post_url','createdAt',[
    sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id=vote.post_id)'),'count_vote'
  ]],
  include:[{
    model:User,
    attributes:['username']
  }
  ]
  }).then(dbUser=>{
    if(!dbUser){
      res.status(404).json({message:"no post found with this id"})
      return;
    }
    res.json(dbUser)
  }).catch(err=>{
    res.status(500).json(err)
  })
})
// PUT /api/posts/upvote
router.put('/upvote',(req,res)=>{
  console.log(req.body)
   // make sure the session exists first
  if(req.session){
    // pass session id along with all destructured properties on req.b
    post.upvote({...req.body,user_id:req.session.user_id},{Vote,Comment,User})
    .then(updateVoteData=>{
      res.json(updateVoteData)
    }).catch(err=>{
      res.status(500).json(err)
    })
  }
});
router.post('/', (req, res) => {
  // expects {title: 'Taskmaster goes public!', post_url: 'https://taskmaster.com/press', user_id: 1}
  Post.create({
    title: req.body.title,
    post_url: req.body.post_url,
    user_id: req.body.user_id
  })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.put('/:id', (req, res) => {
  Post.update(
    {
      title: req.body.title
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});
router.delete('/:id', (req, res) => {
  Post.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      res.json(dbPostData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// PUT /api/posts/upvote

module.exports=router