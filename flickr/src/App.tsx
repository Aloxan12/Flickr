import React from 'react';
import style from './App.module.css';
import {AppBar, createStyles, IconButton, makeStyles, Theme, Typography} from "@material-ui/core";
import {Toolbar} from '@material-ui/core';
import {AccountCircle} from "@material-ui/icons";
import {Redirect,Switch,Route} from 'react-router-dom';
import {Navbar} from "./UI/common/Navbar/Navbar";
import {MainPage} from "./UI/common/MainPages";
import {Bookmarks} from "./UI/common/BookmarksPage/BookmarksPage";

function App() {
    const useStyles = makeStyles((theme: Theme) =>
        createStyles({
            root: {
                flexGrow: 1,
            },
            menuButton: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexGrow: 1,
            },
        }),
    );
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={useStyles().title}>
                        Search on Flickr
                    </Typography>
                    {(
                        <div>
                            <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                color="inherit"
                            >
                                <AccountCircle/>
                            </IconButton>
                        </div>
                    )}
                </Toolbar>
            </AppBar>

            <div className={style.mainPage}>
                <Navbar/>
                <Switch>
                    <Route exact path='/' render={() => <Redirect to='/main'/>}/>
                    <Route exact path='/main' render={() => <MainPage />}/>
                    <Route exact path='/bookmarks' render={() => <Bookmarks />}/>
                    <Route exact path='/404' render={() => <div>404 PAGE NO FOUND</div>}/>
                    <Route exact path='*' render={() => <Redirect to='404'/>}/>
                </Switch>
            </div>

            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={useStyles().title}>
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}

export default App;
