        // console.log(req.body);
        // let userFound = await Users.findOne({ email });
        // console.log(userFound);

        // if (!userFound) {
        //     return res.status(401).json({ "error": "Invalid Credentials" })
        // }
        // userFound = await Admin.findOne({ email });
        // console.log(userFound);

        // if (!userFound) {
        //     return res.status(401).json({ "error": "Invalid Credentials" })
        // }
        // let matchPassword = await bcrypt.compare(password, userFound.password)
        // if (!matchPassword) {
        //     return res.status(401).json({ "error": "Invalid Credentials" })
        // }




function addbookvalidations() {
    return [
body("title","Title is Required").isString({min:2}),
body("Author","Author is Required").isString({min:6}),
body("coverImagrUrl","Image URL is Required").isURL(),
body("publisher","Publisher Name is Required").isString({min:2}),
body("synopsis","Synopsis is Required").isString({min:2}),
body("PageCount","Number is Required").notEmpty({min:2}),
    ]
}