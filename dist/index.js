"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP_STATUSES = exports.app = void 0;
// @ts-ignore
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
const port = 3000;
const jsonBodyMiddleWare = express_1.default.json();
exports.HTTP_STATUSES = {
    OK_200: 200,
    CREATED_201: 201,
    NO_CONTENT_204: 204,
    BAD_REQUEST_400: 400,
    NOT_FOUND_404: 404,
};
exports.app.use(jsonBodyMiddleWare);
exports.app.get('/', (req, res) => {
    res.send('Hello backend');
});
exports.app.get('/users', (req, res) => {
    res.send('Hello users');
});
exports.app.post('/users', (req, res) => {
    res.send('New user was added');
});
const db = {
    courses: [
        { id: 1, title: 'front-end' },
        { id: 3, title: 'backend-end' },
        { id: 2, title: 'books' }
    ]
};
exports.app.delete('/__test__/data', (req, res) => {
    db.courses = [];
    res.sendStatus(exports.HTTP_STATUSES.NO_CONTENT_204);
});
const getDbCourseTo = (course) => {
    return {
        id: course.id,
        title: course.title
    };
};
exports.app.get('/courses', (req, res) => {
    let foundCourses = db.courses;
    if (req.query.title) {
        const queryParam = req.query.title;
        foundCourses = foundCourses.filter(c => c.title.indexOf(queryParam) > -1);
    }
    res.json(foundCourses.map(getDbCourseTo));
});
exports.app.get('/courses/:id', (req, res) => {
    const foundedCourse = db.courses.find(course => course.id === +req.params.id);
    if (!foundedCourse) {
        res.sendStatus(exports.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.json(getDbCourseTo(foundedCourse));
});
exports.app.delete('/courses/:id', (req, res) => {
    db.courses = db.courses.filter(course => course.id !== +req.params.id);
    res.sendStatus(exports.HTTP_STATUSES.NO_CONTENT_204);
});
exports.app.put('/courses/:id', (req, res) => {
    if (!req.body.title || req.body.title === '') {
        res.sendStatus(exports.HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const foundedCourse = db.courses.find(course => course.id === +req.params.id);
    if (!foundedCourse) {
        res.sendStatus(exports.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    foundedCourse.title = req.body.title;
    res.sendStatus(exports.HTTP_STATUSES.CREATED_201);
});
exports.app.post('/courses', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(exports.HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    const createdCourse = {
        id: +(new Date()),
        title: req.body.title
    };
    db.courses.push(createdCourse);
    res.status(exports.HTTP_STATUSES.CREATED_201).json(getDbCourseTo(createdCourse));
});
var VIDEO_QUALITY;
(function (VIDEO_QUALITY) {
    VIDEO_QUALITY["P144"] = "P144";
    VIDEO_QUALITY["P240"] = "P240";
    VIDEO_QUALITY["P360"] = "P360";
    VIDEO_QUALITY["P480"] = "P480";
    VIDEO_QUALITY["P720"] = "P720";
    VIDEO_QUALITY["P1080"] = "P1080";
    VIDEO_QUALITY["P1440"] = "P1440";
    VIDEO_QUALITY["P2160"] = "P210";
})(VIDEO_QUALITY || (VIDEO_QUALITY = {}));
const HW1DB = {
    videos: [
    // {
    //     id: 0,
    //     title: '',
    //     author: '',
    //     canBeDownloaded: true,
    //     minAgeRestriction: null,
    //     createdAt: "2024-09-17T09:47:17.393Z",
    //     publicationDate: "2024-09-17T09:47:17.393Z",
    //     availableResolutions: ['']
    // }
    ]
};
exports.app.delete('/hometask_01/api/testing/all-data', (req, res) => {
    HW1DB.videos = [];
    res.sendStatus(exports.HTTP_STATUSES.NO_CONTENT_204);
});
exports.app.get('/hometask_01/api/videos', (req, res) => {
    let foundVideos = HW1DB.videos;
    if (req.query.title) {
        const queryParam = req.query.title;
        foundVideos = foundVideos.filter(video => video.title.indexOf(queryParam) > -1);
    }
    res.status(exports.HTTP_STATUSES.OK_200).json(foundVideos);
});
exports.app.get('/hometask_01/api/videos/:id', (req, res) => {
    const foundedVideo = HW1DB.videos.find(video => video.id === +req.params.id);
    if (!foundedVideo) {
        res.sendStatus(exports.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.status(exports.HTTP_STATUSES.OK_200).json(foundedVideo);
});
exports.app.post('/hometask_01/api/videos', (req, res) => {
    if (!req.body.title) {
        res.sendStatus(exports.HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: [
                {
                    "message": "Incorrect !",
                    "field": "some field"
                }
            ]
        });
        return;
    }
    const now = new Date().toISOString();
    const createdVideo = {
        id: +(now),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: now,
        publicationDate: now,
        availableResolutions: ['P144']
    };
    HW1DB.videos.push(createdVideo);
    res.status(exports.HTTP_STATUSES.CREATED_201).json(createdVideo);
});
exports.app.put('/hometask_01/api/videos/:id', (req, res) => {
    if (req.body.title === '' || req.body.title.length > 40
        || typeof req.body.title !== 'string'
        || !req.body.title.trim()
        || req.body.author === '' || req.body.author.length > 20
        || !req.body.canBeDownloaded
        || !req.body.availableResolutions
        || !req.body.minAgeRestriction
        || !req.body.publicationDate
        || !req.body.author
        || !req.body.title) {
        res.sendStatus(exports.HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: [
                {
                    "message": "Incorrect !",
                    "field": "some field"
                }
            ]
        });
        return;
    }
    let foundedVideo = HW1DB.videos.find(video => video.id === +req.params.id);
    if (!foundedVideo) {
        res.sendStatus(exports.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    foundedVideo = {
        id: foundedVideo.id,
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: Boolean(req.body.canBeDownloaded),
        minAgeRestriction: req.body.minAgeRestriction,
        createdAt: foundedVideo.createdAt,
        publicationDate: req.body.publicationDate,
        availableResolutions: [req.body.availableResolutions[0]]
    };
    res.sendStatus(exports.HTTP_STATUSES.CREATED_201).json({
        title: foundedVideo.title,
        author: foundedVideo.author,
        availableResolution: foundedVideo.availableResolutions,
        canBeDownloaded: foundedVideo.canBeDownloaded,
        minAgeRestriction: foundedVideo.minAgeRestriction,
        publicationDate: foundedVideo.publicationDate
    });
});
exports.app.delete('/hometask_01/api/videos/:id', (req, res) => {
    if (!req.params.id) {
        res.status(exports.HTTP_STATUSES.NOT_FOUND_404);
    }
    HW1DB.videos = HW1DB.videos.filter(video => video.id !== +req.params.id);
    res.sendStatus(exports.HTTP_STATUSES.NO_CONTENT_204);
});
exports.app.listen(port, () => {
    console.log(`App was started on ${port} port`);
});
