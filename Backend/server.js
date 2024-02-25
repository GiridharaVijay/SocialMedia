import app from "./index.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import AuthDAO from "./dao/authDAO.js";
import postDAO from "./dao/postDAO.js";

dotenv.config();

const mongodb_username = process.env['MONGODB_USERNAME'];
const mongodb_password = process.env['MONGODB_PASSWORD'];
const uri = `mongodb+srv://${mongodb_username}:${mongodb_password}@socialmedia.9whayz8.mongodb.net/?retryWrites=true&w=majority&appName=SocialMedia`;
const port = process.env.PORT || 8000;

const MongoClient = mongodb.MongoClient;

MongoClient.connect(uri, {
    maxPoolSize: 50,
    wtimeoutMS: 2500,
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}).catch(err => {
    console.log(err.stack);
    process.exit(1);
}).then(async client => {
    console.log("hiii");
    await AuthDAO.injectDB(client);
    await postDAO.injectDB(client);
    app.listen(port, () => {
        console.log(`Server is running in Port ${port}`);
    });
});
