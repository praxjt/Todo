// import { formatedDate } from './static/script'
// const { formatedDate } = require('./static/script');
import { v4 as uuidv4 } from 'uuid'
import express from 'express';   // to use import insted of requre use "type": "module", in package.json 
import params from 'params';


import { fileURLToPath } from 'url'; //1
import { dirname } from 'path'; //2

const __filename = fileURLToPath(import.meta.url);// 3
const __dirname = dirname(__filename); //4            // the 1234 are required for __dirname
// Import the v4 function from the uuid module, and
// Rename it to uuidv4 for use in your code.
let app = express();
import path from 'path'
// const path = require("path");

// let fs=require('fs')
import fs from 'fs'
app.use(express.json())
// let ejs = require('ejs');
import ejs from 'ejs'
app.set('view engine','ejs')

const todolist=JSON.parse(fs.readFileSync('todolist.json'))
const recentlyvisitedtodo=JSON.parse(fs.readFileSync('recentlyvisitedtodo.json'))
console.log(todolist)

app.use("/static", express.static(path.join("./static")));
// app.set('views', path.join(__dirname, 'views'));
// this or this
app.set('views', path.resolve( './views'));
app.get("/", (req, res) => {
  res.status(200).sendFile(path.join(__dirname, "static", "landing.html"));
});

// app.get("/home", (req, res) => {
//   res.status(200).sendFile(path.join(__dirname, "static", "index"));
// });

app.get('/home',(req,res)=>{
  res.status(201).render('index',{todolist:todolist})
})
app.post('/home',(req,res)=>{
   let todos=Object.assign({id:uuidv4() ,...req.body})
  todolist.push(todos)
  console.log(todolist)
  fs.writeFile('todolist.json',JSON.stringify(todolist),(er)=>{
    res.status(201).json({
      todolist:todos
    })  })
})

let count=0

app.get('/home/read/:id',(req,res)=>{
  let id=req.params.id;
  let display=todolist.find((todo)=>todo.id===id)
  console.log(display)
  if(display){
  res.status(201).render('todo',{display:display})
  display.count+=1
  
  fs.writeFile('todolist.json',JSON.stringify(todolist),(er)=>{
    if (err) {
      console.error('Error writing to file:', err);
    }

    })
  }
  else{
    res.redirect('/home')
  }
})

app.delete('/home/read/:id',(req,res,er)=>{
  let id=req.params.id
  let todoTOdlete=todolist.find((todo)=>todo.id===id)
  console.log(todoTOdlete)
  if(todoTOdlete){
  let index=todolist.indexOf(todoTOdlete)
  todolist.splice(index,1)
  fs.writeFile('todolist.json',JSON.stringify(todolist),(er)=>{
    if(er){
    res.redirect('/home')

    }
    res.status(201).json({
      todolist:null
    })  })
  }
  if(er){
    res.redirect('/home')

  }
})

// app.get('/home/read/:id/select',(req,res)=>{
//   let id=req.params.id;
//   let display=todolist.find((todo)=>todo.id===id)
//   if(display){
    
//     fs.writeFile('todolist.json',JSON.stringify(todolist),(er)=>{
//       res.status(201).json({
//         todolist:display
//       }) })
  
//   }
// })

app.patch('/home/read/:id',(req,res)=>{
  let id=req.params.id;
  let todoTOUpdate=todolist.find((todo)=>todo.id===id)
  let i=todolist.indexOf(todoTOUpdate)
  let updatedtodos=Object.assign(todoTOUpdate,req.body)
  todolist[i]=todoTOUpdate
  fs.writeFile('todolist.json',JSON.stringify(todolist),(er)=>{
    res.status(201).json({
      todolist:updatedtodos
    })  })
})


app.listen(2000, () => {
  console.log("server started");
});

