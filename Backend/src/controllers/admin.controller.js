import { apiError } from "../utils/apiError.util.js";
import Admin from "../models/admin.model.js";
import { apiResponse } from "../utils/apiResponse.util.js";

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
  const admin = await Admin.create({
    username,
    fullName,
    email,
    password,
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

export { registerAdmin };
