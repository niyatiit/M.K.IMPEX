import {Router} from "express"
import { registerAdmin } from "../controllers/admin.controller.js"
import { loginAdmin } from "../controllers/admin.controller.js"
import { verifyToken } from "../middlewares/authMiddleware.js"


const router = Router()


router.route("/register").post(registerAdmin)
router.route("/login").post(loginAdmin)
router.route("/protected").get(verifyToken , (req ,res)=>{
    res.status(200).json({
        success : true,
        message : `Hello ${req.admin.name}, you're verified`
    })
})


export default router;