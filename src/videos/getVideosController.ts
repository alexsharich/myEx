import {Request, Response} from 'express'
import {db} from '../db/db'
import {VideoDBType} from "../db/video-db-type";

export const getVideosController = (req: Request, res: Response<VideoDBType[]>) => {
    const videos:VideoDBType[] = db.videos

    res
        .status(200)
        .json(videos)
}