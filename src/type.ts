import {Activity} from "./generated/api";

export const ADD_ACTIVITY_RQ = "ADD_ACTIVITY_RQ"
export const FETCH_ACTIVITY_RQ = "FETCH_ACTIVITY_RQ"
export const EDIT_ACTIVITY_RQ = "EDIT_ACTIVITY_RQ"
export const REMOVE_ACTIVITY_RQ = "REMOVE_ACTIVITY_RQ"
export const LOGIN_RQ = "LOGIN_RQ"
export const SET_ACTIVITIES = "SET_ACTIVITIES"
export const EDIT_ACTIVITY = "EDIT_ACTIVITY"
export const ADD_ACTIVITY = "ADD_ACTIVITY"
export const REMOVE_ACTIVITY = "REMOVE_ACTIVITY"
export const LOGIN = "LOGIN"
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
export interface LoginRequestRequestAction {
    type: 'LOGIN_RQ',

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

export interface LoginActivityAction {
    type: 'LOGIN',
    payload: string
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
    LoginActivityAction |
    LoginRequestRequestAction |
    ErrorAction


/**
 * Progress info. Keep track of the current progress information
 */
export type ProgressInfo = {
    /**
     * true if the add action is in progress
     */
    add: boolean,

    /**
     * true if the fetch activities action is in progress
     */
    fetch: boolean,

    /**
     * edit {@link Activity} action is in progress
     * the edit state will keep the list of the {@link Activity#id}s that currently have the editing in progress.
     */
    edit: string[],


    /**
     * the remove {@link Activity} action is in progress
     * the edit state will keep the list of the {@link Activity#id}s that currently have the remove action in progress.
     */
    remove: string[],
}


export type DispatchType = (args: Action) => Action


