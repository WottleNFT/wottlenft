import { compare } from "bcrypt";
import { Request, Response } from "express";
import { json } from "stream/consumers";
import { getUserByEmail, insertUser } from "../database/userQueries";
import { hashPassword } from "../ultility/passwordHandler";

export async function registerUser(req: Request, res: Response) {
    try {
        let password = await hashPassword(req.body.password)
        await insertUser({
            email: req.body.email,
            password: password,
            id: null
        })

    } catch (error) {
        return res.status(404).json({
            err: error
        })
    }
    return res.status(200).json({
        message: "login successful!"
    })
}

export async function userLogin(req: Request, res: Response) {
    const email = req.body.email
    const password = req.body.password
    try {
        let user = await getUserByEmail(email)
        if (user == null) {
            return res.status(404).json({
                err: "User not found!"
            })
        }
        if (!await compare(req.body.password, user.password as string)) {
            return res.status(403).json({
                err: "Wrong password!"
            })
        }
        const id = {
            user_id: user.id
        }
        const accessToken = jwt.sign(id, TOKEN_SECRET);
        return 
    }
}