const express = require('express')
const app = express()
const cors = require('cors');
const port = 5000
const mongoDB = require("./db.js")
mongoDB();

app.use(cors({
  origin : true
}
))

// app.use((req,res,next)=>{
//     res.setHeader("Access-Control-Allow-Origin",["http://localhost:3000"]);
//     // res.setHeader("Access-Control-Allow-Origin","http://127.0.0.1:5500");
//     res.header(
//         "Access-Control-Allow-Headers",
//         "origin, X-requested-With, Content-Type, Accept"
//     );
//     next();
// })
app.use(express.static('build'))

app.use(express.json())
app.use('/api', require("./Routes/CreatUser.js"));
app.use('/api', require("./Routes/DisplayData.js"));
app.use('/api', require("./Routes/OrderData.js"));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;