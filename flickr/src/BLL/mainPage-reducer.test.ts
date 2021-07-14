import {Dispatch} from "redux";
import {AppRootStateType} from "./store";
import {pageAPI, PhotoType} from "../DAL/api";

type ActionsType = ReturnType<typeof setNewPhotos>
    | ReturnType<typeof setPages>
    | ReturnType<typeof setCurrentPage>

export enum mainPageReducerType {
    'SET-NEW-PHOTOS' = 'mainPage/SET-NEW-PHOTOS',
    'SET-PAGES' = 'mainPage/SET-PAGES',
    'SET-CURRENT-PAGE' = 'mainPage/SET-CURRENT-PAGE'
}

export type InitialStateSearchKeyWordType = typeof initialState
export type PaginationType = {
    page: number
    pages: null | number
    perpage: number
}

let initialState = {
    photos: [] as Array<PhotoType>,
    pagination: {
        page: 1,
        pages: null,
        perpage: 15,
    } as PaginationType
}


export const mainPageReducer = (state = initialState, action: ActionsType): InitialStateSearchKeyWordType => {
    switch (action.type) {
        case mainPageReducerType['SET-NEW-PHOTOS'] :
            return {...state, photos: action.photos}
        case mainPageReducerType['SET-PAGES'] :
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    pages: action.pages
                }
            }
        case mainPageReducerType['SET-CURRENT-PAGE']:
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    page: action.currentPage,
                }
            }
        default:
            return state
    }
}

//AC
export const setNewPhotos = (photos: Array<PhotoType>) => ({
    type: mainPageReducerType['SET-NEW-PHOTOS'],
    photos
} as const)
export const setPages = (pages: number) => ({
    type: mainPageReducerType['SET-PAGES'],
    pages
} as const)
export const setCurrentPage = (currentPage: number) => ({
    type: mainPageReducerType['SET-CURRENT-PAGE'],
    currentPage
} as const)

//TC
export const searchPhotos = (keyword: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const {page, perpage} = getState().mainPageReducer.pagination
    try {
        pageAPI.getNewImages(keyword, page, perpage)
            .then(res => {
                const {pages, photo} = res.data.photos
                dispatch(setNewPhotos(photo))
                dispatch(setPages(pages))
            })
    } catch (e) {
        console.log('Error')
    }
}