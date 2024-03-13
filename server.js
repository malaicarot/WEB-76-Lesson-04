import express from 'express'
import { SERVER_CONFIG } from './src/configs/server.config.js'
import { UserRouter } from './src/routes/user.route.js'
import { DB_CONFIG } from './src/configs/db.config.js'
import mongoose  from 'mongoose'



const DB_CONNECTION_STR = "mongodb+srv://" + DB_CONFIG.userName + ":" + DB_CONFIG.passWord + "@cluster0.63i9ng1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const app = express()

app.use(express.json())

app.use(SERVER_CONFIG.RESOURCES.USER.CONTEXT_PATH, UserRouter)

main()

async function main(){
    try {
        await mongoose.connect(DB_CONNECTION_STR);
        console.log("Connect to DB success!")
        console.log("Waiting connect Server!")
    
        app.listen(SERVER_CONFIG.PORT, () => {
            console.log(`Server is connect at port ${SERVER_CONFIG.PORT}`)
        })
        
    } catch (error) {
        console.log("Error connect to DB:" + error.message)
        
    }


}
