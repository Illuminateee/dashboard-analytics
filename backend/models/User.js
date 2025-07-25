import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  number: { type: Number },
  nameOfLocation: { type: String },
  date: { type: String },
  loginHour: { type: String },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  noTelp: { type: String },
  brandDevice: { type: String, required: true },
  digitalInterest: { type: String, required: true },
  locationType: { type: String, required: true },
  ageGroup: { type: String, required: true } // Add this field
}, {
  timestamps: true
});

// Create indexes for better query performance
userSchema.index({ gender: 1 });
userSchema.index({ ageGroup: 1 });
userSchema.index({ brandDevice: 1 });
userSchema.index({ locationType: 1 });
userSchema.index({ digitalInterest: 1 });

export default mongoose.model('User', userSchema);