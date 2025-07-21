import {Router} from "express"
import { approveAdmin, getAllStock, registerAdmin } from "../controllers/admin.controller.js"
import { loginAdmin } from "../controllers/admin.controller.js"
import { verifyToken } from "../middlewares/authMiddleware.js"
const router = Router()


router.route("/register").post(registerAdmin)
router.route("/login").post(loginAdmin)
router.route("/getAll" , verifyToken , getAllStock)
router.route("/approve/:id").patch(verifyToken,approveAdmin)

export default router;