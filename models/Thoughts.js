// require mongoose and moment
const { model, Schema, Types } = require('mongoose');
const moment = require('moment');

// Schema for User Reactions
const ReactionSchema = new Schema(
    {
        // sets the type of ID
        reactionId: {
            type: Schema.Types.ObjectId,
            default: ()=> new Types.ObjectId()
        },
        // Sets the body properties
        reactionBody: {
            type: String,
            required: true,
            maxLength: 150
        },
        // sets the username properties
        username: {
            type: String,
            required: true,
        },
        // shows the date the reaction was created in the schema
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('DD, MM, YYYY')
        }
    },
    {
        toJSON: {
            getters: true
        }
    }
);

// Schema for User Thoughts
const ThoughtsSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxLength: 150
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVal) => moment(createdAtVal).format('DD, MM, YYYY')
        },
        username: {
            type: String,
            required: true
        },
        // Validate data
        reactions: [ReactionSchema]
        },
        {
            toJSON: {
                virtuals: true,
                getters: true
            },
            id: false
        }

)

// using virtual to get total reaction count
ThoughtsSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

// create the model
const Thoughts = model('Thoughts', ThoughtsSchema);

// export module
module.exports = Thoughts;

