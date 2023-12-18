// 1.application level middelwarwe
// 2.routeing level middelware

const express = require('express')
const app  =  express()
const port = 3300
const path = require('path')

// buliting middelwares when your project use always this middleware like  :-
// this method use to send data post request
// express.json  when data get in the body like form data req.body
// express.urlencoded when data in from frotendside
// last is use for static file :-
// express.static()

app.use(express.static('public'))
app.use(express.json())  //when data come in body
app.use(express.urlencoded({extended:true})) //when data come in frontend side like url data,from data,
// {extended:true}) mens you have get important data give not garbage data
// req.body
const auth = (req,res,next)=>{
    console.log(req.body);
     if(req.body.name == "smit"){
        next()
     }else{
        res.sendStatus(401)
     }
}

// appllication level middelware
// app.use((req,res,next)=>{
//     console.log(req.query);
//         if(req.query.password == '12345'){
//             next()
//         }else{
//             res.sendStatus(401);
//         }
// })

// routing level middelware
// const authantication = (req,res,next)=>{
//     console.log(req.query);
//         if(req.query.password == '12345'){
//             next()
//         }else{
//             res.sendStatus(401);
//         }
// }

app.get('/',(req,res)=>{
    res.json({method:"get method 1"})
})

app.post('/',(req,res)=>{
    res.json({method:"post method"})
})
app.put('/',(req,res)=>{
    res.json({method:"put method"})
})
app.patch('/',(req,res)=>{
    res.json({method:"patch method"})
})
app.delete('/',(req,res)=>{
    res.json({method:"delete method"})
})

// req and responed method
// all api method paramerters app.get('/',middelware,callback)
// app.get('/',(req,res)=>{
         
        //   console.log(req.method,req.ip,req.get('User-Agent'))

            // res.send('hello base route')
            // res.json({name:"smit"})
            // res.sendStatus(403)
            // res.sendFile(path.join(__filename,'users.json'))
// })
 
app.listen(port,()=>{console.log(`server was started ${port}`)})