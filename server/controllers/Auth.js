const User = require("../models/User")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt")

// function to generate a token
const createToken = (id, pseudo, role) => {
    return jwt.sign(
        { data: { id, pseudo, role } },
        process.env.JWT_KEY,
        { expiresIn: "30d" }
    )
}
// console.log(createToken(123, "king"));



// register or SignUp
module.exports.signUP = async (req, res, next) => {
    try {
        const { pseudo, email, password, role } = req.body;

        // Before creating a new user, we verify if this user already exists or not
        const userEmailExist = await User.findOne({ email });
        const userPseudoExist = await User.findOne({ pseudo });
        const userRole = await User.findOne({role})
        if (userEmailExist) {
            return res.status(409).json({ message: "User with this email is already Exist!" });
        }

        if (userPseudoExist) {
            return res.status(409).json({ message: "User with this pseudo is already Exist!" });
        }
        if(role === "" || role === "Role"){
            return res.status(409).json({ message: "Please post the good role" });
        }

        // crypt password
        const salt = await bcrypt.genSalt(10);
        const cryptPassword = await bcrypt.hash(password, salt);

        // A new user created!!!
        const user = await User.create({
            pseudo,
            email,
            password: cryptPassword,
            role
        });

        return res.status(201).json({ message: "User created successfully...", user });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}

// Connection or signIn
module.exports.signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        // we verify if this  user exist if everything is ok we continued with the function next() !!!
        if (!user) {
            return res.status(401).json({ message: `the user with this email : ${email} does'nt exist... ` })
        }
        const comparePassword = bcrypt.compareSync(password, user.password);
        if (!comparePassword) {
            return res.status(401).json({ message: "Incorrect Password" })
        }
        const token = createToken(user._id, user.pseudo, user.role)
        res.status(200).json({ message: "Successfully connection", token, user });
    } catch (error) {
        res.status(500).send({ message: "Internal Server Error" });
    }
}