import mongoose, { Schema } from 'mongoose';

const EntityBooking = new mongoose.Schema({
  startDate: {
    type: Date,
    required: [true, 'Please provide a start date']
  },
  endDate: {
    type: Date,
    required: [true, 'Please provide an end date']
  },
  entityId: {
    type: Schema.Types.ObjectId,
    ref: 'Entity',
    required: [true, 'Please provide an entity id for this booking.']
  }
});

export default mongoose.models.EntityBooking ||
  mongoose.model('EntityBooking', EntityBooking);
