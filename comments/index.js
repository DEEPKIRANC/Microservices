const express=require('express');
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

app.post('/posts/:id/comments',(req,res)=>
{
    const commentID=randomBytes(4).toString('hex');

    const {content} =req.body;
    

    const comments=commentsByPostID[req.params.id] || [];

    comments.push( { id:commentID , content } );

    commentsByPostID[req.params.id]=comments;

    res.status(201).send(comments);
})

app.listen(4001,()=>
{
    console.log('Listening to port : 4001');
})