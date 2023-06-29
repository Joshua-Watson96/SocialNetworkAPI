const { User, Thoughts } = require("../models");

const thoughtsController = {
    // Create a New Thought
    createThought({params, body}, res){
        Thoughts.create(body)
        .then(({_id}) => {
            return Users.findOneAndUpdate({ _id: params.userId}, {$push: {thoughts: _id}}, {new: true});
        })
        .then(dbThoughtsData => {
            if(!dbThoughtsData) {
                res.status(404).json({message: 'Nothing found with this ID'});
            }
            res.json(dbThoughtsData)
        })
        .catch(err => res.json(err));
    },


    // Get All Thoughts
    getAllThoughts(req, res) {
    Thoughts.find({})
    .populate({path: 'reactions', select:'-__v'})
    .select('-__v')
    .then(dbThoughtsData => res.json(dbThoughtsData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
},

getThoughtById({params}, res) {
    Thoughts.findOne({_id: params.id })
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(dbThoughtsData => {
        if(!dbThoughtsData){
            res.status(404).json({message: 'Nothing found with this ID'});
            return;
        }
        res.json(dbThoughtsData)
    })
    .catch(err => {
        res.sendStatus(400);
    });

},
  // Update Thought
 updateThought({params, body}, res) {
    Thoughts.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
    .populate({path: 'reactions', select: '-__v'})
    .select('-__v')
    .then(dbThoughtsData => {
        if(!dbThoughtsData) {
            res.status(404),json({message: 'No thoughts found with this ID'});
            return;
        }
        res.json(dbThoughtsData);
    })
    .catch(err => res.json(err))
},

// Delete Thought by Id
 deleteThoughts({params}, res) {
    Thoughts.findOneAndDelete({_id: params.id})
    .then(dbThoughtsData => {
        if (!dbThoughtsData) {
            res.status(404).json({message: 'Nothing found with this ID'});
            return;
        }
        res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json(err))
},

// Add a Reaction
 addReaction({params, body}, res) {
   Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$push: {reactions: body}}, {new: true, runValidators: true})
    .populate({path: 'reactions', select:'-__v'})
    .select('-__v')
    .then(dbThoughtsData => {
        if(!dbThoughtsData) {
            res.status(404).json({message: 'Nothing found with this ID.'});
            return;
        }
        res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json(err))
},

// Delete a Reaction
 deleteReaction({params}, res) {
    Thoughts.findOneAndUpdate({_id: params.thoughtId}, {$pull: {reactions: {reactionId: params.reactionId}}}, {new : true})
    .then(dbThoughtsData => {
        if(!dbThoughtsData){
            res.status(404).json({message: 'Nothing found'});
            return;
        }
        res.json(dbThoughtsData);
    })
    .catch(err => res.status(400).json(err))

    
}
};

// Export the module
module.exports = thoughtsController;
