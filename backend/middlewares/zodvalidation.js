const zod = require("zod");


const stringSchema = zod.string();
const emailSchema = zod.string().email();

 function ValidationCheck(req,res,next){
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const password = req.body.password
    try{
        stringSchema.safeParse(firstName);
    }
    catch(error){
        return res.status(400).send("Invalid firstName");
    }
    try{
        stringSchema.safeParse(lastName);
    }
    catch(error){
        return res.status(400).send("Invalid last name");
    }
    try{
        emailSchema.safeParse(username);
    }
    catch(error){
        return res.status(400).send("Invalid username");
    }
    try{
        emailSchema.safeParse(password);
    }
    catch(error){
        return res.status(400).send("Invalid password");
    }
    next();  
}
 function signInCheck(req,res,next){
    const {username,password}= req.body;
    try{
        emailSchema.safeParse(username);
    }
    catch(error){return res.send("Enter valid email")}
    try{
        stringSchema.safeParse(password);
    }
    catch(error){return res.send("Enter valid password")}
    next();
}
module.exports={ValidationCheck,signInCheck}