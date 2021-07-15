import React from "react";
import style from './Navbar.module.css';
import {Grid, IconButton} from "@material-ui/core";
import {Bookmarks, Cloud } from "@material-ui/icons";
import { NavLink } from "react-router-dom";

export const Navbar: React.FC = () => {

    return (
        <div className={style.navbarContainer}>
            <Grid container direction="column" alignItems="center">
                <NavLink to="/search">
                    <IconButton color={"primary"} className={style.hov}>
                        <Cloud fontSize='large' />
                    </IconButton>
                </NavLink>
                <NavLink to="/bookmarks">
                    <IconButton color={"primary"}>
                        <Bookmarks fontSize='large' className={style.hov}/>
                    </IconButton>
                </NavLink>
            </Grid>
        </div>
    );
}