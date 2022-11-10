const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator');
 const  {signout, signup, signin,isSignedIn}=require("../controllers/auth");

router.post("/signup",[
    check('name').isLength({ min: 5 }).withMessage(' name must be at least 3 chars long'),
    check('email').isEmail().withMessage('you have entered invalid email'),
     check('password').isLength({ min: 3, max:8 }).withMessage(' password must be at least 3 to 8 chars long')
    ] , signup);
router.post("/signin",[
    check('email').isEmail().withMessage('email field is required'),
    check('password').isLength({ min:1 }).withMessage(' password field is require')
    ] , signin);
    

 router.get("/signout", signout);

//  router.get("/test",isSignedIn,(req,res)=>{
//     res.json(req.auth);
//  });

module.exports=router;