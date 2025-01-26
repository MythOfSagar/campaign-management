import * as types from "./actiontypes.ts"

const initialState = {}

export const resourceReducer = (state = initialState, action) => {
    const { type } = action;
    switch (type) {
        case types.GET_RESOURCES_REQUEST:
            return {
                ...state,
                isError: false
            }

        case types.GET_RESOURCES_SUCCESS:
            return {
                ...state,
                isError: false,
                [action.resourceType]: action.payload
            }

        case types.RESOURCE_CREATE_SUCCESS:
            const newResources = [...(state[action.resourceType] || [])];
            newResources.push(action.newResource);
            return {
                ...state,
                isError: false,
                [action.resourceType]: [...newResources]
            }

        case types.GET_RESOURCES_FAILURE:
            return {
                ...state,
                isError: true,
            }

        case types.RESOURCE_DELETE_SUCCESS:
            const remainingResources = (state[action.resourceType] || []).filter(({ _id }) => _id !== action.resourceId);
            return {
                ...state,
                isError: false,
                [action.resourceType]: remainingResources
            }

        case types.RESOURCE_UPDATE_SUCCESS:
            const updatedResources = (state[action.resourceType] || []).map((resource) => {
                if (resource._id === action.resourceId) {
                    return action.updatedData
                }
                return resource
            });
            return {
                ...state,
                isError: false,
                [action.resourceType]: updatedResources
            }

        default:
            return state
    }
}