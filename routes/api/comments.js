const express = require("express");
const router = express.Router();
const passport = require("passport");
const Comment = require('../../models/Comment');
const validateCommentInput = require('../../validation/comments');

router.get("/test", (req, res) => {
    res.json({ msg: "This is the Comments route"});
});

router.post("/create", 
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { isValid, errors } = validateCommentInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors)
        }

        const newComment = new Comment({
            author: req.user.id,
            title: req.body.title,
            date: req.body.date
        })
        newComment.save().then(comment => res.json(comment))
    })

router.delete("/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {

        Comment.findByIdAndDelete(req.params.id)
            .then((model) => {
                (res.json(model))
            })
            .catch((err) => res.status(400).json(err));
    })

module.exports = router;