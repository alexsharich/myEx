import {Resolutions} from "../input-output-types/video-types";

export type VideoDBType ={
    id: number,
    title: string,
    author: string,
    canBeDownloaded: boolean,
    minAgeRestriction: null | string,
    createdAt: string,
    publicationDate: string,
    availableResolutions: Resolutions[]
}