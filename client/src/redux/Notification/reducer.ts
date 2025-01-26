import * as types from "./actiontypes.ts"

const initialState = {
    message: null,
    status: null,
    triggerNumber: 0,
    isLoading:null
}

export const notificationReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
        case types.NOTIFY:
            return {
                ...state,
                message: payload?.message,
                status: payload?.status,
                triggerNumber: Math.random()
            }
            case types.SHOW_LOADER:
            return {
                ...state,
                isLoading:true
            }
            case types.HIDE_LOADER:
            return {
                ...state,
                isLoading:false
            }

        default:
            return state
    }
}