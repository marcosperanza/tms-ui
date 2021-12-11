import {Activity, ActivityControllerService} from "../generated/api";
import {
    ADD_ACTIVITY,
    ADD_ACTIVITY_RQ,
    EDIT_ACTIVITY,
    EDIT_ACTIVITY_RQ,
    FETCH_ACTIVITY_RQ,
    REMOVE_ACTIVITY,
    REMOVE_ACTIVITY_RQ,
    SET_ACTIVITIES
} from "../type";
import {Dispatch} from "react";

/**
 * add activity action creator. It creates a thunk and dispatches two actions for informing the store about the starting
 * of the request and the final response or error
 *
 * @param activity the {@link Activity} to be add
 * @param dispatch the thunk
 */
export const addActivity = (activity: Activity, dispatch: Dispatch<any>) => {
    dispatch({type: ADD_ACTIVITY_RQ})
    ActivityControllerService.add(activity)
        .then((value: Activity) => dispatch({type: ADD_ACTIVITY, payload: value}))
        .catch(reason => dispatch({type: "ERROR", payload: reason}))
}


/**
 * fetch activities action creator: retrieves all {@link Activity}s from the server
 * It creates a thunk and dispatches two actions for informing the store about the starting
 * of the request and the final response or error
 *
 * @param dispatch the thunk
 */
export const fetchActivities = (dispatch: Dispatch<any>) => {
    dispatch({type: FETCH_ACTIVITY_RQ})
    ActivityControllerService.activities()
        // value can be undefined: the rest return 204 (no content)
        .then((value: Activity[]) => dispatch({type: SET_ACTIVITIES, payload: !value ? [] : value  }))
        .catch(reason => dispatch({type: "ERROR", payload: reason}))
}

/**
 * edit activity action creator: put on the server an edited {@link Activity}
 * It creates a thunk and dispatches two actions for informing the store about the starting
 * of the request and the final response or error
 *
 * @param activity the {@link Activity} to be send to the server
 * @param dispatch the thunk
 */
export const editActivity = (activity: Activity, dispatch: Dispatch<any>) => {
    dispatch({type: EDIT_ACTIVITY_RQ, payload: activity})
    ActivityControllerService.edit(activity)
        .then((value: Activity) => dispatch({type: EDIT_ACTIVITY, payload: value}))
        .catch(reason => dispatch({type: "ERROR", payload: reason}))
}

/**
 * remove activity action creator: deletes from the server an {@link Activity}
 * It creates a thunk and dispatches two actions for informing the store about the starting
 * of the request and the final response or error
 *
 * @param activity the {@link Activity} to be send to the server
 * @param dispatch the thunk
 */

export const removeActivity = (activity: Activity, dispatch: Dispatch<any>) => {
    dispatch({type: REMOVE_ACTIVITY_RQ, payload: activity})
    ActivityControllerService.remove(activity.id!)
        .then((value: Activity) => dispatch({type: REMOVE_ACTIVITY, payload: value}))
        .catch(reason => dispatch({type: "ERROR", payload: reason}))
}
