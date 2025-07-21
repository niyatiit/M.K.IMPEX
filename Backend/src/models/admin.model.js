import mongoose from "mongoose";
import bcrypt from "bcrypt";

const adminSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    contactNo: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      default: "admin",
    },
    isApproved : {
      type : Boolean,
      default : false,
    }
  },
  {
    timestamps: true,
  }
);


// Encrypt the password in the hash password
adminSchema.pre("save" , async function (next) {
    if(this.isModified("password")){
        const saltRounds = 10;
        this.password= await bcrypt.hash(this.password , saltRounds)
    }
    next();
})


// ✅ Add this method for password comparison
adminSchema.methods.isPasswordMatched = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const Admin = mongoose.model("Admin", adminSchema);
export default Admin;