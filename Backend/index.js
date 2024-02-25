import express from 'express'
import list from "./api/route.js"
const app = express();
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  });
app.use(express.json());
app.use("/api/v1/socialMedia",list);
app.get("*",(req,res)=>{
    res.status(404).json({message:"Not Found"});
})
export default app;