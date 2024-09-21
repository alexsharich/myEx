import {Request, Response} from "express";
import {InputVideoType, OutputVideoType, Resolutions} from "../input-output-types/video-types";
import {OutputErrorsType} from "../input-output-types/output-errors-type";
import {db} from "../db/db";
import {VideoDBType} from "../db/video-db-type";



export const createVideoController = (req: Request<any, any, InputVideoType>, res:any) => {

    if (!req.body.author
    ||!req.body.title
    ||!req.body.availableResolutions
    ||req.body.title.length > 40
    ||req.body.author.length > 20) { // если есть ошибки - отправляем ошибки
        res
            .send(400).json(
            {
                "errorsMessages": [
                    {
                        "message": "string",
                        "field": "string"
                    }
                ]
            }
        )
return
    }

const now = Date.now()
    const createdAtISO = new Date(now).toISOString()
    const publicationDate = new Date(now)
        publicationDate.setDate(publicationDate.getDate()+ 1)
    const publicationDateISO =publicationDate.toISOString()
    // если всё ок - добавляем видео

    const newVideo= {
        id: new Date().toISOString() ,
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