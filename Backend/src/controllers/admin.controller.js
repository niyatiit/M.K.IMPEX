import { apiError } from "../utils/apiError.util.js";
import Admin from "../models/admin.model.js";
import { apiResponse } from "../utils/apiResponse.util.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.util.js";

// Registration
const registerAdmin = async (req, res) => {
  // follow the step of the registeration
  // 1. get user detials from frontend means using the postman
  // 2. validation  - i) not empty
  // 3. check if user already exits : username , email
  // 4. create user object - create entry in gb
  // 5. remove the password and refresh token field from response
  // 6. check for the user creation
  // 7. retrun response

  //   Step 1 :
  const { username, fullName, email, password, contactNo, role } = req.body;
  console.log(
    "username : ",
    username,
    "\n fullName : ",
    fullName,
    "\nEmail : ",
    email,
    "\n password : ",
    password,
    "\n Contac No : ",
    contactNo,
    "\n Role : ",
    role
  );
  //   Step 2 :
  if (
    [username, fullName, email, password, contactNo, role].some(
      (field) => !field || field.trim() === ""
    )
  ) {
    throw new apiError(400, "All Fields are required");
  }

  // Step 3 :
  const exitingAdmin = await Admin.findOne({
    $or: [{ username }, { email }],
  });

  if (exitingAdmin) {
    throw new apiError(409, "Admin is already exits ");
  }

  //   Step 4 :
  const hashedPassword = await bcrypt.hash(password,10)
  const admin = await Admin.create({
    username,
    fullName,
    email,
    password : hashedPassword,
    contactNo,
    role,
  });

  //   Step 5 :
  const createdAdmin = await Admin.findById(admin._id).select(
    "-password" // this is the syntax not show the password
  );

  // Step 6 :
  if (!createdAdmin) {
    throw new apiError(500, "Somthing went wrong in the register admin");
  }

  // step 7:
  return res
    .status(201)
    .json(new apiResponse(200, createdAdmin, "Admin Created Successfully"));
};

// Login
const loginAdmin = async (req, res, next) => {
  // Follow the step for the check the user login or not
  // 1. get the email and passwrod
  // 2. check if admin exists
  // 3. if admin is not found
  // 4. compare the password
  // 5. password does not matched
  // 6. id password mathced
  // 7. send the success response
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new apiError(400, "All fields are required");
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new apiError(
        404,
        "Admin is not Found Please try again enter the eamil and password"
      );
    }

    if(admin.username === "kiran" && !admin.isApproved)
    {
      throw new apiError(403 , "Access denied. Awaiting approval from main admin")
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new apiError(401, "Invalid Password Please try again");
    }

    const token = generateToken(admin._id);

    return res.status(200).json(
      new apiResponse(200, "Login Successfull", {
        token,
      })
    );
  } catch (err) {
    console.log("Something went wrong please try again ")
    next(err);
  }
};

// Verificatio Approove 
const approveAdmin = async ( req ,res) =>{
  const { id }= req.params;

  const admin = await Admin.findById(id);
  if(!admin){
    throw new apiError(404 , "Admin is not found")
  }

  admin.isApproved = true;
  await admin.save();

  return res.status(200).json(new apiResponse(200 , admin , "Admin approved Successfully"))
}
export { registerAdmin, loginAdmin , approveAdmin };
