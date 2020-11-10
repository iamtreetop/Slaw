const express = require("express");
const router = express.Router();
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const keys = require('../../config/keys');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../../validation/register');
const validateLoginInput = require('../../validation/login');


router.get("/test", (req, res) => {
    res.json({ msg: "This is the user route"});
});

router.post('/register', (req, res) => {
  
const { errors, isValid } = validateRegisterInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  User.findOne({ email: req.body.email })
    .then(user => {
      if (user) {
        return res.status(400).json({ email: "Email already taken" });
      }
    })
    .then(() => {
      User.findOne({ handle: req.body.handle })
        .then(user => {
          if (user) {
            return res.status(400).json({ handle: "Username already taken" });
          }
          else {
            const newUser = new User({
              handle: req.body.handle,
              email: req.body.email,
              password: req.body.password,
              // zipcode: req.body.zipcode
            })
            bcrypt.genSalt(10, (err, salt) => {
              bcrypt.hash(newUser.password, salt, (err, hash) => {
                if (err) throw err;
                newUser.password = hash;
                newUser.save()
                  .then((user) => res.send(user))
                  .catch(err => res.send(err))
              })
            })
          }
        })
    })
})

// 
router.post('/login', (req, res) => {
  const { errors, isValid } = validateLoginInput(req.body);
  
  if (!isValid) {
      return res.status(400).json(errors);
  }
  
  const email = req.body.email;
  const password = req.body.password;
  
  User.findOne({ email: email })
    .then(user => {
      if(!user) {
        return res.status(404).json({ email: "This user does not exist." });
      }
      bcrypt.compare(password, user.password)
        .then(isMatch => {
          if(isMatch) {
            const payload = {
              id: user.id,
              handle: user.handle,
              email: user.email,
              channels: user.channels
              // zipcode: user.zipcode
            }
            jwt.sign(
              payload,
              keys.secretOrKey,
              { expiresIn: 3600 },
              (err, token) => {
                res.json({
                    success: true,
                    token: "Bearer " + token
                })
              }
            )
          } else {
            return res.status(400).json({ passowrd: "Incorrect Password" })
          }
        })
    })
})

router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
  res.json({
    id: req.user.id,
    handle: req.user.handle,
    email: req.user.email,
    channels: req.user.channels
  });
})

router.patch("/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
      if (req.body.channels && !req.body.removeChannel) {
        User.findByIdAndUpdate(req.params.id, { $push: {channels: req.body.channels} }, {new: true})
          .then((model) => {
            (res.json(model))
            return model.save();})
            .catch((err) => res.status(400).json(err));
      }
      else if (req.body.removeChannel){
        User.findByIdAndUpdate(req.params.id, { $pull: {channels: req.body.channels} }, {new: true})
        .then((model) => {
          (res.json(model))
          return model.save();})
          .catch((err) => res.status(400).json(err));
      }

})



module.exports = router;