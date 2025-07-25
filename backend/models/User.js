import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  number: { type: Number, required: true },
  nameOfLocation: { type: String, required: true },
  date: { type: String, required: true },
  loginHour: { type: String, required: true },
  name: { type: String, required: true },
  age: { type: Number, required: true }, // Birth year
  actualAge: { type: Number }, // Calculated age
  gender: { type: String, required: true },
  email: { type: String, required: true },
  noTelp: { type: String, required: true },
  brandDevice: { type: String, required: true },
  digitalInterest: { type: String, required: true },
  locationType: { type: String, required: true },
  ageGroup: { type: String } // Pre-calculated age group
}, {
  timestamps: true
});

// Add indexes for better performance
userSchema.index({ gender: 1 });
userSchema.index({ locationType: 1 });
userSchema.index({ brandDevice: 1 });
userSchema.index({ digitalInterest: 1 });
userSchema.index({ ageGroup: 1 });
userSchema.index({ loginHour: 1 });

export default mongoose.model('User', userSchema);