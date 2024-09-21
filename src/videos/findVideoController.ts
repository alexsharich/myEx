import {Request, Response} from "express";
import {db} from "../db/db";
import {VideoDBType} from "../db/video-db-type";

export const findVideoController = (req: Request<{id:string}>, res: Response) => {

    const foundedVideo = db.videos.find((video:VideoDBType)=>video.id === +req.params.id)

    if(!foundedVideo || req.params.id === undefined){
        res.sendStatus(404)
    }

    res.status(200).json(foundedVideo)
}