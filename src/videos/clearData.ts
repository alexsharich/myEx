import {Request, Response} from "express";
import {db} from "../db/db";

export const clearData = (req:Request, res:Response) => {
   db.videos = []
    res.status(204)
}