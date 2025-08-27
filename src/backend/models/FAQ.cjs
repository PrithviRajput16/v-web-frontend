const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Question is required'],
    trim: true,
    maxlength: [200, 'Question cannot exceed 200 characters']
  },
  answer: {
    type: String,
    required: [true, 'Answer is required'],
    maxlength: [1000, 'Answer cannot exceed 1000 characters']
  },
  category: {
    type: String,
    default: 'General',
    trim: true
  },
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

module.exports = mongoose.model('FAQ', faqSchema);