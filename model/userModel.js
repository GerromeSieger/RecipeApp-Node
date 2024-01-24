import mongoose from "mongoose";

const Schema = mongoose.Schema;

export const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please provide unique Username"],
        unique: [true, "Username Exist"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    email: {
        type: String,
        required: [true, "Please provide a unique email"],
        unique: true,
    },
    number: { type: String },
    fullName: { type: String },
    country: { type: String },
    bio: { type: String }

}, {
    timestamps: true // Add createdAt and updatedAt fields
  });

export default mongoose.model.User || mongoose.model('User', UserSchema);