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
    videos: []
};
exports.app.delete('/hometask_01/api/testing/all-data', (req, res) => {
    HW1DB.videos = [];
    res.sendStatus(exports.HTTP_STATUSES.NO_CONTENT_204);
});
exports.app.get('/videos', (req, res) => {
    let foundVideos = HW1DB.videos;
    if (req.query.title) {
        const queryParam = req.query.title;
        foundVideos = foundVideos.filter(video => video.title.indexOf(queryParam) > -1);
    }
    res.status(exports.HTTP_STATUSES.OK_200).json(foundVideos);
});
exports.app.post('/videos', (req, res) => {
    if (!req.body.title || req.body.title.length > 40 || !req.body.author || req.body.author.length > 20) {
        res.status(exports.HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: [
                {
                    "message": "Incorrect !",
                    "field": "some field"
                }
            ]
        });
        return;
    }
    const createdVideo = {
        id: +(new Date()),
        title: req.body.title,
        author: req.body.author,
        canBeDownloaded: true,
        minAgeRestriction: null,
        createdAt: new Date().toISOString(),
        publicationDate: new Date().toISOString(),
        availableResolutions: req.body.availableResolutions
    };
    HW1DB.videos.push(createdVideo);
    res.status(exports.HTTP_STATUSES.CREATED_201).json(createdVideo);
});
exports.app.get('/videos/:id', (req, res) => {
    const foundedVideo = HW1DB.videos.find(video => video.id === +req.params.id);
    if (!foundedVideo) {
        res.sendStatus(exports.HTTP_STATUSES.NOT_FOUND_404);
        return;
    }
    res.status(exports.HTTP_STATUSES.OK_200).json(foundedVideo);
});
exports.app.put('/videos/:id', (req, res) => {
    if ( /*!req.body.canBeDownloaded
        || !req.body.availableResolutions
        || !req.body.minAgeRestriction
        || !req.body.publicationDate*/!req.body.author
        || req.body.author.length > 20
        || req.body.title.length > 40
        || !req.body.title) {
        res.status(exports.HTTP_STATUSES.BAD_REQUEST_400).send({
            errorsMessages: [
                {
                    message: "Incorrect !",
                    field: "some field"
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
    foundedVideo.title = req.body.title,
        foundedVideo.author = req.body.author,
        foundedVideo.canBeDownloaded = true,
        foundedVideo.minAgeRestriction = req.body.minAgeRestriction,
        foundedVideo.publicationDate = req.body.publicationDate,
        foundedVideo.availableResolutions = [req.body.availableResolutions[0]];
    res.status(exports.HTTP_STATUSES.CREATED_201).json({
        title: foundedVideo.title,
        author: foundedVideo.author,
        availableResolution: foundedVideo.availableResolutions,
        canBeDownloaded: foundedVideo.canBeDownloaded,
        minAgeRestriction: foundedVideo.minAgeRestriction,
        publicationDate: foundedVideo.publicationDate
    });
});
exports.app.delete('/videos/:id', (req, res) => {
    if (!req.params.id) {
        res.sendStatus(exports.HTTP_STATUSES.NOT_FOUND_404);
    }
    HW1DB.videos = HW1DB.videos.filter(video => video.id !== +req.params.id);
    res.sendStatus(exports.HTTP_STATUSES.NO_CONTENT_204);
});
exports.app.listen(port, () => {
    console.log(`App was started on ${port} port`);
});
