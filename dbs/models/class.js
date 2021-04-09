const mongoose = require('mongoose')

let classSchema=mongoose.Schema({
    grade:String,
    class:String,
})

module.exports=mongoose.model('class',classSchema)