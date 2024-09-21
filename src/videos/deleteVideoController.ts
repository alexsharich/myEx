import {Request, Response} from "express";
import {db} from "../db/db";
import {VideoDBType} from "../db/video-db-type";

export const deleteVideoController = (req: Request<{id:string}>, res: Response) => {
    const videoIdForDeleted = db.videos.find((video:VideoDBType)=>video.id === +req.params.id)
    if(!videoIdForDeleted){
        res.sendStatus(404)
    }
    db.videos = db.videos.filter((video:VideoDBType)=>video.id !==+req.params.id)
    res.sendStatus(204)
}