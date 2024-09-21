import {Request, Response} from "express";
import {InputVideoType, OutputVideoType, Resolutions} from "../input-output-types/video-types";
import {OutputErrorsType} from "../input-output-types/output-errors-type";
import {db} from "../db/db";
import {VideoDBType} from "../db/video-db-type";

const inputValidation = (video: any) => {
    const errors = { // объект для сбора ошибок
        errorsMessages: []
    }
// ...

    if(!video.title
        || video.title === null
        || video.title.length > 40){
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'title'
        })
    }
    if(!video.author
        ||video.author.length > 20
        || video.author ===null){
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'author'
        })
    }
    if (!Array.isArray(video.availableResolutions)
        || !video.availableResolutions.every(item => Object.values(Resolutions).includes(item))
    ) {
        errors.errorsMessages.push({
            message: 'error!!!!', field: 'availableResolutions'
        })
    }
    return errors
}

export const createVideoController = (req: Request<any, any, InputVideoType>, res:any) => {
    const errors = inputValidation(req.body)
    if (errors.errorsMessages.length) { // если есть ошибки - отправляем ошибки
        res
            .status(400)
            .json(errors)
        return
        // return res.status(400).json(errors)
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