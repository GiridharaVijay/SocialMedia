import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId;
let post;

export default class postDAO{
    static async injectDB(conn)
    {
        if(post)
        {
            return
        }
        try{
            post = await conn.db("SocialMedia").collection("Posts")
            console.log(post);
        }catch(e)
        {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async addPostDAO(message,imgUrl,userName,timestamp)
    {
        try{
           const postDoc = {
            message : message,
            imgUrl : imgUrl,
            userName:userName,
            timestamp : timestamp
           } 
           const addPosts = await post.insertOne(postDoc)
           return addPosts
        }
        catch(e)
        {
            console.error(`Unable to post activity: ${e}`);
            return {error:e}
        }
    }

    static async getPostDAO()
    {
        try{
            const allPosts = await post.find({}).toArray();
            return allPosts
        }catch(e)
        {
            console.error(`Unable to Get Activities: ${e}`)
            return {error:e}
        }
    }

    static async PutPostDAO(msgId,message,imgUrl,userName,timestamp)
    {
        try{
            const putPost = await post.updateOne(
                {_id: new ObjectId(msgId)},
                {
                    $set :{
                        message : message,
                        imgUrl : imgUrl,
                        userName:userName,
                        timestamp : timestamp
                    }
                }
            )
            return putPost

        }catch(e)
        {
            console.error(`Unable to Update Activities: ${e}`)
            return {error:e}
        }
    }

    static async deletePostDAO(msgId)
    {
        try{
            const deletePost = await post.deleteOne({
                _id : new ObjectId(msgId)
            })
            return deletePost

        }catch(e)
        {
            console.error(`Unable to Delete Activities: ${e}`)
            return {error:e}
        }
    }

    static async deletePostsByUsernameDAO(userName) {
        try {
            const deletePosts = await post.deleteMany({
                userName: userName
            });
    
            return deletePosts;
        } catch (e) {
            console.error(`Unable to Delete Posts: ${e}`);
            return { error: e };
        }
    }
    

    static async getIdPostDAO(msgId)
    {
        try{
            const getPost = await post.find({_id:new ObjectId(msgId)}).toArray()
            return getPost
        }catch(e)
        {
            console.error(`Unable to Get Message: ${e}`)
            return {error:e}
        }
    }
}