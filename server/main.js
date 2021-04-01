var next=require('next')
var express=require('express')

var sqlite3 = require('sqlite3').verbose();
    global.db = new sqlite3.Database('./e_land.db');

const { Pool, Client } = require('pg')
global.pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'password',
    port: 5432,
})



port=process.env.PORT||3000;
const dev=process.env.NODE_ENV !== 'production';
const app=next({dev:true,dir:'../'});
const handeler=app.getRequestHandler();

app.prepare()
.then(()=>{
    num=5;
    const server=express();
    server.get("*",(req,res)=>{
        if(req.path!='/soc'){
            return handeler(req,res)
        }else{
            num+=1;
            res.json({title:'tan',id:num,userId:5})
        }
    })

    server.listen(port,()=>{
        console.log('listening')
    })
})