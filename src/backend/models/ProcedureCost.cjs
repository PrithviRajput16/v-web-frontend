const mongoose = require('mongoose');

const procedureCostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Procedure title is required'],
        trim: true,
        maxlength: [100, 'Title cannot exceed 100 characters']
    },
    price: {
        type: String,
        required: [true, 'Price is required'],
        trim: true
    },
    icon: {
        type: String,
        default: '⚕️'
    },
    description: {
        type: String,
        trim: true,
        maxlength: [500, 'Description cannot exceed 500 characters']
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

module.exports = mongoose.model('ProcedureCost', procedureCostSchema);