import request from 'supertest'
import {app} from '../../src/index'
import {HTTP_STATUSES} from "../../src/index";

describe('/courses',()=>{

    beforeAll(async ()=>{
        await request(app).delete('/hometask_01/api/testing/all-data')
    })

    let createdVideo:any = null
    let createdVideoSecond : any = null
    const id1 =1
    const id2 = 2

    it('should return 200 and empty array',async ()=>{
   await request(app).get('/videos').expect(HTTP_STATUSES.OK_200,[])
    })
    it('should return 404 and not existing video',async ()=>{
        await request(app).get('/videos/500').expect(HTTP_STATUSES.NOT_FOUND_404)
    })
    it('should not create video',async ()=>{
        await request(app).post('/videos').send({title:''}).expect(HTTP_STATUSES.BAD_REQUEST_400)
        await request(app).get('/videos').expect(HTTP_STATUSES.OK_200,[])
    })


    it('should create new video',async ()=>{

        const createdResonse = await request(app).post('/videos/').send({
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
        await request(app).get('/videos/').expect(HTTP_STATUSES.OK_200,[{
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
    it('should not update video',async ()=>{
        await request(app).put(`/videos/${id1}`).send({title:''}).expect(HTTP_STATUSES.BAD_REQUEST_400)

        await request(app).get(`/videos/`).expect(HTTP_STATUSES.OK_200,[createdVideo])
    })

    it('should update video',async ()=>{
        await request(app).put(`/videos/${createdVideo.id}`).send({
            id: createdVideo.id,
            title: 'yo' ,
            author: 'I !!!',
            canBeDownloaded:true,
            minAgeRestriction: createdVideo.minAgeRestriction,
            createdAt: createdVideo.createdAt,
            publicationDate: createdVideo.publicationDate,
            availableResolutions: [createdVideo.availableResolutions[0]]}).expect(HTTP_STATUSES.CREATED_201)

        await request(app).get(`/videos/${createdVideo.id}`).expect(HTTP_STATUSES.OK_200)
    })
    it('should create one more video',async()=>{
        const createdResponse = await request(app).post('/videos/').send({
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

        await request(app).get(`/videos/`).expect(HTTP_STATUSES.OK_200,[createdVideo,createdVideoSecond])
    })



    it('should delete video',async()=>{
        await request(app).delete('/videos/' + createdVideo.id).expect(HTTP_STATUSES.NO_CONTENT_204)
        await request(app).get('/videos/' + createdVideo.id).expect(HTTP_STATUSES.NOT_FOUND_404)
        await request(app).get('/videos').expect(HTTP_STATUSES.OK_200,[createdVideoSecond])
    })

})