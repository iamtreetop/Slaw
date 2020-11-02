const express = require("express");
const router = express.Router();
const passport = require("passport");
const Channel = require("../../models/Channel")
const validateChannelInput = require("../../validation/channels")
const Event = require("../../models/Event")

const upload = require("../../services/image_upload");
const singleUpload = upload.single("image");

// const formidable = require('express-formidable');

// router.use(formidable())

router.get("/", (req, res) => {
    Channel
        .find()
        .populate('events members messages')
        .sort({ date: -1 })
        .then(channels => res.json(channels))
        .catch(err => res.status(400).json(err));
})

router.get("/:id", (req, res) => {
    Channel.findById(req.params.id)
        .populate('events members messages')
        .exec(function( err, channel) {
            if (err) return console.log(err)
            res.json(channel)
        }) 
        // .then(channel => res.json(channel))
        // .catch(err => res.status(400).json(err));
    })
    
router.post(("/"),
    passport.authenticate("jwt", { session: false }),
    function (req, res) {
        singleUpload(req, res, function (err) {
        if (err) {
            return res.json({
                success: false,
                errors: {
                    title: "Image Upload Error",
                    detail: err.message,
                    error: err,
                },
            });
        }
        const { isValid, errors } = validateChannelInput(req.body);
        if (!isValid) {
            return res.status(400).json(errors)
        }
        let newChannel;
        if (!req.file) {
            newChannel = new Channel({
                admin: req.body.id,
                title: req.body.title,
                events: req.body.events,
                members: [req.body.id]
            })
        } else {
            newChannel = new Channel({
                admin: req.body.id,
                title: req.body.title,
                events: req.body.events,
                channelPicture: req.file.location,
                members: [req.body.id]
            })
        }

        newChannel.save().then(channel => res.json(channel)).catch((err) => res.status(400).json({ success: false, error: err }))

    });
});

router.patch("/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        if (req.body.members && !req.body.removeCurrentUser) {
            Channel.findByIdAndUpdate(req.params.id, { $push: {members: req.body.members.id} }, {new: true})
                .populate('events members messages')
                .then((model) => {
                (res.json(model))
                return model.save();})
                .catch((err) => res.status(400).json(err));
        }
        else if (req.body.removeCurrentUser){
            Channel.findByIdAndUpdate(req.params.id, { $pull: {members: req.body.members.id} }, {new: true})
            .populate('events members messages')
            .then((model) => {
            (res.json(model))
            return model.save();})
            .catch((err) => res.status(400).json(err));
        }


        if (req.body.events) {
            Channel.findByIdAndUpdate(req.params.id, { $push: { events: req.body.events } }, { new: true })
                .populate('events members messages')
                .then((model) => {
                    (res.json(model))
                    return model.save();
                })
                .catch((err) => res.status(400).json(err));
        }

        if (req.body.title){
            Channel.findByIdAndUpdate(req.params.id, { title: req.body.title }, { new: true })
                .populate('events members messages')
                .then((model) => {
                    (res.json(model))
                    return model.save();
                })
                .catch((err) => res.status(400).json(err));
        }

        if (req.body.message) {
            Channel.findByIdAndUpdate(req.params.id,
                {
                    $push: { messages: req.body.message },
                },
                { new: true })
                .populate('events members messages')
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

        Channel.findByIdAndDelete(req.params.id)
            .then((model) => {
                (res.json(model))
            })
            .catch((err) => res.status(400).json(err));
    })



router.post("/add-channel-picture", function (req, res) {
    singleUpload(req, res, function (err) {
        if (err) {
            return res.json({
                success: false,
                errors: {
                    title: "Image Upload Error",
                    detail: err.message,
                    error: err,
                },
            });
        }
        Channel.findByIdAndUpdate(req.body.channelForm, { $set: { channelPicture: req.file.location } }, { new: true })
            .then((channel) => res.status(200).json({ success: true, channel: channel }))
            .catch((err) => res.status(400).json({ success: false, error: err }));
    });
});

module.exports = router;