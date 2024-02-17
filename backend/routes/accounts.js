
const express = require("express");
const { AuthMiddleware } = require("../middlewares/AuthMiddlewares");
const { Accounts } = require("../db");
const router = express.Router();

router.get("/balance", AuthMiddleware,async(req,res)=>{
    const user = await Accounts.findOne({userId:req.userId});
    if(user){
        return res.status(200).json({"balance":user.balance})
    }
    else{
        return res.status(400).send("Some error occured");
    }
})

router.post("/transfer", AuthMiddleware,async(req,res)=>{
    const {to,amount} = req.body;
    const fromUser  = await Accounts.findOne({userId:req.userId})
    if( fromUser.balance < amount)
    {
        return res.status(400).send(" Insufficient funds")
    }
    const toUser =  await Accounts.findOne({userId:to});
    if(!toUser){
        return res.status(400).send("User doesn't exist");
    }
    await Accounts.findOneAndUpdate(
        {userId:req.userId},
        {$inc:{balance:-amount}
        });
    await Accounts.findOneAndUpdate(
        {userId:to},
        {$inc:{balance:amount}
    });
    res.status(200).send("Amout send successfully");
})

module.exports=router;