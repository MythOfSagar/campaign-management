import { LOGIN_SESSION } from "../../constants.ts";
import * as types from "./actiontypes.ts"

const initialState = {
    loginData: localStorage.getItem(LOGIN_SESSION) ? JSON.parse(localStorage.getItem(LOGIN_SESSION) || '') : null,
    message: null,
    isError: false
}

export const authReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.SIGN_UP_REQUEST:
            return {
                ...state,
                isError: false
            }

        case types.SIGN_UP_SUCCESS:
            return {
                ...state,
                isError: false,
                message: payload
            }

        case types.SIGN_UP_FAILURE:
            return {
                ...state,
                isError: true,
            }

        case types.SIGN_IN_REQUEST:
            return {
                ...state,
                isError: false
            }

        case types.SIGN_IN_SUCCESS:
            localStorage.setItem(LOGIN_SESSION, JSON.stringify(payload))
            return {
                ...state,
                isError: false,
                loginData: payload
            }

        case types.SIGN_IN_FAILURE:
            return {
                ...state,
                isError: true,
                loginData: null
            }

        case types.SIGN_OUT_REQUEST:
            localStorage.setItem(LOGIN_SESSION,'')
            return {
                ...state,
                loginData: null
            }


        default:
            return state
    }
}