
export type UpdateVideoInputModel ={
    /**
     * Parametres for updating
     */
    title: string,
    author: string,
    availableResolutions: Array<string>,
    canBeDownloaded: boolean,
    minAgeRestriction: number,
    publicationDate: string
}