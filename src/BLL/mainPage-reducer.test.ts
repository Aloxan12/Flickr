import {
    actions,
    InitialStateType,
    mainPageReducer,
    PaginationType,
} from "./mainPage-reducer";
import {PhotoType} from "../DAL/api";


let state:InitialStateType =  {
    photos: [] as Array<PhotoType>,
    pagination: {
        page: 1,
        pages: null,
        perpage: 15,
    } as PaginationType
}

test('set new photo', () => {
    let action = actions.setNewPhotos([
        {farm: 66, id: '12321443', isfamily: 2, isfriend: 1,ispublic: 1, owner: 'czx', secret: 'sasaa',server: 'http',title: 'prod'},
        {farm: 66, id: '89921443', isfamily: 2, isfriend: 1,ispublic: 1, owner: 'czx', secret: 'sasaa',server: 'http',title: 'tree'},
        {farm: 66, id: '45421443', isfamily: 2, isfriend: 1,ispublic: 1, owner: 'czx', secret: 'sasaa',server: 'http',title: 'val'},
    ])

    let newState = mainPageReducer(state, action)
    expect(newState.photos.length).toBe(3)
})
test('set current page', () => {
    let action = actions.setCurrentPage(2)

    let newState = mainPageReducer(state, action)
    expect(newState.pagination.page).toBe(2)
})
test('set  pages', () => {
    let action = actions.setPages(2)

    let newState = mainPageReducer(state, action)
    expect(newState.pagination.pages).toBe(2)
})
