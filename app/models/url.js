const mongoose = require('mongoose')
const validator = require('validator')
const shorthash = require('shorthash')
const Schema = mongoose.Schema

const urlSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    originalUrl:{
        type:String,
        required:true,
        validate :{
            validator:function(value){
               return validator.isURL(value)
            },
            message:function(){
                return 'not a url'
            }
        }
    },
    hashedUrl:{
        type:String
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    clicks:[
             {
                clickDateTime:{
                    type:Date,
                    default:Date.now
                },
                ipAddress:{
                    type:String
                },
                browser:{
                    type:String
                },
                platform:{
                    type:String
                },
                device:{
                    type:String
                }

        }
    ]
    
})

urlSchema.pre('save', function(next){
    const hash=shorthash.unique(this.originalUrl)
    this.hashedUrl=hash
    console.log(this.hashedUrl)
    next()
   })



const Url = mongoose.model('Url',urlSchema)
module.exports =  Url