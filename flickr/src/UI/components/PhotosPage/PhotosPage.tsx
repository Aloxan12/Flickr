import React from "react";
import {Paper} from "@material-ui/core";
import {PhotoType} from "../../../DAL/api";
import style from './PhotosPage.module.css'

export type PhotosType = {
    photos: PhotoType[]
    titleBtn: string
    handlerOnClick: (id: string) => void
}
export const Photos: React.FC<PhotosType> = ({photos, titleBtn, handlerOnClick}) => {
    return (
        <div className={style.containerPhotos}>
            {photos.map(p => {
                return (
                    <div key={p.id}>
                        <Paper elevation={3}>
                            <div key={p.id} className={style.photo}>
                                <img src={`https://live.staticflickr.com/${p.server}/${p.id}_${p.secret}.jpg`}
                                     alt=""
                                />
                                <button onClick={() => handlerOnClick(p.id)}
                                >{titleBtn}</button>
                                <span>{p.title}</span>
                            </div>
                        </Paper>
                    </div>
                )
            })}
        </div>
    )
}