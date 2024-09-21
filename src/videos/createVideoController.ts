import {Request, Response} from "express";
import {InputVideoType, OutputVideoType, Resolutions} from "../input-output-types/video-types";
import {OutputErrorsType} from "../input-output-types/output-errors-type";
import {db} from "../db/db";
import {VideoDBType} from "../db/video-db-type";



export const createVideoController = (req: Request<any, any, InputVideoType>, res:any) => {
const errorsMessages = []
    if(!req.body.author
        ||req.body.author.length > 20
        || req.body.author ===null){
        errorsMessages.push({
            message: "string",
            field: "author"
        })
        res.status(400).send({errorsMessages})
    }
    if (!req.body.title
        || req.body.title === null
        || req.body.title.length > 40
    ) {
        errorsMessages.push({
            message: "string",
            field: "title"
        })
        res.status(400).send({errorsMessages})
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