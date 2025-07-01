import mongoose from "mongoose";
import bcrypt from "bcrypt";

// Job Seeker Details Schema
const jobSeekerDetailsSchema = new mongoose.Schema({
  temporaryAddress: { type: String, required: false },
  permanentAddress: { type: String, required: false },
  job: { type: String, required: false },
  skills: { type: String, required: false },
  profession: { type: String, required: false },
  isOpenToWork: { type: Boolean, required: false },
});

// Recruiter Details Schema
const recruiterDetailsSchema = new mongoose.Schema({
  personalAddress: { type: String, required: false },
  companyName: { type: String, required: false },
  companyLogo: { type: String, required: false },
  companyAddress: { type: String, required: false },
  aboutCompany: { type: String, required: false },
  positionInCompany: { type: String, required: false },
  isIndividualEmployer: { type: Boolean, required: false },
  isCurrentlyHiring: { type: Boolean, required: false },
});

const userSchema = new mongoose.Schema(
  {
    role: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    isEmailVerified: { type: Boolean, required: false },
    phone: { type: String, required: false },
    password: { type: String, required: true },
    profileImage: { type: String, required: false },
    dob: { type: String, required: true },
    gender: { type: String, required: true },
    lastLogin: { type: String, required: false },
    oauthProvider: { type: String, required: false },
    oauthId: { type: String, required: false },
    ip: { type: String, required: false },
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
