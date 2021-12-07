
import {Activity, AddActivityService} from "../generated/api";
import {ADD_ACTIVITY, AddActivityAction, DispatchType} from "../type";


export const addActivity = (activity: Activity) => {
    const action:  AddActivityAction = {
        type: ADD_ACTIVITY,
        payload: activity,
    }

    return (dispatch: DispatchType) => {
        AddActivityService.add(action.payload)
            .then(value => dispatch(value))
            .catch(reason => dispatch({type: "ERROR", payload: reason}))
    }
}
