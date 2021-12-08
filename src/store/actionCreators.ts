
import {Activity, AddActivityService, EditActivityService, GetActivitiesService} from "../generated/api";
import {ADD_ACTIVITY, ADD_ACTIVITY_RQ, AddActivityAction, AddActivityRequestAction, DispatchType} from "../type";
import {Dispatch} from "react";


export const addActivity = (activity: Activity, dispatch: Dispatch<any>) => {
    dispatch({type: "ADD_ACTIVITY_RQ"})
    AddActivityService.add(activity)
        .then((value: Activity) => dispatch({type: "ADD_ACTIVITY", payload: value}))
        .catch(reason => dispatch({type: "ERROR", payload: reason}))
}

export const fetchActivities = (dispatch: Dispatch<any>) => {
    dispatch({type: "FETCH_ACTIVITY_RQ"})
    GetActivitiesService.activities()
        .then((value: Activity[]) => dispatch({type: "SET_ACTIVITIES", payload: value}))
        .catch(reason => dispatch({type: "ERROR", payload: reason}))
}

export const editActivity = (activity: Activity, dispatch: Dispatch<any>) => {
    dispatch({type: "EDIT_ACTIVITY_RQ"})
    EditActivityService.edit(activity)
        .then((value: Activity) => dispatch({type: "EDIT_ACTIVITY", payload: value}))
        .catch(reason => dispatch({type: "ERROR", payload: reason}))
}
