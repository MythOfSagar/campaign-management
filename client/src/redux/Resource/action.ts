import { LOGIN_SESSION } from "../../constants.ts";
import { API_URL } from "../../environment.dev.ts";
import { HIDE_LOADER, NOTIFY, SHOW_LOADER } from "../Notification/actiontypes.ts";
import * as types from "./actiontypes.ts"
import axios from "axios";

const loginData = localStorage.getItem(LOGIN_SESSION)
const TOKEN = loginData ? JSON.parse(loginData)?.token : ''


export const createResource: any = (data) => (dispatch) => {
    dispatch({ type: types.RESOURCE_CREATE_REQUEST })
    dispatch({ type: SHOW_LOADER })

    return axios.post(`${API_URL}/resources`, data, {
        headers: {
            'Authorization': TOKEN
        }
    })
        .then((res) => {
            dispatch({
                type: NOTIFY, payload: {
                    message: 'Successfully Created',
                    status: 'success',
                }
            })
            dispatch({ type: HIDE_LOADER })
            return dispatch({ type: types.RESOURCE_CREATE_SUCCESS, resourceType: data.type, newResource: res.data })
        }).catch((err) => {
            dispatch({
                type: NOTIFY, payload: {
                    message: 'Error Occured.',
                    status: 'error',
                }
            })
            dispatch({ type: HIDE_LOADER })
            return dispatch({ type: types.RESOURCE_CREATE_FAILURE })
        })
}



export const readResources: any = (type: string) => (dispatch) => {
    dispatch({ type: types.GET_RESOURCES_REQUEST })
    dispatch({ type: SHOW_LOADER })

    return axios.get(`${API_URL}/resources?type=${type}`)
        .then((res) => {
            dispatch({ type: HIDE_LOADER })
            return dispatch({ type: types.GET_RESOURCES_SUCCESS, payload: res.data, resourceType: type })
        }).catch((err) => {
            dispatch({
                type: NOTIFY, payload: {
                    message: 'Error Occured.',
                    status: 'error',
                }
            })
            dispatch({ type: HIDE_LOADER })
            return dispatch({ type: types.GET_RESOURCES_FAILURE })
        })
}

export const updateResource: any = (resourceId: string, type: string, data) => (dispatch) => {
    dispatch({ type: types.RESOURCE_UPDATE_REQUEST })
    dispatch({ type: SHOW_LOADER })

    return axios.put(`${API_URL}/resources/edit/${resourceId}`, data, {
        headers: {
            'Authorization': TOKEN,
            'Content-Type': "application/json"
        }
    })
        .then((res) => {
            dispatch({
                type: NOTIFY, payload: {
                    message: 'Successfully Updated',
                    status: 'success',
                }
            })
            dispatch({ type: HIDE_LOADER })
            return dispatch({ type: types.RESOURCE_UPDATE_SUCCESS, resourceId: resourceId, resourceType: type, updatedData: data })
        }).catch((err) => {
            dispatch({
                type: NOTIFY, payload: {
                    message: 'Error Occured.',
                    status: 'error',
                }
            })
            dispatch({ type: HIDE_LOADER })
            return dispatch({ type: types.RESOURCE_UPDATE_FAILURE })
        })
}

export const deleteResource: any = (resourceId: string, type: string) => (dispatch) => {
    dispatch({ type: types.RESOURCE_DELETE_REQUEST })
    dispatch({ type: SHOW_LOADER })

    return axios.delete(`${API_URL}/resources/delete/${resourceId}`, {
        headers: {
            'Authorization': TOKEN
        }
    })
        .then((res) => {
            dispatch({
                type: NOTIFY, payload: {
                    message: 'Successfully Deleted',
                    status: 'success',
                }
            })
            dispatch({ type: HIDE_LOADER })
            return dispatch({ type: types.RESOURCE_DELETE_SUCCESS, resourceId: resourceId, resourceType: type })
        }).catch((err) => {
            dispatch({
                type: NOTIFY, payload: {
                    message: 'Error Occured.',
                    status: 'error',
                }
            })
            dispatch({ type: HIDE_LOADER })
            return dispatch({ type: types.RESOURCE_DELETE_FAILURE })
        })
}

