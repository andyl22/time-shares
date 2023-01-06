import mongoose, { Schema } from 'mongoose';

const EntityBooking = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  dateOfBooking: {
    type: Date,
    required: true
  },
  dayBooked: {
    type: Date,
    required: true
  },
  startTime: {
    type: Number,
    required: true
  },
  endTime: {
    type: Number,
    required: true
  },
  entityId: {
    type: Schema.Types.ObjectId,
    ref: 'Entity',
    required: true
  }
});

export default mongoose.models.EntityBooking ||
  mongoose.model('EntityBooking', EntityBooking);
