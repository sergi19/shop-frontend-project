import { createReducer, Action, on } from "@ngrx/store"
import * as fromAuth from "./auth.actions";

export interface AuthState {
    isLogged: boolean
}

const initialState: AuthState = {
    isLogged: false
}

const reducer = createReducer(
    initialState,
    on(fromAuth.LOGIN_USER, state => ({...state, isLogged: true}))
);

export function authReducer(state: AuthState, action: Action) {
    return reducer(state, action);
}