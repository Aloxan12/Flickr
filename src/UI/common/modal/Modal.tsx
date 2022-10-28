import React from "react";
import style from "./Modal.module.css";

type ModalType = {
    active: boolean
    setActive: (value: boolean) => void
    children: string
}

export const Modal: React.FC<ModalType> = ({active, setActive, children}) => {
    return (
        <div className={active ? `${style.modal} + '' + ${style.active}` : style.modal} onClick={() => setActive(false)}>
            <div className={active ? `${style.modalContent} + '' + ${style.active}` : style.modalContent}>
                {children}
            </div>
        </div>
    )
}