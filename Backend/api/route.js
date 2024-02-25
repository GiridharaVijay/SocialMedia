import express from "express"
import authDAO from "../dao/authDAO.js"
import postDAO from "../dao/postDAO.js"
const router = express.Router()

router.route("/Account").get(async (req,res)=>{
    try{
        let list = await authDAO.getAccDAO()
        if(!list)
        {
            res.status(404).json({error:"Not Found"})
            return
        }
        res.json(list)
    }catch(e) 
    {
        res.status(500).json({error: e})
    }
}).post(async (req,res)=>{
      try{
        const userName = req.body.userName
        const email = req.body.email
        const bio = req.body.bio
        const profileImage = req.body.profileImage
        const password = req.body.password 
        let todoresponse = await authDAO.addAccountDAO(
            userName,
            email,
            profileImage,
            bio,
            password,
        )
        res.json({todoresponse})
      }catch(e)
      {
        res.status(500).send("failed post")
      }
})

router.route("/Account/:id").put(async (req,res)=>{
    try{
        const id = req.params.id
        const userName = req.body.userName
        const email = req.body.email
        const bio = req.body.bio
        const profileImage = req.body.profileImage
        const password = req.body.password 
        const todoResponse = await authDAO.updateAccDAO(
            id,
            userName,
            email,
            profileImage,
            bio,
            password,
        )
        console.log(todoResponse);
        var {error} = todoResponse
        if(error)
        {
            res.status(400).json({ error })
        }
        if (todoResponse.modifiedCount === 0) {
            throw new Error(
              "unable to update ToDo List",
            )
          }
    
          res.json({ status: "success" })
    }catch(e)
    {
        res.status(500).json({error:e.message})
    }

}).delete(async (req,res)=>{
    try{
        const id = req.params.id;
        const userName = req.params.userName;
        const todoResponse =await authDAO.deleteAccDAO(id)
        const todel = await postDAO.deletePostsByUsernameDAO(userName)
        res.json({ status: "success" })
    } catch (e) {
        res.status(500).json({ error: e.message })
    }
}).get(async (req,res)=>{
    try{
        const id = req.params.id
        let list =await authDAO.getIdAccDAO(id)
        if(!list)
        {
            res.status(404).json({error:"Not Found"})
            return
        }
        res.json(list)
    }catch(e)
    {
        res.status(500).json({error: e})
    }
})

router.route("/posts").get(async (req,res)=>{
    try{
        const msgResponse = await postDAO.getPostDAO();
        if(!msgResponse)
        {
            res.status(404).json({error:"Not Found"})
            return
        }
        res.json(msgResponse)

    }catch(e)
    {
        res.status(500).json({error:e.message})
    }
}).post(async(req,res)=>{
    try{
        const message = req.body.message;
        const imgUrl = req.body.imgUrl;
        const userName = req.body.userName;
        const timestamp = req.body.timestamp; 
        const msgpostResponse = await postDAO.addPostDAO(
            message,
            imgUrl,
            userName,
            timestamp
        )
        console.log(msgpostResponse);
        res.json({msgpostResponse})
    }catch(e)
    {
        res.status(500).json({error:e.message})
    }
})

router.route("/posts/:msgId").put(async (req,res)=>{
    try{
        const msgId = req.params.msgId;
        const message = req.body.message;
        const imgUrl = req.body.imgUrl;
        const userName = req.body.userName;
        const timestamp = req.body.timestamp;
        const msgputResponse = await postDAO.PutPostDAO(
            msgId,
            message,
            imgUrl,
            userName,
            timestamp
        )
        console.log(msgputResponse);
        var {error} = msgputResponse
        if(error)
        {
            res.status(400).json({ error })
        }
        if (msgputResponse.modifiedCount === 0) {
            throw new Error(
              "unable to update Message",
            )
          }
    
          res.json({ status: "success" })
    }catch(e)
    {
        res.status(500).json({error:e.message})
    }
}).delete(async (req,res)=>{
    try{
        const msgId = req.params.msgId;
        const msgdeleteResponse = await postDAO.deletePostDAO(msgId);
        res.json({ status: "success" })
    }catch(e)
    {
        res.status(500).json({error:e.message})
    }
}).get(async (req,res)=>{
    try{
        const msgId = req.params.msgId;
        let list =await postDAO.getIdPostDAO(msgId)
        if(!list)
        {
            res.status(404).json({error:"Not Found"})
            return
        }
        res.json(list)
    }catch(e)
    {
        res.status(500).json({error: e})
    }
})

export default router

