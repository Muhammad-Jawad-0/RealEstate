import bcrypt from "bcrypt";
import prisma from "../lib/prisma.js";
import jwb from "jsonwebtoken"


export const register = async (req, res) => {
    const { username, email, password } = req.body;

    try {

        // HASH THE PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // CREATE A NEW USER AND SAVE TO DB
        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword,
            },
        });

        console.log(newUser)
        res.status(201).json({ status: 201, message: "user Created Successfully" })
    }
    catch (error) {
        console.log("error >>>>>>>", error)
        res.status(500).json({ status: 500, message: "Failed to create user!" })
    }
}
export const login = async (req, res) => {
    const { username, password } = req.body;

    try {
        //CHECK IF THE USER EXISTS
        const user = await prisma.user.findUnique({
            where: { username }
        })

        if (!user) {
            return res.status(401).json({ status: 404, message: "INVALID CREDENTIALS!" })
        }

        //CHECK IF THE PASSWORD IS CORRECT
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ status: 404, message: "INVALID CREDENTIALS! || PASSWORD" })
        }

        // GENERATE COOKIE TOKEN AND SEND TO THE USER

        // res.setHeader("Set-Cookie", "test=" + "myValue").json({ message: "Success" });

        //after install cookie-parser 

        const age = 1000 * 60 * 60 * 24 * 7

        const token = jwb.sign({
            id: user.id,
            isAdmin: true
        },
            process.env.JWT_SECRET_KEY,
            { expiresIn: age })

        const { password: userPassword, ...userInfo } = user;


        res.cookie("token", token, {
            httpOnly: true,
            // secure:true
            maxAge: age
        }).status(200).json(userInfo)
    } catch (error) {
        console.log("error ====>>>>", error)
        res.status(500).json({ status: 500, message: "FAILED TO LOGIN!" })

    }
}



export const logout = (req, res) => {
    try {
        res.clearCookie("token").status(200).json({ status: 200, message: "LOGOUT SUCCESSFULLY" })
    } catch (error) {
        console.log("ERRPR", error)
        res.status(500).json({ status: 500, message: "Something Wronge" })
    }
}