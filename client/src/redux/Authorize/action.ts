import { API_URL } from "../../environment.dev.ts";
import { HIDE_LOADER, NOTIFY, SHOW_LOADER } from "../Notification/actiontypes.ts";
import * as types from "./actiontypes.ts"
import axios from "axios";


export const signUp: any = (data) => (dispatch) => {
    dispatch({ type: types.SIGN_UP_REQUEST })
    dispatch({ type: SHOW_LOADER })
    return axios.post(`${API_URL}/users/signUp`, data)
        .then((res) => {
            dispatch({
                type: NOTIFY, payload: {
                    message: 'Account Created Successfully.',
                    status: 'success',
                }
            })
            dispatch({ type: types.SIGN_UP_SUCCESS, payload: res.data })
            dispatch({ type: HIDE_LOADER })
            return dispatch(signIn(data))
        }).catch((err) => {
            dispatch({
                type: NOTIFY, payload: {
                    message: err.response.data.error,
                    status: 'error',
                }
            })
            dispatch({ type: HIDE_LOADER })
            return dispatch({ type: types.SIGN_UP_FAILURE })

        })
}



export const signIn: any = (data) => (dispatch) => {
    dispatch({ type: types.SIGN_IN_REQUEST })
    dispatch({ type: SHOW_LOADER })
    return axios.post(`${API_URL}/users/signIn`, data)
        .then((res) => {
            dispatch({
                type: NOTIFY, payload: {
                    message: 'Signed In Successfully.',
                    status: 'success',
                }
            })
            dispatch({ type: HIDE_LOADER })
            return dispatch({ type: types.SIGN_IN_SUCCESS, payload: res.data })

        }).catch((err) => {
            dispatch({
                type: NOTIFY, payload: {
                    message: err.response.data.error,
                    status: 'error',
                }
            })
            dispatch({ type: HIDE_LOADER })
            return dispatch({ type: types.SIGN_IN_FAILURE })

        })
}

export const resetPassword: any = (data) => (dispatch) => {
    dispatch({ type: types.RESET_PASSWORD_REQUEST })
    dispatch({ type: SHOW_LOADER })
    return axios.put(`${API_URL}/users/resetPassword`, data)
        .then((res) => {
            dispatch({
                type: NOTIFY, payload: {
                    message: 'Password Reseted Successfully.',
                    status: 'success',
                }
            })
            dispatch({ type: HIDE_LOADER })
            return dispatch({ type: types.RESET_PASSWORD_SUCCESS, payload: res.data })

        }).catch((err) => {
            dispatch({
                type: NOTIFY, payload: {
                    message: err.response.data.error,
                    status: 'error',
                }
            })
            dispatch({ type: HIDE_LOADER })
            return dispatch({ type: types.RESET_PASSWORD_FAILURE })

        })
}

export const signOut: any = () => (dispatch) => {
    dispatch({ type: types.SIGN_OUT_REQUEST })
}