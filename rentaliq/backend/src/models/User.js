import mongoose from 'mongoose';
import bcryptjs from 'bcryptjs';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Por favor forneça um nome'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Por favor forneça um email'],
    unique: true,
    lowercase: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Por favor forneça um email válido'
    ]
  },
  password: {
    type: String,
    required: [true, 'Por favor forneça uma senha'],
    minlength: 6,
    select: false
  },
  phone: {
    type: String,
    trim: true
  },
  company: {
    type: String,
    trim: true
  },
  plan: {
    type: String,
    enum: ['FREE', 'PRO', 'ENTERPRISE'],
    default: 'FREE'
  },
  pricingStrategy: {
    type: String,
    enum: ['AGGRESSIVE', 'BALANCED', 'CONSERVATIVE'],
    default: 'BALANCED'
  },
  airbnbConnected: {
    type: Boolean,
    default: false
  },
  airbnbAccessToken: {
    type: String,
    select: false
  },
  bookingConnected: {
    type: Boolean,
    default: false
  },
  bookingAccessToken: {
    type: String,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcryptjs.genSalt(10);
  this.password = await bcryptjs.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcryptjs.compare(enteredPassword, this.password);
};

// Remove password and sensitive tokens from response
userSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  delete obj.airbnbAccessToken;
  delete obj.bookingAccessToken;
  return obj;
};

export default mongoose.model('User', userSchema);
