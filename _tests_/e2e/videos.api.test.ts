import {app} from "../../src/app";
import {agent} from 'supertest'


const request = agent(app)
export const HTTP_STATUSES = {
    OK_200:200,
    CREATED_201:201,
    NO_CONTENT_204:204,

    BAD_REQUEST_400: 400,
    NOT_FOUND_404:404,
}

describe('/videos',()=>{

    beforeAll(async ()=>{
        await request.delete('/testing/all-data')
    })

    let createdVideo:any = null
    let createdVideoSecond : any = null
    const id1 =1
    const id2 = 2

    it('should return 200 and empty array',async ()=>{
   await request.get('/videos').expect(HTTP_STATUSES.OK_200,[])
    })
    it('should return 404 and not existing video',async ()=>{
        await request.get('/videos/500').expect(HTTP_STATUSES.NOT_FOUND_404)
    })
    it('should not create video',async ()=>{
        await request.post('/videos').send({title:''}).expect(HTTP_STATUSES.BAD_REQUEST_400)
        await request.get('/videos').expect(HTTP_STATUSES.OK_200,[])
    })


    it('should create new video',async ()=>{

        const createdResonse = await request.post('/videos/').send({
            id: id1,
            title: 'new video',
            author: 'I am',
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: new Date(),
            publicationDate: new Date(),
            availableResolutions: ['P144']
        }).expect(HTTP_STATUSES.CREATED_201)
        createdVideo = createdResonse.body
        await request.get('/videos').expect(HTTP_STATUSES.OK_200,[{
            id: createdVideo.id,
            title: createdVideo.title ,
            author: createdVideo.author,
            canBeDownloaded:createdVideo.canBeDownloaded,
            minAgeRestriction: createdVideo.minAgeRestriction,
            createdAt: createdVideo.createdAt,
            publicationDate: createdVideo.publicationDate,
            availableResolutions: [createdVideo.availableResolutions[0]]
        }])
    })
    it('should create one more video',async()=>{
        const createdResponse = await request.post('/videos/').send({
            id: id2,
            title: 'new video',
            author: 'I am',
            canBeDownloaded: true,
            minAgeRestriction: null,
            createdAt: new Date(),
            publicationDate: new Date(),
            availableResolutions: ['P144']
        }).expect(HTTP_STATUSES.CREATED_201)

        createdVideoSecond = createdResponse.body

        await request.get(`/videos`).expect(HTTP_STATUSES.OK_200,[createdVideo,createdVideoSecond])
    })
    it('should not update video',async ()=>{
        await request.put(`/videos/${id1}`).send({title:''}).expect(HTTP_STATUSES.BAD_REQUEST_400)

        await request.get(`/videos`).expect(HTTP_STATUSES.OK_200,[createdVideo,createdVideoSecond])
    })

    it('should update video',async ()=>{
        await request.put(`/videos/${createdVideo.id}`).send({
            id: createdVideo.id,
            title: 'yo' ,
            author: 'I !!!',
            canBeDownloaded:true,
            minAgeRestriction: createdVideo.minAgeRestriction,
            createdAt: createdVideo.createdAt,
            publicationDate: createdVideo.publicationDate,
            availableResolutions: [createdVideo.availableResolutions[0]]}).expect(HTTP_STATUSES.NO_CONTENT_204)

        await request.get(`/videos/${createdVideo.id}`).expect(HTTP_STATUSES.OK_200)
    })




    it('should delete video',async()=>{
        await request.delete('/videos/' + createdVideo.id).expect(HTTP_STATUSES.NO_CONTENT_204)
        await request.get('/videos/' + createdVideo.id).expect(HTTP_STATUSES.NOT_FOUND_404)
        await request.get('/videos').expect(HTTP_STATUSES.OK_200,[createdVideoSecond])
    })

})