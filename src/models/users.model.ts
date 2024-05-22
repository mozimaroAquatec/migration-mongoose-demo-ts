import mongoose from "mongoose";
import { UsersInterface } from "../interfaces/users.interface";

// Define the schema for the users collection
const usersSchema = new mongoose.Schema(
  {
    // Define the field for username, which is required
    // Example: Before migration to 'name', save new data with column 'name' with change username to name
    username: { type: String, required: true },
  },
  { timestamps: true } // Enable timestamps for createdAt and updatedAt fields
);

// Create a model based on the schema, named 'Users', with the specified interface
const Users = mongoose.model<UsersInterface>("User", usersSchema);

export default Users;
