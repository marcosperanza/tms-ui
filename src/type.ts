import {Activity} from "./generated/api";

export const ADD_ACTIVITY_RQ = "ADD_ACTIVITY_RQ"
export const ADD_ACTIVITY = "ADD_ACTIVITY"
export const GET_ACTIVITIES = "GET_ACTIVITIES"
export const MAKE_DONE_ACTIVITY = "MAKE_DONE_ACTIVITY"
export const ERROR = "ERROR"


export interface AddActivityAction {
    type: 'ADD_ACTIVITY'
    payload: Activity
}
export interface ErrorAction {
    type: 'ERROR',
    payload: any
}

// Union Action Types
export type Action = AddActivityAction | ErrorAction


export type DispatchType = (args: Action) => Action


