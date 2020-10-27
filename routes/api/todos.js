const express = require("express");
const router = express.Router();
const passport = require("passport");
const Todo = require("../../models/Todo")
const validateTodoInput = require("../../validation/todos")

router.post("/create",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { isValid, errors } = validateTodoInput(req.body);

        if (!isValid) {
            return res.status(400).json(errors)
        }

        const newTodo = new Todo({
            title: req.body.title,
            description: req.body.description,
            status: false
        })
        newTodo.save().then(todo => res.json(todo))
    })

router.patch("/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Todo.findByIdAndUpdate(req.params.id, { title: req.body.title, status: req.body.status }, {new: true})
            .then((model) => {
            (res.json(model))
            return model.save();})
            .catch((err) => res.status(400).json(err));
    })

router.delete("/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {

        Todo.findByIdAndDelete(req.params.id)
            .then((model) => {
                (res.json(model))
            })
            .catch((err) => res.status(400).json(err));
    })



module.exports = router;