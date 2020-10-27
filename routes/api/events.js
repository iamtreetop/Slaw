const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const passport = require("passport");
const Event = require('../../models/Event');
const validateEventInput = require('../../validation/events');

router.get("/test", (req, res) => {
    res.json({ msg: "This is the Events route"});
});

router.get("/", (req, res) => {
    Event
        .find()
        .sort({ title: -1 })
        .then(events => res.json(events))
        .catch(err => res.status(400).json(err));
})

router.get("/:id", (req, res) => {
    Event.findById(req.params.id)
        .then(event => res.json(event))
        .catch(err => res.status(400).json(err));
})

router.post("/create", 
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { isValid, errors } = validateEventInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors)
        }

        const newEvent = new Event({
            admin: req.user.id,
            title: req.body.title,
            description: req.body.description,
            date: req.body.date
        })
        newEvent.save().then(event => res.json(event))
    }
)



module.exports = router;