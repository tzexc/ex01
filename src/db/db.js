const mongoose = require('mongoose')
const config = require('config')

mongoose.connect(config.get('mongo_uri'), {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
})
.then(() => console.log('connected to MongoDB!'))
.catch(err => console.error('Something went wrong', err));