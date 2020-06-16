const express=require('express');
const cors=require('cors');
const bodyParser=require('body-parser');

const app=express();
app.use(bodyParser.json());
app.use(cors());
const posts={};
app.get('/posts',(req,res)=>{

    res.send(posts);
});

app.post('/events',(req,res)=>{
    const {type,data}=req.body;
    if(type==='Post Created')
    {
       const{id,title}=data;
        posts[id]={id,title,comments:[]};
    }
    if(type==='Comment Created')
    {
        const{id,content,postID}=data;
        const post=posts[postID];


        post.comments.push({id,content});
    }
console.log(posts);
res.send({});
});

app.listen(4002,()=>{
    console.log('Listening on port : 4002');
})