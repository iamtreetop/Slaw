const express = require("express");
const router = express.Router();
const passport = require("passport");
const Channel = require("../../models/Channel")
const validateChannelInput = require("../../validation/channels")
const Event = require("../../models/Event")

const upload = require("../../services/image_upload");
const singleUpload = upload.single("image");

router.get("/", (req, res) => {
    Channel
        .find()
        .sort({ title: -1 })
        .then(channels => res.json(channels))
        .catch(err => res.status(400).json(err));
})

router.get("/:id", (req, res) => {
    Channel.findById(req.params.id)
        .populate('members events')
        .exec(function( err, channel) {
            if (err) return console.log(err)
            res.json(channel)
        }) 
        // .then(channel => res.json(channel))
        // .catch(err => res.status(400).json(err));
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
            events: req.body.events
        })
        newChannel.save().then(channel => res.json(channel))
    })

router.patch("/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Channel.findByIdAndUpdate(req.params.id, { $push: {members: req.body.members.id} }, {new: true})
            .then((model) => {
            (res.json(model))
            return model.save();})
            .catch((err) => res.status(400).json(err));
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



router.post("/:id/add-channel-picture", function (req, res) {
    const channelId = req.params.id;

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

        // let update = ;
        Channel.findByIdAndUpdate(channelId, { $set: { channelPicture: req.file.location } }, { new: true })
            .then((channel) => res.status(200).json({ success: true, channel: channel }))
            .catch((err) => res.status(400).json({ success: false, error: err }));
    });
});

module.exports = router;