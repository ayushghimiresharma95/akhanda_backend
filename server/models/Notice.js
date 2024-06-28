const mongoose = require('mongoose');
const { Schema, model, models } = mongoose;


const NoticeSchema  = new Schema({
  header:{
    type:String,
    required:true,
  },
  engHeader: {
    type:String,
  },
  message: {
    type: String,
    required: true
  },engNotice:{
    type: String,
    required: true
  }
},{timestamps:true})

const Notices = models?.Notice || model('Notices',NoticeSchema)
module.exports = Notices