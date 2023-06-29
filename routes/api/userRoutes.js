// requires express Router
const router = require('express').Router();

// requires the functions from userController

const {
    createUser,
    getUserById,
    getAllUsers,
    updateUser,
    deleteUsers,
    deleteFriend,
    addFriend
} = require('../../controllers/userController');

// Get and Post routes for user
// End-Point: /api/user
router.route('/').get(getAllUsers).post(createUser);

// Get, Put, and Delete routes for user
// End-Point: /api/user/:id
router.route('/:id').get(getUserById).put(updateUser).delete(deleteUsers)

// Post and Delete routes for friends.
// End-Point: /api/user/:userID/friends/:friendId
router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend)

module.exports = router;