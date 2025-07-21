import { app } from "./app.js";
import connectDB from "./config/db.js";
import dotenv from "dotenv"

dotenv.config({
    path : './env'
})

connectDB()
.then(() =>{
    app.listen(process.env.PORT || 3000, ()=>{
        console.log(`Server is starting the at port ${process.env.PORT}`);
    })
})
.catch((err) =>{
    console.log("MongoDB Faild !! ",err)
})

// Routes Import here 
import { registerAdmin } from "./controllers/admin.controller.js";
import { loginAdmin } from "./controllers/admin.controller.js"

// Routes Export here 
app.use("/api/v1/admin", registerAdmin);
app.use("/api/admin/login",loginAdmin)


export {app}