const express = require("express");
const app = express();
const path = require("path");
const port =8080;
const {v4:uuidv4} = require("uuid");
const methodOverride=require("method-override");

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));
 
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));



let posts =[
    {
        id :uuidv4(),
        username :"apnacollege",
        content :"I love coding"
    },

    {
        id:uuidv4(),
        username :"Vinay",
        content :"Hardwork is important"
    },
    {
        id:uuidv4(),
        username:"kumar",
        content:"I got First rank"
    }
]

// GET ALL POSTS
app.get("/posts",(req,res)=>
{
    res.render("index",{posts});
})

// GET A NEW POST
app.get("/posts/new",(req,res)=>
{
    res.render("new");
})

// CREATED NEW POST TO SEND POSTS Array
app.post("/posts",(req,res)=>
{
    // console.log(req.body);
    let {username,content}= req.body;
    let id =uuidv4();
    posts.push({id,username,content});   // to add the new form data to array
    res.redirect("/posts")      //to render to posts
    // res.send("post request working")
})

// TO GET POSTS BY id
app.get("/posts/:id",(req,res)=>
{
    let {id}= req.params;
    let post = posts.find((p)=>id === p.id);  //to get the post by id, 
    // if id entered is mtached with the post then post is displayed
    // console.log(post);
    // res.send("request is working");
    res.render("show",{post});
})


// TO UPDATE CONTENT
app.patch("/posts/:id",(req,res)=>
{
    let {id}= req.params;
    // console.log(id);
    let newcontent = req.body.content;
    let post = posts.find((p)=>id === p.id)
    post.content = newcontent;
    // console.log(post);
    res.redirect("/posts");
})

// EDIT THE CONTENT
app.get("/posts/:id/edit",(req,res)=>
{
    let {id}= req.params;
    let post = posts.find((p)=>id === p.id)
    res.render("edit",{post});
})


// DELETE POST
app.delete("/posts/:id",(req,res)=>
{
    let {id}= req.params;
     posts = posts.filter((p)=>id !== p.id);  //we use filter method
    // res.send("delete sucess");
    res.redirect("/posts");
})

app.listen(port,()=>
{
    console.log(`app is listening to ${port}`);
})