const { login, registerUser } = require("../services/auth");

const router = require("express").Router();



router.post("/login", async(req, res, next)=> {
    const {email, password} = req.body;
    
   try{
    const authUser = await login(email, password);

    res.status(200).json(
        {
            code: 200,
            data: authUser,
            message: "Login successful",
            links: "/auth/login"
        }
    );

   }catch(error) {
    next(error)
   }

});


router.post("/register", async(req, res, next)=> {
    const {name, email, password} = req.body;

    try {
        const authUser = await registerUser(name, email, password);
        res.status(200).json(
            {
                code: 200,
                data: authUser,
                message: "User created successfully",
                links: "/auth/login"
            }
        );
    } catch (error) {
        next(error)
    }
})

module.exports = router