import React, {useState} from 'react';
import style from './App.module.css';
import {AppBar, createStyles, IconButton, makeStyles, Theme, Typography} from "@material-ui/core";
import {Toolbar} from '@material-ui/core';
import {AccountCircle} from "@material-ui/icons";
import {Redirect, Switch, Route} from 'react-router-dom';
import {Navbar} from "./UI/components/Navbar/Navbar";
import {Bookmarks} from "./UI/components/BookmarksPage/BookmarksPage";
import {Modal} from "./UI/common/modal/Modal";
import {Search} from "./UI/components/SearchPage/Search";


const App = () => {
    const [timeoutId, setTimeoutId] = useState<Array<number | NodeJS.Timeout>>([])
    const [notification, setNotification] = useState<boolean>(false)

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
        <div onClick={() => {
        }}
             onMouseMove={() => {
                 if (timeoutId.length > 0) {
                     timeoutId.forEach((val: number | NodeJS.Timeout) => {
                         if (typeof val === 'number') {
                             window.clearTimeout(val)
                         }
                     });
                     setTimeoutId([]);
                     setNotification(false)
                 }
                 setTimeoutId([
                     ...timeoutId,
                     setTimeout(() => {
                         setNotification(true)
                     }, 60000)
                 ])
             }}>
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
                <Modal active={notification} setActive={setNotification}>Sleep mode</Modal>
                <Switch>
                    <Route exact path='/' render={() => <Redirect to='/search'/>}/>
                    <Route exact path='/search' render={() => <Search />}/>
                    <Route exact path='/bookmarks' render={() => <Bookmarks/>}/>
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
