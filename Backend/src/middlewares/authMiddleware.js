import jwt from "jsonwebtoken"
import { apiResponse } from "../utils/apiResponse.util.js";
import { apiError } from "../utils/apiError.util";

const verifyToken = (req, res , next) =>{
    const token = req.headers.authorization;

    if(!token)
    {
        return res.status(401).json( { success : false , message : "Access Denied . No token Provided"})
    }

    try{
        const decode = jwt.verify
        (token,process.env.JWT_SECRET);
        req.admin = decode;
        next();
    }
    catch(err)
    {
        res.status(400 , apiError("Invlaid Token"))
    }
}

export {verifyToken}