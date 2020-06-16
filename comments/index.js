const express=require('express');
const axios=require('axios');
const {randomBytes}=require('crypto');
const cors=require('cors');
const bodyParser=require('body-parser');
const app=express();

app.use(bodyParser.json());
app.use(cors());
const commentsByPostID={};

app.get('/posts/:id/comments',(req,res)=>
{
    res.send(commentsByPostID[req.params.id] || [] );
})

app.post('/posts/:id/comments',async (req,res)=>
{
    const commentID=randomBytes(4).toString('hex');

    const {content} =req.body;
    

    const comments=commentsByPostID[req.params.id] || [];

    comments.push( { id:commentID , content } );

    commentsByPostID[req.params.id]=comments;

    await axios.post('http://localhost:4005/events',{type:'Comment Created',data:{id:commentID,content,postID:req.params.id}})



    res.status(201).send(comments);
})

app.post('/events',(req,res)=>{
    console.log('Received Event',req.body.type);

    res.send({});
})

app.listen(4001,()=>
{
    console.log('Listening to port : 4001');
})