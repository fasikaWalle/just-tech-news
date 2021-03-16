const Comment=require('../../models/Comment')
const router=require('express').Router()
router.get('/', (req, res) => {
Comment.findAll({}).then(dbdata=>{res.json(dbdata)})
});

router.post('/', (req, res) => {
Comment.create({
    comment_text:req.body.comment_text,
    user_id:req.body.user_id,
    post_id:req.body.post_id
}).then(dbCommentData => res.json(dbCommentData))
.catch(err => {
  console.log(err);
  res.status(400).json(err);
});
});

router.delete('/:id', (req, res) => {
Comment.destroy({
  where:{
    id:req.params.id
  }
}).then(data=>{
  if(!data){
    res.status(404).json({message:"id not found"})
    return;
  }
  res.json(data)
}).catch(err=>{
  res.status(500).json(err)
})
});

module.exports=router;