const mongoose = require('mongoose');

const assistanceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Assistance title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    description: {
        type: String,
        required: [true, 'Assistance description is required'],
        maxlength: [200, 'Description cannot exceed 200 characters']
    },
    icon: {
        type: String,
        required: [true, 'Icon name is required'],
        trim: true
    },
    order: {
        type: Number,
        default: 0
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = mongoose.model('Assistance', assistanceSchema);