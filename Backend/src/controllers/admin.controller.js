import { apiError } from "../utils/apiError.util.js";
import Admin from "../models/admin.model.js";
import { apiResponse } from "../utils/apiResponse.util.js";
import bcrypt from "bcrypt";
import { generateToken } from "../utils/generateToken.util.js";

// Registration
const registerAdmin = async (req, res) => {
  const { username, fullName, email, password, contactNo, role } = req.body;

  // Step 2: Validation
  if (
    [username, fullName, email, password, contactNo, role].some(
      (field) => String(field).trim() === ""
    )
  ) {
    throw new apiError(400, "All Fields are required");
  }

  // Step 3: Check if already exists
  const existingAdmin = await Admin.findOne({
    $or: [{ username }, { email }],
  });
  if (existingAdmin) {
    throw new apiError(409, "Admin already exists");
  }

  // Step 4: Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const admin = await Admin.create({
    username,
    fullName,
    email,
    password: hashedPassword,
    contactNo,
    role,
    isApproved: username === "kiran" ? false : true, // ✅ only Kiran needs approval
  });

  // Step 5: Clean up sensitive fields
  const createdAdmin = await Admin.findById(admin._id).select("-password");

  // Step 6: Notify Hiren & Apoorv if Kiran registers
  if (username === "kiran") {
    console.log(
      `🔔 Notification: Kiran registered and needs approval. Please notify Hiren and Apoorv via email or admin dashboard.`
    );

    // Optional: You can trigger email sending logic here using nodemailer/sendgrid etc.
  }

  // Step 7: Send response
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

    if (email === "" || password === "") {
      throw new apiError(400, "All fields are required");
    }

    const admin = await Admin.findOne({ email });
    if (!admin) {
      throw new apiError(
        404,
        "Admin is not Found Please try again enter the eamil and password"
      );
    }

    if (admin.username === "kiran" && !admin.isApproved) {
      throw new apiError(
        403,
        "Access denied. Awaiting approval from main admin"
      );
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      throw new apiError(401, "Invalid Password Please try again");
    }

    const token = generateToken(admin._id);

    return res.status(200).json(
      new apiResponse(200, "Login Successfull", {
        token,
        user : {
          id : admin._id,
          username : admin.username,
          role : admin.role,
        }
      })
    );
  } catch (err) {
    console.log("Something went wrong please try again ");
    next(err);
  }
};

// Verificatio Approove
const approveAdmin = async (req, res) => {
  const { id } = req.params;

  const admin = await Admin.findById(id);
  if (!admin) {
    throw new apiError(404, "Admin is not found");
  }

  admin.isApproved = true;
  await admin.save();

  return res
    .status(200)
    .json(new apiResponse(200, admin, "Admin approved Successfully"));
};

const adminDashboard = (req,res) =>{
  res.status(200).json({
    success : true,
    message : `Welcome ${req.admin.fullName}, you are in the admin dashboard!`,
    role : req.admin.role
  })
}
export { registerAdmin, loginAdmin, approveAdmin ,adminDashboard };
