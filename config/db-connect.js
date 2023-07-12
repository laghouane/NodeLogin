const mongoose = require('mongoose');

mongoose.connect(process.env.dburl, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(
    console.log('Connected')
  )
  .catch(
    (err)=>{
        console.log(err);
    }
  )