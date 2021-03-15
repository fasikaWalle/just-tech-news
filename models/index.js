const User=require('./User')
const Post=require('./Post')
//create association
User.hasMany(Post,{
    foreignKey:'user_id'
})
//We also need to make the reverse association by adding the following statement to the index.js file:
Post.belongsTo(User,{
    foreignKey:'user_id',
    onDelete:'cascade'
})
module.exports={User,Post}
