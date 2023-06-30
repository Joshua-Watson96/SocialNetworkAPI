const {User} = require('../models');

const userController = {
    // Create New User
    createUser({body}, res) {
        User.create(body)
        .then(dbUserData => res.json(dbUserData))
        .catch(err => res.status(400).json(err));
    },
    
    // Get Single User by ID
    getUserById({params}, res) {
        User.findOne({_id: params.id })
        // .populate({path: 'thoughts', select: '-__v'})
        // .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No one found'});
                return;
            }
            res.json(dbUserData)
        })
        .catch(err => {
            res.status(400).json(err)
        })
    },

    // Get All Users
    getAllUsers(req, res) {
        User.find()
        // .populate({path: 'thoughts', select: '-__v'})
        // .populate({path: 'friends', select: '-__v'})
        .select('-__v')
        .then((dbUserData) =>{ res.json(dbUserData);
        })
        .catch(err => {
            res.status(500).json(err)
        });
    },

    // Update a User by ID
    updateUser({params, body}, res) {
        User.findOneAndUpdate({_id: params.id}, body, {new: true, runValidators: true})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No one found with this ID'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // Add Friend
    addFriend({params}, res) {
        User.findOneAndUpdate({_id: params.id}, {$push: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select:('-__v')})
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'Nothing found'})
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.json(err));
    },

    // Delete a user
    deleteUsers({params}, res) {
        User.findOneAndDelete({_id: params.id})
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({message: 'No one found to delete'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    },

    // Delete a current Friend
    deleteFriend({ params }, res) {
        User.findOneAndUpdate({ _id: params.id}, {$pull: { friends: params.friendId}}, {new: true})
        .populate({path: 'friends', select:'-__v'})
        .select('-__v')
        .then(dbUserData => {
            if(!dbUserData) {
                res.status(404).json({ message: 'No one found to delete'});
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
    }
};

// export userController
module.exports = userController;