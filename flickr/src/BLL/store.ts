import {applyMiddleware, combineReducers, createStore} from "redux";
import thunk from "redux-thunk";
import {mainPageReducer} from "./mainPage-reducer";

const rootReducer = combineReducers({
    mainPageReducer
})

export const store = createStore(rootReducer, applyMiddleware(thunk))


export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type AppRootStateType = ReturnType<typeof store.getState>