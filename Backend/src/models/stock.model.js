import mongoose from "mongoose";

const stockSchema = new mongoose.Schema(
  {
    itemName: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
      min : 0,
    },
    price:{
      type : Number,
      required : true,
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
const Stock = mongoose.model("Stock" , stockSchema)
export {Stock}