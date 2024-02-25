import mongodb from "mongodb"
const ObjectId = mongodb.ObjectId
let social

export default class AuthDAO{
    static async injectDB(conn)
    {
        if(social)
        {
            return
        }
        try{
            social = await conn.db("SocialMedia").collection("Auth")
            console.log(social)
        }catch(e)
        {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async addAccountDAO(userName,email,profileImage,bio,password)
    {
        try{
            const AuthDoc = {
                userName :userName,
                email : email,
                bio : bio,
                profileImage : profileImage,
                password : password,
            }
            console.log("Adding")
            const addChatt = await social.insertOne(AuthDoc)
            console.log("hi");
            console.log(addChatt);
            return addChatt
        }catch(e)
        {
            console.error(`Unable to post activity: ${e}`);
            return {error:e}
        }
    }

    static async getAccDAO()
    {
        try{
         const getAccount = await social.find({}).toArray()
         console.log(getAccount);
         return getAccount
        }catch(e)
        {
            console.error(`Unable to Get Activities: ${e}`)
            return {error:e}
        }
    }

    static async getIdAccDAO(id)
    {
        try{
         const getAccount = await social.find({_id:new ObjectId(id)}).toArray()
         console.log(getAccount);
         return getAccount
        }catch(e)
        {
            console.error(`Unable to Get Activities: ${e}`)
            return {error:e}
        }
    }

    static async updateAccDAO(id,userName,email,profileImage,bio,password)
    {
        try{
            const updateAccount =await social.updateOne(
                {_id: new ObjectId(id)},
                {$set : {
                    userName :userName,
                    email : email,
                    bio : bio,
                    profileImage : profileImage,
                    password : password,
                }}
            )
            console.log(updateAccount);
            return updateAccount
        }catch(e)
        {
            console.error(`Unable to Update Activities: ${e}`)
            return {error:e}
        }
    }

    static async deleteAccDAO(id)
    {
        try{
            const deleteAccount = await social.deleteOne({
                _id: new ObjectId(id),
            })
            return deleteAccount
        }catch(e)
        {
            console.error(`Unable to Delete Activities: ${e}`)
            return {error:e}
        }
    }
}