const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')
const JWT_SECRET = 'S$wissC0de$'

// ROUTE 1 - Create a user using : POST "api/auth/createuser". Doesn't require Auth | No login required

router.post('/createuser',[
  body('name', 'Enter valid name').isLength({ min: 3 }),
  body('email', 'Enter valid email').isEmail(),
  body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
  ], async (req, res)=>{
    success = false;
  // If there are errors, return Bad Request and the errors.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({success, errors: errors.array() });
  }
  try {
    // check whether the user with this email exists already
    let user =  await User.findOne({email: req.body.email});
    if(user){
      return res.status(400).json({success, error: "Sorry a user with this email already exists"});
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);


    // create  a new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
    })
    const data = {
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authtoken});

   // console.log(authtoken);
  } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal server error");
  }
})

// ROUTE 2 - Authenticate a user using : POST "api/auth/login". Doesn't require Auth | No login required
router.post('/login',[
    body('email', 'Enter valid email').isEmail(),
    body('password', 'Password cannot be blank').exists(),
  ], async (req, res)=>{
    let success = false;
  // If there are errors, return Bad Request and the errors.
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // destructing
  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if(!user){
      success = false;
      return res.status(400).json({success, error: "Please try with correct credentials"});

    }
    // Compare the password with bcrypt
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
      success = false;
      return res.status(400).json({success, error: "Please try with correct credentials"});
    }
    const data = {
      user:{
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({success, authtoken});
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
})

// ROUTE 3 - Get loggedin User details using : POST "api/auth/getuser". Login required
router.post('/getuser', fetchuser, async (req, res)=>{
  try {
    userId = req.user.id;
    const user = await User.findById(userId).select("-password");
    res.send(user);

  }  catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }

});


module.exports = router;

