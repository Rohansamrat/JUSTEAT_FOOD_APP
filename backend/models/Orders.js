const mongoose = require('mongoose')

const OrderSchema=new mongoose.Schema({
    email:{
        type:String,
        require:true,
        unique:true
    },

    order_data:{
        type:Array,
        require:true,
    },
});

module.exports = mongoose.model("Orders",OrderSchema);
