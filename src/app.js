import express from  'express';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(express.json());

const cadastro =[];
const tweets =[];
let useravatar ="";
let user={};

app.post("/sign-up",(req,res)=>{
    const {username, avatar }=req.body;
    user ={username, avatar};
    if( !user.username || !avatar){
        return res.status(400).send("Todos os campos são obrigatórios!")
    };

    // if( typeof user.username !== string){
        // return res.status(400).send("Todos os campos são obrigatórios!")
    // }
    useravatar =avatar;
    cadastro.push(user);
   return res.status(201).send("CREATED");
});

app.post("/tweets", (req,res)=>{    
    const { tweet} = req.body;
    const use =req.headers.user;
    
    const message = 
        {
            username : use,
            avatar: useravatar,
            tweet 
        };
        if( !tweet ){
            return res.status(400).send("Todos os campos são obrigatórios!")
        };
        if( !use ){
            return res.send("UNAUTHORIZED")
        };
    tweets.unshift(message);
    return res.status(201).send("CREATED");
});
    
    app.get("/tweets", (req,res)=>{    
   let tenTweets = tweets.slice(0,10);
    return res.send(tenTweets)
});

    app.get("/tweets/:name", (req,res)=>{
   const name = req.params.name;
   const username = cadastro.find( item => item.username === name );
         return res.send(username)
        });
     

    const PORT =5000;

app.listen(PORT,()=>{console.log(`SERVER RUNNING IN PORT: ${PORT}`)});