import mongoose from "mongoose";

// Job Seeker Details Schema
const jobSeekerDetailsSchema = new mongoose.Schema({
  bio: { type: String, default: "" },
  skills: { type: String, required: false },
  profession: { type: String, required: false },
  isOpenToWork: { type: Boolean, default: false },
});

// Recruiter Details Schema
const recruiterDetailsSchema = new mongoose.Schema({
  companyName: { type: String, default: "" },
  companyLogo: { type: String, default: "" },
  companyAddress: { type: String, default: "" },
  aboutCompany: { type: String, default: "" },
  positionInCompany: { type: String, default: "" },
  isIndividualEmployer: { type: Boolean, default: false },
  isCurrentlyHiring: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema(
  {
    role: {
      type: String,
      required: true,
      enum: ["superAdmin", "admin", "recruiter", "jobSeeker"],
    },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isEmailVerified: { type: Boolean, default: false },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: false },
    profileImage: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, required: true, enum: ["male", "female", "other"] },
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
    oAuthProvider: { type: String, default: null },
    oAuthId: { type: String, default: null },
    ip: { type: String, required: true },
    isTermsAndConditionsAccepted: {
      type: Boolean,
      required: true,
      default: false,
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

const Users = mongoose.models.Users || mongoose.model("Users", userSchema);

export default Users;
