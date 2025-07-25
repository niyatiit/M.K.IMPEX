import { Stock } from "../models/stock.model.js";
import mongoose from "mongoose";

// ADD STOCK - Any admin can add stock
export const addStock = async (req, res) => {
  try {
    const { itemName, quantity, price } = req.body;

    if (!itemName || !quantity || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const stock = new Stock({
      itemName,
      quantity,
      price,
      addedBy: req.admin._id,
    });

    await stock.save();

    res.status(201).json({
      message: "Stock added successfully",
      stock,
    });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// GET ALL STOCK
export const getAllStock = async (req, res) => {
  try {
    const stocks = await Stock.find().populate("addedBy", "name email");
    res.status(200).json({ stocks });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// GET SINGLE STOCK BY ID
export const getSingleStock = async (req, res) => {
  try {
    const { id } = req.params;

      if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid stock ID" });
    }
    const stock = await Stock.findById(id).populate("addedBy", "name email");

    if (!stock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    res.status(200).json({ stock });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// UPDATE STOCK - Only if NOT Kiran
export const updateStock = async (req, res) => {
  try {
    const adminName = req.admin.name.toLowerCase();

    if (adminName === "kiran") {
      return res
        .status(403)
        .json({ message: "Kiran is not allowed to update stock" });
    }

    const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid stock ID" });
    }
    const updatedStock = await Stock.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!updatedStock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    res.status(200).json({ message: "Stock updated", stock: updatedStock });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};

// DELETE STOCK - Only if NOT Kiran
export const deleteStock = async (req, res) => {
  try {
    const adminName = req.admin.fullName.toLowerCase();

    if (adminName === "kiran") {
      return res
        .status(403)
        .json({ message: "Kiran is not allowed to delete stock" });
    }

    const { id } = req.params;
      if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid stock ID" });
    }
    const deletedStock = await Stock.findByIdAndDelete(id);

    if (!deletedStock) {
      return res.status(404).json({ message: "Stock not found" });
    }

    res.status(200).json({ message: "Stock deleted", stock: deletedStock });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
