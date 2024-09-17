// @ts-ignore
import  express , {Request,Response} from 'express'
import { RequestWithBodyHW1, RequestWithParamsAndBodyHW1, RequestWithParamsHW1, RequestWithQueryHW1} from "./types";
import {CreateVideoInputModel} from "./models/CreateVideoModel";
import {GetVideosQueryModel} from "./models/GetVideosQueryModel";
import {VideoViewModel} from "./models/VideoViewModel";
import {UpdateVideoInputModel} from "./models/UpdateVideoModel";
export const app = express()
const port = 3000

const jsonBodyMiddleWare = express.json()

export const HTTP_STATUSES = {
    OK_200:200,
    CREATED_201:201,
    NO_CONTENT_204:204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404:404,
}


app.use(jsonBodyMiddleWare)

//*HOME WORK*//

type VideoType = {
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null | number,
    createdAt: string,
    publicationDate: string,
    availableResolutions: Array<string>
}

type ErrorType ={
    errorsMessages: [
        {
            message: string,
            field: string
        }
    ]
}

enum VIDEO_QUALITY {
     P144="P144",
     P240="P240",
     P360="P360",
     P480="P480",
     P720="P720",
     P1080="P1080",
     P1440="P1440",
     P2160 ="P210"
}

const HW1DB:{videos:VideoType[]} = {
    videos:[]
}
app.delete('/hometask_01/api/testing/all-data',(req:Request,res:Response)=>{
    HW1DB.videos = []
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})

app.get('/videos',(req:RequestWithQueryHW1<GetVideosQueryModel>,res:Response<VideoViewModel[]>)=>{
    let foundVideos = HW1DB.videos
    if(req.query.title){
        const queryParam = req.query.title as string
        foundVideos = foundVideos.filter(video=>video.title.indexOf(queryParam)> -1)
    }
    res.status(HTTP_STATUSES.OK_200).json(foundVideos)
})

app.post('/videos',(req:RequestWithBodyHW1<CreateVideoInputModel>,res:Response<VideoType | ErrorType>)=>{
    if(!req.body.title || req.body.title.length > 40 || !req.body.author || req.body.author.length > 20){
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: [
                {
                    "message": "Incorrect !",
                    "field": "some field"
                }
            ]
        })
        return
    }

    const createdVideo: VideoType ={
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: req.body.availableResolutions

    }
    HW1DB.videos.push(createdVideo)
    res.status(HTTP_STATUSES.CREATED_201).json(createdVideo)
})

app.get('/videos/:id',(req:RequestWithParamsHW1<{id:string}>,res:Response<VideoType>)=>{
    const foundedVideo = HW1DB.videos.find(video=>video.id === +req.params.id)
    if(!foundedVideo){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }
    res.status(HTTP_STATUSES.OK_200).json(foundedVideo)
})

app.put('/videos/:id',(req:RequestWithParamsAndBodyHW1<{id:string},UpdateVideoInputModel>,res:Response)=>{

    if( /*!req.body.canBeDownloaded
        || !req.body.availableResolutions
        || !req.body.minAgeRestriction
        || !req.body.publicationDate*/
         !req.body.author
        || req.body.author.length > 20
        || req.body.title.length > 40
        || !req.body.title
        || req.body.title.trim() === '' ){
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: [
                {
                    message: "Incorrect !",
                    field: "some field"
                }
            ]
        })
        return
    }

    let foundedVideo = HW1DB.videos.find(video=>video.id === +req.params.id)
    if(!foundedVideo){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
        return
    }


        foundedVideo.title= req.body.title,
        foundedVideo.author= req.body.author,
        foundedVideo.canBeDownloaded= true,
        foundedVideo.minAgeRestriction= req.body.minAgeRestriction,
        foundedVideo.publicationDate= req.body.publicationDate,
        foundedVideo.availableResolutions= [req.body.availableResolutions[0]]

    res.status(HTTP_STATUSES.CREATED_201).json(
    {
        title: foundedVideo.title,
        author: foundedVideo.author,
        availableResolution: foundedVideo.availableResolutions,
        canBeDownloaded: foundedVideo.canBeDownloaded,
        minAgeRestriction: foundedVideo.minAgeRestriction,
        publicationDate: foundedVideo.publicationDate

    })
})
app.delete('/videos/:id',(req,res)=>{
    if(!req.params.id){
        res.sendStatus(HTTP_STATUSES.NOT_FOUND_404)
    }
    HW1DB.videos = HW1DB.videos.filter(video=>video.id !== +req.params.id)
    res.sendStatus(HTTP_STATUSES.NO_CONTENT_204)
})
app.listen(port,()=>{
    console.log(`App was started on ${port} port`)
})

