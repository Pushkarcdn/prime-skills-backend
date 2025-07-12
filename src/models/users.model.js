import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Job Seeker Details Schema
const jobSeekerDetailsSchema = new mongoose.Schema({
  temporaryAddress: { type: String, required: false },
  permanentAddress: { type: String, required: false },
  bio: { type: String, required: false },
  skills: { type: [String], required: false, default: [] },
  profession: { type: String, required: false },
  isOpenToWork: { type: Boolean, required: false, default: false },
});

// Recruiter Details Schema
const recruiterDetailsSchema = new mongoose.Schema({
  personalAddress: { type: String, required: false },
  companyName: { type: String, required: false },
  companyLogo: { type: String, required: false },
  companyAddress: { type: String, required: false },
  companyWebsite: { type: String, required: false },
  aboutCompany: { type: String, required: false },
  positionInCompany: { type: String, required: false },
  isIndividualEmployer: { type: Boolean, required: false, default: false },
  isCurrentlyHiring: { type: Boolean, required: false, default: false },
});

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      enum: ["jobSeeker", "recruiter", "admin", "superAdmin"],
      default: "jobSeeker",
    },
    username: {
      type: String,
      required: true,
      unique: [true, "Username already exists!"],
      lowercase: true,
      trim: true,
      index: true,
      minlength: [4, "Username must be at least 4 characters long!"],
      maxlength: [32, "Username must be at most 32 characters long!"],
      match: [
        /^[a-zA-Z0-9]+$/,
        "Username must contain only letters and numbers!",
      ],
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: [true, "Email already exists!"],
      lowercase: true,
      trim: true,
    },
    isEmailVerified: { type: Boolean, required: false, default: false },
    phone: {
      type: String,
      required: false,
      unique: [true, "Phone number already used!"],
    },
    password: {
      type: String,
      required: false,
    },
    profileImage: { type: String, required: false },
    dob: { type: String, required: false },
    gender: { type: String, required: false },
    lastLogin: { type: String, required: false },
    oAuthProvider: { type: String, required: false },
    oAuthId: { type: String, required: false },
    ip: { type: String, required: true },
    isTermsAndConditionsAccepted: { type: Boolean, required: true },
    jobSeekerDetails: { type: jobSeekerDetailsSchema, required: false },
    recruiterDetails: { type: recruiterDetailsSchema, required: false },
  },
  { timestamps: true },
);

// Pre-save middleware to hash password
userSchema.pre("save", async function (next) {
  // Only hash the password if it has been modified (or is new)
  if (!this.isModified("password")) return next();

  try {
    // Hash password with cost of 12
    const saltRounds = 12;
    this.password = await bcrypt.hash(this.password, saltRounds);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return await bcrypt.compare(candidatePassword, this.password);
};

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

export default Users;
