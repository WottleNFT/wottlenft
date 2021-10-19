import { compare } from "bcrypt";
import { Request, Response } from "express";
import { access } from "fs";
import * as jwt from "jsonwebtoken"
import { TOKEN_SECRET } from "../config/config";
import { getUserByEmail, getUserById, insertUser } from "../database/userQueries";
import { hashPassword } from "../ultility/passwordHandler";

export async function registerUser(req: Request, res: Response) {
    try {
        let password = await hashPassword(req.body.password)
        await insertUser({
            email: req.body.email,
            password: password,
            account_id: null
        })

    } catch (error) {
        console.log(error)
        console.log("err");
        return res.status(404).json({
            err: error
        })
    }
    return res.status(200).json({
        message: "registration successful!"
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
            user_id: user.account_id
        }
        const accessToken = jwt.sign(id, TOKEN_SECRET);
        return res.status(200).json({
            accessToken: accessToken
        })
    } catch (err) {
        return res.status(400).json({
            error: err
        })
    }
}

export async function getUserInfo(req: Request, res: Response) {
    try {
        let user = await getUserById(res.locals.jwt.user_id)
        if (user == null) {
            throw Error("Cant find user");
        }
        res.status(200).json({
            user: user
        })
    } catch (err) {
        return res.status(404).json({
            err: err
        })
    }
}