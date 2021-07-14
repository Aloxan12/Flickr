import React, {ChangeEvent, KeyboardEvent, useEffect, useState} from "react";
import {Pagination} from "../Pagination/Pagination";
import {useDispatch, useSelector} from "react-redux";
import {searchPhotos} from "../../BLL/mainPage-reducer";
import {AppRootStateType} from "../../BLL/store";
import {photoType} from "../../DAL/api";
import {Paper} from "@material-ui/core";


export const MainPage:React.FC=()=>{
    return(
        <div>
            <Search />
            <Pagination />
            <Photos />
        </div>
    )
}
export const Search:React.FC=()=>{
    const [value, setValue]=useState<string>('')
    const activePage = useSelector<AppRootStateType, number>(state => state.mainPageReducer.pagination.page)
    const dispatch = useDispatch()

    useEffect(() => {
        if (value) {
            dispatch(searchPhotos(value))
        }
    }, [activePage, dispatch, value])

    const onChangeHandler =(e:ChangeEvent<HTMLInputElement>)=>{
        setValue(e.currentTarget.value)
    }
    const onKeyPressHandler =(e:KeyboardEvent<HTMLInputElement>)=>{
        if(e.key === 'Enter'){
            dispatch(searchPhotos(value))
        }
    }
    return(
        <div>
            <input onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   placeholder='Search'
            />
        </div>
    )
}
export const Photos:React.FC=()=>{
    const photos = useSelector<AppRootStateType, photoType[]>(state => state.mainPageReducer.photos)
    return(
        <div>
            {photos.map(p=>{
                return (
                    <div key={p.id}>
                        <Paper>
                            <div key={p.id} >
                                <img src={`https://live.staticflickr.com/${p.server}/${p.id}_${p.secret}.jpg`}
                                     alt=""
                                />
                                <button>Bookmarks it!</button>
                                <span>{p.title}</span>
                            </div>
                        </Paper>
                    </div>
                )
            })}
        </div>
    )
}