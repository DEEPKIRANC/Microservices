const express=require('express');
const {randomBytes}=require('crypto');
const cors=require('cors');
const bodyParser=require('body-parser');
const app=express();
app.use(bodyParser.json());
app.use(cors());

const posts={};

//to create a post and add it to the list of posts
//dfdf
app.post('/posts',(req,res)=>
{
    const id=randomBytes(4).toString('hex');
    const {title}=req.body;

    posts[id]={id,title};
});


//list all the posts and send the response back 
app.get('/posts',(req,res)=>
{
    res.send(posts);
});

app.listen(4000,()=>
{
    console.log("Listening to port : 4000");
})