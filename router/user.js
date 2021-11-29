const router = require("express").Router();
const { check, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");

router.post(
  "/signup",
  [
    check("username", "username is not valid").notEmpty(),
    check("email", "email is not valid").isEmail(),
    check("password", "password is not vail, it must be min 6 chars").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors
      })
    }

    const { username, email, password, age, role } = req.body;

    try {
      //password = bcrypt.hash(password,salt) çalışmıyor hata da vermiyor
      const user = new User({ username, email, password, age, role });
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      const payload = {
        user: {
          id: user.id,
        },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        { expiresIn: 10000 },
        (err, token) => {
          if (err){
            res.status(500).json({
              err
            })
          };
          res.status(200).json({
            token,
          });
        }
      );
    } catch (error) {
      res.status(500).send("Error while signup")
    }
  }
);

router.post("/signin",
[
  check("email","email is not valid")
  .isEmail(),
  check("password","password is not valid, it must be min 6 chars")
  .isLength({
    min:6
  })
],
async(req,res)=>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({
      errors
    })
  }

  const {email,password} = req.body

  try {
    
    let user = await User.findOne({email})

    if(!user){
      return res.status(400).send("user is not exist")
    }

    const isMatched = await bcrypt.compare(password,user.password)
    if(!isMatched){
      return res.status(400).send("Incorrect password")
    }

    const payload = {
      user:{
        id:user.id
      }
    }

    jwt.sign(payload,process.env.JWT_SECRET_KEY,{expiresIn:10000},(err,token)=>{
      if(err) throw err
      res.status(200).json({token})
    })

  } catch (error) {
    console.error(error)
    res.status(500).json({
      error
    })
  }

});

router.get("/",async(req,res)=>{
  try{
    const user = await User.findById(req.query.id)
    res.status(201).json({user})
  }catch(err){
    res.status(400).send("user is not exist")
  }
})

module.exports = router;
