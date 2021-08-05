const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const noteSchema = Schema({
    title: {
        type: String,
        minLength: [3, 'Title minimum length is 3 character.'],
        maxLength: [255, 'Title maximum length is 255 character.'],
        required: [true, 'Title must be filled!']
    },

    description: {
        type: String,
        maxLength: [1500, 'Description maximum length is 1500 character.']
    },

    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag'
    }],

    image_url: String,
}, { timestamps: true });

module.exports = model('Note', noteSchema);