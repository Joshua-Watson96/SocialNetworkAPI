const router = require('express').Router();

const {
    createThought,
    getAllThoughts,
    getThoughtById,
    updateThought,
    deleteThoughts,
    addReaction,
    deleteReaction
} = require('../../controllers/thoughtController');

// Route for getAllThoughts
// endpoint /api/thoughts
router.route('/').get(getAllThoughts);

//Route for get thought by id, update and delete thoughts\
// End-point /api/thoughts/:id
router.route('/:id').get(getThoughtById).put(updateThought).delete(deleteThoughts);

// Route for create thoughts
// End-point /api/thoughts/userId
router.route('/:userId').post(createThought);

// routes for add reaction
// End-point /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions').post(addReaction);

// route for delete reaction
// End-point /api/thoughts/:thoughtId/reactionId
router.route('/:thoughtId/reactions/:reactionId').delete(deleteReaction);

// export routes
module.exports = router;