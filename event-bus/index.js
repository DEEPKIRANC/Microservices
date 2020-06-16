const express=require('express');
const bodyParser=require('body-parser');
const axios=require('axios');

const app=express();
app.use(bodyParser.json());

app.post('/events',(req,res)=>{

    const content=req.body;

    axios.post('http://localhost:4000/events',content);
    axios.post('http://localhost:4001/events',content);
    axios.post('http://localhost:4002/events',content);

    res.send({status:'OK'});

})

app.listen(4005,()=>{
    console.log('Listening to port 4005');
});