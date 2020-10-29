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
        .populate("todo")
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
            author: req.user.id,
            title: req.body.title,
            description: req.body.description,
            date: req.body.date,
            participants: req.body.participants,
            todo: req.body.todo
        })
        newEvent.save().then(event => res.json(event))
    })

router.patch("/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        // const newParticipant = req.body.participants;
        // if (!participants.include(newParticipant)) {
        //     $push: {participants: newParticipant}
        // }
        // Event.findByIdAndUpdate(req.params.id, {   
        //         title: req.body.title, 
        //         description: req.body.description,
        //         date: req.body.date,
        //         $push: {participants: req.body.participants},
        //         // todo: req.body.todo,
        //         // participants: req.body.participants,
        //         // todo: req.body.todo
        //     },  
        //     {new: true})
        //         .then((model) => {
        //         (res.json(model))
        //         return model.save();})
        //         .catch((err) => res.status(400).json(err));


        if (req.body.participants) {
            Event.findByIdAndUpdate(req.params.id,
                {            
                    $push: {participants: req.body.participants.id},
                },  
                {new: true})
                .then((model) => {
                (res.json(model))
                return model.save();})
                .catch((err) => res.status(400).json(err));

        }
        
        if (req.body.todo) {
            Event.findByIdAndUpdate(req.params.id,
                {            
                    $push: {todo: req.body.todo},
                },  
                {new: true})
                .then((model) => {
                    (res.json(model))
                    return model.save();
                })
                .catch((err) => res.status(400).json(err));
        }

        if (req.body.title){
            Event.findByIdAndUpdate(req.params.id,
                {            
                    title: req.body.title,
                },  
                {new: true})
                .then((model) => {
                    (res.json(model))
                    return model.save();
                })
                .catch((err) => res.status(400).json(err));
        }

        if (req.body.description){
            Event.findByIdAndUpdate(req.params.id,
                {            
                    description: req.body.description,
                },  
                {new: true})
                .then((model) => {
                    (res.json(model))
                    return model.save();
                })
                .catch((err) => res.status(400).json(err));
        }

        if (req.body.date){
            Event.findByIdAndUpdate(req.params.id,
                {            
                    date: req.body.date,
                },  
                {new: true})
                .then((model) => {
                    (res.json(model))
                    return model.save();
                })
                .catch((err) => res.status(400).json(err));
        }
    })

router.delete("/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {

        Event.findByIdAndDelete(req.params.id)
            .then((model) => {
                (res.json(model))
            })
            .catch((err) => res.status(400).json(err));
    })

module.exports = router;