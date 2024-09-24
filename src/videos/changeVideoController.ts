import {Request} from "express";

import {db} from "../db/db";
import {VideoDBType} from "../db/video-db-type";
import {Resolutions} from "../input-output-types/video-types";

type UpdatingVideoType = {
    title: string,
    author: string,
    availableResolutions: Array<string>,
    canBeDownloaded: true,
    minAgeRestriction: number | null,
    publicationDate: string
}

export type RequestWithParamsAndBodyHW1<T, B> = Request<T, {}, B>

function isValidateISODate(dateString) {
    const isoDatePattern = /^\d{4}-\d{2}-\d{2}$/;
    if (!isoDatePattern.test(dateString)) return false;

    const date = new Date(dateString);
    return date.toISOString().slice(0, 10) === dateString;
}

const inputValidation = (video: any) => {
    const errors = { // объект для сбора ошибок
        errorsMessages: []
    }
// ...

    if (!video.title
        || typeof video.title !== 'string'
        || video.author.length < 1
        || video.title.length >= 40) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'title'
        })
    }
    if (!video.author
        || video.author.length >= 20
        || video.author.length < 1
        || typeof video.author !== 'string') {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'author'
        })
    }
    if (typeof video.canBeDownloaded !== 'boolean'
    ) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'canBeDownloaded'
        })
    }
    // if (!isValidateISODate(video.publicationDate)) {
    //     errors.errorsMessages.push({
    //         message: 'error!!!!', field: 'publicationDate'
    //     })
    // }
    if (typeof video.minAgeRestriction !== 'number'
        ||video.minAgeRestriction < 1
        || video.minAgeRestriction > 18
    ) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'minAgeRestriction'
        })
    }
    return errors
}


export const changeVideoController = (req: RequestWithParamsAndBodyHW1<{
    id: string
}, UpdatingVideoType>, res: any) => {
    const foundedVideo = db.videos.find((video: VideoDBType) => video.id === +req.params.id)

    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length) { // если есть ошибки - отправляем ошибки
        res
            .status(400)
            .json(errors)
        return
        // return res.status(400).json(errors)
    }

    if (!foundedVideo) {
        res.sendStatus(404)
    }

    foundedVideo.title = req.body.title,
        foundedVideo.author = req.body.author,
        foundedVideo.availableResolutions = req.body.availableResolutions,
        foundedVideo.canBeDownloaded = req.body.canBeDownloaded || false,
        foundedVideo.minAgeRestriction = req.body.minAgeRestriction || null,
        foundedVideo.publicationDate = req.body.publicationDate

    db.videos = db.videos.map((video: VideoDBType) => video.id === +req.params.id ? {...foundedVideo} : video)
    res.sendStatus(204)
}