import {Activity} from "./generated/api";

export const ADD_ACTIVITY_RQ = "ADD_ACTIVITY_RQ"
export const FETCH_ACTIVITY_RQ = "FETCH_ACTIVITY_RQ"
export const EDIT_ACTIVITY_RQ = "EDIT_ACTIVITY_RQ"
export const REMOVE_ACTIVITY_RQ = "REMOVE_ACTIVITY_RQ"
export const SET_ACTIVITIES = "SET_ACTIVITIES"
export const EDIT_ACTIVITY = "EDIT_ACTIVITY"
export const ADD_ACTIVITY = "ADD_ACTIVITY"
export const REMOVE_ACTIVITY = "REMOVE_ACTIVITY"
export const ERROR = "ERROR"

export interface AddActivityRequestAction {
    type: 'ADD_ACTIVITY_RQ'
}

export interface FetchActivityRequestAction {
    type: 'FETCH_ACTIVITY_RQ'
}

export interface EditActivityRequestAction {
    type: 'EDIT_ACTIVITY_RQ',
    payload: Activity

}

export interface EditActivityAction {
    type: 'EDIT_ACTIVITY',
    payload: Activity

}

export interface RemoveActivityRequestAction {
    type: 'REMOVE_ACTIVITY_RQ',
    payload: Activity

}

export interface SetActivitiesAction {
    type: 'SET_ACTIVITIES',
    payload: Activity[]

}

export interface AddActivityAction {
    type: 'ADD_ACTIVITY',
    payload: Activity
}

export interface RemoveActivityAction {
    type: 'REMOVE_ACTIVITY',
    payload: Activity
}

export interface ErrorAction {
    type: 'ERROR',
    payload: any
}

// Union Action Types
export type Action =
    AddActivityAction |
    AddActivityRequestAction |
    SetActivitiesAction |
    FetchActivityRequestAction |
    EditActivityAction |
    EditActivityRequestAction |
    RemoveActivityAction |
    RemoveActivityRequestAction |
    ErrorAction


export type DispatchType = (args: Action) => Action


