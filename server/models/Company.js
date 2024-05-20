import jwt from 'jsonwebtoken';
import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

const companySchema = Schema({
  email: { type: String, trim: true, minlength: 5, maxlength: 100, unique: true, required: true },
  password: { type: String, trim: true, minlength: 8, required: true },
  role: { type: String, default: "company" },
  phoneNumber: { type: String },
  companyName: { type: String },
  companySector: { type: String },
  companyField: { type: String },
  commercialRegistrationNumber: { type: Number },
  firstNameOfTheOfficial: { type: String },
  lastNameOfTheOfficial: { type: String },
  jobTitle: { type: String },
  companyAddress: { type: String },
  descriptionCompany: { type: String },
  companyImage: { type: Object, default: { url: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460__480.png", publicId: null, } },
  socialMedia: { type: String },
  address: { type: String },// اناقش البنات +وصف كتابي

});

companySchema.methods.getJWToken = function () {
  const key = process.env.JWT_SECRET;
  return jwt.sign({ id: this._id, role: this.role, email: this.email }, key, {
    expiresIn: "100d",
  });
};

export default model("Company", companySchema);
