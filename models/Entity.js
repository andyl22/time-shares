import mongoose from 'mongoose';

const Entity = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name for this entity'],
    maxlength: [75, 'Item name must be less than 75 characters'],
    unique: true
  },
  description: {
    type: String,
    required: [true, 'Please provide a description for this entity.'],
    maxlength: [2000, 'Item description must be less than 2000 characters']
  },
  rate: {
    type: Number,
    required: [true, 'Please provide a rate for this entity.'],
    maxlength: [2000, 'Provide a rate for this entity.']
  },
  image: {
    type: String,
    required: [true, 'Please provide an image link for this entity.'],
    maxlength: [4000, 'Item link must be less than 4000 characters']
  },
  visits: {
    type: Number,
    default: 0
  },
  createDttm: {
    type: Date,
    default: Date.now()
  },
  updateDttm: {
    type: Date,
    default: Date.now()
  },
  category: {
    type: String,
    required: [true, 'Please provide a category for this entity.'],
    maxlength: [100, 'Category must be less than 100 characters']
  }
});

export default mongoose.models.Entity || mongoose.model('Entity', Entity);
