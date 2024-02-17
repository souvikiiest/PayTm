const express = require("express");
const { ValidationCheck, signInCheck } = require("../middlewares/zodvalidation");
const { PaytmUser, Accounts } = require("../db");
const jwt = require("jsonwebtoken");
const zod = require("zod");
const JWT_SECRET = require("../config")
const { AuthMiddleware } = require("../middlewares/AuthMiddlewares");
const router = express.Router();

router.post('/signup',ValidationCheck, function(req,res){
   
    const newUser = new PaytmUser({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        password:req.body.password,
        username:req.body.username
    })
    PaytmUser.findOne({username:req.body.username})
    .then(existinguser =>{
        if(existinguser){
            res.status(411).send("User already taken")
        }
        else{
            newUser.save()
            .then((savedUser)=>{
                const id = savedUser._id;
                const token = jwt.sign({id},JWT_SECRET);
                res.json({
                    "message":"User created successfully",
                    "userId":token
                })
            })
            Accounts.create({
                userId,
                balance: 1+Math.random()*1000
            })
            .catch((err)=>{
                if(err)
                    res.send("Error saving to database");
            })
        }
    })
})
//End of signup route
router.post("/signin",signInCheck, (req,res)=>{
    const {username,password}=req.body;
    const user = PaytmUser.findOne({username})
    try{
    if(!user){
        return res.status(411).send("Invalid username")
    }
    const passwordMatch = PaytmUser.findOne({password})
    if(!passwordMatch){
        return res.status(411).send("Invalid password")
    }
    const token = jwt.sign(user._id,JWT_SECRET);
    res.json({
        "jwt":token
    })
}
catch(error){
    return res.status(200).send("Error while logging in");
}
})
//End of signin route
router.put("/",AuthMiddleware, function (req,res){
    const updateBody = zod.object({
        lastName:zod.string().optional(),
        firstName:zod.string().optional(),
        password:zod.string().optional().min(5)

    })
    try{
         updateBody.safeParse(req.body);
    }catch(err){
        res.status(411).send("Some problem in input fields.")
    }
    PaytmUser.updateOne({_id:req.userId},req.body)
    .then((response)=>{
         if(response.ok ===1 && response.nModified > 0)
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
                $options:i}
            },
            {
            lastName:
            {$regex:filter,
            $options:i}
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