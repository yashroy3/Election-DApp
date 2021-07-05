const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost/Election",{useNewUrlParser:true  ,useUnifiedTopology:true})
.then(()=>console.log("connected"))
.catch((err)=>console.log(err));

const userSchema = mongoose.Schema({
    id:Number,
    password:String
});

const User = mongoose.model('User',userSchema);
const getUser = async() =>{
    const result = await User.find();
    console.log(result);
}
getUser();