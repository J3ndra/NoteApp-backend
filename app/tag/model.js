const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const tagSchema = Schema({
    name: {
        type: String,
        minLength: [3, 'Minimum tag name is 3 character.'],
        maxLength: [20, 'Maximum tag name is 20 character.'],
        required: [true, 'Tag name must be filled!']
    }
});

module.exports = model('Tag', tagSchema);