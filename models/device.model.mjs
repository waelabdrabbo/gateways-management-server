import mongoose from 'mongoose';

const deviceSchema = new mongoose.Schema(
  {
    uid: {
      type: String,
      required: true,
      unique: true
    },
    vendor: {
      type: String,
      required: true
    },
    createdDate: {
      type: Date,
      default: Date.now()
    },
    status: {
      type: String,
      enum: ['online', 'offline'],
      default: 'offline'
    },
    gateway: {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'Gateway'
    }
  },
  { timestamps: true }
);

const Device = mongoose.model('Device', deviceSchema);

export default Device;