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
    const errorsMessages = []
    if (!foundedVideo) {
        res.sendStatus(404)
    }
    if (!req.body.author || req.body.author.length > 20 || req.body.author === null) {
        errorsMessages.push({
            message: "string",
            field: "author"
        })
        res.status(400)
    }
    if (!req.body.title
        || req.body.title === null
        || req.body.title.length > 40
    ) {
        errorsMessages.push({
            message: "string",
            field: "title"
        })
        res.status(400)

    }
    if (!req.body.canBeDownloaded
|| typeof req.body.canBeDownloaded !== 'boolean'
    ) {
        errorsMessages.push({
            message: "string",
            field: "canBeDownloaded"
        })
        res.status(400).send({errorsMessages})
        return
    }


    foundedVideo.title = req.body.title,
        foundedVideo.author = req.body.author,
        foundedVideo.availableResolutions = req.body.availableResolutions,
        foundedVideo.canBeDownloaded = req.body.canBeDownloaded,
        foundedVideo.minAgeRestriction = req.body.minAgeRestriction,
        foundedVideo.publicationDate = req.body.publicationDate

    db.videos = db.videos.map((video: VideoDBType) => video.id === +req.params.id ? {...foundedVideo} : video)
    res.sendStatus(204)
}