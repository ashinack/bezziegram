const mongoose=require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/Bezziegram_socialmedia", {
    useNewUrlParser: true
}).then(() => {
    console.log('connection successfull');
}).catch((e) => {
    console.log('no connection');
})