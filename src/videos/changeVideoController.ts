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
    if (!req.body) {
        /*validation data*/
        res.status(400).json({
            "errorsMessages": [
                {
                    "message": "incorrect request",
                    "field": "string"
                }
            ]
        })
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