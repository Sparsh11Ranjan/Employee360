import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();
import connectToDatabase from "./db/db.js";
import User from "./models/Users.js";

const userRegister = async () => {
  await connectToDatabase();
  try {
    const hashed = await bcrypt.hash("admin", 10);
    const admin = new User({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashed,
      role: "admin"
    });
    await admin.save();
    console.log("Admin seeded.");
  } catch (err) {
    console.error("Error seeding user:", err);
  }
};

userRegister();
