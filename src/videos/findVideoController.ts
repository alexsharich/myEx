import {Request, Response} from "express";
import {db} from "../db/db";
import {VideoDBType} from "../db/video-db-type";

export const findVideoController = (req: Request<{id:string}>, res: Response) => {

    const foundedVideo = db.videos.find((video:VideoDBType)=>video.id === +req.params.id)

    if(!foundedVideo){
        res.sendStatus(404)
        return
    }

    res.sendStatus(200).json(foundedVideo)
}