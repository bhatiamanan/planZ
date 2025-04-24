import bcrypt from "bcrypt";
import Admin from "../models/Admin.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    
    // Check if admin exists
    const adminExists = await Admin.findOne({ role: "admin" });
    
    if (!adminExists) {
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash("admin123", salt);
      
      const newAdmin = new Admin({
        email: "admin@planz.com",
        password: passwordHash,
        name: "Saksu",
        role: "admin",
        committeeName: "Administration",
        committeeId: "000000000000000000000000", 
        mobile: "1234567890"
      });
      
      await newAdmin.save();
      console.log("Admin user created successfully");
    } else {
      console.log("Admin user already exists");
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error("Error creating admin:", error);
  }
};

createAdmin();