import {Dispatch} from "redux";
import {AppRootStateType, InferActionsTypes} from "./store";
import {pageAPI, PhotoType} from "../DAL/api";

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


export const mainPageReducer = (state = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SET-NEW-PHOTOS' :
            return {...state, photos: action.photos}
        case 'SET-PAGES' :
            return {
                ...state,
                pagination: {
                    ...state.pagination,
                    pages: action.pages
                }
            }
        case 'SET-CURRENT-PAGE':
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
export const actions = {
    setNewPhotos:(photos: Array<PhotoType>) => ({type: 'SET-NEW-PHOTOS',photos} as const),
    setPages:(pages: number) => ({type: 'SET-PAGES',pages} as const),
    setCurrentPage:(currentPage: number) => ({type: 'SET-CURRENT-PAGE',currentPage} as const)
}

//TC
export const searchPhotos = (keyword: string) => (dispatch: Dispatch, getState: () => AppRootStateType) => {
    const {page, perpage} = getState().mainPageReducer.pagination
    try {
        pageAPI.getNewImages(keyword, page, perpage)
            .then(res => {
                const {pages, photo} = res.data.photos
                dispatch(actions.setNewPhotos(photo))
                dispatch(actions.setPages(pages))
            })
    } catch (e) {
        console.log('Error')
    }
}

export type InitialStateType = typeof initialState
type ActionsType = InferActionsTypes<typeof actions>