import { Request, Response } from "express";

const createUser = async (req: Request, res: Response) => {
    res.json("123");
}

export default {
    createUser
};