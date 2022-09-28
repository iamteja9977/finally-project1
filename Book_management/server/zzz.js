router.post("/login", loginValidation(), errorMiddleware, async (req, res) => {
    try {
        let { email, password } = req.body;
        // console.log(req.body);
        // Users.userverifytoken = randomString(15);
        // await user.save();
        let userFound = await Users.findOne({ email })
        if (!userFound) {
            return res.status(401).json({ "error" : "Invalid Credentials"});
        }
        console.log(userFound);
        let matchPassword = await bcrypt.compare(password, userFound.password)
        console.log(matchPassword);
        if (!matchPassword) {
            return res.status(401).json({ "error" : "Invalid Credentials "});
        }
        let payload = {
            user_id : userFound.user_id,
            role : "user"
        }
        //let privatekey = "codeforindia";
        //GENERATE A TOKEN
        const token = generateToken(payload);
        // console.log(token);
        res.status(200).json({ success: "Login is Successful", token});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error"})
    }
})