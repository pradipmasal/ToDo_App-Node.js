const mongoose = require('mongoose')

const tasksSchema = new mongoose.Schema({
    task:{
        type: String,
        required: true 
    },
    isCompleted: {
        type: Boolean,
        default: false, // Default is false for new tasks
    },
}, {
    timestamps: true, // Automatically manages createdAt and updatedAt fields
});

module.exports = mongoose.model('tasks',tasksSchema);