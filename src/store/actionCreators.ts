
import {Activity, AddActivityService} from "../generated/api";
import {ADD_ACTIVITY, ADD_ACTIVITY_RQ, AddActivityAction, AddActivityRequestAction, DispatchType} from "../type";
import {Dispatch} from "react";


export const addActivity = (activity: Activity, dispatch: Dispatch<any>) => {
    dispatch({type: "ADD_ACTIVITY_RQ"})
    AddActivityService.add(activity)
        .then((value: Activity) => dispatch({type: "ADD_ACTIVITY", payload: value}))
        .catch(reason => dispatch({type: "ERROR", payload: reason}))
}
