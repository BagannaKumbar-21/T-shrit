var mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 =require("uuid/v1"); // use to create a unique id
var userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        maxlength:32,
        trim:true
    },
    lastName:{
        type:String,
        maxlength:32,
        trim:true
    },
    email:{
      type:String,
        trim:true,
        requrired:true,
        unique:true
    },
    userinfo:{
        type:String,
        trim:true
    },
    encry_password:{
        type:String,
        required:true
    },
    salt:String,
    role:{
        type:Number,
        default:0
    },
    purchases:{
        type:Array,
        default:[]
    },

}, 
{timestamps:true}
);
//In Mongoose, a virtual is a property that is not stored in MongoDB. Virtuals are typically used for computed properties on documents.
//You can also use virtuals to set multiple properties at once as an alternative to custom setters on normal properties. For example, suppose you have two string properties: firstName and lastName. You can create a virtual property fullName that lets you set both of these properties at once. The key detail is that, in virtual getters and setters, this refers to the document the virtual is attached to.
userSchema.virtual("password") 
    .set(function(password){
        this._password=password;
        this.salt=uuidv1();
        this.encry_password=this.securePassword(password);
    })
    .get(function(){
        return this._password
    })
userSchema.methods={
    autheticate: function(plainpassword){
        return this.securePassword(plainpassword)===this.encry_password;
    },
    securePassword: function(plainpassword){
        if(!plainpassword) return "";
        try{
            return crypto.createHmac("sha256",this.salt).update(plainpassword).digest('hex');
        }catch(err){
            return "";
        }
    }
};
module.exports=mongoose.model("User",userSchema);