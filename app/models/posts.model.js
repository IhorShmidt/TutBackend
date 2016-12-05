'use strict';


const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    ObjectId = require('mongoose').Types.ObjectId;

const post = new Schema({
    title: {
        type: String,
        trim: true
    },
    text: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    comments: [{
        type: {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    }]
}, {
    timestamps: true,
    toObject: {
        virtuals: true
    },
    toJSON: {
        virtuals: true
    }
});

post.set('toJSON', {
    transform: function(doc, ret, options) {
        ret.id = ret._id.toString();
        return ret;
    }
});

module.exports = mongoose.model('Post', post)
