import {Request} from "express";

import {db} from "../db/db";
import {VideoDBType} from "../db/video-db-type";

type UpdatingVideoType = {
    title: string,
    author: string,
    availableResolutions: Array<string>,
    canBeDownloaded: true,
    minAgeRestriction: number | null,
    publicationDate: string
}

export type RequestWithParamsAndBodyHW1<T, B> = Request<T, {}, B>
export const changeVideoController = (req: RequestWithParamsAndBodyHW1<{
    id: string
}, UpdatingVideoType>, res: any) => {
    const foundedVideo = db.videos.find((video: VideoDBType) => video.id === +req.params.id)
    if (!foundedVideo) {
        res.sendStatus(404)
    }
    if (!req.body.author
        ||!req.body.title
        ||!req.body.availableResolutions
        ||req.body.title.length > 40
        ||req.body.author.length > 20) {
        /*validation data*/
        res.status(400).json({
            "errorsMessages": [
                {
                    "message": "string",
                    "field": "string"
                }
            ]
        })
        return
    }

        foundedVideo.title = req.body.title,
        foundedVideo.author = req.body.author,
        foundedVideo.availableResolutions = req.body.availableResolutions,
        foundedVideo.canBeDownloaded = req.body.canBeDownloaded,
        foundedVideo.minAgeRestriction = req.body.minAgeRestriction,
        foundedVideo.publicationDate = req.body.publicationDate

    db.videos = db.videos.map((video:VideoDBType)=>video.id === +req.params.id ? {...foundedVideo} : video)
    res.sendStatus(204)
}