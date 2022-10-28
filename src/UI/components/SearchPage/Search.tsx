import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from "react";
import {PhotoType} from "../../../DAL/api";
import {getParseLocalStorageData, setPhotoToLocalStorage} from "../../../BLL/localStorage";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../BLL/store";
import {searchPhotos} from "../../../BLL/mainPage-reducer";
import {Photos} from "../PhotosPage/PhotosPage";
import style from './Search.module.css'
import {Pagination} from "../../common/Pagination/Pagination";
import {Modal} from "../../common/modal/Modal";

export const Search: React.FC = () => {
    const [value, setValue] = useState<string>('')
    const [modalActive, setModalActive] = useState<boolean>(false)
    const [photoLS, setPhotoLS] = useState<PhotoType[]>(getParseLocalStorageData('stateLocalStorage'))
    const activePage = useSelector<AppRootStateType, number>(state => state.mainPageReducer.pagination.page)
    const photos = useSelector<AppRootStateType, PhotoType[]>(state => state.mainPageReducer.photos)
    const dispatch = useDispatch()

    useEffect(() => {
        if (value) {
            dispatch(searchPhotos(value))
        }
    }, [activePage, dispatch, value])

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            dispatch(searchPhotos(value))
        }
    }

    const addPhotoLocalStorage = (id: string) => {
        const newPhotoData = photos.filter(p => p.id === id)
        //const photosFromLS:PhotoType[] = getParseLocalStorageData('stateLocalStorage');
        const isInLS = photoLS.find(p=> p.id === id)
        if(isInLS){
            //alert('Photo has already been added')
            setModalActive(true);
        }else {
            setPhotoLS([...photoLS, newPhotoData[0]])
            setPhotoToLocalStorage('stateLocalStorage', JSON.stringify(
                [...photoLS, newPhotoData[0]]
            ))
        }
    }
    return (
        <div className={style.searchContainer}>
            <input className={style.inputSearch}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   placeholder='Search'
            />
            <Modal active={modalActive} setActive={setModalActive}>Photo has already been added</Modal>
            <Pagination />
            <Photos photos={photos} titleBtn='Bookmarks it!' handlerOnClick={addPhotoLocalStorage}/>
        </div>
    )
}