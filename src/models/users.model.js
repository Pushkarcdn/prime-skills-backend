import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Job Seeker Details Schema
const jobSeekerDetailsSchema = new mongoose.Schema({
  bio: { type: String, required: false, trim: true },
  skills: { type: [String], required: false, default: [] },
  profession: { type: String, required: false, trim: true },
  isOpenToWork: { type: Boolean, required: false, default: false },
});

// Recruiter Details Schema
const recruiterDetailsSchema = new mongoose.Schema({
  companyName: { type: String, required: false, trim: true },
  companyLogo: { type: String, required: false, trim: true },
  companyAddress: { type: String, required: false, trim: true },
  aboutCompany: { type: String, required: false, trim: true },
  positionInCompany: { type: String, required: false, trim: true },
  isIndividualEmployer: { type: Boolean, required: false, default: false },
  isCurrentlyHiring: { type: Boolean, required: false, default: false },
});

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      enum: ["superAdmin", "admin", "recruiter", "jobSeeker"],
    },
    firstName: {
      type: String,
      required: [true, "First name is required!"],
      trim: true,
      minlength: [2, "First name must be at least 2 characters long!"],
      maxlength: [50, "First name cannot exceed 50 characters!"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required!"],
      trim: true,
      minlength: [2, "Last name must be at least 2 characters long!"],
      maxlength: [50, "Last name cannot exceed 50 characters!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: {
        validator: function (v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Please enter a valid email address!",
      },
    },
    isEmailVerified: { type: Boolean, default: false },
    phone: {
      type: String,
      required: [true, "Phone number is required!"],
      unique: true,
      validate: {
        validator: function (v) {
          return /^[+]?[\d\s\-\(\)]{10,15}$/.test(v);
        },
        message: "Please enter a valid phone number!",
      },
    },
    password: {
      type: String,
      required: function () {
        return !this.oAuthProvider; // Password required only if not using OAuth
      },
      minlength: [8, "Password must be at least 8 characters long!"],
      validate: {
        validator: function (v) {
          // Only validate if password is being set/modified and not via OAuth
          if (!v && this.oAuthProvider) return true;
          if (!v) return false;

          // Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character
          return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/.test(
            v,
          );
        },
        message:
          "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!",
      },
    },
    profileImage: { type: String, required: false, trim: true },
    dob: {
      type: Date,
      required: [true, "Date of birth is required!"],
      validate: {
        validator: function (v) {
          const today = new Date();
          const age = Math.floor((today - v) / (365.25 * 24 * 60 * 60 * 1000));
          return age >= 13 && age <= 120; // Minimum age 13, maximum age 120
        },
        message: "Age must be between 13 and 120 years!",
      },
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female", "other"],
    },
    temporaryAddress: {
      country: { type: String, required: false },
      state: { type: String, required: false },
      city: { type: String, required: false },
      streetAddress: { type: String, required: false },
    },
    permanentAddress: {
      country: { type: String, required: false },
      state: { type: String, required: false },
      city: { type: String, required: false },
      streetAddress: { type: String, required: false },
    },
    lastLogin: { type: Date, default: null },
    oAuthProvider: { type: String, required: false, default: null },
    oAuthId: { type: String, required: false, default: null },
    ip: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          // Basic IP validation (supports both IPv4 and IPv6)
          return /^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$|^(?:[0-9a-fA-F]{1,4}:){7}[0-9a-fA-F]{1,4}$/.test(
            v,
          );
        },
        message: "Please enter a valid IP address!",
      },
    },
    isTermsAndConditionsAccepted: {
      type: Boolean,
      required: true,
      validate: {
        validator: function (v) {
          return v === true;
        },
        message: "Terms and conditions must be accepted!",
      },
    },
    jobSeekerDetails: {
      type: jobSeekerDetailsSchema,
      required: function () {
        return this.role === "jobSeeker";
      },
    },
    recruiterDetails: {
      type: recruiterDetailsSchema,
      required: function () {
        return this.role === "recruiter";
      },
    },
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

// Method to check if user can login
userSchema.methods.canLogin = function () {
  return this.isEmailVerified || (this.oAuthProvider && this.oAuthId);
};

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

export default Users;
