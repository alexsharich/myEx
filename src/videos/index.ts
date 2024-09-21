import {Router} from 'express'
import {getVideosController} from './getVideosController'
import {createVideoController} from './createVideoController'
import {findVideoController} from './findVideoController'
import {deleteVideoController} from './deleteVideoController'
import {changeVideoController} from "./changeVideoController";
import {clearData} from "./clearData";

export const videosRouter = Router()
export const testingRouter = Router()

videosRouter.get('/', getVideosController)
videosRouter.post('/', createVideoController)
videosRouter.get('/:id', findVideoController)
videosRouter.delete('/:id', deleteVideoController)
videosRouter.put('/:id',changeVideoController)
testingRouter.delete('/all-data',clearData)


