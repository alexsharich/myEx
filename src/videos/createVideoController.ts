import {Request, Response} from "express";
import {InputVideoType, OutputVideoType, Resolutions} from "../input-output-types/video-types";
import {db} from "../db/db";

const inputValidation = (video: any) => {
    const errors = { // объект для сбора ошибок
        errorsMessages: []
    }
// ...
    if (!Array.isArray(video.availableResolution)
        || video.availableResolution.find(p => !Resolutions[p])
    ) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'availableResolution'
        })
    }
    if (video.author
        || video.author.length > 20
        || video.author === null) {
        errors.errorsMessages.push({
            message: "string",
            field: "author"
        })
        if (!video.title
            || video.title === null
            || video.title.length > 40
        ) {
            errors.errorsMessages.push({
                message: "string",
                field: "title"
            })
        }
        return errors
    }
}

export const createVideoController = (req: Request<any, any, InputVideoType>, res:any) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length) { // если есть ошибки - отправляем ошибки
        res
            .status(400)
            .json(errors)
        return
    }

const now = Date.now()
    const createdAtISO = new Date(now).toISOString()
    const publicationDate = new Date(now)
        publicationDate.setDate(publicationDate.getDate()+ 1)
    const publicationDateISO =publicationDate.toISOString()
    // если всё ок - добавляем видео

    const newVideo= {
        id: +(new Date()) ,
        title:req.body.title,
        author:req.body.author,
        createdAt:createdAtISO,
        publicationDate:publicationDateISO,
        canBeDownloaded:false,
        minAgeRestriction:null,
        availableResolutions:req.body.availableResolutions
    }
    db.videos.push(newVideo)

    res
        .status(201)
        .json(newVideo)
}