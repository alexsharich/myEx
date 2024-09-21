import {Request, Response} from 'express'
import {OutputErrorsType} from "../input-output-types/output-errors-type";
import {OutputVideoType} from "../input-output-types/video-types";

export type ParamType = {
    id: string
}

export type BodyType = {
    id: number
    title: string
    // ...
}

export type QueryType = {
    search?: string
}

export type OutputType =  OutputErrorsType | OutputVideoType

export const someController = (
    req: Request<ParamType, OutputType, BodyType, QueryType>,
    res: Response<OutputType>
) => {

}