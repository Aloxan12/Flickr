import {instance} from "./instance";

export type PhotoType = {
    farm: 66
    id: string
    isfamily: number
    isfriend: number
    ispublic: number
    owner: string
    secret: string
    server: string
    title: string
}

export type newPhotos = {
    photos: {
        page: number,
        pages: number,
        perpage: number,
        total: number,
        photo: Array<PhotoType>
    }
    stat: string
}

export const pageAPI = {
    getNewImages(keyword: string, page: number, perpage: number) {
        return instance.get<newPhotos>(`?method=flickr.photos.search&api_key=92b0159e2ce672e465a40e3f519c6412&tags=${keyword}&per_page=${perpage}&page=${page}&format=json&nojsoncallback=1`)
    },
}