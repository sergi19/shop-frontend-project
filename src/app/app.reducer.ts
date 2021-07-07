import { ActionReducerMap } from '@ngrx/store';
import * as authReducer from './auth/auth.reducer';

export interface AppState {
    loginState: authReducer.AuthState
}

export const appReducers: ActionReducerMap<AppState> = {
    loginState: authReducer.authReducer
}