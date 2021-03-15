const {Model,DataTypes}=require('sequelize')
const sequelize=require('../config/connection')
const { post } = require('../route/api/user-route')

//create  our post model
class Post extends Model{}

//create fields/columns for post model
Post.init({
   id:{
       type:DataTypes.INTEGER,
       allowNull:false,
       primaryKey:true,
       autoIncrement:true
   } ,
   title:{
       type:DataTypes.STRING,
       allowNull:false
       
   },
  post_url:{
     type:DataTypes.STRING,
     validate:{
        isURL:true
    }
  },
   user_id:{
       type:DataTypes.INTEGER,
       references:{
        model:'user',
        key:'id'
    }
      
   }  
},
{
sequelize,
freezeTableName:true,
underScore:true,
modelName:'post'
}
)

module.exports=Post