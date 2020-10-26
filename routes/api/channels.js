const express = require("express");
const router = express.Router();
const passport = require("passport");
const Channel = require("../../models/Channel")
const validateChannelInput = require("../../validation/channels")

router.get("/", (req, res) => {
    Channel
        .find()
        .sort({ title: -1 })
        .then(channels => res.json(channels))
        .catch(err => res.status(400).json(err));
})

router.get("/:id", (req, res) => {
    Channel.findById(req.params.id)
        .then(channel => res.json(channel))
        .catch(err => res.status(400).json(err));
})

router.post("/",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { isValid, errors } = validateChannelInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors)
        }

        const newChannel = new Channel({
            admin: req.user.id,
            title: req.body.title,
        })
        newChannel.save().then(channel => res.json(channel))
    })

module.exports = router;