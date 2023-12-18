// rest api 

const express = require('express')
const app = express()
const port = 3111
const userdata = require('./public/products.json')
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.json());

// get
app.get('/users',(req,res)=>{ 
      res.status(200).json(userdata)
})

// specific users
app.get('/users/:id',(req,res)=>{
        const userid = +req.params.id
       const findData = userdata.find((p)=>p.id === userid)
       res.status(200).json(findData)
})

// post create
app.post('/login',(req,res)=>{
    const data =  userdata.push(req.body)
     res.json({ massge: "your sucessfully signup",data:req.body});
})
// put replace a spacific data
app.put('/users/:replace',)

// patch update data
app.patch('/users/:update',)

app.delete('/users/:remove',)

app.listen(port,()=>`server was connted ${port}`)
