import express from 'express'
import { emailPattern } from '../../utilities/core.mjs'
import { UserModel } from '../../models/user/index.mjs'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
const router = express.Router()

// Signup
router.post("/signup", async (req, res, next) => {
    try {
        const firstname = req.body.firstname
        const lastname = req.body.lastname
        const email = req.body.email
        const password = req.body.password

        // varitation
        if (!firstname) {
            return res.status(400).send({
                message: 'Firstname is Required'
            })
        }

        if (!lastname) {
            return res.status(400).send({
                message: 'Lastname is Required'
            })
        }

        if (!email) {
            return res.status(400).send({
                message: 'Email is Required'
            })
        }

        if (!password) {
            return res.status(400).send({
                message: 'Password is Required'
            })
        }

        // email varitation
        if (!emailPattern.test(email.toLowerCase())) {
            return res.status(400).send({
                message: 'Invalid Email'
            })
        }

        // email exist
        const user = await UserModel.findOne({ email: email.toLowerCase() })

        if (user) {
            return res.status(400).send({
                message: 'Email already taken'
            })
        }

        // convert hash password
        const passwordhash = await bcryptjs.hash(password, 12)

        await UserModel.create({
            firstname: firstname,
            lastname: lastname,
            email: email,
            password: passwordhash
        })

        return res.send({
            message: 'signup Successfully'
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: "internal server error"
        })
    }
})

// Login
router.post("/login", async (req, res, next) => {
    try {
        const email = req.body.email
        const password = req.body.password

        // varitation
        if (!password) {
            return res.status(400).send({
                message: 'Password is Required'
            })
        }

        if (!email) {
            return res.status(400).send({
                message: 'Email is Required'
            })
        }

        // varitation
        if (!emailPattern.test(email.toLowerCase())) {
            return res.status(400).send({
                message: 'Email & Password is incorrect'
            })
        }

        const userAcount = await UserModel.findOne({ email: email.toLowerCase() })

        if (!userAcount) {
            return res.status(404).send({
                message: 'Acount Not Found'
            })
        }

        const isPasswordTrue = await bcryptjs.compare(password, userAcount.password)

        if (!isPasswordTrue) {
            return res.status(400).send({
                message: 'Password is Incorrect'
            })
        }
        // console.log(isPasswordTrue)

        // token
        const token = jwt.sign({
            email: userAcount.email,
            _id: userAcount._id,
        },
            process.env.JWT_KEY,
            {
                expiresIn: "15days"
            }
        )

        return res.send({
            message: 'Login Successfully',
            data: {
                token: token,
                user: userAcount
            }
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: "internal server error"
        })
    }
})


export default router;