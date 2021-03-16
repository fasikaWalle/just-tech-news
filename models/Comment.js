const {Model,DataTypes}=require('sequelize')
const { User,Post,Vote } = require('../models')
const sequelize=require('../config/connection')

class Comment extends Model{
    
}
Comment.init({
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
    },
    comment_text:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            len:[1]
        }
    },
    user_id:{
        type:DataTypes.INTEGER,
        allowNull:false,   
        references:{
            model:User,
            key:'id'
        }
    },
    post_id:{
        type:DataTypes.INTEGER, 
        allowNull:false,  
        references:{
            model:Post,
            key:'id'
        }
    }
},{
sequelize,
freezTableName:true,
underscore:true,
modelName:'comment'
}
)

module.exports=Comment