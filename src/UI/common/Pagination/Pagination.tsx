import React, {useState} from 'react';
import style from './Pagination.module.css'
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../BLL/store";
import Button from '@material-ui/core/Button';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';
import {actions} from "../../../BLL/mainPage-reducer";

export const Pagination: React.FC = () => {

    const pages = useSelector<AppRootStateType, number | null>(state => state.mainPageReducer.pagination.pages)
    const activePage = useSelector<AppRootStateType, number>(state => state.mainPageReducer.pagination.page)
    const dispatch = useDispatch()

    const changePage = (page: number) => {
        dispatch(actions.setCurrentPage(page))
    }

    const pagesCount: number[] = []

    if (pages) {
        for (let i = 1; i <= pages; i++) {
            pagesCount.push(i)
        }
    }

    const borderSize = 11
    const borderCount = Math.ceil(pagesCount.length / borderSize)
    const [borderNumber, setBorderNumber] = useState(1)
    const leftBorderPageNumber = (borderNumber - 1) * borderSize + 1
    const rightBorderPageNumber = borderNumber * borderSize

    return (
        <div className={style.container}>

            {borderNumber > 1 && <Button variant="outlined" color="primary"
                                         onClick={() => {
                                             setBorderNumber(borderNumber - 1)
                                         }}><ArrowLeftIcon/></Button>
            }

            {pagesCount
                .filter(p => p >= leftBorderPageNumber && p <= rightBorderPageNumber)
                .map(page => {
                    return <Button color="primary"
                                   variant={activePage === page ? "contained" : undefined}
                                   onClick={() => {
                                       changePage(page)
                                   }}
                    >{page}</Button>
                })
            }

            {borderCount > borderNumber && <Button variant="outlined" color="primary"
                                                   onClick={() => {
                                                       setBorderNumber(borderNumber + 1)
                                                   }}><ArrowRightIcon/></Button>
            }
        </div>
    );
}
