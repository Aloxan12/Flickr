import React, {useState} from "react";
import {PhotoType} from "../../../DAL/api";
import {getParseLocalStorageData, setPhotoToLocalStorage} from "../../../BLL/localStorage";
import {Photos} from "../PhotosPage/PhotosPage";
import style from './BookmarksPage.module.css'

export const Bookmarks: React.FC = () => {
    const [photosLS, setPhotosLS] = useState<PhotoType[]>(getParseLocalStorageData('stateLocalStorage'))

    const deletePhotoLocalStorage = (id: string) => {
        const newPhotoData = photosLS.filter(p => p.id !== id)
        setPhotosLS(newPhotoData);
        setPhotoToLocalStorage('stateLocalStorage', JSON.stringify(
            newPhotoData
        ))
    }
    return (
        <div className={style.bookmarks}>
            <h1>Bookmarks!!!</h1>
            <div className={style.photo}><Photos photos={photosLS} titleBtn='Remove it!' handlerOnClick={deletePhotoLocalStorage}/></div>
        </div>
    )
}