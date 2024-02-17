const express = require("express");
const { ValidationCheck, signInCheck } = require("../middlewares/zodvalidation");
const { PaytmUser, Accounts } = require("../db");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const {JWT_SECRET} = require("../config")
const { AuthMiddleware } = require("../middlewares/AuthMiddlewares");
const router = express.Router();

router.post('/signup',ValidationCheck, async function(req,res){
   try{
    const newUser = new PaytmUser({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password,
        username:req.body.username
    })
   const existinguser = await PaytmUser.findOne({username:req.body.username})
        if(existinguser){
            return res.status(411).send("User already taken")
        }
        const savedUser = await newUser.save()
        const userId = savedUser._id;
        const token = jwt.sign({userId},JWT_SECRET);
                res.json({
                    "message":"User created successfully",
                    "userId":token
                })
            Accounts.create({
                userId,
                balance: 1+Math.random()*1000
            })
        }
        catch(err) {
                    res.send("Error saving to database");
}
})
//End of signup route
router.post("/signin",signInCheck, async (req,res)=>{
    const {username,password}=req.body;
    const user = await PaytmUser.findOne({username})
    try{
    if(!user){
        return res.status(411).send("Invalid username")
    }
    const passwordMatch = PaytmUser.findOne({password})
    if(!passwordMatch){
        return res.status(411).send("Invalid password")
    }
    const token = jwt.sign({userId:user._id},JWT_SECRET);
    res.json({
        "jwt":token
    })
}
catch(error){
    console.log(error);
    return res.status(200).send("Error while logging in");
}
})
//End of signin route
//To update data
router.put("/",AuthMiddleware, function (req,res){
    const updateBody = zod.object({
        lastName:zod.string().optional(),
        firstName:zod.string().optional(),
        password:zod.string().optional()

    })
    try{
         updateBody.safeParse(req.body);
    }catch(err){
        res.status(411).send("Some problem in input fields.")
    }
    PaytmUser.updateOne({_id:req.userId},req.body)
    .then((response)=>{
        console.log(response);
         if(response.modifiedCount > 0)
            return res.json({"msg": "Updated successfully"});
        else
        return res.json({"msg": "Error occured"})
        
    })
})

router.get("/bulk", async function (req,res){
    const filter = req.query.filter;
    const result = await PaytmUser.find({
        $or:[
            {firstName:
                {$regex:filter,
                $options:'i'}
            },
            {
            lastName:
            {$regex:filter,
            $options:'i'}
            }
        ]
    })
    res.json({
        user: result.map(user=>({
            username:user.username,
            firstName:user.firstName,
            lastName:user.lastName,
            _id:user._id

        }))
    })
})
module.exports = router;